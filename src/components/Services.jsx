import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, BrainCircuit, Target, ArrowRight } from 'lucide-react';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        icon: <Zap size={48} strokeWidth={1.5} />,
        title: 'On-Demand HR Force',
        subtitle: 'Plug-and-play strategic expertise.',
        description: 'Immediate, high-level HR expertise precisely when your startup needs it. I step into fast-moving environments—from tech startups to scale-ups—providing the strategic foundation you need without the bloat of a full-time department. Perfect for rapid growth phases.',
        color: 'var(--accent-primary)'
    },
    {
        icon: <BrainCircuit size={48} strokeWidth={1.5} />,
        title: 'Complex Problem Solving',
        subtitle: 'Navigating the tricky organizational knots.',
        description: 'Change management, digital transformation, and cultural shifts require nuance and resilience. I untangle the most complicated people problems—from leadership friction to complex re-orgs—so your core business can keep accelerating safely and ethically.',
        color: '#D8B4E2' /* Muted purple accent */
    },
    {
        icon: <Target size={48} strokeWidth={1.5} />,
        title: 'Laser-Focused Interventions',
        subtitle: 'Precision strikes for targeted issues.',
        description: 'Specific challenges require surgical precision. Whether it is coaching an executive through a crisis, overhauling non-compliant processes, or driving a specific cultural pivot, I craft bespoke, laser-focused interventions that deliver immediate impact.',
        color: '#88C9A1' /* Soft mint accent */
    }
];

export default function Services() {
    const container = useRef(null);

    useGSAP(() => {
        // We want the cards to stack on top of each other as the user scrolls
        const cards = gsap.utils.toArray('.service-card-stack', container.current);

        cards.forEach((card, i) => {
            // The pinning mechanic: 
            // Each card pins when it hits a safe top distance (e.g. 15vh)
            // and unpins when the entire container finishes scrolling
            ScrollTrigger.create({
                trigger: card,
                start: `top ${15 + (i * 2)}%`, // Slight staggered offset for visual stacking
                endTrigger: container.current,
                end: 'bottom bottom',
                pin: true,
                pinSpacing: false,
                id: `card-pin-${i}`
            });
        });

        // Scale and fade down the underlying cards to simulate depth
        cards.forEach((card, i) => {
            if (i === cards.length - 1) return; // Last card doesn't get scaled down by anything

            gsap.to(card, {
                scale: 0.9,
                opacity: 0.5,
                transformOrigin: "top center",
                scrollTrigger: {
                    trigger: cards[i + 1],
                    start: `top ${15 + ((i + 1) * 2)}%`,
                    end: 'top top',
                    scrub: true
                }
            });
        });

        // Reveal title
        gsap.from('.services-sticky-header', {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: container.current,
                start: 'top 80%',
            }
        });

    }, { scope: container });

    return (
        <section className="services-section" id="services" ref={container}>
            <div className="container">

                <div className="services-sticky-header">
                    <div className="section-badge glass-panel text-gradient" style={{ display: 'inline-block' }}>
                        Core Expertise
                    </div>
                    <h2 className="section-title services-main-title">
                        The capability to <span className="accent-gradient">execute.</span>
                    </h2>
                </div>

                <div className="cards-wrapper">
                    {services.map((service, index) => (
                        <div key={index} className="service-card-stack glass-panel">
                            <div className="card-inner" style={{ borderTop: `4px solid ${service.color}` }}>

                                <div className="card-top">
                                    <div className="card-icon" style={{ color: service.color }}>
                                        {service.icon}
                                    </div>
                                    <div className="card-number" style={{ color: service.color }}>
                                        0{index + 1}
                                    </div>
                                </div>

                                <div className="card-content">
                                    <h3 className="card-title">{service.title}</h3>
                                    <h4 className="card-subtitle">{service.subtitle}</h4>
                                    <p className="card-desc">{service.description}</p>
                                </div>

                                <div className="card-footer">
                                    <button className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}>
                                        Learn More <ArrowRight size={16} />
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
