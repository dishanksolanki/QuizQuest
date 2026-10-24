import React from 'react';
import {
  Play,
  Trophy,
  Clock,
  ArrowRight,
  Globe,
  Atom,
  Cpu,
  Landmark,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
  Layers,
  HelpCircle,
  Flame,
  Zap,
  Target,
  Award,
  ShieldAlert,
  Gamepad2,
} from 'lucide-react';
import { CategoryId, DifficultyFilter, QuizSettings } from '../types';
import { CATEGORIES } from '../data/questions';
import { StoredStats } from '../utils/storage';

interface HomePageProps {
  settings: QuizSettings;
  onUpdateSettings: (settings: Partial<QuizSettings>) => void;
  onStartQuiz: () => void;
  onSelectCategoryAndPlay: (catId: CategoryId) => void;
  stats: StoredStats;
  highScores: Record<string, { score: number; accuracy: number; date: string }>;
  onOpenLeaderboard: () => void;
  searchQuery?: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  settings,
  onUpdateSettings,
  onStartQuiz,
  onSelectCategoryAndPlay,
  stats,
  highScores,
  onOpenLeaderboard,
  searchQuery = '',
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#760F20]" />;
      case 'Atom':
        return <Atom className="w-6 h-6 text-[#A87526]" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#760F20]" />;
      case 'Landmark':
        return <Landmark className="w-6 h-6 text-[#A87526]" />;
      default:
        return <HelpCircle className="w-6 h-6 text-[#760F20]" />;
    }
  };

  // Filter categories if user types into the topbar search
  const filteredCategories = CATEGORIES.filter((cat) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.tagline.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 6. HOMEPAGE HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 min-h-[380px] flex items-center">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F4DDA8]/30 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* Left Column (55% width approx) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 h-8 px-3.5 rounded-full bg-[#F9EBD0] border border-[#A87526]/25 text-[#760F20] text-[11px] font-bold uppercase tracking-wider shadow-2xs">
              <Gamepad2 className="w-3.5 h-3.5 text-[#A87526]" />
              <span>THE ULTIMATE QUIZ EXPERIENCE</span>
            </div>

            {/* Hero Heading: Two-line composition with Playfair Display */}
            <div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-bold text-[#281D1B] leading-[1.05] tracking-tight">
                Welcome to <br />
                <span className="text-[#760F20]">QuizQuest!</span>
              </h1>
              {/* Short Gold Underline (90px x 3px) per spec Section 6 */}
              <div className="w-[90px] h-[3px] bg-[#C18A36] rounded-full mt-4" />
            </div>

            {/* Hero Description */}
            <p className="font-body text-[#695650] text-base leading-[1.7] max-w-[480px]">
              Test your knowledge, challenge your mind, and become the ultimate quiz champion!
              Explore 60 questions curated across 4 distinctive realms.
            </p>

            {/* Hero Buttons: Primary & Secondary */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => {
                  const configEl = document.getElementById('quiz-config');
                  if (configEl) {
                    configEl.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onStartQuiz();
                  }
                }}
                className="h-[52px] min-w-[190px] px-6 rounded-[14px] bg-[#760F20] hover:bg-[#570D18] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_6px_16px_rgba(87,13,24,0.15)] transition-all duration-180 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Playing</span>
              </button>

              <button
                type="button"
                onClick={onOpenLeaderboard}
                className="h-[52px] px-5 rounded-[14px] bg-transparent border border-[#981B2B] text-[#760F20] hover:bg-[#F9EBD0] text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-180 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-[#C18A36]" />
                <span>View Leaderboard</span>
              </button>
            </div>

            {/* Quick Metrics Strip */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#E8D5C3] max-w-lg">
              <div className="p-3 rounded-xl bg-[#FFFCF7] border border-[#E8D5C3]">
                <div className="text-[11px] font-semibold text-[#695650] uppercase tracking-wider">
                  Questions
                </div>
                <div className="text-lg sm:text-xl font-bold text-[#281D1B] tabular-nums mt-0.5">
                  60 Curated
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#FFFCF7] border border-[#E8D5C3]">
                <div className="text-[11px] font-semibold text-[#695650] uppercase tracking-wider">
                  Domains
                </div>
                <div className="text-lg sm:text-xl font-bold text-[#760F20] tabular-nums mt-0.5">
                  4 Realms
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#FFFCF7] border border-[#E8D5C3]">
                <div className="text-[11px] font-semibold text-[#695650] uppercase tracking-wider">
                  Best Score
                </div>
                <div className="text-lg sm:text-xl font-bold text-[#C18A36] tabular-nums mt-0.5 font-mono">
                  {stats.highestSingleScore > 0 ? `${stats.highestSingleScore} pts` : '0 pts'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Trophy & Visual Card (45% width approx) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[420px] rounded-[22px] bg-[#FFFCF7] border border-[#E8D5C3] p-7 shadow-[0_8px_24px_rgba(58,8,16,0.06)] relative overflow-hidden space-y-6">
              {/* Subtle top burgundy ribbon accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#760F20] via-[#C18A36] to-[#760F20]" />

              {/* Trophy Emblem Centerpiece */}
              <div className="text-center space-y-3 pt-2">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-[#F9EBD0] border-2 border-[#E1BC72] flex items-center justify-center text-[#760F20] shadow-[0_8px_20px_rgba(193,138,54,0.18)]">
                  <Trophy className="w-10 h-10 text-[#C18A36]" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#281D1B]">
                    Championship Arena
                  </h3>
                  <p className="text-xs text-[#695650]">
                    Earn points, test speed, and climb to the top
                  </p>
                </div>
              </div>

              {/* Live Preview Sample Card */}
              <div className="p-4 rounded-xl bg-[#F7F0E5] border border-[#E8D5C3] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#760F20] uppercase tracking-wider text-[10px]">
                    Current Session
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#E1BC72]/20 text-[#3A0810] font-bold text-[10px]">
                    Adaptive Scoring
                  </span>
                </div>
                <p className="font-medium text-[#281D1B] leading-snug">
                  Easy (10 pts) · Medium (15 pts) · Hard (20 pts)
                </p>
                <div className="text-[11px] text-[#695650] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#981B2B]" />
                  <span>Streak Multipliers up to +15 bonus points!</span>
                </div>
              </div>

              {/* Quick Launch CTA */}
              <button
                type="button"
                onClick={() => {
                  const configEl = document.getElementById('quiz-config');
                  if (configEl) configEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full h-11 rounded-xl bg-[#760F20] hover:bg-[#570D18] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Configure & Play</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CATEGORY SECTION */}
      <section id="categories" className="space-y-6 pt-4 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E8D5C3] pb-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-[#281D1B]">
              Explore Categories
            </h2>
            <p className="text-sm text-[#695650] mt-1">
              Select any domain below to jump directly into questions or configure your settings.
            </p>
          </div>
          {searchQuery && (
            <div className="text-xs font-semibold text-[#760F20] bg-[#F9EBD0] px-3 py-1 rounded-lg self-start">
              Filtered by "{searchQuery}" ({filteredCategories.length} results)
            </div>
          )}
        </div>

        {filteredCategories.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#FFFCF7] border border-[#E8D5C3] text-[#695650]">
            <p className="font-medium text-base text-[#281D1B]">No categories match your search.</p>
            <p className="text-xs text-[#8C7971] mt-1">Try searching for Science, Tech, History, or General.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredCategories.map((cat) => {
              const isSelected = settings.category === cat.id;
              return (
                <div
                  key={cat.id}
                  className={`group relative rounded-[16px] bg-[#FFFCF7] border p-5 transition-all duration-180 hover:-translate-y-1 hover:shadow-[0_8px_22px_rgba(58,8,16,0.09)] flex flex-col justify-between min-h-[160px] ${
                    isSelected
                      ? 'border-[#981B2B] shadow-[0_4px_16px_rgba(152,27,43,0.12)]'
                      : 'border-[#E8D5C3] shadow-[0_4px_12px_rgba(58,8,16,0.04)]'
                  }`}
                >
                  {/* Subtle top edge accent */}
                  <div className="w-10 h-1 bg-[#C18A36]/60 rounded-full mb-3" />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#F9EBD0] flex items-center justify-center">
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      <span className="text-xs font-semibold text-[#760F20] bg-[#760F20]/10 px-2.5 py-0.5 rounded-full">
                        15 Questions
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-[#281D1B] group-hover:text-[#760F20] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-[#695650] leading-relaxed mt-1">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-[#EFE2D5] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onSelectCategoryAndPlay(cat.id)}
                      className="text-xs font-bold text-[#760F20] hover:text-[#570D18] flex items-center gap-1.5 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Play Realm</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateSettings({ category: cat.id });
                        const el = document.getElementById('quiz-config');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[11px] text-[#8C7971] hover:text-[#281D1B] cursor-pointer"
                    >
                      Configure
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 8. FEATURE CARDS SECTION */}
      <section className="space-y-6 pt-4">
        <div>
          <h2 className="font-display text-3xl font-bold text-[#281D1B]">
            Why Play QuizQuest?
          </h2>
          <p className="text-sm text-[#695650] mt-1">
            Engineered for genuine learning, focused competition, and responsive feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="rounded-[16px] bg-[#FFFCF7] border border-[#E8D5C3] p-5 shadow-[0_4px_12px_rgba(58,8,16,0.03)] space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#F9EBD0] flex items-center justify-center text-[#760F20]">
              <Zap className="w-5 h-5 text-[#C18A36]" />
            </div>
            <h3 className="font-bold text-base text-[#281D1B]">Fast & Fun Gameplay</h3>
            <p className="text-xs text-[#695650] leading-relaxed">
              Crisp instant feedback, audio chimes, and smooth transitions keep your momentum alive.
            </p>
          </div>

          <div className="rounded-[16px] bg-[#FFFCF7] border border-[#E8D5C3] p-5 shadow-[0_4px_12px_rgba(58,8,16,0.03)] space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#F9EBD0] flex items-center justify-center text-[#760F20]">
              <Target className="w-5 h-5 text-[#760F20]" />
            </div>
            <h3 className="font-bold text-base text-[#281D1B]">Track Your Progress</h3>
            <p className="text-xs text-[#695650] leading-relaxed">
              Detailed statistics, accuracy tracking, and performance breakdowns after every match.
            </p>
          </div>

          <div className="rounded-[16px] bg-[#FFFCF7] border border-[#E8D5C3] p-5 shadow-[0_4px_12px_rgba(58,8,16,0.03)] space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#F9EBD0] flex items-center justify-center text-[#760F20]">
              <Award className="w-5 h-5 text-[#C18A36]" />
            </div>
            <h3 className="font-bold text-base text-[#281D1B]">Earn Achievements</h3>
            <p className="text-xs text-[#695650] leading-relaxed">
              Unlock badges for high streaks, perfect scores, and answering hundreds of trivia questions.
            </p>
          </div>

          <div className="rounded-[16px] bg-[#FFFCF7] border border-[#E8D5C3] p-5 shadow-[0_4px_12px_rgba(58,8,16,0.03)] space-y-2">
            <div className="w-9 h-9 rounded-xl bg-[#F9EBD0] flex items-center justify-center text-[#760F20]">
              <Clock className="w-5 h-5 text-[#760F20]" />
            </div>
            <h3 className="font-bold text-base text-[#281D1B]">Custom Difficulty</h3>
            <p className="text-xs text-[#695650] leading-relaxed">
              Tailor each round by difficulty tier, question pool count, and flexible countdown timers.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="rounded-[18px] bg-[#570D18] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 text-[#E1BC72] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for the Arena?</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-sm text-[#E8D5C3] leading-relaxed">
            Jump into a quiz and challenge yourself across 60 original questions designed to test your recall and reasoning.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('quiz-config');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="h-[46px] px-6 rounded-xl bg-[#E1BC72] hover:bg-[#F4DDA8] text-[#3A0810] text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <span>Configure Your Match</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. QUIZ CONFIGURATION SCREEN / SECTION */}
      <section id="quiz-config" className="scroll-mt-24">
        <div className="max-w-[760px] mx-auto rounded-[20px] bg-[#FFFCF7] border border-[#E8D5C3] p-6 sm:p-8 shadow-[0_8px_28px_rgba(58,8,16,0.05)] space-y-8">
          {/* Header */}
          <div className="space-y-1.5 border-b border-[#E8D5C3] pb-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#760F20]">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Session Preferences</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#281D1B]">
              Customize Your Quest
            </h2>
            <p className="text-xs sm:text-sm text-[#695650]">
              Select your category, challenge level, and question volume to start.
            </p>
          </div>

          <div className="space-y-6">
            {/* 1. Category Selection */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-semibold text-[#281D1B] block">
                Choose Realm / Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ category: 'all' })}
                  className={`h-11 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                    settings.category === 'all'
                      ? 'bg-[#F9EBD0] border-[#981B2B] text-[#760F20] shadow-xs'
                      : 'bg-white border-[#E8D5C3] text-[#695650] hover:bg-[#F7F0E5]'
                  }`}
                >
                  All Realms (Mix)
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onUpdateSettings({ category: c.id })}
                    className={`h-11 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                      settings.category === c.id
                        ? 'bg-[#F9EBD0] border-[#981B2B] text-[#760F20] shadow-xs'
                        : 'bg-white border-[#E8D5C3] text-[#695650] hover:bg-[#F7F0E5]'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Difficulty Selection */}
            <div className="space-y-2.5">
              <label className="text-[13px] font-semibold text-[#281D1B] block">
                Difficulty Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['all', 'easy', 'medium', 'hard'] as DifficultyFilter[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => onUpdateSettings({ difficulty: d })}
                    className={`h-11 px-3 rounded-xl border text-xs font-semibold capitalize flex items-center justify-center transition-all cursor-pointer ${
                      settings.difficulty === d
                        ? 'bg-[#F9EBD0] border-[#981B2B] text-[#760F20] shadow-xs'
                        : 'bg-white border-[#E8D5C3] text-[#695650] hover:bg-[#F7F0E5]'
                    }`}
                  >
                    {d === 'all' ? 'All Difficulties' : `${d} Tier`}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Question Count & Timer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2.5">
                <label className="text-[13px] font-semibold text-[#281D1B] block">
                  Question Count
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[5, 10, 15].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => onUpdateSettings({ questionCount: cnt })}
                      className={`h-11 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        settings.questionCount === cnt
                          ? 'bg-[#F9EBD0] border-[#981B2B] text-[#760F20] shadow-xs'
                          : 'bg-white border-[#E8D5C3] text-[#695650] hover:bg-[#F7F0E5]'
                      }`}
                    >
                      {cnt} Qs
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-[13px] font-semibold text-[#281D1B] block">
                  Countdown Timer
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ timerEnabled: true, timerSeconds: 15 })}
                    className={`h-11 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      settings.timerEnabled
                        ? 'bg-[#F9EBD0] border-[#981B2B] text-[#760F20] shadow-xs'
                        : 'bg-white border-[#E8D5C3] text-[#695650] hover:bg-[#F7F0E5]'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Timed (15s)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ timerEnabled: false })}
                    className={`h-11 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      !settings.timerEnabled
                        ? 'bg-[#F9EBD0] border-[#981B2B] text-[#760F20] shadow-xs'
                        : 'bg-white border-[#E8D5C3] text-[#695650] hover:bg-[#F7F0E5]'
                    }`}
                  >
                    Untimed
                  </button>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-4 border-t border-[#E8D5C3]">
              <button
                type="button"
                onClick={onStartQuiz}
                className="w-full h-[52px] rounded-xl bg-[#760F20] hover:bg-[#570D18] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(87,13,24,0.15)] transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch QuizQuest Arena</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO PLAY SECTION */}
      <section id="how-to-play" className="scroll-mt-24 pt-4">
        <div className="max-w-[760px] mx-auto rounded-[20px] bg-[#FFFCF7] border border-[#E8D5C3] p-6 sm:p-8 space-y-4">
          <h2 className="font-display text-2xl font-bold text-[#281D1B]">
            How to Play QuizQuest
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#F7F0E5] border border-[#E8D5C3] space-y-1.5">
              <div className="font-bold text-sm text-[#760F20]">1. Choose & Configure</div>
              <p className="text-xs text-[#695650]">
                Select a single category or test yourself on an all-category mix.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#F7F0E5] border border-[#E8D5C3] space-y-1.5">
              <div className="font-bold text-sm text-[#760F20]">2. Answer with Speed</div>
              <p className="text-xs text-[#695650]">
                Lock your answers before time runs out. Chain consecutive correct answers for streaks.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#F7F0E5] border border-[#E8D5C3] space-y-1.5">
              <div className="font-bold text-sm text-[#760F20]">3. Review & Level Up</div>
              <p className="text-xs text-[#695650]">
                Study complete answer explanations and unlock milestones in the Hall of Champions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
