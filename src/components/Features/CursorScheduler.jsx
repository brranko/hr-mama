import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function CursorScheduler() {
    const container = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

        // 1. Move cursor from off-screen bottom right to Wednesday (index 3)
        tl.fromTo('.mock-cursor', {
            x: 200, y: 150, opacity: 0
        }, {
            x: 0, y: 0, opacity: 1, duration: 1.5, ease: 'power3.out'
        });

        // 2. Click (Scale down cursor)
        tl.to('.mock-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 });

        // 3. Highlight the cell
        tl.to('.target-cell', {
            backgroundColor: '#d68d71', // Terracotta
            color: '#0D0D12',
            duration: 0.2
        }, "-=0.1");

        // 4. Move to Save Button
        tl.to('.mock-cursor', {
            x: -120, y: 80, duration: 1, ease: 'power2.inOut', delay: 0.3
        });

        // 5. Click Save
        tl.to('.mock-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 });
        tl.to('.save-btn', { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }, "-=0.1");

        // 6. Reset
        tl.to('.mock-cursor', { opacity: 0, duration: 0.5, delay: 0.5 });
        tl.to('.target-cell', { backgroundColor: 'transparent', color: 'rgba(250, 248, 245, 0.4)', duration: 0.5 }, "-=0.5");

    }, { scope: container });

    return (
        <div ref={container} className="w-full h-[350px] bg-slate/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 relative flex flex-col justify-between overflow-hidden">

            {/* Header */}
            <div>
                <h3 className="font-sans font-bold text-xl text-ivory tracking-tight mb-2">Digital Transformation</h3>
                <p className="font-sans text-sm text-ivory/60 font-medium">Protocol Integration Scheduler</p>
            </div>

            {/* Grid Area */}
            <div className="w-full bg-obsidian rounded-2xl p-5 border border-white/10 relative">
                <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-xs text-ivory/40">Week 34 Protocol</span>
                    <div className="save-btn bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 font-mono text-[0.6rem] text-ivory transition-colors">SAVE_STATE</div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {days.map((day, i) => (
                        <div
                            key={i}
                            className={`aspect-square rounded-lg border border-white/10 flex items-center justify-center font-mono text-xs text-ivory/40 transition-colors ${i === 3 ? 'target-cell' : ''}`}
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* The Animated SVG Cursor */}
                <div className="mock-cursor absolute top-[55%] left-[55%] pointer-events-none drop-shadow-2xl z-20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.8 6.75 21.36L11.44 17H18.5C19.05 17 19.5 16.55 19.5 16V4C19.5 3.45 19.05 3 18.5 3H6.5C5.95 3 5.5 3.1 5.5 3.21Z" fill="white" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                </div>

            </div>

        </div>
    );
}
