import React, { useEffect } from 'react';
import { Award, CheckCircle, Lock, Trophy, Sparkles, X, Flame, Zap, Target, Star } from 'lucide-react';
import { StoredStats } from '../utils/storage';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  progressText: string;
}

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: StoredStats;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  stats,
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

  const achievementsList: Achievement[] = [
    {
      id: 'first_quiz',
      title: 'First Step',
      description: 'Complete your first quiz game session.',
      icon: Trophy,
      unlocked: stats.gamesPlayed >= 1,
      progressText: `${Math.min(stats.gamesPlayed, 1)} / 1 game`,
    },
    {
      id: 'scholar',
      title: 'Active Scholar',
      description: 'Complete at least 5 quiz matches.',
      icon: Star,
      unlocked: stats.gamesPlayed >= 5,
      progressText: `${Math.min(stats.gamesPlayed, 5)} / 5 games`,
    },
    {
      id: 'high_scorer',
      title: 'High Caliber',
      description: 'Score 100 points or more in a single quiz session.',
      icon: Zap,
      unlocked: stats.highestSingleScore >= 100,
      progressText: `${stats.highestSingleScore} / 100 pts`,
    },
    {
      id: 'grandmaster',
      title: 'Grandmaster',
      description: 'Score 150 points or more in a single game session.',
      icon: Sparkles,
      unlocked: stats.highestSingleScore >= 150,
      progressText: `${stats.highestSingleScore} / 150 pts`,
    },
    {
      id: 'century_club',
      title: 'Century Club',
      description: 'Answer 50 or more questions in QuizQuest.',
      icon: Target,
      unlocked: stats.totalQuestionsAnswered >= 50,
      progressText: `${Math.min(stats.totalQuestionsAnswered, 50)} / 50 questions`,
    },
    {
      id: 'encyclopedia',
      title: 'Living Encyclopedia',
      description: 'Answer 100 or more questions across categories.',
      icon: Award,
      unlocked: stats.totalQuestionsAnswered >= 100,
      progressText: `${Math.min(stats.totalQuestionsAnswered, 100)} / 100 questions`,
    },
    {
      id: 'precision',
      title: 'Precision Thinker',
      description: 'Achieve at least 25 correct answers lifetime.',
      icon: Flame,
      unlocked: stats.totalCorrect >= 25,
      progressText: `${Math.min(stats.totalCorrect, 25)} / 25 correct`,
    },
    {
      id: 'mastermind',
      title: 'Mastermind',
      description: 'Answer 50 questions correctly lifetime.',
      icon: CheckCircle,
      unlocked: stats.totalCorrect >= 50,
      progressText: `${Math.min(stats.totalCorrect, 50)} / 50 correct`,
    },
  ];

  const unlockedCount = achievementsList.filter((a) => a.unlocked).length;
  const progressPercent = Math.round((unlockedCount / achievementsList.length) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[640px] rounded-[20px] bg-[#FFFCF7] border border-[#E8D5C3] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8D5C3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F9EBD0] border border-[#A87526]/30 flex items-center justify-center text-[#760F20]">
              <Award className="w-5 h-5 text-[#C18A36]" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-[#281D1B]">
                Quest Achievements
              </h2>
              <p className="text-xs text-[#695650] mt-0.5">
                Earn badges and conquer knowledge milestones
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8C7971] hover:text-[#281D1B] hover:bg-[#F2E7D8] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overall Progress Bar */}
        <div className="p-4 rounded-xl bg-[#F7F0E5] border border-[#E8D5C3] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#281D1B]">
              Milestones Completed: {unlockedCount} of {achievementsList.length}
            </span>
            <span className="font-bold text-[#760F20]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#E8D5C3] overflow-hidden">
            <div
              className="h-full bg-[#981B2B] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Achievement Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievementsList.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  item.unlocked
                    ? 'bg-[#FFFCF7] border-[#C18A36]/40 shadow-xs'
                    : 'bg-[#F2E7D8]/40 border-[#E8D5C3] opacity-75'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
                      item.unlocked
                        ? 'bg-[#F9EBD0] text-[#760F20] border border-[#C18A36]/40 shadow-xs'
                        : 'bg-[#E8D5C3]/50 text-[#8C7971]'
                    }`}
                  >
                    {item.unlocked ? (
                      <Icon className="w-5 h-5 text-[#C18A36]" />
                    ) : (
                      <Lock className="w-4 h-4 text-[#8C7971]" />
                    )}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-[#281D1B] truncate">
                        {item.title}
                      </span>
                      {item.unlocked && (
                        <CheckCircle className="w-3.5 h-3.5 text-[#237547] shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-[#695650] leading-snug line-clamp-2">
                      {item.description}
                    </p>
                    <div className="text-[11px] font-semibold text-[#8C7971] pt-0.5">
                      {item.progressText}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
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
