import { useEffect, useRef, useState } from 'react';
import './App.css';
import { I18N } from './i18n';

const P = {
  arch: <><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /><path d="M3 17.5l9 5 9-5" /></>,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  bot: <><rect x="4" y="8" width="16" height="12" rx="3" /><path d="M12 8V4" /><circle cx="12" cy="3" r="1" /><circle cx="9" cy="14" r="1.2" /><circle cx="15" cy="14" r="1.2" /><path d="M2 14v2M22 14v2" /></>,
  coin: <><circle cx="12" cy="12" r="9" /><path d="M14.5 9.2c-.5-.8-1.5-1.2-2.5-1.2-1.4 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-2-.4-2.5-1.2M12 6v2M12 16v2" /></>,
  repeat: <><path d="M17 2l4 4-4 4" /><path d="M3 11V9a3 3 0 013-3h15" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v2a3 3 0 01-3 3H3" /></>,
  cloud: <path d="M7 18a5 5 0 01-.5-9.97A6 6 0 0118 9.5a4.25 4.25 0 01-.5 8.5H7z" />,
  shield: <><path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  github: <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.500 6-.6.6-.6 1.2-.5 2V21" />,
  ext: <><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><path d="M15 3h6v6M10 14L21 3" /></>,
  book: <><path d="M4 4.5A2.5 2.5 0 016.5 2H20v17H6.5A2.5 2.5 0 004 21.5v-17z" /><path d="M4 21.5A2.5 2.5 0 016.5 19H20M9 7h7M9 11h5" /></>,
};

function Icon({ name }) {
  return (
    <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {P[name]}
    </svg>
  );
}

const PROJECTS = [
  { name: 'Rupal Coder', kind: 'Web · Vue', tags: ['Vue 3', 'TypeScript', 'Vite'], live: 'https://rupal-coder.netlify.app/', repo: 'https://github.com/4awel/Rupal-coder' },
  { name: 'Spotify ReDesign', kind: 'Frontend · Vue · Backend · NestJS', tags: ['Vue', 'Figma', 'UI', 'NestJS', 'MongoDB'], live: 'https://spotify-redisign.netlify.app/', repo: 'https://github.com/4awel/Spotify-ReDisign' },
  { name: 'XStream Service', kind: 'Frontend · React', tags: ['TypeScript', 'Frontend', 'React'], repo: 'https://github.com/4awel/XStream-service', live: 'https://xstream-app.netlify.app/' },
  { name: 'XStream Backend', kind: 'Backend · NestJS · MediaMTX', tags: ['TypeScript', 'NestJS', 'REST API', 'PostgreSQL', 'MediaMTX'], repo: 'https://github.com/4awel/XStream-service-backend' },
  { name: 'Profile Test NestJS', kind: 'Backend · NestJS', tags: ['NestJS', 'TypeScript'], repo: 'https://github.com/4awel/profile-test-nestjs', live: 'https://digital-card-api-76yi.onrender.com/graphql' },
];

const STAT_VALUES = [
  { value: 3.75, suffix: '+', decimals: 1 },
  { value: 4, suffix: '×' },
  { value: 5, suffix: '' },
  { value: 15, suffix: '%' },
];

const ICONS = ['arch', 'bolt', 'bot', 'coin', 'repeat', 'cloud', 'shield', 'book'];

const STACK_ITEMS = [
  ['TypeScript', 'Next.js', 'Nuxt', 'Redux Toolkit', 'Pinia', 'Tailwind', 'Bootstrap 5', 'Socket.IO', 'Figma'],
  ['Node.js', 'NestJS', 'Python + FastAPI', 'REST + Swagger', 'GraphQL + Apollo'],
  ['PostgreSQL + Prisma', 'MongoDB + Mongoose', 'Redis', 'Milvus', 'S3'],
  ['Docker', 'Kubernetes', 'Apache Kafka', 'Nginx', 'CI/CD'],
  ['Claude Code', 'GPT', 'Gemini'],
];

function initialLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'ru' || saved === 'en') return saved;
  } catch (e) { /* storage unavailable */ }
  return (navigator.language || 'ru').toLowerCase().startsWith('ru') ? 'ru' : 'en';
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const layers = document.querySelectorAll('[data-speed]');
    const bar = document.querySelector('.progress');
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      layers.forEach((el) => {
        const speed = parseFloat(el.dataset.speed);
        const rect = el.parentElement.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = `translate3d(0, ${-offset}px, 0)`;
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}

function useGlow() {
  useEffect(() => {
    const el = document.querySelector('.cursor-glow');
    if (!el || window.matchMedia('(hover: none)').matches) return;
    const move = (e) => { el.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`; };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
}

function Counter({ value, suffix, decimals = 0 }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min((t - start) / 1400, 1);
        setN(value * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{n.toFixed(decimals)}{suffix}</span>;
}

function Section({ id, num, title, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <h2 className="section-title reveal"><span>{num}</span>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState(initialLang);
  const t = I18N[lang];

  useReveal();
  useParallax();
  useGlow();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    const d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute('content', t.meta.desc);
    try { localStorage.setItem('lang', lang); } catch (e) { /* ignore */ }
  }, [lang, t]);

  return (
    <>
      <div className="progress" />
      <div className="cursor-glow" />

      <nav className="nav">
        <a href="#top" className="logo">DS<i>.</i></a>
        <div className="nav-right">
          <div className="links">
            <a href="#about">{t.nav.about}</a>
            <a href="#experience">{t.nav.experience}</a>
            <a href="#portfolio">{t.nav.portfolio}</a>
            <a href="#stack">{t.nav.stack}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
          <div className="lang" role="group" aria-label="Language">
            {['ru', 'en'].map((l) => (
              <button key={l} className={lang === l ? 'on' : ''} onClick={() => setLang(l)} aria-pressed={lang === l}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <header id="top" className="hero">
        <div className="layer grid" data-speed="0.25" />
        <div className="layer orb orb-1" data-speed="0.5" />
        <div className="layer orb orb-2" data-speed="-0.2" />
        <div className="layer big-text" data-speed="0.35">FULLSTACK</div>
        <div className="hero-inner" data-speed="0.12">
          <p className="tag"><b /> {t.hero.tag}</p>
          <h1>{t.hero.first}<br /><em>{t.hero.last}</em></h1>
          <p className="role">{t.hero.role}</p>
          <p className="lead">{t.hero.lead}</p>
          <div className="cta">
            <a className="btn primary" href="#contact">{t.hero.contact}</a>
            <a className="btn" href="#experience">{t.hero.exp}</a>
          </div>
        </div>
        <div className="scroll-hint"><span /></div>
      </header>

      <div className="marquee" aria-hidden>
        <div>
          {[0, 1].map((k) => (
            <span key={k}>TypeScript ✦ Next.js ✦ NestJS ✦ Nuxt ✦ PostgreSQL ✦ Redis ✦ Kafka ✦ Docker ✦ Kubernetes ✦ LLM ✦ </span>
          ))}
        </div>
      </div>

      <Section id="about" num="01" title={t.about.title}>
        <div className="about">
          <div className="reveal">
            <figure className="photo">
              <img src="/photo.jpg" alt={t.about.alt} width="500" height="500" loading="lazy" />
              <figcaption><b /> {t.about.caption}</figcaption>
            </figure>
            {t.about.p.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="stats">
            {STAT_VALUES.map((s, i) => (
              <div className="stat reveal" key={i}>
                <strong><Counter {...s} /></strong>
                <span>{t.about.stats[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="band">
        <div className="layer band-text" data-speed="-0.3">STRIVE</div>
      </div>

      <Section id="experience" num="02" title={t.exp.title}>
        <div className="job reveal">
          <div className="job-head">
            <div>
              <h3>{t.exp.role}</h3>
              <p className="company">{t.exp.company}</p>
            </div>
            <span className="period">{t.exp.period}</span>
          </div>
          <p className="job-desc">{t.exp.desc}</p>
        </div>

        <div className="cards">
          {t.exp.achievements.map(([title, text], i) => (
            <article className="card reveal" style={{ transitionDelay: `${(i % 2) * 90}ms` }} key={i}>
              <div className="icon"><Icon name={ICONS[i]} /></div>
              <h4>{title}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <h3 className="sub reveal">{t.exp.dutiesTitle}</h3>
        <ul className="duties">
          {t.exp.duties.map((d) => <li className="reveal" key={d}>{d}</li>)}
        </ul>
      </Section>

      <Section id="portfolio" num="03" title={t.portfolio.title}>
        <div className="projects">
          {PROJECTS.map((p, i) => (
            <article className="project reveal" style={{ transitionDelay: `${(i % 3) * 90}ms` }} key={p.name}>
              <span className="kind">{p.kind}</span>
              <h4>{p.name}</h4>
              <p>{t.portfolio.texts[i]}</p>
              <div className="chips">{p.tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}</div>
              <div className="plinks">
                {p.live && <a href={p.live} target="_blank" rel="noreferrer"><Icon name="ext" /> {t.portfolio.demo}</a>}
                {p.repo && <a href={p.repo} target="_blank" rel="noreferrer"><Icon name="github" /> GitHub</a>}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="stack" num="04" title={t.stack.title}>
        <div className="stack">
          {t.stack.groups.map((g, i) => (
            <div className="group reveal" key={i}>
              <h4>{g}</h4>
              <div className="chips">
                {STACK_ITEMS[i].map((it) => <span className="chip" key={it}>{it}</span>)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="edu" num="05" title={t.edu.title}>
        <div className="edu">
          {t.edu.cards.map(([period, title, text]) => (
            <div className="card reveal" key={title}>
              <span className="period">{period}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <section id="contact" className="contact">
        <div className="layer orb orb-3" data-speed="0.3" />
        <div className="container reveal">
          <h2>{t.contact.title1} <em>{t.contact.title2}</em><br />{t.contact.title3}</h2>
          <p>{t.contact.sub}</p>
          <div className="cta center">
            <a className="btn primary" href="https://t.me/ogChawel" target="_blank" rel="noreferrer">Telegram @ogChawel</a>
            <a className="btn" href="mailto:denisshadrin67@gmail.com">denisshadrin67@gmail.com</a>
            <a className="btn" href="tel:+66949798317">+66 94 979 8317</a>
          </div>
        </div>
        <footer>© {new Date().getFullYear()} {t.contact.footer}</footer>
      </section>
    </>
  );
}
