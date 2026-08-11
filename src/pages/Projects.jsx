import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { projects } from '../data/projects'

const sizeClass = {
  lg: 'md:col-span-2 md:row-span-2',
  md: 'md:col-span-1 md:row-span-1',
  sm: 'md:col-span-1 md:row-span-1',
}

function ProjectCard({ project }) {
  return (
    <article
      data-reveal-item
      className={`panel group flex flex-col justify-between p-6 transition-colors hover:border-accent/50 ${sizeClass[project.size]}`}
    >
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-lg font-bold uppercase tracking-tight text-ink group-hover:text-accent">
            {project.name}
          </h3>
          <span className="font-mono text-xs uppercase tracking-widest text-ok">{project.lang}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-2">{project.description}</p>
      </div>

      <div className="mt-6">
        <div className="mb-4 flex items-center gap-4 font-mono text-xs text-ink-3">
          <span>
            <span className="text-ink">★</span> {project.stars}
          </span>
          <span>
            <span className="text-ink">⑂</span> {project.forks}
          </span>
        </div>
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-line bg-surface-2 px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          view repo <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}

export default function Projects() {
  const gridRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const items = gridRef.current.querySelectorAll('[data-reveal-item]')
      if (!items.length) return
      gsap.fromTo(
        items,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', overwrite: 'auto' },
      )
    },
    { scope: gridRef, dependencies: [reduced] },
  )

  return (
    <section className="grid-texture relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <Reveal>
        <SectionHeading index="04" kicker="community tools" title="Open-source projects" />
      </Reveal>
      <Reveal delay={0.05}>
        <p className="max-w-2xl text-ink-2">
          Tools the community actually uses. Every project started from a real problem a Cameroonian team had. All
          open source, all built in the open.
        </p>
      </Reveal>

      <div ref={gridRef} className="mt-12 grid gap-6 md:grid-cols-3 md:auto-rows-[13rem] lg:auto-rows-[14rem]">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}