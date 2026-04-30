import express from 'express';
import { Firestore } from '@google-cloud/firestore';
import { IUser, DEFAULT_USER_JOURNEY } from '../models/User';

const router = express.Router();

// Initialize Firestore
const firestore = new Firestore({
  projectId: process.env.GCP_PROJECT_ID || 'elctogram',
});

const usersCollection = firestore.collection('users');

// Get or create user journey
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userDoc = await usersCollection.doc(userId).get();
    
    if (!userDoc.exists) {
      const newUser: IUser = {
        userId,
        ...DEFAULT_USER_JOURNEY,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await usersCollection.doc(userId).set(newUser);
      return res.json(newUser);
    }
    
    res.json(userDoc.data());
  } catch (error) {
    console.error('Error fetching journey:', error);
    res.status(500).json({ error: 'Failed to fetch journey' });
  }
});

// Update checklist item
router.post('/:userId/checklist', async (req, res) => {
  try {
    const { userId } = req.params;
    const { itemId, completed } = req.body;
    
    const userDoc = await usersCollection.doc(userId).get();
    if (!userDoc.exists) return res.status(404).json({ error: 'User not found' });
    
    const userData = userDoc.data() as IUser;
    const item = userData.checklist.find(i => i.id === itemId);
    
    if (item) {
      item.completed = completed;
      userData.updatedAt = new Date().toISOString();
      await usersCollection.doc(userId).set(userData, { merge: true });
    }
    
    res.json(userData.checklist);
  } catch (error) {
    console.error('Error updating checklist:', error);
    res.status(500).json({ error: 'Failed to update checklist' });
  }
});

// Update scenario completion
router.post('/:userId/scenario', async (req, res) => {
  try {
    const { userId } = req.params;
    const { scenarioId, passed } = req.body;
    
    const userDoc = await usersCollection.doc(userId).get();
    if (!userDoc.exists) return res.status(404).json({ error: 'User not found' });
    
    const userData = userDoc.data() as IUser;
    const scenario = userData.scenarios.find(s => s.id === scenarioId);
    
    if (scenario) {
      scenario.passed = passed;
    } else {
      userData.scenarios.push({ id: scenarioId, passed });
    }
    
    userData.updatedAt = new Date().toISOString();
    await usersCollection.doc(userId).set(userData, { merge: true });
    
    res.json(userData.scenarios);
  } catch (error) {
    console.error('Error updating scenario:', error);
    res.status(500).json({ error: 'Failed to update scenario' });
  }
});

export default router;
