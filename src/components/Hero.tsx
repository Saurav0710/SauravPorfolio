import { ChevronDown, Zap, Clapperboard } from 'lucide-react';
import { useEffect, useState } from 'react';

function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Cosmic Universe Background */}
      <div className="absolute inset-0 bg-transparent">
        {/* Nebula glow layers */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-900/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-900/15 blur-3xl rounded-full"></div>
        <div className="absolute top-2/3 left-1/4 w-80 h-80 bg-cyan-900/10 blur-3xl rounded-full"></div>
      </div>

      <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-5 py-3 rounded-lg bg-gradient-to-r from-slate-800/20 to-white/10 backdrop-blur-sm border-2 border-slate-700/50">
          <Clapperboard className="w-5 h-5 text-sky-300 animate-pulse" />
          <span className="text-sm font-bold text-sky-300 uppercase tracking-widest">Professional Video Editor</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter">
          <span className="block bg-gradient-to-r from-slate-900 via-slate-700 to-white bg-clip-text text-transparent drop-shadow-2xl">
            SAURAV
          </span>
          <span className="block bg-gradient-to-r from-white/80 to-slate-600 bg-clip-text text-transparent drop-shadow-2xl">
            JADHAV
          </span>
        </h1>

        {/* Subtitle */}
        <div className="space-y-3 mb-12 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 font-bold uppercase tracking-wide">
            Video Editing <span className="text-sky-300 font-black">|</span> Post-Production
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-bold uppercase tracking-wide">
            Motion Graphics <span className="text-sky-300 font-black">|</span> Color Grading
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-slate-900 to-white mx-auto mt-4"></div>
        </div>

        {/* CTA Button */}
        <button
          onClick={scrollToNext}
          className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-slate-800 to-white rounded-lg text-white font-black text-lg uppercase tracking-wider transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-slate-800/60 border-2 border-slate-600"
        >
          <Zap className="w-6 h-6" />
          Start Editing Journey
          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="relative">
          <ChevronDown className="w-8 h-8 text-sky-300 font-bold" />
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}

export default Hero;
