import React from 'react';
import {
  Crown,
  Home,
  Play,
  Layers,
  Trophy,
  Award,
  HelpCircle,
  Volume2,
  VolumeX,
  X,
  Sparkles,
} from 'lucide-react';
import { StoredStats } from '../utils/storage';

interface SidebarProps {
  currentScreen: 'HOME' | 'QUIZ' | 'RESULTS';
  activeNav: string;
  onNavigateHome: () => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenLeaderboard: () => void;
  onOpenAchievements: () => void;
  stats: StoredStats;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  activeNav,
  onNavigateHome,
  onScrollToSection,
  onOpenLeaderboard,
  onOpenAchievements,
  stats,
  soundEnabled,
  onToggleSound,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      action: () => {
        onNavigateHome();
        onCloseMobile();
      },
      isActive: activeNav === 'home' && currentScreen === 'HOME',
    },
    {
      id: 'play',
      label: 'Play Quiz',
      icon: Play,
      action: () => {
        onScrollToSection('quiz-config');
        onCloseMobile();
      },
      isActive: currentScreen === 'QUIZ' || activeNav === 'play',
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: Layers,
      action: () => {
        onScrollToSection('categories');
        onCloseMobile();
      },
      isActive: activeNav === 'categories',
    },
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      icon: Trophy,
      action: () => {
        onOpenLeaderboard();
        onCloseMobile();
      },
      isActive: false,
    },
    {
      id: 'achievements',
      label: 'Achievements',
      icon: Award,
      action: () => {
        onOpenAchievements();
        onCloseMobile();
      },
      isActive: false,
    },
    {
      id: 'how-to-play',
      label: 'How to Play',
      icon: HelpCircle,
      action: () => {
        onScrollToSection('how-to-play');
        onCloseMobile();
      },
      isActive: activeNav === 'how-to-play',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[210px] min-w-[210px] bg-[#570D18] text-[#E8D5C3] flex flex-col justify-between p-4 transition-transform duration-200 ease-out border-r border-[#3A0810] lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Area (Height ~112px) */}
          <div className="h-[100px] flex flex-col justify-center border-b border-[#760F20]/60 relative pb-2">
            <button
              onClick={() => {
                onNavigateHome();
                onCloseMobile();
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-[#760F20] border border-[#E1BC72]/40 flex items-center justify-center text-[#E1BC72] shadow-sm shadow-black/40 group-hover:bg-[#981B2B] transition-colors">
                <Crown className="w-4 h-4 fill-current" />
              </div>
              <div>
                <span className="font-display text-[25px] font-bold tracking-tight text-[#F7F0E5] leading-none block">
                  Quiz<span className="text-[#E1BC72]">Quest</span>
                </span>
                <span className="text-[9.5px] font-semibold tracking-widest text-[#E1BC72] uppercase block mt-1">
                  THINK · ANSWER · WIN
                </span>
              </div>
            </button>

            {/* Close button for mobile */}
            <button
              onClick={onCloseMobile}
              className="absolute top-2 right-0 p-1.5 text-[#E8D5C3] hover:text-white lg:hidden cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="mt-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`w-full h-12 px-3.5 rounded-xl flex items-center gap-3 text-sm font-medium transition-all duration-150 cursor-pointer ${
                    item.isActive
                      ? 'bg-[#981B2B] text-white border border-[#F4DDA8]/20 shadow-sm'
                      : 'text-[#E8D5C3] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      item.isActive ? 'text-white' : 'text-[#D7BCA5]'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Achievement / Player Progress Card */}
        <div className="pt-3 border-t border-[#760F20]/60 space-y-3">
          <div className="p-3 rounded-xl bg-[#3A0810]/70 border border-[#A87526]/30 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-[#E1BC72]">
              <span className="font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Player Rank</span>
              </span>
              <span className="font-bold tabular-nums">
                {stats.highestSingleScore > 0 ? `${stats.highestSingleScore} pts` : 'Novice'}
              </span>
            </div>
            <p className="text-[11px] text-[#D7BCA5] leading-snug">
              {stats.totalQuestionsAnswered} answered · {stats.gamesPlayed} completed
            </p>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#E8D5C3] hover:text-white border border-white/10 flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[#E1BC72]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span>Sound Effects</span>
            </span>
            <span className="text-[10px] uppercase font-semibold text-[#E1BC72]">
              {soundEnabled ? 'ON' : 'MUTE'}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};
