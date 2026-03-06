import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DiagnosticShuffler from './DiagnosticShuffler';
import TelemetryTypewriter from './TelemetryTypewriter';
import CursorScheduler from './CursorScheduler';

gsap.registerPlugin(ScrollTrigger);

export default function FunctionalArtifacts() {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from('.artifact-card', {
            scrollTrigger: {
                trigger: container.current,
                start: 'top 75%',
            },
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }, { scope: container });

    return (
        <section id="services" ref={container} className="w-full bg-obsidian py-32 px-6">
            <div className="max-w-7xl mx-auto">

                <div className="mb-20">
                    <h2 className="font-sans font-bold text-sm tracking-[0.2em] text-terracotta uppercase mb-4">Functional Artifacts</h2>
                    <p className="font-serif italic text-4xl md:text-5xl text-ivory max-w-2xl leading-tight">
                        Strategic operations engineered to unstick, scale, and transform.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="artifact-card">
                        <DiagnosticShuffler />
                    </div>
                    <div className="artifact-card mt-0 lg:mt-16">
                        <TelemetryTypewriter />
                    </div>
                    <div className="artifact-card">
                        <CursorScheduler />
                    </div>
                </div>

            </div>
        </section>
    );
}
