import React, { useState } from 'react';
import { Download, Play, Music, Heart, Share2, QrCode, Sparkles, Check, Film, Clock, Eye, ThumbsUp } from 'lucide-react';
import { MediaResult, MediaFormat } from '../types';

interface ResultCardProps {
  result: MediaResult;
  isFavorite: boolean;
  onToggleFavorite: (result: MediaResult) => void;
  onPreview: (result: MediaResult, format?: MediaFormat) => void;
  onDownload: (result: MediaResult, format: MediaFormat) => void;
  downloadingId: string | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  isFavorite,
  onToggleFavorite,
  onPreview,
  onDownload,
  downloadingId,
}) => {
  const [showQr, setShowQr] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(result.originalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'tiktok':
        return { label: 'تيك توك', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' };
      case 'twitter':
        return { label: 'تويتر / X', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' };
      case 'youtube':
        return { label: 'يوتيوب', color: 'bg-red-500/20 text-red-300 border-red-500/30' };
      case 'instagram':
        return { label: 'انستغرام', color: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30' };
      case 'facebook':
        return { label: 'فيسبوك', color: 'bg-pink-600/20 text-pink-200 border-pink-600/30' };
      case 'snapchat':
        return { label: 'سناب شات', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' };
      default:
        return { label: 'فيديو مباشر', color: 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30' };
    }
  };

  const badge = getPlatformBadge(result.platform);

  return (
    <div className="w-full my-8 relative rounded-3xl glass-panel-glow p-6 sm:p-8 border-pink-500/35 overflow-hidden transition-all animate-fade-in">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-pink-500/15">
        <div className="flex items-center gap-3">
          <img
            src={result.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
            alt={result.author?.name || 'صانع المحتوى'}
            className="w-12 h-12 rounded-2xl object-cover border border-pink-500/40 p-0.5"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
            }}
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-white">{result.author?.name || 'صانع المحتوى'}</h4>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.color}`}>
                {badge.label}
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono" dir="ltr">
              {result.author?.username || `@${result.platform}_creator`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(result)}
            className={`p-2.5 rounded-xl border transition-all ${
              isFavorite
                ? 'bg-pink-600/30 border-pink-500 text-pink-400'
                : 'glass-button-secondary text-zinc-400 hover:text-white'
            }`}
            title={isFavorite ? 'محفوظ في المفضلة' : 'حفظ في المفضلة'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-pink-500 text-pink-500' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl glass-button-secondary text-zinc-400 hover:text-white transition-all"
            title="نسخ رابط الفيديو"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setShowQr(!showQr)}
            className="p-2.5 rounded-xl glass-button-secondary text-zinc-400 hover:text-white transition-all"
            title="توليد رمز QR للتحميل بالهاتف"
          >
            <QrCode className="w-4 h-4 text-pink-400" />
          </button>
        </div>
      </div>

      {/* QR Code Popup */}
      {showQr && (
        <div className="my-4 p-4 rounded-2xl bg-black/80 border border-pink-500/30 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="text-right">
            <h5 className="text-sm font-bold text-white">امسح الرمز بكاميرا الهاتف للتحميل المباشر</h5>
            <p className="text-xs text-zinc-400 mt-1">
              يمكنك مسح الكود لمتابعة التحميل فوراً على جهاز آيفون أو أندرويد.
            </p>
          </div>
          <div className="p-2 bg-white rounded-xl shrink-0 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(result.formats[0]?.url || result.originalUrl)}`}
              alt="QR Code"
              className="w-24 h-24"
            />
          </div>
        </div>
      )}

      {/* Card Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-start">
        
        {/* Left/Thumbnail Preview */}
        <div className="md:col-span-5 relative group rounded-2xl overflow-hidden bg-black/60 border border-pink-500/25 aspect-video md:aspect-[4/3] flex items-center justify-center">
          <img
            src={result.thumbnail}
            alt={result.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Quick Play Trigger */}
          <button
            onClick={() => onPreview(result)}
            className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-pink-600/90 text-white flex items-center justify-center shadow-[0_0_25px_rgba(236,72,153,0.7)] group-hover:scale-110 transition-all cursor-pointer backdrop-blur-sm"
          >
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </button>

          {/* Duration Badge */}
          {result.duration && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-black/80 text-zinc-300 border border-white/10">
              <Clock className="w-3 h-3 text-pink-400" />
              <span>{result.duration}</span>
            </div>
          )}
        </div>

        {/* Right/Details & Download Options */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug line-clamp-2">
              {result.title}
            </h3>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mt-3 pt-3 border-t border-pink-500/10">
              {result.stats?.views && (
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-pink-400" />
                  <span>{result.stats.views} مشاهدة</span>
                </div>
              )}
              {result.stats?.likes && (
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5 text-rose-400" />
                  <span>{result.stats.likes} إعجاب</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>جاهز للتحميل المباشر</span>
              </div>
            </div>
          </div>

          {/* Formats Selection */}
          <div className="space-y-2.5 mt-4">
            <div className="text-xs font-bold text-zinc-300 flex items-center gap-2">
              <Film className="w-4 h-4 text-pink-400" />
              <span>صيغ التحميل المتاحة (فيديو وصوت):</span>
            </div>

            <div className="space-y-2">
              {result.formats.map((fmt) => {
                const isDownloading = downloadingId === fmt.id;
                return (
                  <div
                    key={fmt.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-black/40 border border-pink-500/20 hover:border-pink-500/40 transition-all group/item"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/25 flex items-center justify-center text-pink-400 shrink-0">
                        {fmt.isAudio ? <Music className="w-4 h-4" /> : <Film className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                          <span>{fmt.label}</span>
                          {fmt.noWatermark && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                              بدون لوقو
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-zinc-400 flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-pink-400 font-semibold">{fmt.quality}</span>
                          <span>·</span>
                          <span>{fmt.size || 'حجم تلقائي'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onPreview(result, fmt)}
                        className="px-3 py-1.5 rounded-xl glass-button-secondary text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1"
                        title="معاينة"
                      >
                        <Play className="w-3.5 h-3.5 text-pink-400" />
                        <span className="hidden sm:inline">تشغيل</span>
                      </button>

                      <button
                        onClick={() => onDownload(result, fmt)}
                        disabled={isDownloading}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isDownloading
                            ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
                            : 'glass-button-primary text-white shadow-[0_0_15px_rgba(236,72,153,0.35)]'
                        }`}
                      >
                        {isDownloading ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>جارٍ التحميل...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>تحميل</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
