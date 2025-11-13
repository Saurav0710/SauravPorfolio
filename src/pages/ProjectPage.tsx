import { useRef, useState, useEffect } from 'react';
import { categories } from '../data/projectsData';

function parseCategoryFromPath(path: string) {
  const parts = path.split('/').filter(Boolean);
  // expected /projects/:key
  if (parts[0] === 'projects' && parts[1]) return decodeURIComponent(parts[1]);
  return null;
}

function goHome() {
  // Change URL first
  window.history.pushState({}, '', '/');
  
  // Trigger a custom event to notify the app to navigate
  window.dispatchEvent(new CustomEvent('navigate-home'));
}

export default function ProjectPage() {
  const [categoryKey, setCategoryKey] = useState<string | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // Parse URL immediately on component mount
    const key = parseCategoryFromPath(window.location.pathname);
    setCategoryKey(key);
    const urlParams = new URLSearchParams(window.location.search);
    const vid = urlParams.get('video');
    setSelectedVideoId(vid);
  }, []);

  const category = categoryKey ? categories.find((c) => c.key === categoryKey) : null;
  
  // Only show items from the current category
  const categoryItems = category?.items.map((it) => ({ ...it, categoryKey: category.key, categoryTitle: category.title })) || [];
  
  const selectedVideo = categoryItems.find((i) => i.id === selectedVideoId) || categoryItems[0] || null;

  const playFullscreen = async () => {
    if (!selectedVideo) return;
    if (selectedVideo.source === 'local') {
      const v = videoRef.current;
      if (!v) return;
      try {
        v.muted = false;
        await v.play();
        if (v.requestFullscreen) await v.requestFullscreen();
      } catch {}
    } else {
      const iframe = iframeRef.current;
      if (!iframe) return;
      try {
        iframe.src = `https://www.youtube.com/embed/${selectedVideo.videoUrl}?autoplay=1&rel=0`;
        if ((iframe as any).requestFullscreen) await (iframe as any).requestFullscreen();
      } catch {}
    }
  };

  const openVideo = (id: string) => {
    setSelectedVideoId(id);
    const url = new URL(window.location.href);
    url.searchParams.set('video', id);
    window.history.replaceState({}, '', url.toString());
  };

  // when selectedVideo changes, update the preview and autoplay muted (background behavior)
  useEffect(() => {
    if (!selectedVideo) return;
    if (selectedVideo.source === 'local') {
      const v = videoRef.current;
      if (!v) return;
      try {
        v.pause();
        v.src = selectedVideo.videoUrl;
        v.muted = true;
        v.loop = true;
        v.play().catch(() => {});
      } catch {}
      if (iframeRef.current) iframeRef.current.src = '';
    } else {
      // youtube preview: autoplay muted in embed
      if (iframeRef.current) {
        iframeRef.current.src = `https://www.youtube.com/embed/${selectedVideo.videoUrl}?autoplay=1&mute=1&loop=1&playlist=${selectedVideo.videoUrl}&controls=0&rel=0`;
      }
      if (videoRef.current) {
        try {
          videoRef.current.pause();
          videoRef.current.src = '';
        } catch {}
      }
    }
  }, [selectedVideoId, selectedVideo]);

  // conditional render: show error if no category
  if (!categoryKey) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Category not found</h2>
          <p className="mt-2">Open from the Projects list to view a category.</p>
          <button onClick={goHome} className="mt-4 px-6 py-2 bg-sky-600 rounded-lg">Go Home</button>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <div className="text-center">
          <p>Unknown category: {categoryKey}</p>
          <button onClick={goHome} className="mt-4 px-6 py-2 bg-sky-600 rounded-lg">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen relative bg-black text-white overflow-x-hidden">
      {/* Background Video - Full Screen */}
      <div className="fixed inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10"></div>
        
        {selectedVideo?.source === 'local' ? (
          <video 
            ref={videoRef} 
            className="w-full h-full object-contain" 
            playsInline 
            muted 
            loop 
            autoPlay
          />
        ) : (
          <iframe 
            ref={iframeRef} 
            title={selectedVideo?.title} 
            className="w-full h-full"
            src={selectedVideo ? `https://www.youtube.com/embed/${selectedVideo.videoUrl}?autoplay=1&mute=1&loop=1&playlist=${selectedVideo.videoUrl}&controls=0&rel=0` : ''} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
          />
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Header with Home Button */}
        <header className="p-6">
          <button 
            onClick={goHome} 
            className="text-white text-2xl font-bold hover:text-sky-400 transition-colors flex items-center gap-2"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Home
          </button>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-20">
          {/* Video Details on Left */}
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-lg">{selectedVideo?.title || category.title}</h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-xl drop-shadow-md">
              {selectedVideo?.description || category.subtitle}
            </p>

            {/* Play Button */}
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={playFullscreen} 
                className="px-8 py-4 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white rounded-lg font-bold text-lg hover:from-blue-800 hover:via-blue-600 hover:to-blue-400 transition-all flex items-center gap-3 shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Play
              </button>
              <button 
                className="px-6 py-4 bg-gray-600/80 text-white rounded-lg font-bold text-lg hover:bg-gray-600 transition-all shadow-lg"
              >
                More Info
              </button>
            </div>

            {/* Category Info */}
            <div className="flex items-center gap-4 text-sm text-gray-300 mb-2">
              <span className="font-semibold">{category.title}</span>
              <span>•</span>
              <span>{selectedVideo?.source === 'local' ? 'Local Video' : 'YouTube'}</span>
            </div>
          </div>

          {/* Full Collection - Horizontal Scroller */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">{category.title} Collection</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {categoryItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => openVideo(item.id)} 
                  className={`flex-shrink-0 w-80 rounded-lg overflow-hidden transition-all hover:scale-105 hover:ring-2 hover:ring-white ${
                    selectedVideo?.id === item.id ? 'ring-2 ring-sky-400' : ''
                  }`}
                >
                  <div className="relative aspect-video bg-gray-800">
                    {item.source === 'local' ? (
                      <video 
                        src={item.videoUrl} 
                        className="w-full h-full object-cover" 
                        muted 
                      />
                    ) : (
                      <img 
                        src={`https://img.youtube.com/vi/${item.videoUrl}/maxresdefault.jpg`} 
                        alt={item.title} 
                        className="w-full h-full object-cover" 
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg">{item.title}</h3>
                      {item.description && (
                        <p className="text-gray-300 text-sm mt-1 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
