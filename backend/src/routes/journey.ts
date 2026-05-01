import express from 'express';
import fs from 'fs';
import path from 'path';
import { IUser, DEFAULT_USER_JOURNEY } from '../models/User';

const router = express.Router();
const DB_PATH = path.join(process.cwd(), 'db.json');

// Helper to read local DB
const readDB = (): Record<string, IUser> => {
  if (!fs.existsSync(DB_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch (e) {
    return {};
  }
};

// Helper to write local DB
const writeDB = (data: Record<string, IUser>) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Get or create user journey (Local Version)
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const db = readDB();
  
  if (!db[userId]) {
    const newUser: IUser = {
      userId,
      ...DEFAULT_USER_JOURNEY,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db[userId] = newUser;
    writeDB(db);
    return res.json(newUser);
  }
  
  res.json(db[userId]);
});

// Update checklist item (Local Version)
router.post('/:userId/checklist', (req, res) => {
  const { userId } = req.params;
  const { itemId, completed } = req.body;
  const db = readDB();
  
  if (!db[userId]) return res.status(404).json({ error: 'User not found' });
  
  const userData = db[userId];
  const item = userData.checklist.find(i => i.id === itemId);
  
  if (item) {
    item.completed = completed;
    userData.updatedAt = new Date().toISOString();
    writeDB(db);
  }
  
  res.json(userData.checklist);
});

// Update scenario completion (Local Version)
router.post('/:userId/scenario', (req, res) => {
  const { userId } = req.params;
  const { scenarioId, passed } = req.body;
  const db = readDB();
  
  if (!db[userId]) return res.status(404).json({ error: 'User not found' });
  
  const userData = db[userId];
  const scenario = userData.scenarios.find(s => s.id === scenarioId);
  
  if (scenario) {
    scenario.passed = passed;
  } else {
    userData.scenarios.push({ id: scenarioId, passed });
  }
  
  userData.updatedAt = new Date().toISOString();
  writeDB(db);
  
  res.json(userData.scenarios);
});

export default router;
