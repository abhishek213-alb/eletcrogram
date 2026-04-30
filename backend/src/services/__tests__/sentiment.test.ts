import { analyzeSentiment } from '../sentiment';
import { LanguageServiceClient } from '@google-cloud/language';

jest.mock('@google-cloud/language', () => {
  const mClient = { analyzeSentiment: jest.fn() };
  return { LanguageServiceClient: jest.fn().mockImplementation(() => mClient) };
});

describe('Sentiment Service', () => {
  it('should analyze positive sentiment correctly', async () => {
    const mClient = new (LanguageServiceClient as unknown as jest.Mock<any>)();
    mClient.analyzeSentiment.mockResolvedValueOnce([
      { documentSentiment: { score: 0.8, magnitude: 0.9 } }
    ]);
    
    const result = await analyzeSentiment('I love voting!');
    expect(result.score).toBe(0.8);
    expect(result.label).toBe('Positive');
  });

  it('should analyze negative sentiment correctly', async () => {
    const mClient = new (LanguageServiceClient as unknown as jest.Mock<any>)();
    mClient.analyzeSentiment.mockResolvedValueOnce([
      { documentSentiment: { score: -0.5, magnitude: 0.6 } }
    ]);
    
    const result = await analyzeSentiment('I hate this process.');
    expect(result.score).toBe(-0.5);
    expect(result.label).toBe('Negative');
  });

  it('should fallback to neutral on error', async () => {
    const mClient = new (LanguageServiceClient as unknown as jest.Mock<any>)();
    mClient.analyzeSentiment.mockRejectedValueOnce(new Error('API Error'));
    
    const result = await analyzeSentiment('Does not matter.');
    expect(result.score).toBe(0);
    expect(result.label).toBe('Neutral');
  });
});
