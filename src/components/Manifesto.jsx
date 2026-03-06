import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Manifesto() {
    const container = useRef(null);

    useGSAP(() => {
        // Parallax background
        gsap.to('.manifesto-bg', {
            scrollTrigger: {
                trigger: container.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            yPercent: 20,
            ease: 'none'
        });

        // Reveal text lines
        gsap.from('.manifesto-line', {
            scrollTrigger: {
                trigger: container.current,
                start: 'top 60%',
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }, { scope: container });

    return (
        <section id="approach" ref={container} className="relative w-full py-40 overflow-hidden bg-obsidian flex items-center">

            {/* Dark Texture Parallax Bg */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src="/malin-bw.jpg"
                    alt="Texture"
                    className="manifesto-bg w-full h-[130%] object-cover object-center opacity-10 filter grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                <div>
                    <h2 className="manifesto-line font-sans font-bold text-lg md:text-2xl text-ivory/80 leading-snug max-w-md">
                        Most HR consulting focuses on theoretical models and generic compliance.
                    </h2>
                </div>

                <div>
                    <h2 className="flex flex-col gap-4">
                        <span className="manifesto-line font-serif italic text-4xl md:text-6xl lg:text-7xl text-ivory leading-none">
                            My focus is on
                        </span>
                        <span className="manifesto-line font-serif italic text-4xl md:text-6xl lg:text-7xl text-terracotta leading-none">
                            trust, psychological safety, and clear results.
                        </span>
                    </h2>
                </div>

            </div>
        </section>
    );
}
