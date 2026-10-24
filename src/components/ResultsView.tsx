import React, { useState, useEffect } from 'react';
import {
  Trophy,
  RotateCcw,
  Home,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  Award,
  Sparkles,
  HelpCircle,
  Check,
  X,
} from 'lucide-react';
import { QuizSummary } from '../types';
import { playSound } from '../utils/audio';

interface ResultsViewProps {
  summary: QuizSummary;
  onPlayAgain: () => void;
  onReturnHome: () => void;
  soundEnabled: boolean;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  summary,
  onPlayAgain,
  onReturnHome,
  soundEnabled,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    playSound('victory', soundEnabled);
  }, [soundEnabled]);

  const getPerformanceMessage = (accuracy: number) => {
    if (accuracy >= 90) {
      return {
        title: 'Mastermind! Supreme Performance',
        subtitle: 'You dominated this round with exceptional precision and deep recall.',
      };
    } else if (accuracy >= 70) {
      return {
        title: 'Impressive Knowledge & Skill',
        subtitle: 'A formidable result across tough multi-tier challenge questions.',
      };
    } else if (accuracy >= 50) {
      return {
        title: 'Good Effort! Solid Foundation',
        subtitle: 'You demonstrated solid knowledge. Review missed questions below to level up.',
      };
    } else {
      return {
        title: 'Keep Battling! Knowledge Expands',
        subtitle: 'Every arena match is a stepping stone. Review the facts below and try again!',
      };
    }
  };

  const performance = getPerformanceMessage(summary.accuracy);

  const filteredRecords = summary.records.filter((rec) => {
    if (filter === 'correct') return rec.isCorrect;
    if (filter === 'incorrect') return !rec.isCorrect;
    return true;
  });

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* 11. RESULTS HERO CARD */}
      <div className="rounded-[22px] bg-[#FFFCF7] border border-[#E8D5C3] p-6 sm:p-10 text-center space-y-6 shadow-[0_8px_28px_rgba(58,8,16,0.05)] relative overflow-hidden">
        {/* Subtle top gold accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#760F20] via-[#C18A36] to-[#760F20]" />

        {summary.isNewHighScore && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F9EBD0] border border-[#A87526]/30 text-[#760F20] shadow-2xs">
            <Trophy className="w-3.5 h-3.5 text-[#C18A36]" />
            <span>New Personal Best Record!</span>
          </div>
        )}

        <div className="space-y-2 max-w-xl mx-auto">
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-[#281D1B]">
            {performance.title}
          </h1>
          <p className="text-sm text-[#695650]">{performance.subtitle}</p>
        </div>

        {/* 56px Score in Playfair Display per Section 11 */}
        <div className="py-4 border-y border-[#EFE2D5] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16">
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-[#8C7971] mb-1">
              Final Score
            </div>
            <div className="font-display text-5xl sm:text-[56px] font-bold text-[#760F20] leading-none tabular-nums">
              {summary.score}
              <span className="font-body text-base text-[#695650] font-normal ml-1.5">pts</span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-16 bg-[#E8D5C3]" />

          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-[#8C7971] mb-1">
              Accuracy
            </div>
            <div className="font-display text-5xl sm:text-[56px] font-bold text-[#237547] leading-none tabular-nums">
              {summary.accuracy}%
            </div>
          </div>
        </div>

        {/* Performance Indicators (4 compact cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="rounded-[14px] bg-[#FFFFFF] border border-[#E8D5C3] p-[18px] text-center shadow-2xs">
            <div className="text-[13px] text-[#695650] font-medium">Correct</div>
            <div className="text-[28px] font-bold text-[#237547] tabular-nums mt-1 leading-none">
              {summary.correctCount} / {summary.totalQuestions}
            </div>
          </div>

          <div className="rounded-[14px] bg-[#FFFFFF] border border-[#E8D5C3] p-[18px] text-center shadow-2xs">
            <div className="text-[13px] text-[#695650] font-medium">Missed</div>
            <div className="text-[28px] font-bold text-[#B42332] tabular-nums mt-1 leading-none">
              {summary.incorrectCount}
            </div>
          </div>

          <div className="rounded-[14px] bg-[#FFFFFF] border border-[#E8D5C3] p-[18px] text-center shadow-2xs">
            <div className="text-[13px] text-[#695650] font-medium">Best Streak</div>
            <div className="text-[28px] font-bold text-[#946014] tabular-nums mt-1 leading-none flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 text-[#981B2B] fill-current" />
              <span>{summary.bestStreak}</span>
            </div>
          </div>

          <div className="rounded-[14px] bg-[#FFFFFF] border border-[#E8D5C3] p-[18px] text-center shadow-2xs">
            <div className="text-[13px] text-[#695650] font-medium">Time Spent</div>
            <div className="text-[28px] font-bold text-[#281D1B] tabular-nums mt-1 leading-none">
              {summary.totalTimeSpentSeconds}s
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={onPlayAgain}
            className="h-[48px] px-6 rounded-[12px] bg-[#760F20] hover:bg-[#570D18] text-white text-sm font-semibold flex items-center gap-2 shadow-[0_4px_12px_rgba(87,13,24,0.15)] transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>

          <button
            onClick={onReturnHome}
            className="h-[48px] px-6 rounded-[12px] bg-transparent border border-[#981B2B] text-[#760F20] hover:bg-[#F9EBD0] text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* REVIEW ANSWERS SECTION */}
      <div className="rounded-[22px] bg-[#FFFCF7] border border-[#E8D5C3] p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8D5C3] pb-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#281D1B]">
              Question Review & Explanations
            </h2>
            <p className="text-xs text-[#695650] mt-0.5">
              Review every answer choice, factual breakdown, and time spent.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F7F0E5] border border-[#E8D5C3] self-start">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-[#760F20] shadow-xs'
                  : 'text-[#695650] hover:text-[#281D1B]'
              }`}
            >
              All ({summary.records.length})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'correct'
                  ? 'bg-white text-[#237547] shadow-xs'
                  : 'text-[#695650] hover:text-[#281D1B]'
              }`}
            >
              Correct ({summary.correctCount})
            </button>
            <button
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'incorrect'
                  ? 'bg-white text-[#B42332] shadow-xs'
                  : 'text-[#695650] hover:text-[#281D1B]'
              }`}
            >
              Missed ({summary.incorrectCount})
            </button>
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-3">
          {filteredRecords.map((rec, index) => {
            const isExpanded = expandedId === rec.questionId || filteredRecords.length <= 5;
            return (
              <div
                key={rec.questionId}
                className="rounded-xl border border-[#E8D5C3] bg-white p-4 space-y-3 transition-colors"
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : rec.questionId)}
                  className="flex items-start justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                        rec.isCorrect
                          ? 'bg-[#E7F3E9] text-[#237547]'
                          : 'bg-[#FCE8E8] text-[#B42332]'
                      }`}
                    >
                      {rec.isCorrect ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <X className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#8C7971] uppercase tracking-wider block">
                        Question {index + 1} · {rec.pointsAwarded} pts · {rec.timeSpentSeconds}s
                      </span>
                      <p className="font-semibold text-sm sm:text-base text-[#281D1B] mt-0.5">
                        {rec.questionText}
                      </p>
                    </div>
                  </div>

                  <div className="p-1 text-[#8C7971]">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="pt-3 border-t border-[#EFE2D5] space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div
                        className={`p-2.5 rounded-lg border ${
                          rec.isCorrect
                            ? 'bg-[#E7F3E9] border-[#237547]/30 text-[#237547]'
                            : 'bg-[#FCE8E8] border-[#B42332]/30 text-[#B42332]'
                        }`}
                      >
                        <span className="font-bold block mb-0.5 text-[10px] uppercase tracking-wider">
                          Your Answer:
                        </span>
                        <span className="font-medium">
                          {rec.selectedOption || 'Timed out (No answer submitted)'}
                        </span>
                      </div>

                      {!rec.isCorrect && (
                        <div className="p-2.5 rounded-lg bg-[#E7F3E9] border border-[#237547]/30 text-[#237547]">
                          <span className="font-bold block mb-0.5 text-[10px] uppercase tracking-wider">
                            Correct Answer:
                          </span>
                          <span className="font-medium">{rec.correctAnswer}</span>
                        </div>
                      )}
                    </div>

                    {/* Explanation */}
                    <div className="p-3 rounded-lg bg-[#F7F0E5] border border-[#E8D5C3] text-xs space-y-1">
                      <div className="font-bold text-[#760F20] uppercase tracking-wider text-[10px] flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" />
                        <span>Factual Context</span>
                      </div>
                      <p className="text-[#281D1B] leading-relaxed">{rec.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
