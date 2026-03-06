import React from 'react';

export default function Footer() {
    return (
        <footer id="contact" className="relative w-full bg-slate rounded-t-[4rem] mt-[-4rem] px-6 py-24 md:py-32 flex flex-col items-center justify-between overflow-hidden z-[50]">

            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-terracotta/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">

                <h2 className="font-sans font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight text-ivory mb-6">
                    Ready to scale?
                </h2>

                <p className="font-serif italic text-2xl md:text-3xl text-ivory/60 max-w-xl mx-auto mb-16">
                    Top-tier strategic HR consulting. Change management, digital transformation, and executive coaching.
                </p>

                <a
                    href="mailto:hello@hrmama.se"
                    className="group relative overflow-hidden rounded-[3rem] px-12 py-6 bg-terracotta transition-transform duration-500 hover:scale-[1.02] active:scale-95"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 z-0"></div>
                    <span className="relative z-10 font-sans font-bold text-xl text-obsidian tracking-wide">
                        Book a consultation
                    </span>
                </a>

            </div>

            <div className="w-full max-w-7xl mx-auto mt-32 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">

                <div className="flex items-center gap-3">
                    <div className="font-sans font-black text-2xl tracking-tighter uppercase text-ivory">
                        MM<span className="text-terracotta">.</span>
                    </div>
                    <span className="font-mono text-xs text-ivory/40 uppercase tracking-widest pl-3 border-l border-white/10">Stockholm, SE</span>
                </div>

                <div className="flex items-center gap-2 bg-obsidian/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                    <span className="font-mono text-[0.65rem] text-ivory/70 uppercase tracking-widest">System Operational</span>
                </div>

                <div className="font-mono text-[0.65rem] text-ivory/40 uppercase tracking-widest">
                    © {new Date().getFullYear()} Malin Markén
                </div>

            </div>

        </footer>
    );
}
