import { useEffect, useState } from 'react';

interface ScrollPosition {
  progress: number; // 0 to 1
  scrollY: number;
}

function ScrollEffects() {
  const [scroll, setScroll] = useState<ScrollPosition>({ progress: 0, scrollY: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;

      setScroll({ progress, scrollY });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate positions based on scroll
  const baseOffset = scroll.scrollY * 0.5; // Parallax effect

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Nebula cloud 1 - purple/pink cosmic dust */}
      <div
        className="absolute top-1/4 left-1/3 opacity-20 transition-transform duration-75"
        style={{
          transform: `translateY(${baseOffset * 0.3}px)`,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0.2) 20%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      ></div>

      {/* Nebula cloud 2 - blue cosmic dust */}
      <div
        className="absolute bottom-1/3 right-1/4 opacity-15 transition-transform duration-75"
        style={{
          transform: `translateY(${-baseOffset * 0.2}px)`,
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 25%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      ></div>

      {/* Nebula cloud 3 - cyan cosmic glow */}
      <div
        className="absolute top-2/3 left-1/4 opacity-12 transition-transform duration-75"
        style={{
          transform: `translateY(${baseOffset * 0.4}px)`,
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, rgba(34, 211, 238, 0.1) 30%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      ></div>

      {/* Distant star cluster particles */}
      <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" style={{ mixBlendMode: 'screen' }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Random star points */}
        <circle cx="15%" cy="20%" r="1" fill="white" opacity="0.8" filter="url(#glow)" />
        <circle cx="85%" cy="15%" r="0.8" fill="#e0f7ff" opacity="0.6" />
        <circle cx="25%" cy="65%" r="1.2" fill="#c7d2fe" opacity="0.7" />
        <circle cx="70%" cy="40%" r="0.6" fill="white" opacity="0.5" />
        <circle cx="40%" cy="80%" r="1" fill="#ffd6ff" opacity="0.6" />
        <circle cx="95%" cy="70%" r="0.7" fill="white" opacity="0.7" />
        <circle cx="10%" cy="50%" r="1.3" fill="#a5f3fc" opacity="0.5" />
        <circle cx="55%" cy="10%" r="0.9" fill="white" opacity="0.6" />
        
        {/* Cosmic dust streaks */}
        <line x1="0%" y1="30%" x2="20%" y2="25%" stroke="white" strokeWidth="0.5" opacity="0.2" />
        <line x1="80%" y1="60%" x2="100%" y2="65%" stroke="#c7d2fe" strokeWidth="0.3" opacity="0.15" />
        <line x1="30%" y1="0%" x2="35%" y2="15%" stroke="#a5f3fc" strokeWidth="0.4" opacity="0.2" />
      </svg>

      {/* Scroll-responsive cosmic highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + scroll.progress * 30}% ${50 - scroll.progress * 20}%, rgba(168, 85, 247, 0.1) 0%, transparent 60%)`,
        }}
      ></div>

      {/* Progress bar - cosmic timeline */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-600/30 to-transparent opacity-40">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-100"
          style={{ width: `${scroll.progress * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ScrollEffects;