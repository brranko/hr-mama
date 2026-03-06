import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Linkedin } from 'lucide-react';
import './About.css';

export default function About() {
    const container = useRef(null);

    useGSAP(() => {
        // Scroll reveal for the entire about section
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top 75%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        tl.from('.about-image-wrapper', { x: -100, opacity: 0, duration: 1, ease: 'power3.out' })
            .from('.about-content-item', { y: 30, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out' }, "-=0.6")
            .from('.stat-item', { scale: 0.8, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'back.out(1.7)' }, "-=0.4");

        // Micro parallax on the image for depth
        gsap.to('.about-image', {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
                trigger: '.about-image-wrapper',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }, { scope: container });

    return (
        <section className="about-section" id="about" ref={container}>
            <div className="container about-container">

                <div className="about-grid">

                    <div className="about-image-wrapper">
                        {/* Fallback pattern if image is missing is handled in CSS */}
                        <div className="image-overflow-hidden">
                            <img src="/abstract-hr.png" alt="Essence of HR" className="about-image" onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.classList.add('image-fallback-active');
                            }} />
                        </div>
                        {/* SOTA glow decos */}
                        <div className="about-decoration deco-1"></div>
                        <div className="about-decoration deco-2"></div>
                    </div>

                    <div className="about-content">
                        <h2 className="section-title about-content-item">
                            The architecture of <br /> <span className="text-gradient">modern teams.</span>
                        </h2>

                        <p className="about-text about-content-item">
                            Hi, I'm <strong>Malin Markén</strong>. I am an independent Senior HR Business Partner and Consultant
                            operating from Stockholm, Sweden. I specialize in building, transforming, and leading HR structures
                            built for the future.
                        </p>

                        <p className="about-text about-content-item">
                            I combine high-level strategic thinking with direct operational execution.
                            Whether working with tech startups scaling rapidly or complex global organizations navigating
                            digital transformation, my approach centers on <em>trust, psychological safety, and clear results</em>.
                        </p>

                        <ul className="about-list about-content-item">
                            <li>Senior HRBP & Interim Expert</li>
                            <li>Organizationsutveckling & Förändringsledning</li>
                            <li>Tech & Innovative Organizations Experience</li>
                            <li>Digital Transformation Leadership</li>
                        </ul>

                        <div className="about-actions about-content-item">
                            <a href="https://www.linkedin.com/in/malinmarken/?originalSubdomain=se" target="_blank" rel="noopener noreferrer" className="btn btn-secondary linkedin-btn">
                                <Linkedin size={20} className="li-icon" /> Connect on LinkedIn
                            </a>
                        </div>

                        <div className="about-stats glass-panel about-content-item">
                            <div className="stat-item">
                                <span className="stat-number accent-gradient">15+</span>
                                <span className="stat-label">Years of<br />Expertise</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-number accent-gradient">Tech</span>
                                <span className="stat-label">Fast-scaling<br />Environments</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-number accent-gradient">Top</span>
                                <span className="stat-label">Consulting &<br />Execution</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
