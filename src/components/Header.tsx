import React from 'react';
import { Sparkles, Library, Film, Radio, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'downloader' | 'library' | 'platforms' | 'stats';
  setActiveTab: (tab: 'downloader' | 'library' | 'platforms' | 'stats') => void;
  libraryCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, libraryCount }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-pink-500/15 bg-[#050508]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('downloader')}>
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-600 via-pink-500 to-rose-400 p-[1px] shadow-[0_0_25px_rgba(236,72,153,0.5)]">
            <div className="w-full h-full bg-[#09080e] rounded-[15px] flex items-center justify-center">
              <Film className="w-6 h-6 text-pink-500 animate-pulse" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#09080e] shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-wider uppercase bg-gradient-to-r from-white via-pink-100 to-pink-500 bg-clip-text text-transparent font-['Plus_Jakarta_Sans']">
                VERSION
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-400 border border-pink-500/30">
                PRO 2026
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              المنصة الشاملة لتحميل الفيديوهات الحقيقية
            </p>
          </div>
        </div>

        {/* Center Nav Tabs */}
        <nav className="flex items-center gap-1 p-1.5 rounded-2xl bg-zinc-950/70 border border-pink-500/20 backdrop-blur-lg">
          <button
            onClick={() => setActiveTab('downloader')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'downloader'
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-[0_0_16px_rgba(236,72,153,0.45)]'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            <Zap className="w-4 h-4 text-pink-300" />
            <span>محرك التنزيل</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'library'
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-[0_0_16px_rgba(236,72,153,0.45)]'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            <Library className="w-4 h-4 text-pink-300" />
            <span>المكتبة</span>
            {libraryCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-bold rounded-full bg-pink-400 text-black">
                {libraryCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('platforms')}
            className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'platforms'
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-[0_0_16px_rgba(236,72,153,0.45)]'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-pink-300" />
            <span>المنصات (6)</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'stats'
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-[0_0_16px_rgba(236,72,153,0.45)]'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-pink-300" />
            <span>الإحصائيات</span>
          </button>
        </nav>

        {/* Right Info / Server Status */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-pink-950/30 border border-pink-500/20 text-xs text-zinc-300">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>السيرفر المباشر نشط</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 border border-zinc-800 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-pink-400" />
            <span>100% حقيقي ومجاني</span>
          </div>
        </div>

      </div>
    </header>
  );
};
