export interface IChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface IScenario {
  id: string;
  passed: boolean;
}

export interface IUser {
  userId: string;
  checklist: IChecklistItem[];
  scenarios: IScenario[];
  quizScores: number[];
  createdAt?: string;
  updatedAt?: string;
}

// Default initial state for a new user journey
export const DEFAULT_USER_JOURNEY: Omit<IUser, 'userId'> = {
  checklist: [
    { id: '1', title: 'Verify name on Electoral Roll', completed: false },
    { id: '2', title: 'Find my polling booth', completed: false },
    { id: '3', title: 'Keep EPIC/ID ready', completed: false }
  ],
  scenarios: [],
  quizScores: []
};
