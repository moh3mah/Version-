import React, { useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Download, RotateCcw, Sparkles } from 'lucide-react';
import { MediaResult, MediaFormat } from '../types';

interface GlassPlayerModalProps {
  media: MediaResult;
  initialFormat?: MediaFormat;
  onClose: () => void;
  onDownload: (media: MediaResult, format: MediaFormat) => void;
}

export const GlassPlayerModal: React.FC<GlassPlayerModalProps> = ({
  media,
  initialFormat,
  onClose,
  onDownload,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<MediaFormat>(
    initialFormat || media.formats[0] || {
      id: 'default',
      label: 'افتراضي',
      quality: 'HD',
      ext: 'mp4',
      url: media.originalUrl,
    }
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const changeSpeed = () => {
    if (!videoRef.current) return;
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    videoRef.current.playbackRate = newSpeed;
    setPlaybackSpeed(newSpeed);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-3xl glass-panel-glow border-pink-500/30 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-pink-500/15 bg-black/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-pink-400" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                {media.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span>{media.author?.name || 'مبدع المحتوى'}</span>
                <span>·</span>
                <span className="text-pink-400 font-mono uppercase">{media.platform}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl glass-button-secondary flex items-center justify-center text-zinc-400 hover:text-white hover:bg-rose-500/20 transition-all"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Audio Player Viewport */}
        <div className="relative bg-black/95 flex items-center justify-center flex-1 min-h-[300px] max-h-[550px] overflow-hidden group">
          {selectedFormat.isAudio ? (
            <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-pink-600 to-rose-400 p-[1px] shadow-[0_0_40px_rgba(236,72,153,0.4)]">
                <img
                  src={media.thumbnail}
                  alt={media.title}
                  className="w-full h-full object-cover rounded-[23px]"
                />
              </div>
              <div className="text-sm font-bold text-white">تشغيل الملف الصوتي MP3 320kbps</div>
              <audio
                controls
                autoPlay
                src={selectedFormat.url}
                className="w-full max-w-md accent-pink-500 mt-4"
              />
            </div>
          ) : (
            <video
              ref={videoRef}
              src={selectedFormat.url}
              poster={media.thumbnail}
              autoPlay
              playsInline
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full max-h-[500px] object-contain rounded-lg"
            />
          )}

          {/* Quick Floating Controls for Video */}
          {!selectedFormat.isAudio && (
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl glass-panel bg-black/60 border-pink-500/20 backdrop-blur-md opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-xl glass-button-primary text-white"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-xl glass-button-secondary text-zinc-300 hover:text-white"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={changeSpeed}
                  className="px-2.5 py-1.5 rounded-xl glass-button-secondary text-xs font-mono font-bold text-pink-300 hover:text-white"
                >
                  {playbackSpeed}x
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleFullscreen}
                  className="p-2 rounded-xl glass-button-secondary text-zinc-300 hover:text-white"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer: Format Selector & Direct Download */}
        <div className="p-4 sm:p-6 border-t border-pink-500/15 bg-black/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            <span className="text-xs text-zinc-400 shrink-0">اختر الجودة:</span>
            {media.formats.map((fmt) => (
              <button
                key={fmt.id}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFormat.id === fmt.id
                    ? 'bg-pink-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.5)] border border-pink-400'
                    : 'glass-button-secondary text-zinc-400 hover:text-white'
                }`}
              >
                {fmt.quality} ({fmt.ext.toUpperCase()})
              </button>
            ))}
          </div>

          <button
            onClick={() => onDownload(media, selectedFormat)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl glass-button-primary text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2 shrink-0 shadow-[0_0_20px_rgba(236,72,153,0.4)]"
          >
            <Download className="w-4 h-4" />
            <span>تحميل هذا المقطع الآن ({selectedFormat.quality})</span>
          </button>
        </div>

      </div>
    </div>
  );
};
