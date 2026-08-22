import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ExternalLink, ArrowUpRight, ArrowLeft, ArrowRight, Smartphone, Terminal, Cloud, Boxes, Radio, ScanFace } from 'lucide-react';
import cardBg from '/src/assets/images/Screenshot 2026-08-20 170951.png';

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

/* ── SVG noise data-URI — accent-colored grain ── */
const noiseSvg = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>
    <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' stitchTiles='stitch'/></filter>
    <rect width='300' height='300' filter='url(#n)' opacity='0.6'/>
  </svg>`
);

const PROJECTS = [
  {
    key: 'poultryops',
    title: 'PoultryOps',
    description: 'Offline-first farm management for smallholder poultry owners across Cameroon.',
    icon: Smartphone,
    gradient: 'from-accent to-primary-600',
    github: 'https://github.com/devopscameroon/poultryops',
    live: null,
  },
  {
    key: 'petrotwin',
    title: 'PetroTwin',
    description: 'Digital twin monitoring for petrol tankers \u2014 live telemetry and anomaly alerts.',
    icon: Radio,
    gradient: 'from-primary-700 to-ink',
    github: 'https://github.com/devopscameroon/petrotwin',
    live: 'https://petrotwin.devopscameroon.dev',
  },
  {
    key: 'famigo',
    title: 'Famigo',
    description: 'Errands, courses, and delivery-chat \u2014 built end to end by the community.',
    icon: Boxes,
    gradient: 'from-primary-500 to-primary-800',
    github: 'https://github.com/devopscameroon/famigo',
    live: null,
  },
  {
    key: 'livedeck',
    title: 'LiveDeck',
    description: 'A presentation platform with live, interactive coding environments embedded in slides.',
    icon: Terminal,
    gradient: 'from-ink to-primary-700',
    github: 'https://github.com/devopscameroon/livedeck',
    live: 'https://livedeck.devopscameroon.dev',
  },
  {
    key: 'grabpic',
    title: 'GrabPic',
    description: 'Face-recognition event photos, powered by pgvector similarity search.',
    icon: ScanFace,
    gradient: 'from-accent to-primary-700',
    github: 'https://github.com/devopscameroon/grabpic',
    live: null,
  },
];

function ProjectCard({ project }) {
  const Icon = project.icon;

  return (
    <div
      tabIndex={0}
      className="project-card group relative aspect-[4/5] shrink-0 snap-start overflow-hidden rounded-2xl border border-line w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] outline-none"
    >
      {/* Background image */}
      <img src={cardBg} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0 bg-ink/40" />

      {/* Natural state -- title + description + mobile buttons */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-6 pt-16">
        <h3 className="text-2xl font-extrabold leading-snug text-white">{project.title}</h3>
        <p className="mt-1.5 text-sm leading-snug text-white/75">{project.description}</p>

        {/* Mobile only: always-visible squared buttons */}
        <div className="mt-4 flex gap-2 sm:hidden">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={project.title + ' on GitHub'}
            className="flex h-10 items-center gap-1.5 rounded-none bg-ink px-3 text-xs font-semibold text-white transition-colors hover:bg-primary-700"
          >
            <GithubIcon className="h-3.5 w-3.5" /> GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-10 items-center gap-1.5 rounded-none bg-ink px-3 text-xs font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Live <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>

      {/* Hover overlay -- noise pattern sweep from bottom-left, hidden on mobile */}
      <div
        className="card-overlay absolute inset-0 z-20 hidden sm:flex items-center justify-center"
        style={{
          clipPath: 'circle(0% at 0% 100%)',
          transition: 'clip-path 0.9s cubic-bezier(.2,.8,.2,1)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,${noiseSvg}")`,
            backgroundSize: '150px 150px',
            backgroundColor: 'var(--accent)',
            opacity: 1,
          }}
        />
        <div
          className="card-overlay-content flex flex-col items-center gap-4 px-6 text-center"
          style={{ opacity: 0, transform: 'translateY(12px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}
        >
          <p className="flex items-center gap-1.5 text-sm font-semibold text-accent-ink">
            Learn more about the project
            <ArrowUpRight className="h-4 w-4" />
          </p>
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={project.title + ' on GitHub'}
              className="flex h-11 w-11 items-center justify-center bg-ink text-white transition-transform hover:scale-105"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex h-11 items-center gap-1.5 bg-ink px-4 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                Live <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Explore More CTA card */
function ExploreMoreCard() {
  return (
    <Link
      to="/projects"
      className="group relative flex shrink-0 snap-start flex-col items-center justify-center overflow-hidden rounded-2xl border border-line bg-ink transition-colors hover:border-accent/40 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] aspect-[4/5]"
    >
      <div className="flex flex-col items-center gap-4 px-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors group-hover:border-accent group-hover:text-accent">
          <ArrowRight className="h-5 w-5" />
        </span>
        <h3 className="text-xl font-extrabold leading-snug text-white">Explore More</h3>
        <p className="text-sm leading-snug text-white/60">
          See all community-built projects, docs, and case studies.
        </p>
        <span className="mt-2 inline-flex items-center gap-1.5 bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-transform group-hover:scale-105">
          Explore Projects <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export default function ProjectShowcase() {
  const scrollRef = useRef(null);
  const prevOverlayRef = useRef(null);
  const nextOverlayRef = useRef(null);

  const scroll = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector(':scope > div');
    if (!card) return;
    const step = card.offsetWidth + 24; /* gap-6 = 1.5rem = 24px */
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  const TOTAL = PROJECTS.length + 1; /* +1 for the CTA card */

  return (
    <section className="bg-base min-h-screen py-24">
      {/* Header */}
      <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end sm:justify-between mb-16 sm:mb-24 md:mb-32">
        <div>
          <span className="eyebrow label-mono mb-6 content-animation"><Terminal />Community Build</span>
          <h2 className="content-animation text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Projects, Shipped Together
          </h2>
        </div>
        <p className="content-animation max-w-sm leading-relaxed text-ink-2 sm:text-right">
          Real tools built, broken, and rebuilt in the open &mdash; by members solving problems they actually have.
        </p>
      </div>

      {/* Card track */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="scrollbar-none flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.key} project={project} />
          ))}
          <ExploreMoreCard />
        </div>

        {/* Nav arrows */}
        <div className="mt-8 flex items-center justify-between">
          <span className="font-mono text-xs text-ink-3">
            {'01' + ' / ' + String(TOTAL).padStart(2, '0')}
          </span>
          <div className="flex gap-3">
            {/* Prev */}
            <button
              type="button"
              onClick={() => scroll(-1)}
              onMouseEnter={() => {
                const el = prevOverlayRef.current;
                if (!el) return;
                const r = el.parentElement.getBoundingClientRect();
                const diag = Math.hypot(r.width, r.height);
                gsap.to(el, { clipPath: 'circle(' + diag + 'px at 0% 100%)', duration: 0.45, ease: 'power3.out' });
              }}
              onMouseLeave={() => {
                const el = prevOverlayRef.current;
                if (!el) return;
                gsap.to(el, { clipPath: 'circle(0px at 0% 100%)', duration: 0.35, ease: 'power2.in' });
              }}
              aria-label="Previous projects"
              className="relative h-11 w-11 overflow-hidden rounded-full border border-line cursor-pointer"
            >
              <span
                ref={prevOverlayRef}
                className="absolute inset-0 z-2 flex items-center justify-center bg-accent text-ink"
                style={{ clipPath: 'circle(0px at 0% 100%)' }}
              >
                <ArrowLeft className="h-4 w-4" />
              </span>
              <span className="relative z-1 flex h-full w-full items-center justify-center text-ink">
                <ArrowLeft className="h-4 w-4" />
              </span>
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={() => scroll(1)}
              onMouseEnter={() => {
                const el = nextOverlayRef.current;
                if (!el) return;
                const r = el.parentElement.getBoundingClientRect();
                const diag = Math.hypot(r.width, r.height);
                gsap.to(el, { clipPath: 'circle(' + diag + 'px at 0% 100%)', duration: 0.45, ease: 'power3.out' });
              }}
              onMouseLeave={() => {
                const el = nextOverlayRef.current;
                if (!el) return;
                gsap.to(el, { clipPath: 'circle(0px at 0% 100%)', duration: 0.35, ease: 'power2.in' });
              }}
              aria-label="Next projects"
              className="relative h-11 w-11 overflow-hidden rounded-full bg-ink cursor-pointer"
            >
              <span
                ref={nextOverlayRef}
                className="absolute inset-0 z-2 flex items-center justify-center bg-accent text-ink"
                style={{ clipPath: 'circle(0px at 0% 100%)' }}
              >
                <ArrowRight className="h-4 w-4" />
              </span>
              <span className="relative z-1 flex h-full w-full items-center justify-center text-white">
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; }
        /* Card hover: CSS-only arc sweep from bottom-left */
        .project-card:hover .card-overlay,
        .project-card:focus-visible .card-overlay {
          clip-path: circle(150% at 0% 100%) !important;
        }
        .project-card:hover .card-overlay-content,
        .project-card:focus-visible .card-overlay-content {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transition-delay: 0.25s !important;
        }
        /* On leave: content disappears instantly, clip-path does the sweep-out */
        .project-card:not(:hover):not(:focus-visible) .card-overlay-content {
          transition-delay: 0s !important;
        }
      `}</style>
    </section>
  );
}
