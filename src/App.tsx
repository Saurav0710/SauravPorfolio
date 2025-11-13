import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';

import Projects from './components/Projects';
import Contact from './components/Contact';
import ScrollEffects from './components/ScrollEffects';
import Stardust from './components/Stardust';
import BackgroundLogo from './components/BackgroundLogo';

function App() {
  return (
    <div className="min-h-screen bg-transparent text-white relative">
      <Stardust />
      <BackgroundLogo />
      <ScrollEffects />
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App;
