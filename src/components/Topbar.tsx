import React from 'react';
import { Search, Volume2, VolumeX, Menu, Play, LogOut, Award, Trophy } from 'lucide-react';

interface TopbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenMobileMenu: () => void;
  currentScreen: 'HOME' | 'QUIZ' | 'RESULTS';
  onNavigateHome: () => void;
  onStartQuiz: () => void;
  onOpenLeaderboard: () => void;
  onOpenAchievements: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  searchQuery,
  onSearchChange,
  soundEnabled,
  onToggleSound,
  onOpenMobileMenu,
  currentScreen,
  onNavigateHome,
  onStartQuiz,
  onOpenLeaderboard,
  onOpenAchievements,
}) => {
  return (
    <header className="sticky top-0 z-30 h-[76px] bg-[#FFFCF7]/95 backdrop-blur-md border-b border-[#E8D5C3] px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-colors">
      {/* Left: Mobile hamburger & Search Field */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 -ml-1 text-[#570D18] hover:bg-[#F2E7D8] rounded-xl lg:hidden cursor-pointer transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* 380px Search field per spec Section 5 */}
        <div className="relative w-full max-w-[380px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#8C7971] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search categories, topics..."
            className="w-full h-[44px] pl-11 pr-4 rounded-[24px] bg-[#FFFCF7] border border-[#E8D5C3] text-[14px] text-[#281D1B] placeholder-[#8C7971] focus:outline-none focus:border-[#A87526] focus:ring-3 focus:ring-[#C18A36]/15 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8C7971] hover:text-[#281D1B] cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Right Action Icons & Primary CTA */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Quick Nav Badges for Tablet/Desktop */}
        <div className="hidden md:flex items-center gap-1.5 mr-1">
          <button
            onClick={onOpenLeaderboard}
            className="px-3 py-1.5 text-xs font-medium text-[#695650] hover:text-[#570D18] hover:bg-[#F2E7D8]/60 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            title="View Leaderboard"
          >
            <Trophy className="w-3.5 h-3.5 text-[#C18A36]" />
            <span>Leaderboard</span>
          </button>
          <button
            onClick={onOpenAchievements}
            className="px-3 py-1.5 text-xs font-medium text-[#695650] hover:text-[#570D18] hover:bg-[#F2E7D8]/60 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            title="View Achievements"
          >
            <Award className="w-3.5 h-3.5 text-[#760F20]" />
            <span>Achievements</span>
          </button>
        </div>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          className="w-10 h-10 rounded-xl border border-[#E8D5C3] bg-[#FFFCF7] hover:bg-[#F2E7D8] text-[#695650] hover:text-[#570D18] flex items-center justify-center transition-colors cursor-pointer"
          title={soundEnabled ? 'Sound is Enabled' : 'Sound is Muted'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-[#760F20]" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#8C7971]" />
          )}
        </button>

        {/* Screen Context CTA Button */}
        {currentScreen === 'HOME' ? (
          <button
            onClick={() => {
              const el = document.getElementById('quiz-config');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                onStartQuiz();
              }
            }}
            className="h-[44px] px-4 sm:px-5 rounded-xl bg-[#760F20] hover:bg-[#570D18] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span className="hidden sm:inline">Start Playing</span>
            <span className="sm:hidden">Play</span>
          </button>
        ) : currentScreen === 'QUIZ' ? (
          <button
            onClick={onNavigateHome}
            className="h-[44px] px-3.5 sm:px-4 rounded-xl border border-[#981B2B] bg-transparent hover:bg-[#F9EBD0] text-[#760F20] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Exit Quiz</span>
          </button>
        ) : (
          <button
            onClick={onNavigateHome}
            className="h-[44px] px-4 sm:px-5 rounded-xl bg-[#760F20] hover:bg-[#570D18] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Home</span>
          </button>
        )}
      </div>
    </header>
  );
};
