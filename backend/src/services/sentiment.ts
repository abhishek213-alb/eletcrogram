import { LanguageServiceClient } from '@google-cloud/language';

const client = new LanguageServiceClient();

export const analyzeSentiment = async (text: string) => {
  try {
    const document = {
      content: text,
      type: 'PLAIN_TEXT' as const,
    };

    const [result] = await Promise.race([
      client.analyzeSentiment({ document }),
      new Promise<any>((_, reject) => setTimeout(() => reject(new Error('Sentiment Timeout')), 1500))
    ]);
    const sentiment = result.documentSentiment;

    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment?.score}`);
    console.log(`Sentiment magnitude: ${sentiment?.magnitude}`);

    return {
      score: sentiment?.score || 0,
      magnitude: sentiment?.magnitude || 0,
      label: getSentimentLabel(sentiment?.score || 0)
    };
  } catch (error) {
    console.error('Sentiment Analysis Error:', error);
    return { score: 0, magnitude: 0, label: 'Neutral' };
  }
};

const getSentimentLabel = (score: number): string => {
  if (score >= 0.25) return 'Positive';
  if (score <= -0.25) return 'Negative';
  return 'Neutral';
};
