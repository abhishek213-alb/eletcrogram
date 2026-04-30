import { Firestore, FieldValue } from '@google-cloud/firestore';

// Initialize Firestore for the (default) database
const firestore = new Firestore({
  databaseId: '(default)'
});

export const saveUserQuery = async (query: string, reply: string, sentiment: string) => {
  try {
    const docRef = firestore.collection('queries').doc();
    await Promise.race([
      docRef.set({
        query,
        reply,
        sentiment,
        timestamp: FieldValue.serverTimestamp()
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 2000))
    ]);
    console.log(`Saved query with sentiment [${sentiment}] to Firestore: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('Error saving to Firestore:', error);
  }
};

export default firestore;
