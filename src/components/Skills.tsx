import { Layers, Palette, Zap, Settings } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const skills = [
  {
    icon: Layers,
    title: 'Video Editing',
    description: 'Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve. Professional multi-layer editing with advanced compositing and timeline management.',
    gradient: 'from-slate-900 to-white'
  },
  {
    icon: Palette,
    title: 'Color Grading',
    description: 'Professional color correction and grading. LUT creation, color science, broadcast-standard color spaces, and cinematic looks.',
    gradient: 'from-slate-700 to-white/80'
  },
  {
    icon: Settings,
    title: 'Motion Graphics',
    description: 'After Effects, Cinema 4D, optical flow. Dynamic titles, transitions, VFX, and professional animation for broadcast quality.',
    gradient: 'from-slate-700 to-white/70'
  },
  {
    icon: Zap,
    title: 'Audio Engineering',
    description: 'Sound design, mixing, mastering. Professional audio production with Adobe Audition and industry-standard plugins.',
    gradient: 'from-slate-800 to-white'
  }
];

function Skills() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section ref={sectionRef} className="py-24 px-4 md:px-8 lg:px-16 bg-transparent relative overflow-hidden">
      {/* Cosmic nebula effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -left-1/4 w-96 h-96 bg-purple-900/12 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyan-900/10 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-center uppercase tracking-widest">
            <span className="bg-gradient-to-r from-slate-900 via-slate-600 to-white bg-clip-text text-transparent">
              Equipment & Skills
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto text-lg uppercase tracking-wide">
            Professional production tools and technical expertise
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.title}
                className={`group relative bg-gradient-to-br from-gray-900/50 to-slate-900/50 rounded-xl p-8 border-2 border-slate-700/30 transition-all duration-500 hover:scale-105 hover:border-slate-600/70 hover:shadow-2xl hover:shadow-slate-800/20 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Corner accents */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-slate-700"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white/8"></div>

                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${skill.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-slate-800/30`}>
                  <skill.icon className="w-8 h-8 text-white font-bold" />
                </div>

                <h3 className="text-2xl font-black mb-3 text-white uppercase tracking-wide">{skill.title}</h3>
                <p className="text-gray-300 leading-relaxed font-semibold">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
