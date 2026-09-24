import React, { useState } from 'react';
import { Download, Clipboard, X, Sparkles, Loader2, PlayCircle, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Platform } from '../types';

interface DownloaderSectionProps {
  onExtract: (url: string) => void;
  isLoading: boolean;
  selectedPlatform: Platform;
  setSelectedPlatform: (p: Platform) => void;
  inputUrl: string;
  setInputUrl: (url: string) => void;
  errorMessage: string | null;
}

export const sampleLinks: { label: string; platform: Platform; url: string; badge: string }[] = [
  {
    label: 'تيك توك تريند 🎵',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@tiktok/video/7106594312292453678',
    badge: 'بدون علامة مائية',
  },
  {
    label: 'تويتر / X فضاء 𝕏',
    platform: 'twitter',
    url: 'https://twitter.com/NASA/status/1679156475868676097',
    badge: '1080p HD',
  },
  {
    label: 'يوتيوب شورتس ▶',
    platform: 'youtube',
    url: 'https://www.youtube.com/shorts/3i_b7X9Uo_Q',
    badge: 'فيديو وصوت MP3',
  },
  {
    label: 'انستغرام ريلز 📸',
    platform: 'instagram',
    url: 'https://www.instagram.com/reel/Cx18e1NIL7T/',
    badge: 'ريلز عالي الدقة',
  },
  {
    label: 'فيسبوك فيديو 👥',
    platform: 'facebook',
    url: 'https://www.facebook.com/watch/?v=10153231379946729',
    badge: 'HD Watch',
  },
  {
    label: 'سناب شات سبوتلايت 👻',
    platform: 'snapchat',
    url: 'https://story.snapchat.com/p/spotlight-sample',
    badge: 'سبوت لايت أصلي',
  },
];

export const DownloaderSection: React.FC<DownloaderSectionProps> = ({
  onExtract,
  isLoading,
  selectedPlatform,
  setSelectedPlatform,
  inputUrl,
  setInputUrl,
  errorMessage,
}) => {
  const [pasteSuccess, setPasteSuccess] = useState(false);

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setInputUrl(text);
          setPasteSuccess(true);
          setTimeout(() => setPasteSuccess(false), 2000);
        }
      }
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    onExtract(inputUrl.trim());
  };

  const handleQuickSelect = (sample: typeof sampleLinks[0]) => {
    setInputUrl(sample.url);
    setSelectedPlatform(sample.platform);
    onExtract(sample.url);
  };

  return (
    <div className="w-full relative">
      {/* Hero Title & Glass Tag */}
      <div className="text-center max-w-3xl mx-auto pt-6 pb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-bold mb-6 shadow-[0_0_20px_rgba(236,72,153,0.25)] animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>الجيل الجديد من منصة VERSION لتحميل الوسائط فائقة الدقة</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.2] mb-5">
          حمّل أي مقطع فيديو <br />
          <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-600 bg-clip-text text-transparent">
            بجودة حقيقية وبدون علامة مائية
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          محرك فائق السرعة يدعم تنزيل الفيديوهات والصوتيات من تيك توك، تويتر، يوتيوب، سناب شات، انستغرام، وفيسبوك بضغطة زر واحدة.
        </p>
      </div>

      {/* Main Glass Downloader Card */}
      <div className="max-w-4xl mx-auto relative rounded-3xl glass-panel-glow p-6 sm:p-10 border-pink-500/30 shadow-[0_20px_70px_rgba(0,0,0,0.8),0_0_35px_rgba(236,72,153,0.18)]">
        
        {/* Glowing border line */}
        <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent" />

        {/* Platform Selector Filter Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedPlatform('auto')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedPlatform === 'auto'
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                : 'glass-button-secondary text-zinc-400 hover:text-white'
            }`}
          >
            ⚡ كشف تلقائي شامل
          </button>

          <button
            type="button"
            onClick={() => setSelectedPlatform('tiktok')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedPlatform === 'tiktok'
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                : 'glass-button-secondary text-zinc-400 hover:text-white'
            }`}
          >
            🎵 تيك توك
          </button>

          <button
            type="button"
            onClick={() => setSelectedPlatform('twitter')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedPlatform === 'twitter'
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                : 'glass-button-secondary text-zinc-400 hover:text-white'
            }`}
          >
            𝕏 تويتر
          </button>

          <button
            type="button"
            onClick={() => setSelectedPlatform('youtube')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedPlatform === 'youtube'
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                : 'glass-button-secondary text-zinc-400 hover:text-white'
            }`}
          >
            ▶ يوتيوب
          </button>

          <button
            type="button"
            onClick={() => setSelectedPlatform('instagram')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedPlatform === 'instagram'
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                : 'glass-button-secondary text-zinc-400 hover:text-white'
            }`}
          >
            📸 انستغرام
          </button>

          <button
            type="button"
            onClick={() => setSelectedPlatform('facebook')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedPlatform === 'facebook'
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                : 'glass-button-secondary text-zinc-400 hover:text-white'
            }`}
          >
            👥 فيسبوك
          </button>

          <button
            type="button"
            onClick={() => setSelectedPlatform('snapchat')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedPlatform === 'snapchat'
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                : 'glass-button-secondary text-zinc-400 hover:text-white'
            }`}
          >
            👻 سناب شات
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl glass-input bg-[#09070f]/90 border-pink-500/30">
            <div className="relative flex-1 w-full flex items-center">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="ألصق رابط الفيديو من تيك توك، تويتر، يوتيوب، سناب، انستا، أو فيسبوك..."
                className="w-full bg-transparent px-4 py-3 text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
                dir="ltr"
              />

              {inputUrl && (
                <button
                  type="button"
                  onClick={() => setInputUrl('')}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={handlePaste}
                className="px-4 py-3 rounded-xl glass-button-secondary text-xs font-bold text-pink-300 hover:text-white flex items-center justify-center gap-1.5 w-1/3 sm:w-auto"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>{pasteSuccess ? 'تم اللصق!' : 'لصق'}</span>
              </button>

              <button
                type="submit"
                disabled={isLoading || !inputUrl.trim()}
                className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 w-2/3 sm:w-auto transition-all ${
                  isLoading || !inputUrl.trim()
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'glass-button-primary text-white shadow-[0_0_25px_rgba(236,72,153,0.5)]'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جارٍ الاستخراج والتحليل...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>تحميل الآن</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 text-right flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>

        {/* Quick Test Links Section (Very useful for direct verification) */}
        <div className="mt-6 pt-6 border-t border-pink-500/15">
          <div className="flex items-center justify-between mb-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 font-bold text-zinc-300">
              <Zap className="w-3.5 h-3.5 text-pink-400" />
              <span>جرب روابط حقيقية جاهزة بنقرة واحدة:</span>
            </span>
            <span className="text-[11px] text-zinc-500 hidden sm:inline">اختر أي رابط للتجربة الفورية</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {sampleLinks.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickSelect(sample)}
                className="px-3 py-1.5 rounded-xl glass-button-secondary text-xs text-zinc-300 hover:text-white hover:border-pink-500/50 flex items-center gap-2 transition-all group"
              >
                <span className="font-medium group-hover:text-pink-300">{sample.label}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono">
                  {sample.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-pink-500/15">
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>بدون علامة مائية أصلية</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
            <span>استخراج الصوت MP3 نقي</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
            <span>دقة عالية 1080p و 4K</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span>سريع وآمن 100% بدون حدود</span>
          </div>
        </div>

      </div>
    </div>
  );
};
