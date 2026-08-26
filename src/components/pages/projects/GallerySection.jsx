import { useState } from "react";
import { projects } from "@/data/projects";
import SweepButton from "@/components/ui/SweepButton";

const GithubIcon = () => (
  <svg
    viewBox="0 0 16 16"
    className="w-3.5 h-3.5 fill-current"
    aria-hidden="true"
  >
    <path
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
      0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
      0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
      0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
    />
  </svg>
);

const LiveIcon = () => (
  <svg
    viewBox="0 0 16 16"
    className="w-3.5 h-3.5 fill-none stroke-current"
    strokeWidth="1.6"
    aria-hidden="true"
  >
    <path d="M6.5 3.5H3a1 1 0 0 0-1 1V13a1 1 0 0 0 1 1h8.5a1 1 0 0 0 1-1V9.5" />
    <path d="M9.5 2.5H13.5V6.5" />
    <path d="M13.2 2.8 7 9" />
  </svg>
);

function Panel({ project, isActive, onEnter }) {
  const hasBoth = project.repo && project.live;
  const hasGithub = !!project.repo;
  const hasLive = !!project.live;

  return (
    <div
      className={`gpanel group relative h-[220px] w-full cursor-pointer overflow-hidden rounded-2xl bg-ink transition-[flex-grow,height] duration-[550ms] ease-[cubic-bezier(0.65,0,0.35,1)] lg:min-w-[70px] lg:h-auto lg:w-auto ${isActive ? "is-active h-[360px] lg:flex-grow-[9]" : "lg:flex-grow"}`}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onClick={onEnter}
    >
      <img
        src={project.img}
        alt={`${project.name} project`}
        className={`absolute inset-0 h-full w-full object-cover brightness-[1.08] contrast-[1.06] saturate-[1.05] transition-[filter] duration-500 ${isActive ? "" : "grayscale"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

      {/* Vertical collapsed label */}
      <div
        className={`vlabel absolute bottom-5 right-4 text-sm font-semibold tracking-wide text-white transition-opacity duration-300 ${isActive ? "opacity-0" : "opacity-100"}`}
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        {project.name}
      </div>

      {/* Expanded label + buttons */}
      <div
        className={`hlabel absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 transition-all duration-300 ${isActive ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-1.5 pointer-events-none"}`}
      >
        <div>
          <p className="text-lg font-bold leading-tight text-white">
            {project.name}
          </p>
          <p className="mt-1 text-xs text-white/70">View Project</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {hasBoth && (
            <>
              <SweepButton
                as="a"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                contentClassName="px-3.5 py-2.5 text-[11px]"
                className="proj-btn inline-flex border-white/30 text-xs font-semibold text-white whitespace-nowrap [&_.label-default]:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <LiveIcon />
                <span>Live Site</span>
              </SweepButton>
              <SweepButton
                as="a"
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                contentClassName="px-3.5 py-2.5 text-[11px]"
                className="proj-btn inline-flex text-xs font-semibold text-ink whitespace-nowrap"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon />
                <span>GitHub</span>
              </SweepButton>
            </>
          )}
          {hasGithub && !hasBoth && (
            <SweepButton
              as="a"
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              contentClassName="px-3.5 py-2.5 text-[11px]"
              className="proj-btn inline-flex text-xs font-semibold text-ink whitespace-nowrap"
              onClick={(e) => e.stopPropagation()}
            >
              <GithubIcon />
              <span>GitHub</span>
            </SweepButton>
          )}
          {hasLive && !hasBoth && (
            <SweepButton
              as="a"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              contentClassName="px-3.5 py-2.5 text-[11px]"
              className="proj-btn inline-flex text-xs font-semibold text-ink whitespace-nowrap"
              onClick={(e) => e.stopPropagation()}
            >
              <LiveIcon />
              <span>Live Site</span>
            </SweepButton>
          )}
          {!hasGithub && !hasLive && (
            <span className="text-xs italic text-white/50">Coming soon</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const visibleProjects = projects.slice(0, 6);
  const hasMoreProjects = projects.length > visibleProjects.length;

  return (
    <section className="relative mx-auto w-full px-4 py-8 sm:px-6 sm:py-10 lg:aspect-[11/4]">
      <div className={`flex flex-col gap-6 border border-line bg-surface p-4 sm:p-7 lg:min-h-0 lg:aspect-[12/4] lg:flex-row lg:items-stretch ${visibleProjects.length > 1 ? "min-h-[1370px]" : ""}`}>
        {/* Left: heading + search */}
        <div className="flex shrink-0 flex-col justify-between py-2 lg:w-[300px]">
          <div>
            <h2 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-6xl">
              Our.
              <br />
              Team.
              <br />
              <span className="text-accent">Projects.</span>
            </h2>
            {hasMoreProjects && (
              <a
                href="#community-tools"
                className="mt-6 inline-flex text-xs font-semibold uppercase tracking-wide text-ink-3 underline decoration-line underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                View all {projects.length} projects
              </a>
            )}
          </div>
        </div>

        {/* Right: gallery */}
        <div
          className="flex min-h-0 flex-1 flex-col gap-1 overflow-visible rounded-2xl lg:flex-row lg:overflow-hidden"
          id="gallery"
        >
          {visibleProjects.map((project, i) => (
            <Panel
              key={project.id}
              project={project}
              isActive={i === activeIdx}
              onEnter={() => setActiveIdx(i)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .proj-btn {
          transition: transform 150ms ease, filter 150ms ease;
        }
        .proj-btn:hover {
          filter: brightness(0.95);
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
}
