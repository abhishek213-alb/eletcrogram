import { Firestore, FieldValue } from '@google-cloud/firestore';

// Initialize Firestore for the (default) database
const firestore = new Firestore({
  databaseId: '(default)'
});

export const saveUserQuery = async (query: string, reply: string) => {
  try {
    const docRef = firestore.collection('queries').doc();
    await docRef.set({
      query,
      reply,
      timestamp: FieldValue.serverTimestamp()
    });
    console.log(`Saved query to Firestore with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('Error saving to Firestore:', error);
    // Non-blocking error
  }
};

export default firestore;
