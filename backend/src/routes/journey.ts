import express from 'express';
import { User } from '../models/User';

const router = express.Router();

// Get or create user journey
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    let user = await User.findOne({ userId });
    
    if (!user) {
      user = new User({
        userId,
        checklist: [
          { id: '1', title: 'Verify name on Electoral Roll', completed: false },
          { id: '2', title: 'Find my polling booth', completed: false },
          { id: '3', title: 'Keep EPIC/ID ready', completed: false }
        ],
        scenarios: [],
        quizScores: []
      });
      await user.save();
    }
    
    res.json(user);
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
    
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const item = user.checklist.find(i => i.id === itemId);
    if (item) {
      item.completed = completed;
      await user.save();
    }
    
    res.json(user.checklist);
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
    
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const scenario = user.scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      scenario.passed = passed;
    } else {
      user.scenarios.push({ id: scenarioId, passed });
    }
    await user.save();
    
    res.json(user.scenarios);
  } catch (error) {
    console.error('Error updating scenario:', error);
    res.status(500).json({ error: 'Failed to update scenario' });
  }
});

export default router;
