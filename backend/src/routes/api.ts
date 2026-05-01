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
    
    res.json({ url: publicUrl });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: 'Failed to upload file to Cloud Storage' });
  }
});

/**
 * POST /api/ask
 * Processes a user query through the 3-Tier AI Fallback Pipeline.
 * 
 * @route POST /api/ask
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.query - The user's question regarding the election
 * @param {Object} res - Express response object
 * @returns {Object} JSON object containing reply, sentiment, and fallback status
 */
router.post('/ask', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Phase 1: AI Processing
    const aiResponse = await getGeminiResponse(query);
    
    res.json(aiResponse);
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Mock logic removed to a helper for fallback (High-quality simulation)
// Note: Logic moved to vertex.ts fallback tier.

export default router;
