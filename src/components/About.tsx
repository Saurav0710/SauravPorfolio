import { useEffect, useRef, useState } from 'react';
import { Film, Zap, Target } from 'lucide-react';

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 md:px-8 lg:px-16 bg-transparent relative overflow-hidden">
      {/* Cosmic accent effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-purple-900/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/2 left-1/4 w-96 h-96 bg-blue-900/8 blur-3xl rounded-full"></div>
      </div>
      {/* Industrial accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-center uppercase tracking-widest">
            <span className="bg-gradient-to-r from-slate-900 via-slate-600 to-white bg-clip-text text-transparent">
              About This Editor
            </span>
          </h2>
          <p className="text-center text-gray-400 text-lg mb-16 uppercase tracking-wide">Professional Video Production & Editing Services</p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-900/20 to-white/6 rounded-xl p-6 border-2 border-slate-700/30">
                <p className="text-lg text-gray-200 leading-relaxed font-semibold">
                  Professional video editor with expertise in cinematic storytelling, 
                  post-production workflows, and visual effects composition. Specializing in 
                  high-impact content creation for brands, documentaries, and commercial projects.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-white/6 to-slate-700/8 rounded-xl p-6 border-2 border-slate-600/30">
                <p className="text-lg text-gray-200 leading-relaxed font-semibold">
                  Equipped with industry-standard software and production knowledge. 
                  Delivering frame-perfect edits, color-graded content, and motion graphics 
                  that elevate your visual narratives to professional broadcast quality.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-900/20 to-slate-700/12 rounded-xl p-6 border-2 border-slate-600/30">
                <p className="text-lg text-gray-200 leading-relaxed font-semibold">
                  Every project receives meticulous attention to detail, precise timing, 
                  and artistic vision. Committed to delivering production-ready content 
                  that exceeds client expectations.
                </p>
              </div>
            </div>

            <div className="relative">
              {/* Equipment Stats Box */}
              <div className="relative bg-gradient-to-br from-gray-900 to-slate-950 rounded-xl p-8 border-3 border-slate-700/50 shadow-2xl shadow-slate-800/20">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-slate-700"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-white/8"></div>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-4 pb-6 border-b-2 border-slate-700/30">
                    <Film className="w-12 h-12 text-sky-300" />
                    <div>
                      <p className="text-gray-400 text-sm uppercase tracking-wider">Years in Post-Production</p>
                      <p className="text-4xl font-black text-sky-300">7+</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pb-6 border-b-2 border-white/10">
                    <Zap className="w-12 h-12 text-sky-300" />
                    <div>
                      <p className="text-gray-400 text-sm uppercase tracking-wider">Projects Delivered</p>
                      <p className="text-4xl font-black text-sky-300">200+</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Target className="w-12 h-12 text-sky-300" />
                    <div>
                      <p className="text-gray-400 text-sm uppercase tracking-wider">Client Satisfaction</p>
                      <p className="text-4xl font-black text-sky-300">100%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
