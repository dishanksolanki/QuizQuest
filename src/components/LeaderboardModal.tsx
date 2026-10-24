import React, { useEffect } from 'react';
import { Trophy, X, RotateCcw, Crown, Medal, Calendar, Award } from 'lucide-react';
import { HighScoreRecord } from '../types';
import { StoredStats } from '../utils/storage';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  highScores: Record<string, HighScoreRecord>;
  stats: StoredStats;
  onResetStats: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  highScores,
  stats,
  onResetStats,
}) => {
  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scoreEntries = Object.entries(highScores);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[680px] rounded-[20px] bg-[#FFFCF7] border border-[#E8D5C3] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8D5C3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F9EBD0] border border-[#A87526]/30 flex items-center justify-center text-[#760F20]">
              <Trophy className="w-5 h-5 text-[#C18A36]" />
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-[28px] font-bold text-[#281D1B] leading-tight">
                Hall of Champions
              </h2>
              <p className="text-xs text-[#695650] mt-0.5">
                Personal high scores & battlefield milestones
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8C7971] hover:text-[#281D1B] hover:bg-[#F2E7D8] transition-colors cursor-pointer"
            aria-label="Close leaderboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lifetime Statistics Summary */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3.5 rounded-xl bg-[#F7F0E5] border border-[#E8D5C3]">
            <div className="text-[11px] font-semibold text-[#695650] uppercase tracking-wider">
              Games Played
            </div>
            <div className="text-xl font-bold text-[#281D1B] mt-0.5 tabular-nums">
              {stats.gamesPlayed}
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#F7F0E5] border border-[#E8D5C3]">
            <div className="text-[11px] font-semibold text-[#695650] uppercase tracking-wider">
              Answered
            </div>
            <div className="text-xl font-bold text-[#760F20] mt-0.5 tabular-nums">
              {stats.totalQuestionsAnswered}
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#F7F0E5] border border-[#E8D5C3]">
            <div className="text-[11px] font-semibold text-[#695650] uppercase tracking-wider">
              Top Score
            </div>
            <div className="text-xl font-bold text-[#C18A36] mt-0.5 tabular-nums">
              {stats.highestSingleScore} pts
            </div>
          </div>
        </div>

        {/* High Scores per Category */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#695650] flex items-center justify-between">
            <span>High Scores by Category</span>
            <span className="text-[11px] font-normal text-[#8C7971]">
              Saved locally
            </span>
          </h3>

          {scoreEntries.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-[#F7F0E5] border border-[#E8D5C3] text-sm text-[#695650] space-y-2">
              <Award className="w-8 h-8 text-[#C18A36] mx-auto opacity-70" />
              <p className="font-semibold text-[#281D1B]">No quest records yet</p>
              <p className="text-xs text-[#8C7971]">
                Launch a quiz session to set your personal benchmark in the Hall of Champions!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {scoreEntries.map(([key, record], index) => {
                const [cat, diff] = key.split('_');
                const isTop = index === 0;
                return (
                  <div
                    key={key}
                    className={`h-[60px] px-4 rounded-xl border flex items-center justify-between transition-colors ${
                      isTop
                        ? 'bg-[#F9EBD0]/60 border-[#C18A36]/40 shadow-2xs'
                        : 'bg-[#FFFCF7] border-[#E8D5C3]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isTop
                            ? 'bg-[#760F20] text-[#E1BC72]'
                            : 'bg-[#E8D5C3]/60 text-[#695650]'
                        }`}
                      >
                        {isTop ? <Crown className="w-3.5 h-3.5" /> : index + 1}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#281D1B] capitalize flex items-center gap-2">
                          <span>{cat.replace('-', ' ')}</span>
                          <span className="text-[11px] font-semibold text-[#760F20] uppercase bg-[#760F20]/10 px-2 py-0.5 rounded-md">
                            {diff}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#8C7971] flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(record.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-bold text-[#760F20] tabular-nums">
                        {record.score} pts
                      </div>
                      <div className="text-xs font-semibold text-[#237547] tabular-nums">
                        {record.accuracy}% accuracy
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-[#E8D5C3] flex items-center justify-between">
          {scoreEntries.length > 0 ? (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all high score records?')) {
                  onResetStats();
                }
              }}
              className="text-xs text-[#B42332] hover:text-[#760F20] transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Records</span>
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#760F20] hover:bg-[#570D18] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
