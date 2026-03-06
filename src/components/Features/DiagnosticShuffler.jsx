import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

const cardsData = [
    { id: 1, title: 'Executive Coaching', desc: 'Guiding C-suite leaders through extreme scaling.' },
    { id: 2, title: 'Scaling Operations', desc: 'Building structures that outlast hypergrowth phases.' },
    { id: 3, title: 'Crisis Intervention', desc: 'Unsticking derailed teams and toxic cycles immediately.' },
];

export default function DiagnosticShuffler() {
    const [cards, setCards] = useState(cardsData);

    useEffect(() => {
        const interval = setInterval(() => {
            setCards(prev => {
                const newArr = [...prev];
                const last = newArr.pop();
                newArr.unshift(last);
                return newArr;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-[350px] bg-slate/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden flex flex-col items-center justify-end">

            {/* Header */}
            <div className="absolute top-8 left-8 right-8">
                <h3 className="font-sans font-bold text-xl text-ivory tracking-tight mb-2">Senior HRBP</h3>
                <p className="font-sans text-sm text-ivory/60 font-medium">Interim Expert Diagnostic</p>
            </div>

            {/* Shuffling Cards */}
            <div className="relative w-full h-[200px] flex items-end justify-center perspective-1000">
                {cards.map((card, index) => {
                    const isTop = index === 0;
                    const isMiddle = index === 1;
                    const isBottom = index === 2;

                    return (
                        <div
                            key={card.id}
                            className="absolute w-full max-w-[280px] bg-obsidian border border-white/10 rounded-[1.5rem] p-5 shadow-2xl transition-all duration-[800ms] shadow-black/80"
                            style={{
                                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                                transform: `translateY(${index * -15}px) scale(${1 - index * 0.05})`,
                                zIndex: 10 - index,
                                opacity: 1 - index * 0.2
                            }}
                        >
                            <div className="font-mono text-[0.65rem] tracking-widest text-terracotta mb-3 uppercase">Module 0{card.id}</div>
                            <h4 className="font-sans font-bold text-base text-ivory mb-1">{card.title}</h4>
                            <p className="font-sans text-xs text-ivory/60 leading-relaxed">{card.desc}</p>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
