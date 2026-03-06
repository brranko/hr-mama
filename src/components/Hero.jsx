import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

export default function Hero() {
    const container = useRef(null);

    useGSAP(() => {
        // Cinematic Intro Timeline
        const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

        // Staggered text reveal for large impact
        tl.from('.hero-badge-tag', { y: 20, opacity: 0, duration: 1, delay: 0.2 })
            .from('.char-reveal', {
                yPercent: 100,
                rotate: 5,
                opacity: 0,
                stagger: 0.03,
                duration: 1.2,
                ease: 'expo.out'
            }, "-=0.8")
            .from('.hero-subtitle', { opacity: 0, y: 30, duration: 1.5 }, "-=1")
            .from('.hero-actions', { opacity: 0, y: 20, duration: 1 }, "-=1.2")
            .from('.hero-portrait-wrapper', { opacity: 0, x: 50, duration: 1.5, ease: 'power3.out' }, "-=1.5")
            .from('.floating-stat', { opacity: 0, scale: 0.8, y: 30, duration: 1, ease: 'back.out(1.5)' }, "-=0.5");

        // Parallax background on scroll
        gsap.to('.hero-glow-bg', {
            yPercent: 30,
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
                trigger: container.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Parallax for the portrait
        gsap.to('.hero-portrait', {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
                trigger: container.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }, { scope: container });

    // Helper to split text into chars for SOTA reveal
    const splitText = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className="char-wrapper" style={{ display: 'inline-block', overflow: 'hidden' }}>
                <span className="char-reveal" style={{ display: 'inline-block' }}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            </span>
        ));
    };

    return (
        <section className="hero-section" ref={container}>
            <div className="hero-glow-bg"></div>

            <div className="container hero-container">
                <div className="hero-content">

                    <div className="hero-badge-tag">
                        <span style={{ color: 'var(--accent-primary)' }}>—</span>
                        <span style={{ color: 'var(--accent-primary)', marginLeft: '0.5rem', letterSpacing: '0.15em' }}>
                            STRATEGIC HR LEADERSHIP
                        </span>
                    </div>

                    <h1 className="hero-title font-serif">
                        <div className="title-row">{splitText('Organizations')}</div>
                        <div className="title-row">
                            {splitText('get ')}
                            <span style={{ color: 'var(--accent-primary)' }}>{splitText('stuck.')}</span>
                        </div>
                        <div className="title-row">{splitText('I unstick')}</div>
                        <div className="title-row">{splitText('them.')}</div>
                    </h1>

                    <p className="hero-subtitle">
                        Senior HR leader with 18+ years transforming organizations through strategic leadership, cultural change, and digital transformation. From global NGOs to Big Tech — wherever the challenge is, I deliver.
                    </p>

                    <div className="hero-actions">
                        <a href="#contact" className="btn btn-primary">
                            Start a Conversation <ArrowRight size={16} />
                        </a>
                        <a href="#experience" className="btn btn-ghost" style={{ fontSize: '0.8rem', opacity: 0.6, display: 'flex', gap: '8px' }}>
                            See the track record ↓
                        </a>
                    </div>

                </div>
            </div>

            <div className="hero-portrait-wrapper">
                <img src="/malin-bw.jpg" alt="Malin Markén" className="hero-portrait" />
                <div className="hero-portrait-glow"></div>

                <div className="floating-stat glass-panel">
                    <div className="stat-value accent-gradient">+43</div>
                    <div className="stat-label">eNPS achieved</div>
                </div>
            </div>
        </section>
    );
}
