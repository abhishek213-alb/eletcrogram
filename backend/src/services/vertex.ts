import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { analyzeSentiment } from './sentiment';
import dotenv from 'dotenv';
import { Firestore } from '@google-cloud/firestore';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyCzgf11RHYdub3l4MW7CoLskdtEoo964Og';
const genAI = new GoogleGenerativeAI(API_KEY);

const firestore = new Firestore({
  projectId: process.env.GCP_PROJECT_ID || 'elctogram',
});

// Configure strict safety settings for political/hate speech
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

export const getGeminiResponse = async (query: string, userId: string = 'guest_user') => {
  console.log('--- AI Pipeline Start ---');
  
  // Phase 1: Contextual Understanding (Sentiment)
  const sentiment = await analyzeSentiment(query);
  console.log(`User Sentiment: ${sentiment.label} (${sentiment.score})`);

  try {
    // Use a 2-second timeout for Firestore to prevent hanging if local ADC credentials are missing
    let checklistProgress = 0;
    let chatHistory: any[] = [];
    
    try {
      const fetchContext = async () => {
        const userDoc = await firestore.collection('users').doc(userId).get();
        const userData = userDoc.exists ? userDoc.data() : null;
        const progress = userData?.checklist?.filter((i: any) => i.completed).length || 0;
        
        const historyDoc = await firestore.collection('chats').doc(userId).get();
        const history = historyDoc.exists ? historyDoc.data()?.messages || [] : [];
        return { progress, history };
      };

      const contextData: any = await Promise.race([
        fetchContext(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore context timeout')), 2000))
      ]);
      
      checklistProgress = contextData.progress;
      chatHistory = contextData.history;
    } catch (e) {
      console.warn('Could not fetch context from Firestore (timeout or missing credentials). Proceeding without memory.', e);
    }
    
    // Format history for Gemini
    const historyContext = chatHistory.slice(-4).map((m: any) => `User: ${m.q}\nAssistant: ${m.a}`).join('\n\n');

    console.log('Tier 1: Calling Gemini Pro...');
    const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });

    const prompt = `You are the "Indian Election Assistant", a premium AI designed for voter education.
    
    [Context Memory]
    Previous conversation:
    ${historyContext}
    
    [User Profile]
    Checklist completed: ${checklistProgress}/3 tasks. If they ask about next steps, guide them based on this.
    Sentiment: The user feels ${sentiment.label.toLowerCase()}.
    
    [Fake News / Fact Check Guidelines]
    - If the user asks about WhatsApp rumors (e.g., "voting from home via app"), firmly correct them. Voting is strictly in-person or postal ballot for eligible categories.
    - Always rely on ECI official rules.
    
    User Query: ${query}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (text) {
      console.log('Tier 1 Success: Gemini responded.');
      // Save to Context Memory with timeout
      chatHistory.push({ q: query, a: text });
      
      try {
        await Promise.race([
          firestore.collection('chats').doc(userId).set({ messages: chatHistory }, { merge: true }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Save context timeout')), 2000))
        ]);
      } catch (e) {
        console.warn('Could not save context to Firestore. Moving on.');
      }
      
      return { reply: text, sentiment: sentiment.label };
    }
    throw new Error('Empty response from Gemini');

  } catch (error) {
    console.warn('Tier 1 Failed or Blocked by Safety Filters. Falling back to Tier 2...', error);
    
    // Tier 2: Sentiment-aware Local Logic
    const localReply = getLocalFallback(query, sentiment.label);
    if (localReply) {
      console.log('Tier 2 Success: Local heuristics used.');
      return { reply: localReply, sentiment: sentiment.label, fallback: true };
    }

    // Tier 3: Static Guidance
    console.log('Tier 2 Failed. Using Tier 3 Static Fallback.');
    return { 
      reply: "I'm currently processing a lot of requests. For immediate official information, please visit the <strong>Election Commission of India</strong> portal at <a href='https://voters.eci.gov.in/'>voters.eci.gov.in</a>.",
      sentiment: sentiment.label,
      fallback: true
    };
  }
};

const getLocalFallback = (query: string, sentiment: string): string | null => {
  const lower = query.toLowerCase();
  
  const prefix = sentiment === 'Negative' 
    ? "I understand this can be confusing, but I'm here to help. " 
    : "Great question! ";

  if (lower.includes('register') || lower.includes('form 6')) {
    return `${prefix}To register as a new voter, you need to fill out <strong>Form 6</strong> on the ECI website. You'll need age and address proof.`;
  }
  if (lower.includes('id') || lower.includes('epic')) {
    return `${prefix}Your Voter ID (EPIC) can be downloaded digitally if your mobile number is linked. Otherwise, use <strong>Form 8</strong> for a replacement.`;
  }
  if (lower.includes('booth') || lower.includes('where')) {
    return `${prefix}You can find your polling booth by searching your name in the <strong>Electoral Roll</strong> at voters.eci.gov.in.`;
  }

  return null;
};
