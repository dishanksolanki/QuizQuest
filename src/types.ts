export type CategoryId = 'general-knowledge' | 'science' | 'technology' | 'history';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type DifficultyFilter = Difficulty | 'all';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  colorScheme: {
    badge: string;
    accent: string;
    cardBorder: string;
    cardBg: string;
    glow: string;
  };
}

export interface Question {
  id: string;
  category: CategoryId;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizSettings {
  category: CategoryId | 'all';
  difficulty: DifficultyFilter;
  questionCount: number;
  timerEnabled: boolean;
  timerSeconds: number;
  soundEnabled: boolean;
}

export interface UserAnswerRecord {
  questionId: string;
  questionText: string;
  options: string[];
  selectedOption: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
  timeSpentSeconds: number;
  pointsAwarded: number;
}

export interface QuizSummary {
  category: CategoryId | 'all';
  categoryName: string;
  difficulty: DifficultyFilter;
  score: number;
  maxScore: number;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  accuracy: number;
  bestStreak: number;
  totalTimeSpentSeconds: number;
  date: string;
  records: UserAnswerRecord[];
  isNewHighScore?: boolean;
}

export interface HighScoreRecord {
  category: string;
  difficulty: string;
  score: number;
  accuracy: number;
  date: string;
}
