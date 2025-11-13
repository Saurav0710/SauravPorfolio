import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  animationType: 1 | 2 | 3;
}

function Stardust() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create initial particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      initialParticles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 120 + 20, // Start slightly below visible area
        size: Math.floor(Math.random() * 3) + 1,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 5,
        animationType: (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3,
      });
    }
    setParticles(initialParticles);

    // Regenerate particles periodically
    const interval = setInterval(() => {
      setParticles(prev =>
        prev.map((particle) => ({
          ...particle,
          id: particle.id + 100,
          left: Math.random() * 100,
          top: Math.random() * 120 + 20,
          duration: Math.random() * 8 + 10,
          delay: Math.random() * 5,
          animationType: (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3,
        }))
      );
    }, 15000); // Regenerate every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`stardust size-${particle.size}`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animation:
              particle.animationType === 1
                ? `float1 ${particle.duration}s linear ${particle.delay}s infinite`
                : particle.animationType === 2
                ? `float2 ${particle.duration}s linear ${particle.delay}s infinite`
                : `float3 ${particle.duration}s linear ${particle.delay}s infinite`,
            opacity: 0.3 + Math.random() * 0.7,
          }}
        />
      ))}

      {/* Fixed static stars with twinkling */}
      <div
        className="stardust size-2"
        style={{
          left: '15%',
          top: '25%',
          animation: 'twinkle 3s ease-in-out infinite',
          opacity: 0.8,
        }}
      />
      <div
        className="stardust size-1"
        style={{
          left: '85%',
          top: '15%',
          animation: 'twinkle 4s ease-in-out infinite',
          opacity: 0.6,
          animationDelay: '1s',
        }}
      />
      <div
        className="stardust size-3"
        style={{
          left: '30%',
          top: '70%',
          animation: 'twinkle 3.5s ease-in-out infinite',
          opacity: 0.7,
          animationDelay: '0.5s',
        }}
      />
      <div
        className="stardust size-1"
        style={{
          left: '70%',
          top: '40%',
          animation: 'twinkle 4.5s ease-in-out infinite',
          opacity: 0.5,
          animationDelay: '1.5s',
        }}
      />
      <div
        className="stardust size-2"
        style={{
          left: '90%',
          top: '60%',
          animation: 'twinkle 3s ease-in-out infinite',
          opacity: 0.8,
          animationDelay: '2s',
        }}
      />
      <div
        className="stardust size-1"
        style={{
          left: '10%',
          top: '50%',
          animation: 'twinkle 4s ease-in-out infinite',
          opacity: 0.6,
          animationDelay: '2.5s',
        }}
      />
    </div>
  );
}

export default Stardust;
