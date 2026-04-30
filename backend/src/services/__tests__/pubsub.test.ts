import { publishEvent } from '../pubsub';
import { PubSub } from '@google-cloud/pubsub';

jest.mock('@google-cloud/pubsub', () => {
  const mTopic = { publishMessage: jest.fn().mockResolvedValue('mock-msg-id') };
  const mPubSub = { topic: jest.fn().mockReturnValue(mTopic) };
  return { PubSub: jest.fn().mockImplementation(() => mPubSub) };
});

describe('PubSub Service', () => {
  it('should publish an event correctly', async () => {
    const data = { event: 'test_event', payload: 'data' };
    const result = await publishEvent(data);
    
    expect(result).toBe('mock-msg-id');
    const mPubSub = new (PubSub as unknown as jest.Mock<any>)();
    expect(mPubSub.topic).toHaveBeenCalledWith('electroabhi');
    expect(mPubSub.topic().publishMessage).toHaveBeenCalledWith({
      data: Buffer.from(JSON.stringify(data))
    });
  });

  it('should handle publishing errors gracefully', async () => {
    const mPubSub = new (PubSub as unknown as jest.Mock<any>)();
    mPubSub.topic().publishMessage.mockRejectedValueOnce(new Error('PubSub Error'));
    
    const result = await publishEvent({ test: true });
    expect(result).toBeUndefined();
  });
});
