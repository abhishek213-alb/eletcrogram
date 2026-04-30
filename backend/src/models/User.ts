import mongoose, { Schema, Document } from 'mongoose';

export interface IChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface IScenario {
  id: string;
  passed: boolean;
}

export interface IUser extends Document {
  userId: string;
  checklist: IChecklistItem[];
  scenarios: IScenario[];
  quizScores: number[];
  createdAt: Date;
  updatedAt: Date;
}

const ChecklistItemSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const ScenarioSchema: Schema = new Schema({
  id: { type: String, required: true },
  passed: { type: Boolean, default: false }
});

const UserSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  checklist: [ChecklistItemSchema],
  scenarios: [ScenarioSchema],
  quizScores: [{ type: Number }],
}, {
  timestamps: true
});

export const User = mongoose.model<IUser>('User', UserSchema);
