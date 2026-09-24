import React from 'react';
import { Film, Shield, Zap, Heart, Sparkles, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-20 border-t border-pink-500/15 bg-[#050508]/90 backdrop-blur-2xl py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-pink-500/10">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-400 p-[1px] shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                <div className="w-full h-full bg-[#09080e] rounded-[15px] flex items-center justify-center">
                  <Film className="w-5 h-5 text-pink-400" />
                </div>
              </div>
              <span className="text-2xl font-black uppercase tracking-wider text-white font-['Plus_Jakarta_Sans']">
                VERSION
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                ULTRA 2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              منصة VERSION المتطورة بنظام Glassmorphism الوردي والأسود لتحميل وسائط شبكات التواصل الاجتماعي بجودتها الأصلية بدون علامات مائية وبسرعة قصوى.
            </p>
            <div className="flex items-center gap-3 text-xs text-zinc-400 pt-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                سيرفرات البروكسي تعمل بكفاءة 100%
              </span>
            </div>
          </div>

          {/* Col 2: Supported Networks */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>الشبكات المدعومة</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li className="hover:text-pink-300 transition-colors">تنزيل تيك توك بدون علامة مائية</li>
              <li className="hover:text-pink-300 transition-colors">تنزيل مقاطع تويتر / X و GIF</li>
              <li className="hover:text-pink-300 transition-colors">تنزيل يوتيوب وشورتس MP4 / MP3</li>
              <li className="hover:text-pink-300 transition-colors">تنزيل ريلز وقصص انستغرام</li>
              <li className="hover:text-pink-300 transition-colors">تنزيل فيديوهات فيسبوك HD</li>
              <li className="hover:text-pink-300 transition-colors">تنزيل سناب شات سبوت لايت</li>
            </ul>
          </div>

          {/* Col 3: Privacy & Security */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-pink-400" />
              <span>الخصوصية والأمان</span>
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              لا نقوم بتخزين أي مقاطع فيديو على خوادمنا نهائياً. جميع عمليات التحميل تتم عبر تشفير فوري ومباشر من المصدر إلى جهازك.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-pink-400/80 block">
                استخدم الخدمة وفقاً لشروط الاستخدام وحقوق الملكية للمحتوى الأصلي.
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright & badge */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            جميع الحقوق محفوظة لـ منصة <span className="text-white font-bold">VERSION</span> © 2026
          </div>
          <div className="flex items-center gap-2">
            <span>مصمم بأحدث تقنيات Glassmorphism باللون الوردي والأسود</span>
            <span className="text-pink-500">♥</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
