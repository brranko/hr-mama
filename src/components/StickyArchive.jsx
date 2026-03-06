import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const protocols = [
    {
        id: "01",
        title: "Strategic Alignment",
        desc: "Mapping organizational goals to operational realities. Identifying friction points before they cascade.",
        Visual: () => (
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                {/* Rotating Geometric Motif */}
                <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_15s_linear_infinite] opacity-80">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#d68d71" strokeWidth="0.5" strokeDasharray="4 4" />
                    <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke="rgba(250, 248, 245, 0.3)" strokeWidth="1" />
                    <path d="M50 20 L80 50 L50 80 L20 50 Z" fill="none" stroke="rgba(250, 248, 245, 0.5)" strokeWidth="1" />
                    <circle cx="50" cy="50" r="10" fill="none" stroke="#d68d71" strokeWidth="2" />
                </svg>
            </div>
        )
    },
    {
        id: "02",
        title: "Operational Execution",
        desc: "Deploying targeted interventions. Rapid scaling, change management, and crisis de-escalation.",
        Visual: () => (
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 overflow-hidden border border-white/10 flex items-center justify-center rounded-xl bg-obsidian">
                {/* Grid and Scanning Laser */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-20">
                    {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="border border-white/20"></div>
                    ))}
                </div>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-terracotta shadow-[0_0_15px_#d68d71] animate-[pulse_3s_ease-in-out_infinite] animate-[scan_4s_linear_infinite]">
                    <style>{`@keyframes scan { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }`}</style>
                </div>
            </div>
        )
    },
    {
        id: "03",
        title: "Sustainable Architecture",
        desc: "Embedding resilience. Training leaders and establishing frameworks that outlast the initial intervention.",
        Visual: () => (
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                {/* Pulsing Waveform */}
                <svg viewBox="0 0 200 100" className="w-full h-full opacity-80">
                    <path
                        className="animate-[dash_3s_linear_infinite]"
                        d="M 0 50 L 50 50 L 70 10 L 90 90 L 110 30 L 130 70 L 150 50 L 200 50"
                        fill="none"
                        stroke="#d68d71"
                        strokeWidth="2"
                        strokeDasharray="200"
                        strokeDashoffset="200"
                    />
                    <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
                </svg>
            </div>
        )
    }
];

export default function StickyArchive() {
    const container = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.archive-card');

        cards.forEach((card, index) => {
            // Pin each card in place
            ScrollTrigger.create({
                trigger: card,
                start: "top top",
                pin: true,
                pinSpacing: false,
                id: `pin-${index}`
            });

            // If it's not the very last card, it should scale down and blur as the NEXT card comes up over it.
            if (index !== cards.length - 1) {
                gsap.to(card, {
                    scale: 0.9,
                    opacity: 0.5,
                    filter: "blur(20px)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: cards[index + 1],
                        start: "top bottom", // When the next card's top hits the viewport bottom
                        end: "top top",      // Until the next card's top hits the viewport top
                        scrub: true,
                    }
                });
            }
        });
    }, { scope: container });

    return (
        <section ref={container} className="relative w-full bg-obsidian">
            {protocols.map((protocol, index) => (
                <div
                    key={protocol.id}
                    className="archive-card h-[100vh] w-full flex items-center justify-center sticky top-0 bg-obsidian border-t border-white/5"
                    style={{ zIndex: index }}
                >
                    <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                        <div className="flex flex-col gap-6">
                            <span className="font-mono text-terracotta text-xl md:text-2xl tracking-widest">{protocol.id} //</span>
                            <h2 className="font-sans font-bold text-4xl md:text-6xl text-ivory tracking-tight leading-none">
                                {protocol.title}.
                            </h2>
                            <p className="font-sans text-lg md:text-xl text-ivory/60 max-w-lg font-light">
                                {protocol.desc}
                            </p>
                        </div>

                        <div className="flex justify-center md:justify-end">
                            <protocol.Visual />
                        </div>

                    </div>
                </div>
            ))}
        </section>
    );
}
