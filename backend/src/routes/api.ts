import { Router } from 'express';
import multer from 'multer';
import { publishEvent } from '../services/pubsub';
import { saveUserQuery } from '../services/firestore';
import { getGeminiResponse } from '../services/vertex';
import { uploadFile } from '../services/storage';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Electiongram Upload Route
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const publicUrl = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);
    
    publishEvent({
      event: 'file_upload',
      fileName: req.file.originalname,
      url: publicUrl,
      timestamp: new Date().toISOString()
    });

    res.json({ url: publicUrl });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: 'Failed to upload file to Cloud Storage' });
  }
});

// Route for asking the AI
router.post('/ask', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    let reply: string;
    try {
      reply = await getGeminiResponse(query);
    } catch (err) {
      console.warn('Falling back to local response logic due to Vertex AI error');
      reply = generateMockAIResponse(query);
    }
    
    // Async save to Firestore and publish to PubSub
    saveUserQuery(query, reply);
    publishEvent({
      event: 'user_query',
      queryLength: query.length,
      timestamp: new Date().toISOString()
    });
    
    res.json({ reply });
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Mock logic moved to a helper for fallback (High-quality simulation)
const generateMockAIResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('register') || lowerQuery.includes('form 6')) {
    return `To register as a new voter, you must fill out <strong>Form 6</strong>. This can be done online via the <a href="https://voters.eci.gov.in/" target="_blank" class="text-indigo-600 underline">ECI Portal</a>. You will need: <br/>• Age proof (Aadhaar/Birth Cert)<br/>• Address proof<br/>• A recent photograph.`;
  }

  if (lowerQuery.includes('id') || lowerQuery.includes('card')) {
    return `The <strong>EPIC (Electors Photo Identity Card)</strong> is your primary voting document. If you have lost it, you can apply for a replacement via <strong>Form 8</strong>. Digital versions (e-EPIC) can be downloaded if your mobile is linked to your Aadhaar.`;
  }

  if (lowerQuery.includes('date') || lowerQuery.includes('when')) {
    return `Election dates are announced by the Election Commission of India (ECI). Currently, you can check your specific constituency's schedule by searching your name in the <strong>Electoral Roll</strong>. Major phases usually occur between April and May.`;
  }
  
  return `That is a great question about the Indian electoral process! Based on current guidelines, the <strong>Election Commission of India</strong> ensures every citizen has the right to a free and fair vote. Would you like to know more about polling stations, VVPAT, or how to check your name on the list?`;
};

export default router;
