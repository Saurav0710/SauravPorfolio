import { Mail, Linkedin, Twitter, Github, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const socialLinks = [
  { icon: Mail, label: 'Email', href: 'mailto:sauravjadhavedu@gmail.com', color: 'hover:text-sky-300' },
  { icon: Linkedin, label: 'LinkedIn', href: 'www.linkedin.com/in/saurav-jadhav-643601220/', color: 'hover:text-sky-300' },
  { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:text-sky-300' },
  { icon: Github, label: 'Github', href: '#', color: 'hover:text-sky-300' }
];

function Contact() {
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
      {/* Cosmic nebula effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-900/12 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-900/10 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-center uppercase tracking-widest">
            <span className="bg-gradient-to-r from-slate-900 to-white bg-clip-text text-transparent">
              Ready to Create?
            </span>
          </h2>
          <p className="text-gray-300 text-center mb-16 max-w-2xl mx-auto text-lg font-semibold">
            Let's bring your vision to life with professional video production and editing expertise.
          </p>

          <div className="bg-gradient-to-br from-gray-900 to-slate-950 rounded-xl p-12 border-3 border-slate-700/50 shadow-2xl shadow-slate-800/20">
            {/* Corner accents */}
           
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/8"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-white/8"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-slate-700"></div>

            <div className="text-center mb-12">
                <a
                href="mailto:hello@sauravjadhav.com"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-slate-800 to-white rounded-lg text-white font-black text-lg uppercase tracking-wider transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-slate-800/60 border-2 border-slate-600"
              >
                <Send className="w-6 h-6" />
                Get In Touch Now
              </a>
            </div>

            <div className="flex justify-center gap-8 mb-12">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`group flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-slate-700/30 text-gray-300 transition-all duration-300 hover:scale-125 hover:bg-gradient-to-br hover:from-slate-800 hover:to-white hover:border-slate-600 ${social.color} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>

            <div className="text-center border-t-2 border-slate-700/30 pt-8">
              <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">
                © 2026 Saurav Jadhav • Professional Video Editing & Production
              </p>
              <p className="text-gray-500 text-xs mt-2 tracking-wider">
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
