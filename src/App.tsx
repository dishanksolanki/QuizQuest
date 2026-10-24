/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { HomePage } from './components/HomePage';
import { QuizView } from './components/QuizView';
import { ResultsView } from './components/ResultsView';
import { LeaderboardModal } from './components/LeaderboardModal';
import { AchievementsModal } from './components/AchievementsModal';
import {
  CategoryId,
  Question,
  QuizSettings,
  QuizSummary,
  UserAnswerRecord,
} from './types';
import { QUESTION_BANK, CATEGORIES } from './data/questions';
import {
  getStoredSoundPreference,
  setStoredSoundPreference,
  getHighScores,
  getOverallStats,
  saveQuizResult,
  resetAllStorage,
  StoredStats,
} from './utils/storage';

export default function App() {
  const [screen, setScreen] = useState<'HOME' | 'QUIZ' | 'RESULTS'>('HOME');
  const [activeNav, setActiveNav] = useState<string>('home');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState<boolean>(false);
  const [achievementsOpen, setAchievementsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Settings
  const [settings, setSettings] = useState<QuizSettings>({
    category: 'all',
    difficulty: 'all',
    questionCount: 10,
    timerEnabled: true,
    timerSeconds: 15,
    soundEnabled: true,
  });

  // Active quiz session state
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [quizSessionKey, setQuizSessionKey] = useState<number>(Date.now());
  const [quizSummary, setQuizSummary] = useState<QuizSummary | null>(null);

  // Stored stats & records
  const [highScores, setHighScores] = useState<Record<string, any>>({});
  const [overallStats, setOverallStats] = useState<StoredStats>({
    gamesPlayed: 0,
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    highestSingleScore: 0,
  });

  // Initialize storage preferences on mount
  useEffect(() => {
    const storedSound = getStoredSoundPreference();
    setSoundEnabled(storedSound);
    setHighScores(getHighScores());
    setOverallStats(getOverallStats());
  }, []);

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      setStoredSoundPreference(next);
      return next;
    });
  };

  const handleUpdateSettings = (newSettings: Partial<QuizSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Helper to shuffle array (Fisher-Yates)
  const shuffleArray = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // Prepare and launch quiz
  const startQuiz = useCallback(
    (customSettings?: Partial<QuizSettings>) => {
      const activeConf = { ...settings, ...customSettings };

      // 1. Filter by category
      let pool = QUESTION_BANK;
      if (activeConf.category !== 'all') {
        pool = pool.filter((q) => q.category === activeConf.category);
      }

      // 2. Filter by difficulty
      if (activeConf.difficulty !== 'all') {
        pool = pool.filter((q) => q.difficulty === activeConf.difficulty);
      }

      // 3. Backfill if pool is smaller than questionCount
      if (pool.length < activeConf.questionCount) {
        const remainingCategoryPool = QUESTION_BANK.filter(
          (q) =>
            (activeConf.category === 'all' || q.category === activeConf.category) &&
            !pool.some((pq) => pq.id === q.id)
        );
        pool = [...pool, ...shuffleArray(remainingCategoryPool)];
      }

      if (pool.length === 0) {
        pool = QUESTION_BANK;
      }

      // 4. Shuffle questions order
      const shuffledQuestions = shuffleArray(pool);

      // 5. Shuffle options within each question
      const preparedQuestions: Question[] = shuffledQuestions
        .slice(0, activeConf.questionCount)
        .map((q) => ({
          ...q,
          options: shuffleArray(q.options),
        }));

      setActiveQuestions(preparedQuestions);
      setQuizSessionKey(Date.now());
      setScreen('QUIZ');
      setActiveNav('play');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [settings]
  );

  const handleSelectCategoryAndPlay = (catId: CategoryId) => {
    handleUpdateSettings({ category: catId });
    startQuiz({ category: catId });
  };

  // Quiz completion handler
  const handleCompleteQuiz = (records: UserAnswerRecord[], totalScore: number) => {
    const correctCount = records.filter((r) => r.isCorrect).length;
    const incorrectCount = records.length - correctCount;
    const accuracy = records.length > 0 ? Math.round((correctCount / records.length) * 100) : 0;
    const totalTime = records.reduce((acc, curr) => acc + curr.timeSpentSeconds, 0);

    // Calculate best streak
    let currentStreak = 0;
    let maxStreak = 0;
    records.forEach((r) => {
      if (r.isCorrect) {
        currentStreak++;
        if (currentStreak > maxStreak) maxStreak = currentStreak;
      } else {
        currentStreak = 0;
      }
    });

    const categoryObj = CATEGORIES.find((c) => c.id === settings.category);
    const categoryName = categoryObj ? categoryObj.name : 'All Realms';

    // Calculate maximum theoretical score
    const maxScore = records.length * 20;

    const summary: QuizSummary = {
      category: settings.category,
      categoryName,
      difficulty: settings.difficulty,
      score: totalScore,
      maxScore,
      correctCount,
      incorrectCount,
      totalQuestions: records.length,
      accuracy,
      bestStreak: maxStreak,
      totalTimeSpentSeconds: totalTime,
      date: new Date().toISOString(),
      records,
    };

    const { isNewRecord } = saveQuizResult(summary);
    summary.isNewHighScore = isNewRecord;

    setQuizSummary(summary);
    setHighScores(getHighScores());
    setOverallStats(getOverallStats());
    setScreen('RESULTS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayAgain = () => {
    startQuiz();
  };

  const handleReturnHome = () => {
    setScreen('HOME');
    setActiveNav('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (sectionId: string) => {
    setActiveNav(sectionId === 'categories' ? 'categories' : sectionId === 'how-to-play' ? 'how-to-play' : 'play');
    if (screen !== 'HOME') {
      setScreen('HOME');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetStats = () => {
    resetAllStorage();
    setHighScores({});
    setOverallStats({
      gamesPlayed: 0,
      totalQuestionsAnswered: 0,
      totalCorrect: 0,
      highestSingleScore: 0,
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F0E5] text-[#281D1B] font-body selection:bg-[#F4DDA8] selection:text-[#570D18]">
      {/* 1. Left Navigation Sidebar (210px desktop, drawer mobile) */}
      <Sidebar
        currentScreen={screen}
        activeNav={activeNav}
        onNavigateHome={handleReturnHome}
        onScrollToSection={handleScrollToSection}
        onOpenLeaderboard={() => setLeaderboardOpen(true)}
        onOpenAchievements={() => setAchievementsOpen(true)}
        stats={overallStats}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area: Offset by 210px on desktop */}
      <div className="lg:pl-[210px] flex flex-col min-h-screen transition-all">
        {/* 2. Top Navigation Bar (76px height) */}
        <Topbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          currentScreen={screen}
          onNavigateHome={handleReturnHome}
          onStartQuiz={() => startQuiz()}
          onOpenLeaderboard={() => setLeaderboardOpen(true)}
          onOpenAchievements={() => setAchievementsOpen(true)}
        />

        {/* 3. Main Views */}
        <main className="flex-1">
          {screen === 'HOME' && (
            <HomePage
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onStartQuiz={() => startQuiz()}
              onSelectCategoryAndPlay={handleSelectCategoryAndPlay}
              stats={overallStats}
              highScores={highScores}
              onOpenLeaderboard={() => setLeaderboardOpen(true)}
              searchQuery={searchQuery}
            />
          )}

          {screen === 'QUIZ' && activeQuestions.length > 0 && (
            <QuizView
              key={quizSessionKey}
              questions={activeQuestions}
              settings={settings}
              soundEnabled={soundEnabled}
              onToggleSound={handleToggleSound}
              onCompleteQuiz={handleCompleteQuiz}
              onQuitQuiz={handleReturnHome}
            />
          )}

          {screen === 'RESULTS' && quizSummary && (
            <ResultsView
              summary={quizSummary}
              onPlayAgain={handlePlayAgain}
              onReturnHome={handleReturnHome}
              soundEnabled={soundEnabled}
            />
          )}
        </main>

        {/* Clean Footer */}
        <footer className="border-t border-[#E8D5C3] py-6 px-4 text-center text-xs text-[#8C7971]">
          <p>© {new Date().getFullYear()} QuizQuest. Play. Learn. Level Up.</p>
        </footer>
      </div>

      {/* Hall of Champions / Leaderboard Modal */}
      <LeaderboardModal
        isOpen={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
        highScores={highScores}
        stats={overallStats}
        onResetStats={handleResetStats}
      />

      {/* Quest Achievements Modal */}
      <AchievementsModal
        isOpen={achievementsOpen}
        onClose={() => setAchievementsOpen(false)}
        stats={overallStats}
      />
    </div>
  );
}
