export type Platform = 'tiktok' | 'twitter' | 'youtube' | 'instagram' | 'facebook' | 'snapchat' | 'auto';

export interface MediaFormat {
  id: string;
  label: string;
  quality: string;
  ext: 'mp4' | 'mp3' | 'jpg' | 'webm';
  url: string;
  size?: string;
  isAudio?: boolean;
  noWatermark?: boolean;
  bitrate?: string;
}

export interface MediaAuthor {
  name: string;
  username?: string;
  avatar?: string;
  verified?: boolean;
}

export interface MediaResult {
  id: string;
  platform: Platform;
  originalUrl: string;
  title: string;
  description?: string;
  author: MediaAuthor;
  thumbnail: string;
  duration?: string;
  stats?: {
    views?: string | number;
    likes?: string | number;
    comments?: string | number;
    shares?: string | number;
  };
  formats: MediaFormat[];
  createdAt: string;
}

export interface LibraryItem extends MediaResult {
  savedAt: number;
  isFavorite: boolean;
  downloadCount: number;
  lastDownloadedFormat?: string;
}

export interface AdItem {
  id: string;
  badge: string;
  title: string;
  sponsor: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bannerImage?: string;
  accentColor?: string;
  discount?: string;
}
