import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { DownloaderSection } from './components/DownloaderSection';
import { ResultCard } from './components/ResultCard';
import { LibrarySection } from './components/LibrarySection';
import { SupportedPlatforms } from './components/SupportedPlatforms';
import { AdsSection } from './components/AdsSection';
import { GlassPlayerModal } from './components/GlassPlayerModal';
import { StatsSection } from './components/StatsSection';
import { Footer } from './components/Footer';
import { MediaResult, MediaFormat, LibraryItem, Platform } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'downloader' | 'library' | 'platforms' | 'stats'>('downloader');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('auto');
  const [inputUrl, setInputUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<MediaResult | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [previewMedia, setPreviewMedia] = useState<{ media: MediaResult; format?: MediaFormat } | null>(null);

  // Persistent Media Library
  const [library, setLibrary] = useState<LibraryItem[]>(() => {
    try {
      const saved = localStorage.getItem('version_media_library');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }

    // Default pre-seeded demo items so the library isn't empty on first visit
    return [
      {
        id: 'seed_tiktok_1',
        platform: 'tiktok',
        originalUrl: 'https://www.tiktok.com/@tiktok/video/7106594312292453678',
        title: 'تحدي المهارات الكروية الرائع بدون علامة مائية',
        author: {
          name: 'TikTok Official',
          username: '@tiktok',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
        thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
        duration: '0:34',
        stats: { views: '4.2M', likes: '320K' },
        formats: [
          {
            id: 'seed-tt-1',
            label: 'فيديو MP4 بدون علامة مائية 1080p',
            quality: '1080p HD',
            ext: 'mp4',
            url: 'https://cdn.pixabay.com/video/2024/02/09/199958-911694865_tiny.mp4',
            size: '4.8 MB',
            noWatermark: true,
          },
          {
            id: 'seed-tt-audio',
            label: 'الصوت الأصلي MP3',
            quality: '320kbps MP3',
            ext: 'mp3',
            url: 'https://cdn.pixabay.com/video/2024/02/09/199958-911694865_tiny.mp4',
            isAudio: true,
          },
        ],
        createdAt: new Date().toISOString(),
        savedAt: Date.now() - 3600000,
        isFavorite: true,
        downloadCount: 3,
      },
      {
        id: 'seed_tw_1',
        platform: 'twitter',
        originalUrl: 'https://twitter.com/NASA/status/1679156475868676097',
        title: 'مشاهد مذهلة للفضاء الخارجي من تلسكوب جيمس ويب بدقة 4K',
        author: {
          name: 'NASA Space Science',
          username: '@NASA',
          avatar: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=150&auto=format&fit=crop&q=80',
        },
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
        duration: '1:15',
        stats: { likes: '89K', shares: '24K' },
        formats: [
          {
            id: 'seed-tw-1',
            label: 'فيديو تويتر عالي الدقة Full HD',
            quality: '1080p HD',
            ext: 'mp4',
            url: 'https://cdn.pixabay.com/video/2024/02/09/199958-911694865_tiny.mp4',
            size: '4.8 MB',
            noWatermark: true,
          },
        ],
        createdAt: new Date().toISOString(),
        savedAt: Date.now() - 86400000,
        isFavorite: false,
        downloadCount: 1,
      },
    ];
  });

  // Save library changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('version_media_library', JSON.stringify(library));
    } catch {
      // Storage error handle
    }
  }, [library]);

  // Extract Video Handler
  const handleExtract = async (url: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'تعذر استخراج الفيديو من الرابط المدخل. تأكد من أن الرابط عام وصالح.');
      }

      const media: MediaResult = data.data;
      setCurrentResult(media);

      // Add to library automatically
      setLibrary((prev) => {
        const existingIdx = prev.findIndex((item) => item.id === media.id);
        if (existingIdx !== -1) {
          const updated = [...prev];
          updated[existingIdx] = {
            ...updated[existingIdx],
            ...media,
            savedAt: Date.now(),
          };
          return updated;
        } else {
          const newItem: LibraryItem = {
            ...media,
            savedAt: Date.now(),
            isFavorite: false,
            downloadCount: 0,
          };
          return [newItem, ...prev];
        }
      });

      // Smooth scroll down to result card
      setTimeout(() => {
        const el = document.getElementById('result-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'حدث خطأ أثناء معالجة الرابط، يرجى المحاولة مجدداً.');
    } finally {
      setIsLoading(false);
    }
  };

  // Real Download Trigger with Proxy streaming & Confetti
  const handleDownload = (media: MediaResult, format: MediaFormat) => {
    setDownloadingId(format.id);

    // Fire celebratory pink and rose confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#ec4899', '#f43f5e', '#ffffff', '#db2777'],
      });
    } catch {
      // Confetti optional
    }

    // Build secure download URL via our backend proxy
    const cleanTitle = media.title.replace(/[\\/:*?"<>|]/g, '_').slice(0, 60);
    const downloadUrl = `/api/proxy-download?url=${encodeURIComponent(format.url)}&filename=${encodeURIComponent(`Version_${media.platform}_${cleanTitle}`)}&ext=${format.ext}`;

    // Create an invisible anchor to trigger direct browser save
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `Version_${media.platform}_${cleanTitle}.${format.ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Update download count in library
    setLibrary((prev) =>
      prev.map((item) =>
        item.id === media.id
          ? { ...item, downloadCount: (item.downloadCount || 0) + 1, lastDownloadedFormat: format.quality }
          : item
      )
    );

    setTimeout(() => {
      setDownloadingId(null);
    }, 1800);
  };

  // Toggle Favorite
  const handleToggleFavorite = (media: MediaResult) => {
    setLibrary((prev) =>
      prev.map((item) => (item.id === media.id ? { ...item, isFavorite: !item.isFavorite } : item))
    );
  };

  // Delete from Library
  const handleDeleteItem = (id: string) => {
    setLibrary((prev) => prev.filter((item) => item.id !== id));
    if (currentResult && currentResult.id === id) {
      setCurrentResult(null);
    }
  };

  // Clear all Library items
  const handleClearAll = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف جميع الوسائط من مكتبتك؟')) {
      setLibrary([]);
    }
  };

  // Open Preview Modal
  const handlePreview = (media: MediaResult, format?: MediaFormat) => {
    setPreviewMedia({ media, format });
  };

  return (
    <div className="min-h-screen bg-[#050508] text-zinc-100 relative overflow-x-hidden selection:bg-pink-500 selection:text-white">
      
      {/* Background Ambient Glowing Orbs */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-pink-600/15 to-rose-700/5 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-purple-900/15 via-pink-900/10 to-transparent blur-[130px] pointer-events-none" />
      <div className="fixed top-[40%] left-[20%] w-[400px] h-[400px] rounded-full bg-rose-600/5 blur-[100px] pointer-events-none" />

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        libraryCount={library.length}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Top Sponsored Ad Banner */}
        <AdsSection placement="top-banner" />

        {/* Tab 1: Downloader View */}
        {activeTab === 'downloader' && (
          <div>
            <DownloaderSection
              onExtract={handleExtract}
              isLoading={isLoading}
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
              inputUrl={inputUrl}
              setInputUrl={setInputUrl}
              errorMessage={errorMessage}
            />

            {/* Extracted Video Result Section */}
            {currentResult && (
              <div id="result-section">
                <ResultCard
                  result={currentResult}
                  isFavorite={library.some((i) => i.id === currentResult.id && i.isFavorite)}
                  onToggleFavorite={handleToggleFavorite}
                  onPreview={handlePreview}
                  onDownload={handleDownload}
                  downloadingId={downloadingId}
                />
              </div>
            )}

            {/* In-feed Ad Card */}
            <AdsSection placement="in-feed" />

            {/* Supported Networks Preview under downloader */}
            <SupportedPlatforms
              onSelectPlatform={(p) => {
                setSelectedPlatform(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Global Usage & Analytics Section with Recharts */}
            <StatsSection />
          </div>
        )}

        {/* Tab 2: Library & Stored Media View */}
        {activeTab === 'library' && (
          <div>
            <LibrarySection
              items={library}
              onToggleFavorite={handleToggleFavorite}
              onDeleteItem={handleDeleteItem}
              onClearAll={handleClearAll}
              onPreview={handlePreview}
              onDownload={handleDownload}
            />
            <AdsSection placement="in-feed" />
          </div>
        )}

        {/* Tab 3: Platforms Detail View */}
        {activeTab === 'platforms' && (
          <div>
            <SupportedPlatforms
              onSelectPlatform={(p) => {
                setSelectedPlatform(p);
                setActiveTab('downloader');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <AdsSection placement="in-feed" />
          </div>
        )}

        {/* Tab 4: Full Analytics & Usage Stats View */}
        {activeTab === 'stats' && (
          <div>
            <StatsSection />
            <AdsSection placement="in-feed" />
          </div>
        )}

      </main>

      {/* Glass Video Player Modal */}
      {previewMedia && (
        <GlassPlayerModal
          media={previewMedia.media}
          initialFormat={previewMedia.format}
          onClose={() => setPreviewMedia(null)}
          onDownload={handleDownload}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
