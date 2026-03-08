import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CARDS, POSTER, MEMES, DOODLES, PILLS, STORIES } from './data/cards';

gsap.registerPlugin(ScrollTrigger);

// SVG icon components
const icons = {
  bolt: <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  check: <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  info: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  chat: <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  star: <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  heart: <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  heartF: <svg viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  comment: <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  share: <svg viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>,
  mark: <svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  markF: <svg viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  ext: <svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  arrow: <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  bell: <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  dots: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>,
  send: <svg viewBox="0 0 24 24"><path d="M22 2 11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  dollar: <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  logout: <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  home: <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  users: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  smile: <svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h.01"/><path d="M15 9h.01"/><path d="M9 15c.83.67 1.83 1 3 1s2.17-.33 3-1"/></svg>,
  search: <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  user: <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
};

const IC = ({ name, className }) => <span className={`ic ${className || ''}`}>{icons[name]}</span>;

function geoStyle(g) {
  const s = { width: g.w, height: g.h, background: g.bg, opacity: g.op };
  if (g.top) s.top = g.top;
  if (g.bottom) s.bottom = g.bottom;
  if (g.left) s.left = g.left;
  if (g.right) s.right = g.right;
  if (g.r) s.borderRadius = g.r;
  return s;
}

function FeedCard({ card, index, expandedId, onToggle }) {
  const p = POSTER[card.cat];
  const m = MEMES[card.id];
  const d = DOODLES[card.id];
  const catIcon = { friction: 'bolt', advice: 'check', myth: 'info', script: 'chat' }[card.cat];
  const isOpen = expandedId === card.id;
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const likeRef = useRef(null);
  const saveRef = useRef(null);

  const handleLike = () => {
    setLiked(v => !v);
    if (likeRef.current) gsap.fromTo(likeRef.current, { scale: 1.4 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1,0.4)' });
  };
  const handleSave = () => {
    setSaved(v => !v);
    if (saveRef.current) gsap.fromTo(saveRef.current, { scale: 1.4 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1,0.4)' });
  };

  return (
    <div className="card">
      <div className="card-poster" style={{ background: p.bg }}>
        {p.geos.map((g, j) => (
          <div key={j} className={g.t === 'circle' ? 'geo geo-circle' : 'geo'} style={geoStyle(g)} />
        ))}
        {d && <span dangerouslySetInnerHTML={{ __html: d }} />}
        <div className="card-no" style={{ color: p.nc }}>nº {String(index + 1).padStart(2, '0')}</div>
        <div><div className="card-stamp"><IC name={catIcon} />{card.tag}</div></div>
        <div>
          <div className="card-big-stat" style={{ color: p.sc }}>{card.stat}</div>
          <div className="card-stat-sub" style={{ color: p.sub }}>{card.sl}</div>
        </div>
        {m && <div className="card-meme" style={{ cssText: m.p, transform: `rotate(${m.r})` }}>{m.t}</div>}
      </div>
      <div className="card-inner">
        <div className="card-title">{card.title}</div>
        <div className="card-body">
          {card.body}
          <span className="card-src"><IC name="ext" />{card.src}</span>
        </div>
      </div>
      <div className="card-act">
        <button
          className={`act-btn${isOpen ? ' open' : ''}`}
          style={{ background: p.bb, border: `1.5px solid ${p.bc}`, color: p.bt }}
          onClick={() => onToggle(card.id)}
        >
          {isOpen ? 'got it' : card.al} <IC name={isOpen ? 'check' : 'arrow'} />
        </button>
        <div className={`card-exp${isOpen ? ' open' : ''}`}>
          <div className="card-exp-body">{card.at}</div>
        </div>
      </div>
      <div className="card-engage">
        <div className="eg-group">
          <button ref={likeRef} className={`eg-btn${liked ? ' liked' : ''}`} onClick={handleLike}>
            <IC name={liked ? 'heartF' : 'heart'} />
          </button>
          <button className="eg-btn"><IC name="comment" /></button>
          <button className="eg-btn"><IC name="share" /></button>
        </div>
        <button ref={saveRef} className={`eg-btn${saved ? ' saved' : ''}`} onClick={handleSave}>
          <IC name={saved ? 'markF' : 'mark'} />
        </button>
      </div>
    </div>
  );
}

function LostArrows() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const colors = ['#D04A2F', '#E8A817', '#2A8C7A', '#6B4A8A', '#1E1A15'];
    const arrowEls = [];

    for (let i = 0; i < 14; i++) {
      const size = 10 + Math.random() * 18;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const arrow = document.createElement('div');
      arrow.className = 'lost-arrow';
      arrow.style.width = size + 'px';
      arrow.style.height = size + 'px';
      arrow.style.left = Math.random() * 120 + 'px';
      arrow.style.top = Math.random() * 120 + 'px';
      arrow.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
      container.appendChild(arrow);
      arrowEls.push({ el: arrow });
    }

    arrowEls.forEach((a, i) => {
      gsap.to(a.el, { opacity: 0.08 + Math.random() * 0.14, duration: 0.4, delay: 0.8 + i * 0.08, ease: 'power2.out' });
    });

    arrowEls.forEach((a) => {
      function wander() {
        const angle = Math.random() * Math.PI * 2;
        const dist = 15 + Math.random() * 30;
        const rot = -180 + Math.random() * 360;
        gsap.to(a.el, { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, rotation: rot, duration: 2.5 + Math.random() * 3, ease: 'sine.inOut', onComplete: wander });
      }
      gsap.delayedCall(Math.random() * 2, wander);
    });

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div className="lost-arrows" ref={containerRef} />;
}

function App() {
  const [activeCat, setActiveCat] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const feedRef = useRef(null);
  const hdrRef = useRef(null);
  const progRef = useRef(null);
  const founderRef = useRef(null);
  const ctaRef = useRef(null);
  const briefRef = useRef(null);

  const filteredCards = activeCat === 'all' ? CARDS : CARDS.filter(c => c.cat === activeCat);

  const handleToggle = useCallback((id) => {
    setExpandedId(prev => prev === id ? null : id);
  }, []);

  // Scroll progress & header shadow
  useEffect(() => {
    const onScroll = () => {
      if (hdrRef.current) hdrRef.current.classList.toggle('scrolled', window.scrollY > 30);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progRef.current) progRef.current.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Progress bar animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.prog-bar', { backgroundPosition: '200% 0', duration: 4, ease: 'none', repeat: -1 });
    });
    return () => ctx.revert();
  }, []);

  // Card animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.getAll().forEach(s => s.kill());

      gsap.utils.toArray('.card').forEach((el, i) => {
        gsap.set(el, { visibility: 'visible' });
        gsap.fromTo(el,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            scrollTrigger: { trigger: el, start: 'top 92%', end: 'bottom 8%', toggleActions: 'play reverse play reverse' },
            opacity: 1, y: 0, scale: 1, duration: 0.9, delay: i * 0.04, ease: 'power3.out',
            onStart: () => {
              if (!el.dataset.innerDone) {
                el.dataset.innerDone = '1';
                // Stamp
                const stamp = el.querySelector('.card-stamp');
                if (stamp) gsap.from(stamp, { x: -30, opacity: 0, duration: 0.5, ease: 'power3.out', delay: 0.1 });
                // Stat counter
                const statEl = el.querySelector('.card-big-stat');
                if (statEl) {
                  const raw = statEl.textContent.trim();
                  const match = raw.match(/^(\d+\.?\d*)/);
                  if (match) {
                    const tgt = parseFloat(match[1]), suf = raw.replace(match[1], ''), dec = tgt % 1 !== 0;
                    const px = { v: 0 };
                    statEl.textContent = '0' + suf;
                    gsap.to(px, { v: tgt, duration: 1.8, ease: 'power2.out', delay: 0.2, onUpdate: () => { statEl.textContent = (dec ? px.v.toFixed(1) : Math.round(px.v)) + suf; } });
                  }
                }
                // Meme pop
                const meme = el.querySelector('.card-meme');
                if (meme) gsap.from(meme, { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(3)', delay: 0.6 });
                // Title word reveal
                const title = el.querySelector('.card-title');
                if (title) {
                  const words = title.textContent.split(' ');
                  title.innerHTML = words.map(w => `<span style="display:inline-block;overflow:hidden;vertical-align:top;margin-right:0.25em"><span class="tw" style="display:inline-block">${w}</span></span>`).join('');
                  gsap.from(title.querySelectorAll('.tw'), { y: '110%', duration: 0.45, stagger: 0.025, ease: 'power3.out', delay: 0.2 });
                }
                // Body fade
                const body = el.querySelector('.card-body');
                if (body) gsap.from(body, { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out', delay: 0.4 });
              }
            }
          }
        );
      });

      // Geo parallax
      gsap.utils.toArray('.card-poster').forEach(p => {
        p.querySelectorAll('.geo').forEach((g, j) => {
          gsap.to(g, { y: -18 - (j * 12), ease: 'none', scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom top', scrub: 2 } });
        });
      });

      ScrollTrigger.refresh();
    }, feedRef);

    return () => ctx.revert();
  }, [filteredCards]);

  // Scroll tilt effect
  useEffect(() => {
    let lY = 0, sV = 0;
    const onScroll = () => { sV = window.scrollY - lY; lY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    const tickId = gsap.ticker.add(() => {
      const t = Math.max(-1.5, Math.min(1.5, sV * 0.03));
      gsap.to('.card', { rotationX: t, duration: 0.3, ease: 'power2.out', transformPerspective: 1200, overwrite: 'auto' });
      sV *= 0.9;
    });
    return () => { window.removeEventListener('scroll', onScroll); gsap.ticker.remove(tickId); };
  }, []);

  // Intersection observer reveals
  useEffect(() => {
    const els = [founderRef.current, ctaRef.current, briefRef.current].filter(Boolean);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Load sequence
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.logo', { y: 30, opacity: 0, duration: 0.7, ease: 'power4.out' })
      .from('.logo-sub', { y: 12, opacity: 0, duration: 0.5 }, '-=0.3')
      .from('.hdr-btn', { scale: 0, rotation: -90, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(2.5)' }, '-=0.25')
      .from('.pill', { y: 18, opacity: 0, scale: 0.9, duration: 0.4, stagger: 0.05, ease: 'back.out(1.2)' }, '-=0.25')
      .from('.story-item', { y: 25, opacity: 0, scale: 0.8, rotation: -8, duration: 0.5, stagger: 0.06, ease: 'back.out(1.8)' }, '-=0.3')
      .from('.hero-kicker', { x: -40, opacity: 0, duration: 0.6, ease: 'power4.out' }, '-=0.2')
      .from('.hero-kicker-line', { scaleX: 0, duration: 0.8, ease: 'power3.inOut' }, '-=0.4')
      .from('.hero-h', { y: 60, opacity: 0, duration: 1, ease: 'power4.out' }, '-=0.5')
      .from('.hero-deck', { y: 25, opacity: 0, duration: 0.7 }, '-=0.5')
      .from('.nv', { y: 20, opacity: 0, scale: 0.9, duration: 0.35, stagger: 0.05, ease: 'back.out(1.5)' }, '-=0.7');
    return () => tl.kill();
  }, []);

  // Magnetic effect for story bubbles and CTA
  useEffect(() => {
    const magneticEls = document.querySelectorAll('.story-bubble, [data-magnetic]');
    const handlers = [];
    magneticEls.forEach(el => {
      const multiplier = el.classList.contains('story-bubble') ? 0.25 : 0.2;
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * multiplier, y: (e.clientY - r.top - r.height / 2) * multiplier, rotation: el.classList.contains('story-bubble') ? (e.clientX - r.left - r.width / 2) * 0.08 : 0, duration: 0.4, ease: 'power2.out' });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, rotation: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });
      };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      handlers.push({ el, onMove, onLeave });
    });
    return () => handlers.forEach(({ el, onMove, onLeave }) => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); });
  }, []);

  const switchCat = (cat) => {
    gsap.to(feedRef.current, {
      opacity: 0, y: 15, duration: 0.2, ease: 'power2.in',
      onComplete: () => {
        setActiveCat(cat);
        setExpandedId(null);
        gsap.set(feedRef.current, { opacity: 1, y: 0 });
      }
    });
  };

  return (
    <>
      <div className="prog"><div className="prog-bar" ref={progRef} /></div>
      <div className="shell">
        {/* Header */}
        <div className="hdr" ref={hdrRef}>
          <div className="hdr-top">
            <div>
              <div className="logo">hr mama<span className="logo-dot" /></div>
              <div className="logo-sub">real talk for your first real job</div>
            </div>
            <div className="hdr-btns">
              <button className="hdr-btn"><IC name="bell" /></button>
              <button className="hdr-btn"><IC name="dots" /></button>
            </div>
          </div>
          <div className="pills">
            {PILLS.map(p => (
              <button key={p.cat} className={`pill${activeCat === p.cat ? ' on' : ''}`} onClick={() => switchCat(p.cat)}>
                <IC name={p.icon} />{p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stories */}
        <div className="stories">
          {STORIES.map((s, i) => (
            <div key={i} className="story-item">
              <div className="story-bubble" style={{ background: s.color }}>
                <IC name={s.icon} />
              </div>
              <span className="story-lbl">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Hero */}
        {activeCat === 'all' && (
          <div className="hero">
            <LostArrows />
            <div className="hero-kicker">issue nº 01 <span className="hero-kicker-line" /></div>
            <div className="hero-h">the workplace wasn't built for <em>you</em></div>
            <div className="hero-deck">that doesn't mean you can't win at it. real data. real scripts. real advice from hr professionals who've seen it all — translated for the generation actually living it.</div>
          </div>
        )}

        {/* Feed */}
        <div className="feed" ref={feedRef}>
          {filteredCards.map((card, i) => (
            <FeedCard key={card.id} card={card} index={i} expandedId={expandedId} onToggle={handleToggle} />
          ))}
        </div>

        {/* Founder */}
        <div className="founder" ref={founderRef}>
          <div className="founder-img-wrap">
            <img className="founder-img" src="/malin-bw.jpg" alt="malin, founder of hr mama" />
            <div className="founder-img-overlay" />
          </div>
          <div className="founder-content">
            <div className="founder-kicker">meet your hr mama</div>
            <div className="founder-name">malin</div>
            <div className="founder-role">founder & chief "i've seen this before" officer</div>
            <div className="founder-bio">
              <p>before she became the internet's favorite hr older sister, malin spent years in the rooms where hiring decisions get made, termination letters get drafted, and "culture fit" gets weaponized. she's sat across from every type of manager, mediated every flavor of workplace meltdown, and read enough resignation emails to write a novel.</p>
              <p>she built hr mama because she kept seeing the same pattern: gen z workers getting blindsided by unwritten rules that nobody bothered to explain. smart, capable people tanking their careers over stuff that takes five minutes to learn — if someone actually tells you.</p>
              <p>so she decided to be that someone.</p>
              <p>hr mama isn't corporate training repackaged with a tiktok font. it's the real playbook — the one hr professionals use internally but never share publicly. every stat is sourced. every script is field-tested. every piece of advice comes from watching thousands of real situations play out.</p>
              <p className="founder-credo">her rule: if she wouldn't text it to her own kid entering the workforce, it doesn't make the feed.</p>
            </div>
          </div>
        </div>

        {/* Brief */}
        <div className="brief" ref={briefRef}>
          <div className="brief-k">website brief</div>
          <div className="brief-h">what you're looking at</div>
          <div className="brief-body">
            <p><span className="brief-lbl">concept</span><strong>hr mama</strong> is a new-category hr consulting brand that speaks directly to gen z and gen alpha workers — not their employers. it delivers trusted, data-backed workplace guidance through a format they already understand: the infinite scroll, card-based feed.</p>
            <p><span className="brief-lbl">relationship to instagram</span>this website complements the @hrmama instagram presence. instagram is for discovery, hot takes, and community. the website is the reference library — searchable, categorized, and deeper. every instagram post can link here for the full breakdown.</p>
            <p><span className="brief-lbl">content pillars</span>the friction (data on real generational clashes) → do this (actionable career advice) → myth vs real (debunking stereotypes with data) → say this (word-for-word scripts for hard conversations).</p>
            <p><span className="brief-lbl">key frictions addressed</span>ghosting employers (30% do it), salary transparency expectations vs taboo culture, mental health vocabulary gaps across generations, remote work negotiations, ultra-short tenure patterns (1.8yr avg), management track avoidance, communication style clashes, and the perception of being "unprepared."</p>
            <p><span className="brief-lbl">tone</span>direct, warm, zero-jargon. like an older sibling who happens to work in hr. never condescending, never corporate. every piece of advice is backed by a cited stat or named source.</p>
            <p><span className="brief-lbl">revenue model</span>1:1 consulting sessions ("ask hr mama"), group workshops for universities and bootcamps, employer partnerships for onboarding content, and a premium "scripts library" subscription.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="cta" ref={ctaRef} style={{ opacity: 0, transform: 'translateY(40px)', transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="cta-geo1" /><div className="cta-geo2" />
          <div className="cta-h">got a work situation?</div>
          <div className="cta-p">dm us your anonymous work dilemma. we'll give you the real answer — sourced from actual hr professionals.</div>
          <button className="cta-b" data-magnetic>ask hr mama <IC name="arrow" /></button>
        </div>

        {/* Bottom Nav */}
        <div className="bnav">
          <div className="nv on"><IC name="home" /><span className="nv-l">feed</span></div>
          <div className="nv"><IC name="search" /><span className="nv-l">search</span></div>
          <div className="nv"><IC name="chat" /><span className="nv-l">ask</span></div>
          <div className="nv"><IC name="mark" /><span className="nv-l">saved</span></div>
          <div className="nv"><IC name="user" /><span className="nv-l">you</span></div>
        </div>
      </div>
    </>
  );
}

export default App;
