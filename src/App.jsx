import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';

// Register Plugins globally
gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef(null);

  useGSAP(() => {
    // A quick intro reveal animation for the whole page shell
    gsap.to('.header-nav', {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5
    });
  }, { scope: appRef });

  return (
    <div className="app-wrapper" ref={appRef} style={{ background: 'var(--bg-primary)' }}>
      {/* Dynamic Header */}
      <header className="header-nav" style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        padding: '2rem 5vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        mixBlendMode: 'difference', /* SOTA trick for text visibility over changing backgrounds */
        color: '#fff',
        opacity: 0,
        transform: 'translateY(-20px)'
      }}>
        {/* Left: Boxed [M] Logo */}
        {/* Left: Logo */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.05em', textTransform: 'uppercase' }}>
            MM<span style={{ color: 'var(--accent-primary)' }}>.</span>
          </div>
        </div>

        {/* Center: Main Nav */}
        <nav style={{ display: 'flex', gap: '3vw', justifyContent: 'center' }}>
          <a href="#experience" style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>Experience</a>
          <a href="#services" style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>Services</a>
          <a href="#approach" style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>Approach</a>
        </nav>

        {/* Right: CTA Button */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <a href="#contact" style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'var(--accent-primary)',
            border: '1px solid var(--border-accent)',
            padding: '0.6rem 1.7rem',
            borderRadius: 'var(--radius-full)',
            transition: 'all 0.3s ease'
          }}>
            Let's Talk
          </a>
        </div>
      </header>

      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>

      <footer style={{
        padding: '6rem 5vw',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        background: 'var(--bg-secondary)',
      }}>
        <div>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem', letterSpacing: '-0.05em' }}>MM<span style={{ color: 'var(--accent-primary)' }}>.</span></h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '300px' }}>
            Top-tier HR consulting. Change management, digital transformation, and leadership coaching.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            © {new Date().getFullYear()} Malin Markén. <br />Stockholm, Sweden.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
