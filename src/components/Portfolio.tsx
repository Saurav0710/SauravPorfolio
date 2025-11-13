import { Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  type: 'youtube' | 'genai' | 'brand';
  thumbnail: string;
  videoUrl?: string;
  duration: string;
  description: string;
}

const portfolioItems: PortfolioItem[] = [
  // YouTube Videos
  {
    id: 1,
    title: 'Professional Video Edit Showcase #1',
    category: 'YouTube',
    type: 'youtube',
    thumbnail: 'https://img.youtube.com/vi/Qr0upTwWZ1I/maxresdefault.jpg',
    videoUrl: 'Qr0upTwWZ1I',
    duration: '11:22',
    description: 'Professional video editing showcasing advanced color grading, motion graphics, and cinematic transitions'
  },
  {
    id: 2,
    title: 'Premium Content Creation',
    category: 'YouTube',
    type: 'youtube',
    thumbnail: 'https://img.youtube.com/vi/TyuP7_B2URo/maxresdefault.jpg',
    videoUrl: 'TyuP7_B2URo',
    duration: '8:45',
    description: 'High-quality content creation with professional editing, audio mixing, and visual effects'
  },
  {
    id: 3,
    title: 'More YouTube Projects Coming',
    category: 'YouTube',
    type: 'youtube',
    thumbnail: 'https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg',
    duration: '15:30',
    description: 'Additional YouTube projects and collaborations - Coming soon!'
  },

  // New YouTube Shorts and Videos
  {
    id: 13,
    title: 'YouTube Short #1 - Quick Edit',
    category: 'YouTube',
    type: 'youtube',
    thumbnail: 'https://img.youtube.com/vi/KWIFZqyoBNA/hqdefault.jpg',
    videoUrl: 'KWIFZqyoBNA',
    duration: '0:58',
    description: 'Professional short-form video with quick cuts, effects, and engaging transitions'
  },
  {
    id: 14,
    title: 'YouTube Short #2 - Dynamic Content',
    category: 'YouTube',
    type: 'youtube',
    thumbnail: 'https://img.youtube.com/vi/sfHTCvVoD7M/hqdefault.jpg',
    videoUrl: 'sfHTCvVoD7M',
    duration: '0:59',
    description: 'Trending short-form content with professional editing and visual effects'
  },
  {
    id: 15,
    title: 'Full Length Professional Video',
    category: 'YouTube',
    type: 'youtube',
    thumbnail: 'https://img.youtube.com/vi/5OhMb6mWuns/maxresdefault.jpg',
    videoUrl: '5OhMb6mWuns',
    duration: '17:30',
    description: 'Complete production video featuring professional editing, color grading, and sound design'
  },

  // GenAI Ads - Uploaded Videos
  {
    id: 4,
    title: 'GenAI Creative Sample',
    category: 'GenAI Ads',
    type: 'genai',
    thumbnail: '/videos/genai/genai.mp4',
    videoUrl: '/videos/genai/genai.mp4',
    duration: 'GenAI Video',
    description: 'Professional AI-generated content showcasing cutting-edge generative technology'
  },
  {
    id: 5,
    title: 'JSW GenAI Sample',
    category: 'GenAI Ads',
    type: 'genai',
    thumbnail: '/videos/genai/jwsstell.png',
    videoUrl: '/videos/genai/JSW_GenAI_Sample.mp4',
    duration: 'GenAI Video',
    description: 'JSW GenAI-powered commercial with advanced visual effects and color grading'
  },
  {
    id: 6,
    title: 'Nescafe 4K GenAI',
    category: 'GenAI Ads',
    type: 'genai',
    thumbnail: '/videos/genai/nescafeimage.png',
    videoUrl: '/videos/genai/Nescafe_4k.mp4',
    duration: '4K Quality',
    description: 'Nescafe brand commercial created with AI generation technology in 4K resolution'
  },
  {
    id: 7,
    title: 'Sunscreen SBV GenAI',
    category: 'GenAI Ads',
    type: 'genai',
    thumbnail: '/videos/genai/Sunscreen_SBV_10.mp4',
    videoUrl: '/videos/genai/Sunscreen_SBV_10.mp4',
    duration: 'GenAI Video',
    description: 'Sunscreen product ad with AI-generated visuals and professional editing'
  },
  {
    id: 8,
    title: 'Tata Motors GenAI',
    category: 'GenAI Ads',
    type: 'genai',
    thumbnail: '/videos/genai/Tata Motors Sample.mp4',
    videoUrl: '/videos/genai/Tata Motors Sample.mp4',
    duration: 'GenAI Video',
    description: 'Tata Motors commercial featuring AI-generated automotive visuals and effects'
  },




  

  
  // Brand Films (YouTube)
  {
    id: 16,
    title: 'Brand Film - Client Showcase',
    category: 'Brand Film',
    type: 'brand',
    thumbnail: 'https://img.youtube.com/vi/Un123D2GxIU/maxresdefault.jpg',
    videoUrl: 'Un123D2GxIU',
    duration: 'TBD',
    description: 'Brand film showcased on YouTube (added to Brand Films tab)'
  },
    {
    id: 17,
    title: 'vidboost',
    category: 'Brand Film',
    type: 'brand',
    thumbnail: '/videos/brandFlim/vidboost_web_8.mp4',
    videoUrl: '/videos/brandFlim/vidboost_web_8.mp4',
    duration: 'GenAI Video',
    description: 'Tata Motors commercial featuring AI-generated automotive visuals and effects'
  },
];

const TAB_CATEGORIES = [
  { id: 'all', label: 'All Works', type: null },
  { id: 'youtube', label: 'YouTube Videos', type: 'youtube' },
  { id: 'genai', label: 'GenAI Ads', type: 'genai' },
  { id: 'brand', label: 'Brand Films', type: 'brand' },
];

function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Filter items based on selected tab
  let filteredItems = portfolioItems;
  if (selectedTab === 'all') {
    filteredItems = portfolioItems;
  } else if (selectedTab === 'youtube') {
    // Only show items that are explicitly YouTube
    filteredItems = portfolioItems.filter(item => item.type === 'youtube');
  } else {
    // For other tabs, exclude any YouTube items (defensive) and match the selected type
    filteredItems = portfolioItems.filter(item => item.type === selectedTab && item.type !== 'youtube');
  }

  return (
    <>
      <section ref={sectionRef} className="py-24 px-4 md:px-8 lg:px-16 bg-transparent relative overflow-hidden">
        {/* Cosmic nebula effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-900/12 blur-3xl rounded-full"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-900/10 blur-3xl rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-widest mb-2">
                <span className="bg-gradient-to-r from-slate-900 via-slate-600 to-white bg-clip-text text-transparent">
                  Project
                </span>
              </h2>
              <p className="text-gray-300 max-w-2xl text-lg font-semibold uppercase tracking-wide">
                Professional video production and editing showcase
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="mb-12 overflow-x-auto pb-4">
              <div className="flex gap-3 min-w-max border-b-2 border-slate-700/30 pb-4">
                {TAB_CATEGORIES.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`px-6 py-3 rounded-lg font-black uppercase tracking-wider text-sm transition-all duration-300 border-2 whitespace-nowrap ${
                      selectedTab === tab.id
                        ? 'bg-gradient-to-r from-slate-800 to-white text-white border-slate-600 shadow-lg shadow-slate-800/50'
                        : 'bg-transparent text-gray-400 border-gray-700/50 hover:border-slate-600/50 hover:text-sky-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`group relative cursor-pointer overflow-hidden rounded-lg transition-all duration-500 border-2 border-slate-700/30 hover:border-slate-600/70 hover:shadow-2xl hover:shadow-slate-800/20 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="absolute -top-2 -left-2 w-3 h-3 bg-slate-700 z-10"></div>

                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-50"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-slate-800 to-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-slate-800/50">
                        <Play className="w-7 h-7 text-white fill-white" />
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg text-xs font-black text-sky-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider">
                      {item.duration}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black to-transparent">
                      <p className="text-xs text-sky-300 font-black uppercase tracking-wider">{item.category}</p>
                      <h3 className="text-lg font-black text-white mt-1 uppercase">{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filteredItems.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg uppercase tracking-wider">No projects in this category yet</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border-2 border-slate-700/50 shadow-2xl shadow-slate-800/30 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-white hover:bg-slate-900 transition-colors font-black"
            >
              ✕
            </button>

            {/* Video Player */}
            <div className="relative aspect-video bg-black overflow-hidden">
              {selectedItem.videoUrl ? (
                selectedItem.videoUrl.startsWith('http') || selectedItem.videoUrl.startsWith('Qr0upTwWZ1I') || selectedItem.videoUrl.startsWith('TyuP7_B2URo') || selectedItem.videoUrl.startsWith('KWIFZqyoBNA') || selectedItem.videoUrl.startsWith('sfHTCvVoD7M') || selectedItem.videoUrl.startsWith('5OhMb6mWuns') ? (
                  // YouTube video
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedItem.videoUrl}?autoplay=1&modestbranding=1`}
                    title={selectedItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  // Local video file
                  <video
                    className="w-full h-full"
                    controls
                    autoPlay
                    controlsList="nodownload"
                  >
                    <source src={selectedItem.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <>
                  <img
                    src={selectedItem.thumbnail}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-lg bg-slate-800/20 backdrop-blur-sm flex items-center justify-center border-2 border-slate-600 hover:bg-slate-800/30 transition-all cursor-pointer">
                      <Play className="w-10 h-10 text-sky-300 fill-sky-300" />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sky-300 text-sm font-black uppercase tracking-wider">{selectedItem.category}</p>
                  <h2 className="text-3xl font-black text-white mt-2 uppercase">{selectedItem.title}</h2>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm uppercase tracking-wider">Duration</p>
                  <p className="text-2xl font-black text-sky-300">{selectedItem.duration}</p>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-semibold">{selectedItem.description}</p>
              <div className="flex gap-4">
                {selectedItem.videoUrl && (
                  selectedItem.videoUrl.startsWith('http') || selectedItem.videoUrl.startsWith('Qr0upTwWZ1I') || selectedItem.videoUrl.startsWith('TyuP7_B2URo') || selectedItem.videoUrl.startsWith('KWIFZqyoBNA') || selectedItem.videoUrl.startsWith('sfHTCvVoD7M') || selectedItem.videoUrl.startsWith('5OhMb6mWuns') ? (
                    <a
                      href={`https://youtube.com/watch?v=${selectedItem.videoUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-slate-800 to-white text-white font-black rounded-lg hover:scale-105 transition-transform duration-300 uppercase tracking-wider text-center"
                    >
                      Watch on YouTube
                    </a>
                  ) : (
                    <a
                      href={selectedItem.videoUrl}
                      download
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-slate-800 to-white text-white font-black rounded-lg hover:scale-105 transition-transform duration-300 uppercase tracking-wider text-center"
                    >
                      Download Video
                    </a>
                  )
                )}
                <button className="px-6 py-3 bg-white/10 text-white font-black rounded-lg hover:bg-white/20 transition-colors border-2 border-slate-700/50 uppercase tracking-wider">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Portfolio;
