import { HighScoreRecord, QuizSummary } from '../types';

const STORAGE_KEYS = {
  SOUND_ENABLED: 'quizquest_sound_enabled',
  HIGH_SCORES: 'quizquest_high_scores',
  OVERALL_STATS: 'quizquest_overall_stats',
};

// Memory fallback if storage is restricted
const memoryFallback: Record<string, string> = {};

function safeGet(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch {
    // fallback
  }
  return memoryFallback[key] ?? null;
}

function safeSet(key: string, val: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, val);
    }
  } catch {
    // fallback
  }
  memoryFallback[key] = val;
}

export function getStoredSoundPreference(): boolean {
  const val = safeGet(STORAGE_KEYS.SOUND_ENABLED);
  if (val === null) return true; // default on
  return val === 'true';
}

export function setStoredSoundPreference(enabled: boolean): void {
  safeSet(STORAGE_KEYS.SOUND_ENABLED, String(enabled));
}

export interface StoredStats {
  gamesPlayed: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  highestSingleScore: number;
}

export function getOverallStats(): StoredStats {
  const raw = safeGet(STORAGE_KEYS.OVERALL_STATS);
  if (!raw) {
    return {
      gamesPlayed: 0,
      totalQuestionsAnswered: 0,
      totalCorrect: 0,
      highestSingleScore: 0,
    };
  }
  try {
    return JSON.parse(raw);
  } catch {
    return {
      gamesPlayed: 0,
      totalQuestionsAnswered: 0,
      totalCorrect: 0,
      highestSingleScore: 0,
    };
  }
}

export function getHighScores(): Record<string, HighScoreRecord> {
  const raw = safeGet(STORAGE_KEYS.HIGH_SCORES);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveQuizResult(summary: QuizSummary): { isNewRecord: boolean; bestScore: number } {
  const key = `${summary.category}_${summary.difficulty}`;
  const existingRecords = getHighScores();
  const currentBest = existingRecords[key];

  let isNewRecord = false;
  if (!currentBest || summary.score > currentBest.score) {
    isNewRecord = true;
    existingRecords[key] = {
      category: summary.category,
      difficulty: summary.difficulty,
      score: summary.score,
      accuracy: summary.accuracy,
      date: new Date().toISOString(),
    };
    safeSet(STORAGE_KEYS.HIGH_SCORES, JSON.stringify(existingRecords));
  }

  // Update overall stats
  const stats = getOverallStats();
  stats.gamesPlayed += 1;
  stats.totalQuestionsAnswered += summary.totalQuestions;
  stats.totalCorrect += summary.correctCount;
  if (summary.score > stats.highestSingleScore) {
    stats.highestSingleScore = summary.score;
  }
  safeSet(STORAGE_KEYS.OVERALL_STATS, JSON.stringify(stats));

  const bestScore = existingRecords[key]?.score ?? summary.score;
  return { isNewRecord, bestScore };
}

export function resetAllStorage(): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(STORAGE_KEYS.HIGH_SCORES);
      window.localStorage.removeItem(STORAGE_KEYS.OVERALL_STATS);
    }
  } catch {
    // fallback
  }
  delete memoryFallback[STORAGE_KEYS.HIGH_SCORES];
  delete memoryFallback[STORAGE_KEYS.OVERALL_STATS];
}
