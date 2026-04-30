import { GoogleGenerativeAI } from '@google/generative-ai';
import { analyzeSentiment } from './sentiment';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyCzgf11RHYdub3l4MW7CoLskdtEoo964Og';
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * 3-Tier AI Fallback Pipeline:
 * Tier 1: Gemini Pro (Primary)
 * Tier 2: Sentiment-aware Heuristics (Local Logic)
 * Tier 3: Static Guidance (Safe Fallback)
 */
export const getGeminiResponse = async (query: string) => {
  console.log('--- AI Pipeline Start ---');
  
  // Phase 1: Contextual Understanding (Sentiment)
  const sentiment = await analyzeSentiment(query);
  console.log(`User Sentiment: ${sentiment.label} (${sentiment.score})`);

  try {
    // Tier 1: Primary AI (Gemini Pro)
    console.log('Tier 1: Calling Gemini Pro...');
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are the "Indian Election Assistant", a premium AI designed for voter education.
    Sentiment Context: The user seems to be feeling ${sentiment.label.toLowerCase()}.
    
    Guidelines:
    1. Provide high-fidelity, ECI-compliant answers.
    2. Use HTML (<strong>, <ul>, <li>) for structure.
    3. If the user is frustrated (Negative sentiment), be extra patient and reassuring.
    4. If the user is happy (Positive sentiment), celebrate their democratic enthusiasm.
    
    User Query: ${query}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (text) {
      console.log('Tier 1 Success: Gemini responded.');
      return { reply: text, sentiment: sentiment.label };
    }
    throw new Error('Empty response from Gemini');

  } catch (error) {
    console.warn('Tier 1 Failed. Falling back to Tier 2...');
    
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
