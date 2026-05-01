import { getGeminiResponse } from '../vertex';
import { GoogleGenerativeAI } from '@google/generative-ai';

jest.mock('@google/generative-ai', () => {
  const mResponse = { text: jest.fn().mockReturnValue('Mocked AI response') };
  const mResult = { response: Promise.resolve(mResponse) };
  const mModel = { generateContent: jest.fn().mockResolvedValue(mResult) };
  const mGenAI = { getGenerativeModel: jest.fn().mockReturnValue(mModel) };
  return { GoogleGenerativeAI: jest.fn().mockImplementation(() => mGenAI) };
});

jest.mock('../sentiment', () => ({
  analyzeSentiment: jest.fn().mockResolvedValue({ score: 0, magnitude: 0, label: 'Neutral' })
}));

describe('Vertex/Gemini Service', () => {
  it('should return Tier 1 Gemini response', async () => {
    const result = await getGeminiResponse('Tell me about voting');
    expect(result.reply).toBe('Mocked AI response');
    expect(result.fallback).toBeUndefined();
    expect(result.sentiment).toBe('Neutral');
  });

  it('should fallback to Tier 2 local logic if Gemini fails and query matches', async () => {
    const mGenAI = new (GoogleGenerativeAI as unknown as jest.Mock)() as any;
    mGenAI.getGenerativeModel().generateContent.mockRejectedValueOnce(new Error('API Error'));
    
    const result = await getGeminiResponse('How to register?');
    expect(result.fallback).toBe(true);
    expect(result.reply).toContain('Form 6');
  });

  it('should fallback to Tier 3 static logic if Gemini fails and no local match', async () => {
    const mGenAI = new (GoogleGenerativeAI as unknown as jest.Mock)() as any;
    mGenAI.getGenerativeModel().generateContent.mockRejectedValueOnce(new Error('API Error'));
    
    const result = await getGeminiResponse('Random question');
    expect(result.fallback).toBe(true);
    expect(result.reply).toContain('Election Commission of India');
  });
});
