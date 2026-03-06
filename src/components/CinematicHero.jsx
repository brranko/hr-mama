import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CinematicHero() {
    const container = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.3 });

        // Animate the image scale-in slightly
        tl.from('.hero-bg-img', {
            scale: 1.1,
            duration: 3,
            ease: 'power3.out'
        }, 0);

        // Staggered text reveal
        tl.from('.reveal-text', {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out'
        }, 0.5);

        // Fade in CTA
        tl.from('.hero-cta', {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power3.out'
        }, "-=0.8");

    }, { scope: container });

    return (
        <section ref={container} className="relative w-full h-[100dvh] overflow-hidden bg-obsidian flex items-end">

            {/* Background Layer: Portrait Image */}
            <div className="absolute inset-0 z-0 flex justify-end">
                <div className="relative w-full md:w-[60%] h-full">
                    <img
                        src="/malin-bw.jpg"
                        alt="Malin Markén Portrait"
                        className="hero-bg-img w-full h-full object-cover object-[center_top] md:object-[center_30%] opacity-90"
                    />
                    {/* Mobile: Bottom-up gradient fade covering only the bottom 50%. Desktop: Heavy left-to-right gradient fade into black */}
                    <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-obsidian via-obsidian/95 to-transparent md:inset-0 md:h-full md:bg-none"></div>
                    <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-obsidian via-obsidian/90 to-transparent w-[120%] -ml-[20%]"></div>
                </div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-[45dvh] pb-12 flex flex-col items-start justify-end md:pt-0 md:pb-32">
                <div className="max-w-3xl">

                    <h1 className="flex flex-col gap-2">
                        <span className="reveal-text font-sans font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-tight text-ivory">
                            Organizations get stuck.
                        </span>
                        <span className="reveal-text font-serif italic text-6xl md:text-8xl lg:text-[7rem] leading-none text-terracotta pr-4 pb-2">
                            I unstick them.
                        </span>
                    </h1>

                    <p className="reveal-text mt-8 text-lg md:text-xl font-sans text-ivory/80 max-w-xl font-light leading-relaxed">
                        I combine high-level strategic thinking with direct operational execution to build, transform, and lead HR structures designed for the future.
                    </p>

                    <div className="hero-cta mt-12 flex items-center gap-6">
                        <a href="#services" className="btn-magnetic px-8 py-4 rounded-[2rem] bg-terracotta text-obsidian border-none hover:text-obsidian">
                            <span>See the protocol ↓</span>
                        </a>
                    </div>

                </div>
            </div>

        </section>
    );
}
