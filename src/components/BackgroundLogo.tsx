const logos = [
  '/videos/background%20logo/1.jpg',
  '/videos/background%20logo/2.png',
  '/videos/background%20logo/3.png',
  '/videos/background%20logo/adobe.png',
  '/videos/background%20logo/AE.png',
  '/videos/background%20logo/davinci-resolve.png',
  '/videos/background%20logo/photoshop.png',
];

function getRandomValues() {
  // Random starting position
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;
  
  // Random ending position - move in any direction
  const endX = (Math.random() - 0.5) * 400;
  const endY = (Math.random() - 0.5) * 400;
  
  // Random duration - longer for continuous movement
  const duration = 20 + Math.random() * 40;
  
  // Random delay
  const delay = Math.random() * 3;
  
  return { startX, startY, endX, endY, duration, delay };
}

function BackgroundLogo() {
  return (
    <div className="bg-logos-animated pointer-events-none fixed inset-0 z-0">
      {/* Multiple moving logo instances */}
      {logos.map((logo, idx) => {
        const { startX, startY, endX, endY, duration, delay } = getRandomValues();
        
        return (
          <div
            key={idx}
            className="bg-logo-float"
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
              '--end-x': `${endX}px`,
              '--end-y': `${endY}px`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            } as React.CSSProperties & { '--end-x': string; '--end-y': string }}
          >
            <img
              src={logo}
              alt="background logo"
              className="bg-logo-item"
              style={{
                width: `${80 + idx * 25}px`,
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default BackgroundLogo;
