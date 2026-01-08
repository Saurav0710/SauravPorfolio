import { useEffect, useRef, useState } from 'react';
import sauravImg from '/images/GenAI/saurav.png';

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 md:px-8 lg:px-16 bg-transparent relative overflow-hidden"
    >
      {/* Cosmic accent effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-purple-900/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/2 left-1/4 w-96 h-96 bg-blue-900/8 blur-3xl rounded-full"></div>
      </div>

      {/* Industrial accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-center uppercase tracking-widest">
            <span className="bg-gradient-to-r from-slate-900 via-slate-600 to-white bg-clip-text text-transparent">
              About This Editor
            </span>
          </h2>
          <p className="text-center text-gray-400 text-lg mb-16 uppercase tracking-wide">
            GenAI Video Production & Editing Services
          </p>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT – Text */}
            <div className="bg-gradient-to-br from-slate-900/20 to-white/6 rounded-xl p-8 border-2 border-slate-700/30 space-y-6">
              <p className="text-lg text-gray-200 leading-relaxed font-semibold">
                GenAI-powered video creator with 2 years of experience crafting compelling
                cinematic stories for top brands like Samsung, Ultratech, Piramal, and
                Visit Health. Skilled in leveraging AI-driven post-production workflows,
                visual effects, motion graphics and creating high-impact content that
                drives results. Proficient in transforming concepts into captivating
                visual narratives for brands.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                Hands-on expertise in <span className="font-semibold text-white">Adobe Premiere Pro</span>,{' '}
                <span className="font-semibold text-white">DaVinci Resolve</span>, and{' '}
                <span className="font-semibold text-white">After Effects</span> for editing,
                color grading, and motion graphics. Skilled in building efficient,
                high-quality post-production pipelines and crafting cinematic brand
                stories with precision and speed. Leverages{' '}
                <span className="font-semibold text-white">Kling</span> and{' '}
                <span className="font-semibold text-white">Seedream</span> to integrate
                GenAI workflows into ideation, visual generation, and creative enhancement,
                enabling faster turnarounds and scalable content creation.
              </p>
            </div>

            {/* RIGHT – Photo */}
            <div className="relative flex justify-center">
              <div className="relative bg-gradient-to-br from-gray-900 to-slate-950 rounded-2xl p-4 border-2 border-slate-700/50 shadow-2xl shadow-slate-800/30">
                <img
                  src={sauravImg}
                  alt="Saurav Jadhav"
                  className="w-full max-w-sm rounded-xl object-cover"
                />

                {/* Corner accents */}
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-slate-700"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-white/10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
