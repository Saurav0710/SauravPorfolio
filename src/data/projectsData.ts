export type Source = 'local' | 'youtube' | 'drive';

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
    title: 'Social Media',
    subtitle: 'AI-enhanced social media videos for maximum engagement',
    cover: '/images/Social/5OhMb6mWuns-HD.jpg',
    items: [
      
      
      { id: 'yt1', title: 'Utec YT Short Video', description: '', source: 'youtube', videoUrl: 'sfHTCvVoD7M' },
      { id: 'yt2', title: 'Utec Long Video', description: '', source: 'youtube', videoUrl: '5OhMb6mWuns' },
      { id: 'yt3', title: 'Visit Health YT Short', description: '', source: 'youtube', videoUrl: 'qscKi-ymS5A' },
    ],
  },
  {
    key: 'genai',
    title: 'GenAI Ads',
    subtitle: 'AI-generated content showcasing cutting-edge generative technology',
    cover: '/images/GenAI/Samsung_SS_switch.png',
    items: [
      
      { id: 'g2', title: 'Samsung AI Commercial', description: 'Leading electronics company', source: 'drive', videoUrl: 'https://drive.google.com/file/d/1UE39NOVMr9W4ksjjCEgu0fmF9eie62mb/view?usp=sharing', thumb: '/images/GenAI/Samsung_thumbnail.png' },
      { id: 'g3', title: 'JSW Steel Sample', description: 'Leading steel manufacturing company', source: 'drive', videoUrl: 'https://drive.google.com/file/d/1MdsTWRkoemboVZ0EML9eW7DqPBthzvL9/view?usp=sharing', thumb: '/images/GenAI/JSW.png' },
      { id: 'g4', title: 'Nescafe', description: 'Leading bevarage global brand ', source: 'drive', videoUrl: 'https://drive.google.com/file/d/1KaODfbURTEb9FiCrcMut6U6Mg2vIm8T3/view?usp=sharing', thumb: '/images/GenAI/Nescafe_Thumb.png' },
      { id: 'g5', title: 'Lacto Sunscreen', description: 'Leading sunscreen brand in India', source: 'drive', videoUrl: 'https://drive.google.com/file/d/1-fQv4ezQLVLKVeguCJjVLOnA_E-5biai/view?usp=sharing', thumb: '/images/GenAI/Sunscreen_thumb.png' },
      { id: 'g6', title: 'Tata Motors Sample', description: 'Leading automotive company', source: 'drive', videoUrl: 'https://drive.google.com/file/d/17CpY0B0PrZR5r1mNVHKle5LDVdTENTyw/view?usp=sharing', thumb: '/images/GenAI/Tata Motors.png' },
      { id: 'g7', title: 'Solar Square Sample', description: 'Leading rooftop solar company in India', source: 'drive', videoUrl:'https://drive.google.com/file/d/1DVTh--J_4en46H1F8KNwtF3n0iDwoUpn/view?usp=sharing' ,thumb:'/images/GenAI/Solar Square.png' },
      
  ],
  },
  {
    key: 'brand',
    title: 'Brand Films',
    subtitle: 'High-end brand films and client showcases',
    cover: 'https://img.youtube.com/vi/Un123D2GxIU/maxresdefault.jpg',
    items: [
      { id: 'b1', title: 'Brand Film - Client Showcase', description: 'Brand film showcased on YouTube featuring professional production and cinematography', source: 'youtube', videoUrl: 'Un123D2GxIU' },
      
    ],
  },
];
