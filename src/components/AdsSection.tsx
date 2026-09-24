import React, { useState } from 'react';
import { Sparkles, ExternalLink, Shield, Gift, Zap, Info, Check, Eye, DollarSign, MousePointer } from 'lucide-react';

interface AdsSectionProps {
  placement?: 'top-banner' | 'in-feed' | 'sidebar' | 'footer-banner';
}

export const AdsSection: React.FC<AdsSectionProps> = ({ placement = 'in-feed' }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [adViews, setAdViews] = useState(1482);
  const [adClicks, setAdClicks] = useState(187);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setAdClicks((c) => c + 1);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  if (placement === 'top-banner') {
    return (
      <div className="w-full my-6">
        <div className="relative overflow-hidden rounded-2xl glass-panel p-4 sm:p-5 border-pink-500/25 bg-gradient-to-r from-pink-950/40 via-black/80 to-purple-950/30">
          <div className="absolute top-2 left-3 flex items-center gap-1.5 text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
            <Info className="w-3 h-3 text-pink-400" />
            <span>إعلان مميز · Sponsored</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 sm:pt-0">
            <div className="flex items-center gap-4 text-right">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                <Zap className="w-6 h-6 text-pink-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    سيرفرات Cloud CDN فائقة السرعة لتحميل الوسائط 4K
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    خصم 70%
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  حمّل ملايين المقاطع بدون انتظار مع تشفير عسكري وحماية للخصوصية.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleCopy('VERSION70')}
                className="px-3.5 py-2 rounded-xl glass-button-secondary text-xs font-semibold text-pink-300 flex items-center gap-1.5 hover:text-white"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Gift className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'تم نسخ الكود!' : 'كود الخصم: VERSION70'}</span>
              </button>
              <button
                onClick={() => setAdClicks((c) => c + 1)}
                className="px-4 py-2 rounded-xl glass-button-primary text-xs font-bold text-white flex items-center gap-1.5 shadow-[0_0_15px_rgba(236,72,153,0.4)]"
              >
                <span>احصل على العرض</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // In-feed responsive rich Ad card with ad metrics
  return (
    <div className="w-full my-8">
      <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 border-pink-500/30 bg-gradient-to-br from-[#0e0a14] via-[#08060b] to-[#120a16]">
        {/* Decorative corner glows */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Ad Header */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-500/15 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
              إعلان معتمد · Verified Sponsor
            </span>
            <span className="text-xs text-zinc-500 hidden sm:inline">يدعم استمرار المنصة مجانية 100%</span>
          </div>

          {/* Ad Stats Preview (Realistic Monetization System) */}
          <div className="flex items-center gap-3 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-pink-400" />
              <span>{adViews} ظهور</span>
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <MousePointer className="w-3 h-3 text-rose-400" />
              <span>{adClicks} نقرة</span>
            </span>
            <span className="flex items-center gap-1 text-emerald-400 font-mono">
              <DollarSign className="w-3 h-3" />
              <span>$42.80 عائد</span>
            </span>
          </div>
        </div>

        {/* Ad Main Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-pink-500/10 text-pink-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>العرض السنوي الأكثر مبيعاً لمحرري الفيديو وصناع المحتوى</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              باقة Version Pro AI لتعديل وتحسين جودة الفيديوهات حتى 4K 60FPS
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              ارفع جودة مقاطع تيك توك وريلز انستا المحملة، وأزل التشويش بدقة ذكاء اصطناعي سينمائية، مع وصول غير محدود لمحرك السيرفرات السحابية.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>ضمان استرجاع الأموال 30 يوماً</span>
              </div>
              <div className="text-zinc-600">·</div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                <Zap className="w-4 h-4 text-pink-400" />
                <span>تفعيل فوري بنقرة واحدة</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col items-center justify-center p-5 rounded-2xl bg-black/50 border border-pink-500/20 text-center space-y-3">
            <div className="text-xs text-zinc-400">السعر بعد تطبيق الكوبون</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-['Plus_Jakarta_Sans']">$4.99</span>
              <span className="text-xs text-zinc-500 line-through font-mono">$19.99</span>
              <span className="text-[11px] font-bold text-pink-400 bg-pink-500/15 px-2 py-0.5 rounded">وفر 75%</span>
            </div>

            <button
              onClick={() => handleCopy('VERSION-VIP')}
              className="w-full py-2.5 px-4 rounded-xl glass-button-secondary text-xs font-bold text-pink-300 flex items-center justify-center gap-2 hover:text-white"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Gift className="w-4 h-4" />}
              <span>{copiedCode ? 'تم النسخ بنجاح!' : 'نسخ الكوبون: VERSION-VIP'}</span>
            </button>

            <button
              onClick={() => setAdClicks((c) => c + 1)}
              className="w-full py-3 px-4 rounded-xl glass-button-primary text-xs font-bold text-white flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.4)]"
            >
              <span>انتقل لصفحة العرض الترويجي</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
