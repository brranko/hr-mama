import React, { useState, useEffect } from 'react';

const messages = [
    "Analyzing structural efficiency...",
    "Aligning team protocols...",
    "Optimizing leadership communication...",
    "Initiating cultural shift...",
    "Deploying change management architecture..."
];

export default function TelemetryTypewriter() {
    const [text, setText] = useState('');
    const [messageIndex, setMessageIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentMessage = messages[messageIndex];
        let typingSpeed = isDeleting ? 30 : 60;

        if (!isDeleting && text === currentMessage) {
            typingSpeed = 2000; // Pause at end of word
            setTimeout(() => setIsDeleting(true), typingSpeed);
            return;
        }

        if (isDeleting && text === '') {
            setIsDeleting(false);
            setMessageIndex((prev) => (prev + 1) % messages.length);
            return;
        }

        const timeout = setTimeout(() => {
            setText(prev =>
                isDeleting
                    ? currentMessage.substring(0, prev.length - 1)
                    : currentMessage.substring(0, prev.length + 1)
            );
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, messageIndex]);

    return (
        <div className="w-full h-[350px] bg-slate/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 relative flex flex-col justify-between group overflow-hidden">

            {/* Header */}
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-sans font-bold text-xl text-ivory tracking-tight">Organization & Change</h3>
                    <div className="flex items-center gap-2 bg-obsidian/50 px-3 py-1.5 rounded-full border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-terracotta animate-pulse"></div>
                        <span className="font-mono text-[0.6rem] text-ivory/60 uppercase tracking-widest">Live Feed</span>
                    </div>
                </div>
                <p className="font-sans text-sm text-ivory/60 font-medium">Telemetry Analysis</p>
            </div>

            {/* Terminal Area */}
            <div className="bg-obsidian w-full h-[150px] rounded-2xl p-4 border border-white/10 shadow-inner flex items-start">
                <div className="font-mono text-sm leading-relaxed text-terracotta/90 w-full break-words">
                    <span className="text-ivory/30 mr-2">{'>'}</span>
                    {text}
                    <span className="inline-block w-[8px] h-[1em] bg-terracotta animate-pulse align-middle ml-1"></span>
                </div>
            </div>

        </div>
    );
}
