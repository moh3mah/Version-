import React, { useState, useMemo } from 'react';
import { Library, Search, Trash2, Play, Download, Heart, Filter, Film, Music, ArrowDownToLine, HardDrive, Share2, Sparkles } from 'lucide-react';
import { LibraryItem, MediaResult, MediaFormat, Platform } from '../types';

interface LibrarySectionProps {
  items: LibraryItem[];
  onToggleFavorite: (result: MediaResult) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
  onPreview: (result: MediaResult, format?: MediaFormat) => void;
  onDownload: (result: MediaResult, format: MediaFormat) => void;
}

export const LibrarySection: React.FC<LibrarySectionProps> = ({
  items,
  onToggleFavorite,
  onDeleteItem,
  onClearAll,
  onPreview,
  onDownload,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<Platform | 'all' | 'favorites'>('all');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const title = item.title || '';
      const authorName = item.author?.name || '';
      const username = item.author?.username || '';
      const matchSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        username.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (platformFilter === 'favorites') return item.isFavorite;
      if (platformFilter !== 'all') return item.platform === platformFilter;

      return true;
    });
  }, [items, searchQuery, platformFilter]);

  const stats = useMemo(() => {
    const totalDownloads = items.reduce((acc, curr) => acc + (curr.downloadCount || 1), 0);
    const favoritesCount = items.filter((i) => i.isFavorite).length;
    return {
      total: items.length,
      totalDownloads,
      favoritesCount,
    };
  }, [items]);

  return (
    <section className="py-8 animate-fade-in">
      {/* Library Top Header & Stats */}
      <div className="rounded-3xl glass-panel-glow p-6 sm:p-8 border-pink-500/25 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-pink-500/15">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-400 p-[1px] shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              <div className="w-full h-full bg-[#0b0811] rounded-[15px] flex items-center justify-center">
                <Library className="w-7 h-7 text-pink-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white">مكتبة الوسائط والتنزيلات</h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  {items.length} ملف
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                سجل الفيديوهات المحفوظة والمحمّلة محلياً بجودة عالية مع مشغل زجاجي فوري.
              </p>
            </div>
          </div>

          {items.length > 0 && (
            <button
              onClick={onClearAll}
              className="px-4 py-2 rounded-xl glass-button-secondary text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 flex items-center gap-1.5 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>مسح كل المكتبة</span>
            </button>
          )}
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
          <div className="p-4 rounded-2xl bg-black/40 border border-pink-500/15">
            <div className="text-xs text-zinc-400 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-pink-400" />
              <span>إجمالي المقاطع المحفوظة</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white mt-1 font-['Plus_Jakarta_Sans']">
              {stats.total}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-pink-500/15">
            <div className="text-xs text-zinc-400 flex items-center gap-1.5">
              <ArrowDownToLine className="w-3.5 h-3.5 text-emerald-400" />
              <span>عدد مرات التحميل</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white mt-1 font-['Plus_Jakarta_Sans']">
              {stats.totalDownloads}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-black/40 border border-pink-500/15">
            <div className="text-xs text-zinc-400 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>المقاطع المفضلة</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white mt-1 font-['Plus_Jakarta_Sans']">
              {stats.favoritesCount}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالعنوان أو اسم الصانع..."
            className="w-full pl-4 pr-10 py-2.5 rounded-2xl glass-input text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute right-3.5 top-3" />
        </div>

        {/* Platform Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 md:pb-0">
          <button
            onClick={() => setPlatformFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              platformFilter === 'all'
                ? 'bg-pink-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.4)]'
                : 'glass-button-secondary text-zinc-400 hover:text-white'
            }`}
          >
            الكل ({items.length})
          </button>

          <button
            onClick={() => setPlatformFilter('favorites')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1 transition-all ${
              platformFilter === 'favorites'
                ? 'bg-rose-600 text-white shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                : 'glass-button-secondary text-zinc-400 hover:text-white'
            }`}
          >
            <Heart className="w-3 h-3 fill-current" />
            <span>المفضلة</span>
          </button>

          <button
            onClick={() => setPlatformFilter('tiktok')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              platformFilter === 'tiktok'
                ? 'bg-pink-600 text-white'
                : 'glass-button-secondary text-zinc-400 hover:text-white'
            }`}
          >
            تيك توك
          </button>

          <button
            onClick={() => setPlatformFilter('twitter')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              platformFilter === 'twitter'
                ? 'bg-pink-600 text-white'
                : 'glass-button-secondary text-zinc-400 hover:text-white'
            }`}
          >
            تويتر / X
          </button>

          <button
            onClick={() => setPlatformFilter('youtube')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              platformFilter === 'youtube'
                ? 'bg-pink-600 text-white'
                : 'glass-button-secondary text-zinc-400 hover:text-white'
            }`}
          >
            يوتيوب
          </button>

          <button
            onClick={() => setPlatformFilter('instagram')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              platformFilter === 'instagram'
                ? 'bg-pink-600 text-white'
                : 'glass-button-secondary text-zinc-400 hover:text-white'
            }`}
          >
            انستغرام
          </button>

          <button
            onClick={() => setPlatformFilter('facebook')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              platformFilter === 'facebook'
                ? 'bg-pink-600 text-white'
                : 'glass-button-secondary text-zinc-400 hover:text-white'
            }`}
          >
            فيسبوك
          </button>

          <button
            onClick={() => setPlatformFilter('snapchat')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              platformFilter === 'snapchat'
                ? 'bg-pink-600 text-white'
                : 'glass-button-secondary text-zinc-400 hover:text-white'
            }`}
          >
            سناب شات
          </button>
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="rounded-3xl glass-panel p-12 text-center border-dashed border-pink-500/20">
          <div className="w-16 h-16 rounded-3xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mx-auto mb-4 text-pink-400">
            <Film className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">لا توجد وسائط محفوظة في هذا القسم</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            قم بلصق أي رابط فيديو من تيك توك، تويتر، يوتيوب، انستغرام، فيسبوك، أو سناب شات وسيتم حفظه تلقائياً في مكتبتك لتتمكن من الوصول إليه وتشغيله في أي وقت.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl glass-panel p-4 border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(236,72,153,0.25)] flex flex-col justify-between"
            >
              <div>
                {/* Media Thumbnail with Play Overlay */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/60 border border-pink-500/20 mb-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                  {/* Play Button Overlay */}
                  <button
                    onClick={() => onPreview(item)}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-pink-600/90 text-white flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.6)] group-hover:scale-110 transition-all backdrop-blur-sm"
                  >
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </button>

                  {/* Top Badges */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/80 text-pink-300 border border-pink-500/30 uppercase font-mono">
                      {item.platform}
                    </span>
                  </div>

                  <div className="absolute top-2.5 left-2.5">
                    <button
                      onClick={() => onToggleFavorite(item)}
                      className="p-1.5 rounded-lg bg-black/70 border border-white/10 text-white hover:text-pink-400 transition-colors"
                    >
                      <Heart className={`w-3.5 h-3.5 ${item.isFavorite ? 'fill-pink-500 text-pink-500' : ''}`} />
                    </button>
                  </div>

                  {/* Duration */}
                  {item.duration && (
                    <div className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-zinc-300">
                      {item.duration}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-pink-300 transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>{item.author?.name || 'مبدع المحتوى'}</span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {new Date(item.savedAt).toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-3 border-t border-pink-500/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => onPreview(item)}
                  className="px-3 py-1.5 rounded-xl glass-button-secondary text-xs font-semibold text-pink-300 hover:text-white flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>تشغيل</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onDownload(item, item.formats[0])}
                    className="p-2 rounded-xl glass-button-primary text-white"
                    title="تحميل بجودة عالية"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-2 rounded-xl glass-button-secondary text-zinc-500 hover:text-rose-400 hover:bg-rose-500/15"
                    title="حذف من المكتبة"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
};
