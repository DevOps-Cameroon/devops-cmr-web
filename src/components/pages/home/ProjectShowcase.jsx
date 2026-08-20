// src/components/ProjectShowcase.jsx
import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ExternalLink, ArrowLeft, ArrowRight, Smartphone, Terminal, Cloud, Boxes, Radio, ScanFace } from 'lucide-react';

function GithubIcon({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
      />
    </svg>
  );
}
import { useReducedMotion } from '@/hooks/useReducedMotion';

const PROJECTS = [
  {
    key: 'poultryops',
    title: 'PoultryOps',
    tag: 'Mobile · Offline-first',
    description:
      'Mobile-first farm management app for smallholder poultry owners in Cameroon. Offline-first batch logging, built for spotty rural connectivity.',
    stack: 'React Native · Expo · Zustand',
    icon: Smartphone,
    gradient: 'from-accent to-primary-600',
    github: 'https://github.com/devopscameroon/poultryops',
    live: null,
  },
  {
    key: 'petrotwin',
    title: 'PetroTwin',
    tag: 'Telemetry · IoT',
    description:
      'Digital twin monitoring system for petrol tanker trucks — live telemetry, rule-based anomaly alerts, blockchain-anchored audit trail.',
    stack: 'FastAPI · MQTT · Web3',
    icon: Radio,
    gradient: 'from-primary-700 to-ink',
    github: 'https://github.com/devopscameroon/petrotwin',
    live: 'https://petrotwin.devopscameroon.dev',
  },
  {
    key: 'famigo',
    title: 'Famigo',
    tag: 'Errands · Delivery',
    description:
      'Errands, courses, and delivery-chat app with optimistic messaging, animated tabs, and image-stack UI patterns built by the community.',
    stack: 'Expo Router · NativeWind · i18next',
    icon: Boxes,
    gradient: 'from-primary-500 to-primary-800',
    github: 'https://github.com/devopscameroon/famigo',
    live: null,
  },
  {
    key: 'livedeck',
    title: 'LiveDeck',
    tag: 'DevTools · Live Coding',
    description:
      'A presentation platform embedding live, interactive coding environments directly into slides — Monaco editor, terminal, browser preview.',
    stack: 'WebContainers · E2B · Monaco',
    icon: Terminal,
    gradient: 'from-ink to-primary-700',
    github: 'https://github.com/devopscameroon/livedeck',
    live: 'https://livedeck.devopscameroon.dev',
  },
  {
    key: 'grabpic',
    title: 'GrabPic',
    tag: 'Computer Vision',
    description:
      'Face-recognition event photo platform. pgvector similarity search over ArcFace embeddings, built and debugged in the open with the community.',
    stack: 'FastAPI · pgvector · DeepFace',
    icon: ScanFace,
    gradient: 'from-accent to-primary-700',
    github: 'https://github.com/devopscameroon/grabpic',
    live: null,
  },
  {
    key: 'scholarship',
    title: 'Scholarship Platform',
    tag: 'Fintech · Admin',
    description:
      'Admin dashboard and applicant portal for a Cameroon-based scholarship agency — sponsor requests, applications pipeline, live messaging.',
    stack: 'React · Vite · Tailwind',
    icon: Cloud,
    gradient: 'from-primary-600 to-ink',
    github: 'https://github.com/devopscameroon/scholarship-platform',
    live: 'https://scholarships.devopscameroon.dev',
  },
];

const TOTAL = PROJECTS.length;
const mod = (n) => ((n % TOTAL) + TOTAL) % TOTAL;

function ProjectVisual({ project, iconClassName = 'h-10 w-10' }) {
  const Icon = project.icon;
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br ${project.gradient}`}>
      <Icon className={`${iconClassName} text-white/90`} strokeWidth={1.75} />
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">{project.title}</span>
    </div>
  );
}

export default function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ghostIndex, setGhostIndex] = useState(mod(-1));
  const activeRef = useRef(0);
  const busyRef = useRef(false);
  const mainRef = useRef(null);
  const ghostRef = useRef(null);
  const descRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const active = PROJECTS[activeIndex];
  const ghost = PROJECTS[ghostIndex];

  const swapContentInstant = (setter, index) => setter(index);

  const navigate = (dir) => {
    if (busyRef.current) return;
    const leaving = activeRef.current;
    const target = mod(leaving + dir);

    if (reducedMotion) {
      activeRef.current = target;
      setActiveIndex(target);
      setGhostIndex(mod(target - 1));
      return;
    }

    busyRef.current = true;

    // Pixel-accurate deltas between the two slots — robust at any screen size.
    const mainRect = mainRef.current.getBoundingClientRect();
    const ghostRect = ghostRef.current.getBoundingClientRect();
    const toGhost = {
      x: ghostRect.left - mainRect.left,
      y: ghostRect.top - mainRect.top,
      scale: ghostRect.width / mainRect.width,
    };
    const toMain = {
      x: mainRect.left - ghostRect.left,
      y: mainRect.top - ghostRect.top,
      scale: mainRect.width / ghostRect.width,
    };

    const tl = gsap.timeline({ onComplete: () => (busyRef.current = false) });

    tl.to(descRef.current, { opacity: 0, y: 8, duration: 0.22, ease: 'power2.in' }, 0);

    if (dir > 0) {
      // ---- NEXT: current shrinks + slides back, becomes the new ghost.
      //      Old ghost disappears first; new project scales into main.
      tl.to(ghostRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0);

      tl.to(
        mainRef.current,
        { x: toGhost.x, y: toGhost.y, scale: toGhost.scale, transformOrigin: 'top left', duration: 0.55, ease: 'power3.inOut' },
        0.05
      );

      tl.call(() => {
        setGhostIndex(leaving);
        gsap.set(ghostRef.current, { opacity: 1 });
        gsap.set(mainRef.current, { opacity: 0, x: 0, y: 0, scale: 1 });
        activeRef.current = target;
        setActiveIndex(target);
      });

      tl.fromTo(
        mainRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
      );
    } else {
      // ---- PREV: ghost grows forward and becomes the new main.
      //      Old main exits toward the viewer; a fresh ghost fades in behind.
      tl.to(mainRef.current, { opacity: 0, scale: 1.08, duration: 0.32, ease: 'power2.in' }, 0);

      tl.to(
        ghostRef.current,
        { x: toMain.x, y: toMain.y, scale: toMain.scale, transformOrigin: 'top left', duration: 0.55, ease: 'power3.inOut' },
        0
      );

      tl.call(() => {
        activeRef.current = target;
        setActiveIndex(target);
        gsap.set(mainRef.current, { opacity: 1, x: 0, y: 0, scale: 1 });
        gsap.set(ghostRef.current, { opacity: 0, x: 0, y: 0, scale: 1 });
        setGhostIndex(mod(target - 1));
      });

      tl.fromTo(ghostRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    }

    tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3');
  };

  return (
    <section className="bg-base py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <span className="label-mono block text-center text-ink-2">Community Builds</span>
        <h2 className="mt-4 text-center text-3xl font-extrabold uppercase leading-tight text-ink sm:text-4xl">
          Projects, Shipped Together
        </h2>
      </div>

      {/* ---------- Full-bleed stage ---------- */}
      <div className="relative left-1/2 mt-16 w-screen -translate-x-1/2 px-6">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-start">
          {/* Image stack */}
          <div className="relative order-1 mx-auto aspect-square w-full max-w-md md:mx-0 md:max-w-none">
            <div
              ref={ghostRef}
              className="absolute left-0 top-0 h-[80%] w-[80%] overflow-hidden rounded-2xl border border-white/10 shadow-lift"
            >
              <ProjectVisual project={ghost} iconClassName="h-7 w-7" />
            </div>

            <div
              ref={mainRef}
              className="absolute bottom-0 right-0 h-[90%] w-[90%] overflow-hidden rounded-2xl border border-white/10 shadow-lift"
            >
              <ProjectVisual project={active} />
              {/* Accent badge — same treatment as your event card's .ev-badge */}
              <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-md border-[1.5px] border-accent bg-ink/70 text-accent backdrop-blur-sm">
                <active.icon className="h-5 w-5" />
              </span>
            </div>
          </div>

          {/* Description panel — styled after your event card's dark footer/overlay language */}
          <div className="order-2 flex h-full flex-col">
            <div ref={descRef} className="flex-1 rounded-2xl border border-line bg-ink p-8 text-white">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {active.tag} <span className="text-white/30">·</span> {active.stack}
              </p>
              <h3 className="mt-3 text-2xl font-extrabold">{active.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70">{active.description}</p>
            </div>

            <div className="mt-4 grid grid-cols-[auto_1fr] gap-3">
              <a
                href={active.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${active.title} on GitHub`}
                className="flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-surface text-ink transition-colors hover:border-ink"
              >
                <GithubIcon className="h-5 w-5" />
              </a>

              {active.live ? (
                <a
                  href={active.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-14 items-center justify-center gap-2 rounded-xl bg-ink text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  View live demo <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <div className="flex h-14 items-center justify-center rounded-xl border border-dashed border-line text-sm text-ink-3">
                  No live demo yet
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="font-mono text-xs text-ink-3">
                {String(activeIndex + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
              </span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  aria-label="Previous project"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate(1)}
                  aria-label="Next project"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-primary-700"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}