import { saveUserQuery } from '../firestore';
import { Firestore } from '@google-cloud/firestore';

jest.mock('@google-cloud/firestore', () => {
  const mDoc = { set: jest.fn().mockResolvedValue({}) };
  const mCollection = { doc: jest.fn().mockReturnValue(mDoc) };
  const mFirestore = { collection: jest.fn().mockReturnValue(mCollection) };
  return {
    Firestore: jest.fn().mockImplementation(() => mFirestore),
    FieldValue: { serverTimestamp: jest.fn().mockReturnValue('mock-timestamp') }
  };
});

describe('Firestore Service', () => {
  it('should save user query correctly', async () => {
    const query = 'How to vote?';
    const reply = 'Go to polling station.';
    
    await saveUserQuery(query, reply, 'Positive');
    
    const mFirestore = new (Firestore as unknown as jest.Mock<Firestore>)();
    expect(mFirestore.collection).toHaveBeenCalledWith('queries');
    expect(mFirestore.collection('queries').doc).toHaveBeenCalled();
  });

  it('should handle errors gracefully', async () => {
    const query = 'How to vote?';
    const reply = 'Go to polling station.';
    
    // Force error
    const mFirestore = new (Firestore as unknown as jest.Mock<any>)();
    (mFirestore.collection('queries').doc() as any).set.mockRejectedValueOnce(new Error('Firestore error'));
    
    await saveUserQuery(query, reply, 'Neutral');
  });
});
