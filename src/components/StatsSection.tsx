import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import {
  TrendingUp,
  Download,
  Users,
  HardDrive,
  Zap,
  Activity,
  Award,
  Globe,
  CheckCircle,
} from 'lucide-react';

// Daily downloads history data
const weeklyData = [
  { day: 'السبت', downloads: 184500, tiktok: 72000, youtube: 51000, others: 61500 },
  { day: 'الأحد', downloads: 212400, tiktok: 86000, youtube: 62000, others: 64400 },
  { day: 'الاثنين', downloads: 198300, tiktok: 79000, youtube: 54000, others: 65300 },
  { day: 'الثلاثاء', downloads: 225100, tiktok: 92000, youtube: 63000, others: 70100 },
  { day: 'الأربعاء', downloads: 241800, tiktok: 98000, youtube: 69000, others: 74800 },
  { day: 'الخميس', downloads: 279500, tiktok: 115000, youtube: 78000, others: 86500 },
  { day: 'الجمعة', downloads: 312600, tiktok: 132000, youtube: 89000, others: 91600 },
];

const monthlyData = [
  { day: 'أسبوع 1', downloads: 1140000, tiktok: 460000, youtube: 320000, others: 360000 },
  { day: 'أسبوع 2', downloads: 1290000, tiktok: 520000, youtube: 370000, others: 400000 },
  { day: 'أسبوع 3', downloads: 1420000, tiktok: 580000, youtube: 410000, others: 430000 },
  { day: 'أسبوع 4', downloads: 1654200, tiktok: 680000, youtube: 480000, others: 494200 },
];

// Platform shares
const platformData = [
  { name: 'تيك توك (TikTok)', value: 38, count: '628,400', color: '#ec4899' },
  { name: 'يوتيوب (YouTube)', value: 27, count: '446,500', color: '#f43f5e' },
  { name: 'انستغرام (Instagram)', value: 18, count: '297,700', color: '#db2777' },
  { name: 'تويتر / X', value: 9, count: '148,800', color: '#be185d' },
  { name: 'فيسبوك (Facebook)', value: 5, count: '82,700', color: '#9d174d' },
  { name: 'سناب شات (Snapchat)', value: 3, count: '49,600', color: '#f472b6' },
];

// Quality distribution
const qualityData = [
  { quality: '1080p FHD (بدون لوقو)', percentage: 56, count: '926K' },
  { quality: '720p HD قياسي', percentage: 22, count: '363K' },
  { quality: 'صوت MP3 320k', percentage: 15, count: '248K' },
  { quality: '4K Ultra HD', percentage: 7, count: '116K' },
];

export const StatsSection: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly'>('weekly');
  const [liveCounter, setLiveCounter] = useState(1654290);
  const [recentDownload, setRecentDownload] = useState('فيديو تيك توك بدون علامة مائية بواسطة مستخدم من الرياض');

  // Realistic incrementing live counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCounter((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 2800);

    const activities = [
      'فيديو تيك توك بدون علامة مائية بواسطة مستخدم من الرياض',
      'مقطع شورتس يوتيوب بدقة 1080p من دبي',
      'فيديو تويتر / X بجودة عالية من القاهرة',
      'ريلز انستغرام عالي الدقة من الكويت',
      'صوت MP3 نقي من مقطع تيك توك تريند من مسقط',
      'فيديو سبوت لايت سناب شات من جدة',
      'مقطع Watch فيسبوك بجودة HD من عمّان',
    ];

    const actInterval = setInterval(() => {
      const randomAct = activities[Math.floor(Math.random() * activities.length)];
      setRecentDownload(randomAct);
    }, 4500);

    return () => {
      clearInterval(interval);
      clearInterval(actInterval);
    };
  }, []);

  const activeChartData = timeRange === 'weekly' ? weeklyData : monthlyData;

  return (
    <section className="py-8 animate-fade-in space-y-8">
      
      {/* Top Banner & Live Status */}
      <div className="rounded-3xl glass-panel-glow p-6 sm:p-8 border-pink-500/30 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-pink-500/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-bold mb-3">
              <Activity className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>لوحة الإحصائيات الحية اللحظية (Live Usage Metrics)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              إحصائيات استخدام محرك <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-600 bg-clip-text text-transparent">VERSION</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              رصد حي ومباشر لإجمالي الفيديوهات التي تم تحميلها وتوزيع المنصات وسرعات المعالجة عبر خوادم المنصة عالمياً.
            </p>
          </div>

          {/* Big Live Downloads Counter */}
          <div className="flex flex-col items-start lg:items-end justify-center p-5 rounded-2xl bg-black/60 border border-pink-500/30 shadow-[0_0_25px_rgba(236,72,153,0.25)] shrink-0">
            <span className="text-xs text-zinc-400 font-semibold mb-1 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-pink-400" />
              <span>إجمالي الفيديوهات المحمّلة لجميع المستخدمين:</span>
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white font-['Plus_Jakarta_Sans'] tracking-wider bg-gradient-to-r from-white via-pink-100 to-pink-400 bg-clip-text text-transparent">
              {liveCounter.toLocaleString('en-US')}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-bold mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>+1,840 تحميل خلال الساعة الأخيرة</span>
            </div>
          </div>
        </div>

        {/* Live Event Ticker */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-pink-400">آخر عملية تحميل مباشرة:</span>
            <span className="text-zinc-200 bg-pink-500/10 px-2.5 py-1 rounded-lg border border-pink-500/20 font-medium">
              {recentDownload}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-zinc-300">
              <Globe className="w-3.5 h-3.5 text-pink-400" />
              <span>140+ دولة نشطة</span>
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>معدل النجاح: 99.8%</span>
            </span>
          </div>
        </div>

      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl glass-panel border-pink-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400">التحميلات اليومية المتوقعة</span>
            <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-['Plus_Jakarta_Sans']">312.6K</div>
          <div className="text-[11px] text-pink-400 font-bold mt-1">▲ +24.8% عن الأسبوع الماضي</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border-pink-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400">حجم البيانات المنقولة</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-['Plus_Jakarta_Sans']">86.4 TB</div>
          <div className="text-[11px] text-zinc-400 mt-1">توفير باندويث وسرعة فائقة</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border-pink-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400">المستخدمين النشطين اليوم</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-['Plus_Jakarta_Sans']">48.2K</div>
          <div className="text-[11px] text-emerald-400 font-bold mt-1">1,248 مستخدم متصل الآن</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border-pink-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400">متوسط سرعة الاستخراج</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-['Plus_Jakarta_Sans']">0.64s</div>
          <div className="text-[11px] text-zinc-400 mt-1">استجابة لحظية عبر خوادم Edge</div>
        </div>

      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Area Chart: Downloads over Time (Recharts) */}
        <div className="lg:col-span-8 rounded-3xl glass-panel-glow p-6 border-pink-500/25 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-pink-400" />
                <span>نمو معدل التحميلات على مدار الوقت</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                رسم بياني يوضح عدد الفيديوهات المسحوبة يومياً وأسبوعياً عبر Recharts
              </p>
            </div>

            {/* Toggle Weekly / Monthly */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-pink-500/20 self-start sm:self-auto">
              <button
                onClick={() => setTimeRange('weekly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeRange === 'weekly'
                    ? 'bg-pink-600 text-white shadow-[0_0_10px_rgba(236,72,153,0.5)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                أسبوعي
              </button>
              <button
                onClick={() => setTimeRange('monthly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeRange === 'monthly'
                    ? 'bg-pink-600 text-white shadow-[0_0_10px_rgba(236,72,153,0.5)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                شهري
              </button>
            </div>
          </div>

          {/* Area Chart Container */}
          <div className="w-full h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#db2777" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorTiktok" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  stroke="#71717a"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(244, 114, 182, 0.2)' }}
                />
                <YAxis
                  stroke="#71717a"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(244, 114, 182, 0.2)' }}
                  tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-2xl glass-panel p-3.5 border-pink-500/40 bg-black/90 shadow-xl text-right">
                          <p className="text-xs font-bold text-white mb-2">{label}</p>
                          <div className="space-y-1 text-xs">
                            <p className="text-pink-400 font-bold">
                              إجمالي التحميلات: {Number(payload[0]?.value).toLocaleString()}
                            </p>
                            {payload[1] && (
                              <p className="text-rose-300">
                                تيك توك: {Number(payload[1]?.value).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="downloads"
                  stroke="#ec4899"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorDownloads)"
                />
                <Area
                  type="monotone"
                  dataKey="tiktok"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#colorTiktok)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400 pt-4 mt-2 border-t border-pink-500/10">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
                <span>إجمالي الفيديوهات</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 rounded bg-rose-400" />
                <span>حصة تيك توك</span>
              </span>
            </div>
            <span className="text-[11px] text-zinc-500">تم التحديث منذ ثوانٍ معدودة</span>
          </div>

        </div>

        {/* Donut Pie Chart: Platform Distribution (Recharts) */}
        <div className="lg:col-span-4 rounded-3xl glass-panel-glow p-6 border-pink-500/25 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
              <Award className="w-5 h-5 text-pink-400" />
              <span>توزيع المنصات الأكثر طلباً</span>
            </h3>
            <p className="text-xs text-zinc-400">نسبة التحميل من كل شبكة اجتماعية</p>
          </div>

          {/* Pie Chart View */}
          <div className="w-full h-52 my-2 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#09080e" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-xl glass-panel p-2.5 bg-black/95 border-pink-500/40 text-right text-xs">
                          <p className="font-bold text-white">{data.name}</p>
                          <p className="text-pink-400 mt-0.5">{data.value}% ({data.count} مقطع)</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Inner Center Label */}
            <div className="absolute inset-0 m-auto w-24 h-24 rounded-full flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-xs text-zinc-400">الأكثر تحميلاً</span>
              <span className="text-sm font-black text-pink-400">تيك توك 38%</span>
            </div>
          </div>

          {/* Platform breakdown list */}
          <div className="space-y-1.5 pt-2 border-t border-pink-500/10">
            {platformData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-zinc-300">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-zinc-400">{item.count}</span>
                  <span className="font-bold text-white">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Quality Breakdown Bar Chart */}
      <div className="rounded-3xl glass-panel p-6 border-pink-500/20">
        <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
          <Zap className="w-5 h-5 text-pink-400" />
          <span>تفضيلات المستخدمين لجودة وصيغ التحميل</span>
        </h3>
        <p className="text-xs text-zinc-400 mb-6">
          نسبة الفيديوهات المحملة بدون علامة مائية بدقة 1080p مقارنة بباقي الصيغ والصوتيات
        </p>

        <div className="w-full h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={qualityData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <XAxis type="number" stroke="#71717a" fontSize={11} tickFormatter={(v) => `${v}%`} />
              <YAxis dataKey="quality" type="category" stroke="#d4d4d8" fontSize={12} tickLine={false} width={150} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-xl glass-panel p-3 bg-black/90 border-pink-500/30 text-right text-xs">
                        <p className="font-bold text-white">{data.quality}</p>
                        <p className="text-pink-400 mt-1">النسبة: {data.percentage}%</p>
                        <p className="text-zinc-400">إجمالي المقاطع: {data.count}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="percentage" fill="#ec4899" radius={[0, 8, 8, 0]}>
                {qualityData.map((_, index) => (
                  <Cell key={`bar-${index}`} fill={index === 0 ? '#ec4899' : index === 1 ? '#f43f5e' : index === 2 ? '#db2777' : '#9d174d'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </section>
  );
};
