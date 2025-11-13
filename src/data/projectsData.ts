export type Source = 'local' | 'youtube';

export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  source: Source;
  videoUrl: string;
  thumb?: string;
}

export interface Category {
  key: string;
  title: string;
  subtitle?: string;
  cover?: string;
  items: VideoItem[];
}

export const categories: Category[] = [
  {
    key: 'youtube',
    title: 'YouTube Videos',
    subtitle: 'Professional video editing showcasing advanced color grading and motion graphics',
    cover: 'https://img.youtube.com/vi/Qr0upTwWZ1I/maxresdefault.jpg',
    items: [
      { id: 'yt1', title: 'Professional Video Edit Showcase #1', description: 'Professional video editing showcasing advanced color grading, motion graphics, and cinematic transitions', source: 'youtube', videoUrl: 'Qr0upTwWZ1I' },
      { id: 'yt2', title: 'Premium Content Creation', description: 'High-quality content creation with professional editing, audio mixing, and visual effects', source: 'youtube', videoUrl: 'TyuP7_B2URo' },
      { id: 'yt3', title: 'YouTube Short #1 - Quick Edit', description: 'Professional short-form video with quick cuts, effects, and engaging transitions', source: 'youtube', videoUrl: 'KWIFZqyoBNA' },
      { id: 'yt4', title: 'YouTube Short #2 - Dynamic Content', description: 'Trending short-form content with professional editing and visual effects', source: 'youtube', videoUrl: 'sfHTCvVoD7M' },
      { id: 'yt5', title: 'Full Length Professional Video', description: 'Complete production video featuring professional editing, color grading, and sound design', source: 'youtube', videoUrl: '5OhMb6mWuns' },
    ],
  },
  {
    key: 'genai',
    title: 'GenAI Ads',
    subtitle: 'Professional AI-generated content showcasing cutting-edge generative technology',
    cover: '/videos/genai/genai.mp4',
    items: [
      { id: 'g1', title: 'GenAI Creative Sample', description: 'Professional AI-generated content showcasing cutting-edge generative technology', source: 'local', videoUrl: '/videos/genai/genai.mp4' },
      { id: 'g2', title: 'JSW GenAI Sample', description: 'JSW GenAI-powered commercial with advanced visual effects and color grading', source: 'local', videoUrl: '/videos/genai/JSW_GenAI_Sample.mp4' },
      { id: 'g3', title: 'Nescafe 4K GenAI', description: 'Nescafe brand commercial created with AI generation technology in 4K resolution', source: 'local', videoUrl: '/videos/genai/Nescafe_4k.mp4' },
      { id: 'g4', title: 'Sunscreen SBV GenAI', description: 'Sunscreen product ad with AI-generated visuals and professional editing', source: 'local', videoUrl: '/videos/genai/Sunscreen_SBV_10.mp4' },
      { id: 'g5', title: 'Tata Motors GenAI', description: 'Tata Motors commercial featuring AI-generated automotive visuals and effects', source: 'local', videoUrl: '/videos/genai/Tata Motors Sample.mp4' },
    ],
  },
  {
    key: 'brand',
    title: 'Brand Films',
    subtitle: 'High-end brand films and client showcases',
    cover: 'https://img.youtube.com/vi/Un123D2GxIU/maxresdefault.jpg',
    items: [
      { id: 'b1', title: 'Brand Film - Client Showcase', description: 'Brand film showcased on YouTube featuring professional production and cinematography', source: 'youtube', videoUrl: 'Un123D2GxIU' },
      { id: 'b2', title: 'Vidboost Brand Film', description: 'Professional brand film with advanced visual effects and storytelling', source: 'local', videoUrl: '/videos/brandFlim/vidboost_web_8.mp4' },
    ],
  },
];
