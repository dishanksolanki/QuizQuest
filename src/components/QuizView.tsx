import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Clock,
  ArrowRight,
  Flame,
  Volume2,
  VolumeX,
  AlertTriangle,
  LogOut,
  HelpCircle,
  Check,
  X,
} from 'lucide-react';
import { Question, QuizSettings, UserAnswerRecord } from '../types';
import { playSound } from '../utils/audio';

interface QuizViewProps {
  questions: Question[];
  settings: QuizSettings;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onCompleteQuiz: (records: UserAnswerRecord[], totalScore: number) => void;
  onQuitQuiz: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  settings,
  soundEnabled,
  onToggleSound,
  onCompleteQuiz,
  onQuitQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(settings.timerSeconds || 15);
  const [isTimedOut, setIsTimedOut] = useState(false);

  // Synchronous ref to prevent stale closures
  const recordsRef = useRef<UserAnswerRecord[]>([]);
  const questionStartTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<number | null>(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Difficulty base points
  const getPointsForDifficulty = (diff: string): number => {
    switch (diff) {
      case 'easy':
        return 10;
      case 'medium':
        return 15;
      case 'hard':
        return 20;
      default:
        return 10;
    }
  };

  // Submit answer logic
  const handleSelectAnswer = useCallback(
    (option: string | null, timedOut = false) => {
      if (hasAnswered) return; // Prevent duplicate scoring/answers
      setHasAnswered(true);
      setSelectedOption(option);
      setIsTimedOut(timedOut);

      // Stop timer
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }

      const timeSpent = Math.max(1, Math.round((Date.now() - questionStartTimeRef.current) / 1000));
      const isCorrect = option !== null && option === currentQuestion.correctAnswer;

      let pointsEarned = 0;
      if (isCorrect) {
        const basePoints = getPointsForDifficulty(currentQuestion.difficulty);
        const streakBonus = currentStreak * 2;
        pointsEarned = basePoints + streakBonus;

        const newScore = currentScore + pointsEarned;
        const newStreak = currentStreak + 1;

        setCurrentScore(newScore);
        setCurrentStreak(newStreak);
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
        }
        playSound('correct', soundEnabled);
      } else {
        setCurrentStreak(0);
        playSound('incorrect', soundEnabled);
      }

      const answerRecord: UserAnswerRecord = {
        questionId: currentQuestion.id,
        questionText: currentQuestion.question,
        options: currentQuestion.options,
        selectedOption: option,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
        explanation: currentQuestion.explanation,
        timeSpentSeconds: timeSpent,
        pointsAwarded: pointsEarned,
      };

      recordsRef.current = [...recordsRef.current, answerRecord];
    },
    [hasAnswered, currentQuestion, currentScore, currentStreak, bestStreak, soundEnabled]
  );

  // Setup timer per question
  useEffect(() => {
    if (!settings.timerEnabled) return;

    setTimeLeft(settings.timerSeconds || 15);
    questionStartTimeRef.current = Date.now();

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
          handleSelectAnswer(null, true);
          return 0;
        }
        if (prev <= 5 && soundEnabled) {
          playSound('tick', true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentIndex, settings.timerEnabled, settings.timerSeconds, handleSelectAnswer, soundEnabled]);

  // Handle proceed to next question or complete quiz
  const handleNextQuestion = () => {
    playSound('click', soundEnabled);

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
      setIsTimedOut(false);
      questionStartTimeRef.current = Date.now();
    } else {
      // Quiz completed!
      onCompleteQuiz(recordsRef.current, currentScore);
    }
  };

  // Keyboard shortcut: Press Enter to proceed if answered
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (hasAnswered && e.key === 'Enter') {
        handleNextQuestion();
      } else if (!hasAnswered) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const idx = parseInt(e.key, 10) - 1;
          if (currentQuestion.options[idx]) {
            handleSelectAnswer(currentQuestion.options[idx]);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasAnswered, currentQuestion, handleSelectAnswer]);

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* 10. QUIZ HEADER (56px to 64px) */}
      <div className="rounded-[18px] bg-[#FFFCF7] border border-[#E8D5C3] p-4 sm:px-6 flex items-center justify-between gap-4 shadow-xs">
        {/* Left: Counter & Category Badge */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <span className="text-[13px] font-bold text-[#695650] tabular-nums">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-[#E8D5C3]">·</span>
          <span className="text-xs font-semibold text-[#760F20] bg-[#F9EBD0] px-2.5 py-0.5 rounded-full capitalize">
            {currentQuestion.category.replace('-', ' ')}
          </span>
          <span className="text-xs font-semibold text-[#695650] bg-[#F2E7D8] px-2 py-0.5 rounded-full capitalize">
            {currentQuestion.difficulty}
          </span>
        </div>

        {/* Right: Score, Streak, Timer, Sound & Exit */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Current Score & Streak */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#760F20] tabular-nums">
              {currentScore} pts
            </span>
            {currentStreak > 1 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFF0D3] border border-[#A87526]/30 text-[#946014] text-[11px] font-bold">
                <Flame className="w-3 h-3 text-[#981B2B] fill-current" />
                <span>x{currentStreak}</span>
              </span>
            )}
          </div>

          {/* Timer Display */}
          {settings.timerEnabled && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono text-[14px] font-semibold transition-colors tabular-nums ${
                timeLeft <= 5
                  ? 'bg-[#FCE8E8] text-[#B42332] border border-[#B42332]/40 animate-pulse'
                  : 'bg-[#F7F0E5] text-[#281D1B] border border-[#E8D5C3]'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label="Toggle sound"
            className="p-1.5 rounded-lg text-[#695650] hover:text-[#281D1B] hover:bg-[#F2E7D8] transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#760F20]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#8C7971]" />
            )}
          </button>

          {/* Exit Quiz */}
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to exit? Your current quiz progress will be abandoned.')) {
                onQuitQuiz();
              }
            }}
            className="p-1.5 rounded-lg text-[#8C7971] hover:text-[#B42332] hover:bg-[#FCE8E8] transition-colors cursor-pointer"
            title="Exit Quiz"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar (Height 6px, Track #E8D5C3, Fill #981B2B) per Section 10 */}
      <div className="w-full h-[6px] bg-[#E8D5C3] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#981B2B] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="rounded-[20px] bg-[#FFFCF7] border border-[#E8D5C3] p-6 sm:p-8 shadow-[0_4px_16px_rgba(58,8,16,0.04)] space-y-6">
        {/* Question Header & Points indicator */}
        <div className="flex items-center justify-between text-xs text-[#8C7971] border-b border-[#EFE2D5] pb-3">
          <span className="uppercase tracking-wider font-semibold">
            {currentQuestion.category.replace('-', ' ')}
          </span>
          <span className="font-semibold text-[#760F20]">
            +{getPointsForDifficulty(currentQuestion.difficulty)} pts
          </span>
        </div>

        {/* Question Text (28px desktop, 22px mobile, Inter, weight 650) */}
        <h2 className="font-body text-[22px] sm:text-[28px] font-[650] text-[#281D1B] leading-[1.4] tracking-tight">
          {currentQuestion.question}
        </h2>

        {/* Timeout Banner */}
        {isTimedOut && (
          <div className="p-3.5 rounded-xl bg-[#FCE8E8] border border-[#B42332]/40 text-[#B42332] text-xs font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Time expired! Moving to answer review below.</span>
          </div>
        )}

        {/* Answer Options (Vertical stack, min-h 60px, padding 16px, rounded 12px) */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isSelected = selectedOption === option;
            const isCorrectAnswer = option === currentQuestion.correctAnswer;

            // Visual state computation per spec Section 10:
            let cardClasses =
              'border-[#E8D5C3] bg-[#FFFFFF] hover:bg-[#F9EBD0] hover:border-[#C18A36] text-[#281D1B]';
            let badgeClasses = 'bg-[#F7F0E5] text-[#695650] border-[#E8D5C3]';
            let indicator = null;

            if (hasAnswered) {
              if (isCorrectAnswer) {
                // Correct answer state: #E7F3E9, border #237547
                cardClasses =
                  'bg-[#E7F3E9] border-[#237547] text-[#237547] shadow-xs font-semibold';
                badgeClasses = 'bg-[#237547] text-white border-[#237547]';
                indicator = <Check className="w-4 h-4 text-[#237547]" />;
              } else if (isSelected && !isCorrectAnswer) {
                // Incorrect answer state: #FCE8E8, border #B42332
                cardClasses =
                  'bg-[#FCE8E8] border-[#B42332] text-[#B42332] shadow-xs font-semibold';
                badgeClasses = 'bg-[#B42332] text-white border-[#B42332]';
                indicator = <X className="w-4 h-4 text-[#B42332]" />;
              } else {
                cardClasses = 'bg-[#FFFFFF] border-[#E8D5C3] text-[#8C7971] opacity-60';
                badgeClasses = 'bg-[#F2E7D8] text-[#8C7971] border-[#E8D5C3]';
              }
            } else if (isSelected) {
              // Selected before answer lock: #F9EBD0, border #981B2B
              cardClasses = 'bg-[#F9EBD0] border-[#981B2B] text-[#760F20] shadow-xs font-semibold';
              badgeClasses = 'bg-[#760F20] text-white border-[#760F20]';
            }

            return (
              <button
                key={option}
                type="button"
                disabled={hasAnswered}
                onClick={() => handleSelectAnswer(option)}
                className={`w-full min-h-[60px] p-4 rounded-[12px] border text-left flex items-center justify-between gap-3.5 transition-all duration-150 cursor-pointer disabled:cursor-default ${cardClasses}`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${badgeClasses}`}
                  >
                    {letter}
                  </div>
                  <span className="text-[15px] font-medium leading-snug">{option}</span>
                </div>
                {indicator && <div className="shrink-0">{indicator}</div>}
              </button>
            );
          })}
        </div>

        {/* Explanation Panel (shown when locked) */}
        {hasAnswered && (
          <div className="p-4 sm:p-5 rounded-[12px] bg-[#F7F0E5] border border-[#E8D5C3] space-y-1.5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#760F20]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Explanation & Fact</span>
            </div>
            <p className="text-[14px] text-[#281D1B] leading-[1.7]">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Navigation Action Button */}
        {hasAnswered && (
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleNextQuestion}
              className="h-[48px] px-6 rounded-[12px] bg-[#760F20] hover:bg-[#570D18] text-white text-sm font-semibold flex items-center gap-2 shadow-[0_4px_12px_rgba(87,13,24,0.15)] transition-all cursor-pointer"
            >
              <span>{currentIndex + 1 === totalQuestions ? 'View Results' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
