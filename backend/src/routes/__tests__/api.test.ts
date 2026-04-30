import request from 'supertest';
import app from '../../index';

// Mock Services
jest.mock('../../services/vertex', () => ({
  getGeminiResponse: jest.fn().mockResolvedValue({
    reply: 'Test response from Gemini',
    sentiment: 'Positive',
    fallback: false
  })
}));

jest.mock('../../services/firestore', () => ({
  saveUserQuery: jest.fn().mockResolvedValue('test-doc-id')
}));

jest.mock('../../services/pubsub', () => ({
  publishEvent: jest.fn().mockResolvedValue('test-msg-id')
}));

jest.mock('../../services/storage', () => ({
  uploadFile: jest.fn().mockResolvedValue('https://storage.googleapis.com/test-bucket/test.png')
}));

describe('API Routes Integration', () => {
  describe('GET /health', () => {
    it('should return 200 and status ok', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  describe('POST /api/ask', () => {
    it('should return 400 if query is missing', async () => {
      const res = await request(app).post('/api/ask').send({});
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Query is required');
    });

    it('should return 200 and AI response for valid query', async () => {
      const res = await request(app).post('/api/ask').send({ query: 'Who can vote?' });
      expect(res.status).toBe(200);
      expect(res.body.reply).toBe('Test response from Gemini');
      expect(res.body.sentiment).toBe('Positive');
    });
  });

  describe('POST /api/upload', () => {
    it('should return 400 if no file is uploaded', async () => {
      const res = await request(app).post('/api/upload');
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('No file uploaded');
    });

    // Note: Testing successful upload with supertest requires attaching a buffer/file
    it('should return 200 and public URL on successful upload', async () => {
      const buffer = Buffer.from('test image content');
      const res = await request(app)
        .post('/api/upload')
        .attach('file', buffer, 'test.png');
      
      expect(res.status).toBe(200);
      expect(res.body.url).toContain('storage.googleapis.com');
    });
  });
});
