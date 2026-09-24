import React from 'react';
import { Video, Music, CheckCircle, Sparkles, Download, ArrowUpRight } from 'lucide-react';
import { Platform } from '../types';

interface SupportedPlatformsProps {
  onSelectPlatform: (platform: Platform) => void;
}

export const platformsData = [
  {
    id: 'tiktok' as Platform,
    name: 'تيك توك',
    englishName: 'TikTok',
    icon: '🎵',
    color: '#ec4899',
    tag: 'بدون علامة مائية HD',
    features: ['تحميل بصيغة MP4 بدون لوقو', 'استخراج الصوت الأصلي MP3', 'دقة 1080p Full HD', 'سرعة استجابة فائقة'],
    exampleUrl: 'https://www.tiktok.com/@tiktok/video/7106594312292453678',
    description: 'أقوى أداة لسحب مقاطع التيك توك مباشرة بدون أي علامة مائية وبنقرة واحدة.',
  },
  {
    id: 'twitter' as Platform,
    name: 'تويتر / إكس',
    englishName: 'Twitter (X)',
    icon: '𝕏',
    color: '#f43f5e',
    tag: 'فيديو وصوت وتغريدات',
    features: ['سحب مقاطع الفيديو والتغريدات', 'أعلى جودة متاحة MP4', 'تنزيل الصوتيات والنغمات', 'دعم الروابط القصيرة x.com'],
    exampleUrl: 'https://twitter.com/NASA/status/1679156475868676097',
    description: 'تحميل فوري لمقاطع الفيديو والصوتيات المرفوعة في تغريدات منصة X / Twitter.',
  },
  {
    id: 'youtube' as Platform,
    name: 'يوتيوب والشورتس',
    englishName: 'YouTube & Shorts',
    icon: '▶',
    color: '#ff0055',
    tag: '1080p / 4K / MP3',
    features: ['تحميل YouTube Shorts و Videos', 'استخراج صوت MP3 320kbps', 'تحميل غلاف الفيديو الأصلي', 'عرض معلومات القناة والمشاهدات'],
    exampleUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'استخراج فيديوهات اليوتيوب والشورتس وتحويلها إلى MP4 و MP3 بجودة صوتية نقية.',
  },
  {
    id: 'instagram' as Platform,
    name: 'انستغرام',
    englishName: 'Instagram Reels',
    icon: '📸',
    color: '#db2777',
    tag: 'Reels & Stories & Posts',
    features: ['تنزيل ريلز Reels بجودة كاملة', 'تحميل المنشورات والفيديوهات', 'استخراج المقطع الموسيقي للريلز', 'تنزيل بدون فقدان جودة الألوان'],
    exampleUrl: 'https://www.instagram.com/reel/Cx18e1NIL7T/',
    description: 'تحميل ريلز وفيديوهات انستغرام بجودتها الأصلية بدون أي ضغط وتنزيل الصوت المرافق.',
  },
  {
    id: 'facebook' as Platform,
    name: 'فيسبوك',
    englishName: 'Facebook Watch',
    icon: '👥',
    color: '#be185d',
    tag: 'HD & SD Watch Videos',
    features: ['تنزيل فيديوهات Watch و Reels', 'جودة HD عالية و SD اقتصادية', 'دعم روابط fb.watch والمجموعات', 'سرعة نقل مباشرة'],
    exampleUrl: 'https://www.facebook.com/watch/?v=10153231379946729',
    description: 'سحب فيديوهات فيسبوك العامة والريلز ومشاهدة مقاطع Watch بجودة فائقة.',
  },
  {
    id: 'snapchat' as Platform,
    name: 'سناب شات',
    englishName: 'Snapchat Spotlight',
    icon: '👻',
    color: '#f472b6',
    tag: 'Spotlight & Stories',
    features: ['تنزيل فيديوهات سبوت لايت Spotlight', 'استخراج المقاطع العامة والقصص', 'صيغة MP4 جاهزة للهاتف', 'الصوت الأصلي بجودة عالية'],
    exampleUrl: 'https://story.snapchat.com/p/spotlight-sample',
    description: 'تحميل مقاطع سناب شات سبوتلايت Spotlight والقصص العامة بنقرة واحدة.',
  },
];

export const SupportedPlatforms: React.FC<SupportedPlatformsProps> = ({ onSelectPlatform }) => {
  return (
    <section className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>تغطية شاملة بنسبة 100% لجميع المنصات العالمية</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          المنصات المدعومة في نظام <span className="bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">VERSION</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          يدعم محرك Version تحليلاً عميقاً واستخراجاً عالي السرعة لجميع ملفات الفيديو والصوت من كبرى شبكات التواصل الاجتماعي.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platformsData.map((plat) => (
          <div
            key={plat.id}
            className="group relative rounded-3xl p-6 glass-panel transition-all duration-300 hover:border-pink-500/40 hover:shadow-[0_12px_40px_-10px_rgba(236,72,153,0.3)] hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Top Glow Accent */}
            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-950/80 to-black border border-pink-500/30 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                  <span>{plat.icon}</span>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/30">
                  {plat.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                <span>{plat.name}</span>
                <span className="text-xs text-zinc-500 font-normal">({plat.englishName})</span>
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-5">
                {plat.description}
              </p>

              <div className="space-y-2 mb-6">
                {plat.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectPlatform(plat.id)}
              className="w-full py-2.5 px-4 rounded-xl glass-button-secondary text-pink-300 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all group-hover:bg-pink-600 group-hover:border-pink-500 group-hover:text-white"
            >
              <span>تحميل من {plat.name} الآن</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
