import { useState } from 'react';
import { ExternalLink, ArrowUpRight, ArrowLeft, ArrowRight, Smartphone, Terminal, Cloud, Boxes, Radio, ScanFace, Server, Shield, Gauge } from 'lucide-react';
import cardBg from '/src/assets/images/Screenshot 2026-08-20 170951.png';
import ViewMoreCard from '@/components/pages/events/ViewMoreCard';

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
  {
    key: 'cloudcheck',
    title: 'CloudCheck',
    description: 'Automated cloud cost audits \u2014 detects waste, recommends rightsizing, and tracks savings.',
    icon: Cloud,
    gradient: 'from-primary-600 to-accent',
    github: 'https://github.com/devopscameroon/cloudcheck',
    live: null,
  },
  {
    key: 'deploywatch',
    title: 'DeployWatch',
    description: 'Real-time deployment monitor for Kubernetes \u2014 rollbacks, health checks, and alert routing.',
    icon: Server,
    gradient: 'from-ink to-primary-600',
    github: 'https://github.com/devopscameroon/deploywatch',
    live: 'https://deploywatch.devopscameroon.dev',
  },
  {
    key: 'vaultlite',
    title: 'VaultLite',
    description: 'Lightweight secrets management for small teams \u2014 SOPS-compatible, Git-native, zero trust.',
    icon: Shield,
    gradient: 'from-primary-800 to-ink',
    github: 'https://github.com/devopscameroon/vaultlite',
    live: null,
  },
  {
    key: 'sloboard',
    title: 'SLOboard',
    description: 'Shared SLO dashboards for Cameroon startups \u2014 error budgets, burn rates, and uptime at a glance.',
    icon: Gauge,
    gradient: 'from-accent to-primary-500',
    github: 'https://github.com/devopscameroon/sloboard',
    live: 'https://sloboard.devopscameroon.dev',
  },
];

const PER_PAGE = 6;

function ProjectCard({ project }) {
  return (
    <div
      tabIndex={0}
      className="project-card group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line outline-none"
    >
      <img src={cardBg} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0 bg-ink/40" />

      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-6 pt-16">
        <h3 className="text-2xl font-extrabold leading-snug text-white">{project.title}</h3>
        <p className="mt-1.5 text-sm leading-snug text-white/75">{project.description}</p>

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

      <div
        className="card-overlay absolute inset-0 z-20 hidden sm:flex items-center justify-center"
        style={{
          clipPath: 'circle(0% at 0% 100%)',
          transition: 'clip-path 0.9s cubic-bezier(.2,.8,.2,1)',
        }}
      >
        <div className="absolute inset-0 bg-accent" />
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

export default function ProjectShowcase({ max }) {
  const [page, setPage] = useState(0);
  const paginated = !max;
  const displayProjects = paginated
    ? PROJECTS.slice(page * PER_PAGE, (page + 1) * PER_PAGE)
    : PROJECTS.slice(0, max - 1);
  const totalPages = Math.ceil(PROJECTS.length / PER_PAGE);

  return (
    <section className="bg-base py-24">
      {/* Header */}
      <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end sm:justify-between mb-16 sm:mb-20 md:mb-24 px-4 sm:px-6">
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

      {/* Grid */}
      <div className="px-4 sm:px-6">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <ProjectCard key={project.key} project={project} />
          ))}
          {max && (
            <ViewMoreCard
              count={PROJECTS.length - max + 1}
              to="/projects"
              className="!aspect-[4/5]"
            />
          )}
        </div>

        {/* Pagination */}
        {paginated && totalPages > 1 && (
          <div className="mt-10 flex items-center justify-between">
            <span className="font-mono text-xs text-ink-3">
              {String(page + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
            </span>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                aria-label="Previous page"
                className="relative h-10 w-10 overflow-hidden rounded-full border border-line cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="flex h-full w-full items-center justify-center text-ink">
                  <ArrowLeft className="h-3.5 w-3.5" />
                </span>
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                aria-label="Next page"
                className="relative h-10 w-10 overflow-hidden rounded-full bg-ink cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="flex h-full w-full items-center justify-center text-white">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
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
        .project-card:not(:hover):not(:focus-visible) .card-overlay-content {
          transition-delay: 0s !important;
        }
      `}</style>
    </section>
  );
}
