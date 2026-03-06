import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import FloatingNav from './components/FloatingNav';
import CinematicHero from './components/CinematicHero';
import FunctionalArtifacts from './components/Features/FunctionalArtifacts';
import Manifesto from './components/Manifesto';
import StickyArchive from './components/StickyArchive';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {

  useEffect(() => {
    // Initialize Lenis for buttery smooth scrolling mechanics
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="app-wrapper bg-obsidian text-ivory selection:bg-terracotta selection:text-obsidian min-h-screen">
      <FloatingNav />
      <main>
        <CinematicHero />
        <FunctionalArtifacts />
        <Manifesto />
        <StickyArchive />
      </main>
      <Footer />
    </div>
  );
}

export default App;
