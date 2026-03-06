import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function FloatingNav() {
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Initial entrance morph
        gsap.from(navRef.current, {
            y: -50,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.2
        });
    }, []);

    return (
        <div className="fixed top-6 left-0 w-full flex justify-center z-[100] px-4 pointer-events-none">
            <nav
                ref={navRef}
                className={`pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${scrolled
                        ? 'w-[90%] max-w-5xl bg-obsidian/60 backdrop-blur-xl border border-white/10 shadow-2xl'
                        : 'w-full max-w-7xl bg-transparent border-transparent'
                    }`}
            >
                <div className="flex-1 flex justify-start">
                    <div className="font-sans font-black text-xl tracking-tighter uppercase text-ivory">
                        MM<span className="text-terracotta">.</span>
                    </div>
                </div>

                <div className="hidden md:flex gap-8 justify-center font-sans text-xs tracking-[0.15em] uppercase font-medium text-ivory/70">
                    <a href="#services" className="hover:text-ivory hover:-translate-y-[1px] transition-all duration-300">Services</a>
                    <a href="#approach" className="hover:text-ivory hover:-translate-y-[1px] transition-all duration-300">Philosophy</a>
                    <a href="#about" className="hover:text-ivory hover:-translate-y-[1px] transition-all duration-300">Profile</a>
                </div>

                <div className="flex-1 flex justify-end">
                    <a href="#contact" className="btn-magnetic bg-transparent border border-white/20 text-ivory text-xs px-6 py-2.5 rounded-full hover:border-terracotta/50">
                        <span>Let's Talk</span>
                    </a>
                </div>
            </nav>
        </div>
    );
}
