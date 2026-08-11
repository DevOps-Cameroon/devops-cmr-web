import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { team } from '../data/team'

function OrganizerCard({ person }) {
  return (
    <article data-reveal-item className="panel p-6 transition-colors hover:border-line-strong">
      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center border border-line bg-surface-2 font-mono text-lg font-bold text-accent"
          aria-hidden="true"
        >
          {person.name
            .split(' ')
            .map((w) => w[0])
            .join('')}
        </div>
        <div className="font-mono text-xs text-ink-3">
          <p className="text-ink">@{person.id.split('-')[1]}</p>
          <p>{person.role}</p>
        </div>
      </div>

      <h3 className="font-mono text-lg font-bold uppercase tracking-tight text-ink">{person.name}</h3>
      <p className="mt-1 text-sm text-ink-2">{person.focus}</p>

      <div className="mt-5 flex gap-2 border-t border-line pt-4">
        <a
          href={person.handles.github}
          aria-label={`${person.name} on GitHub`}
          className="border border-line bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-2 transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          github
        </a>
        <a
          href={person.handles.twitter}
          aria-label={`${person.name} on X`}
          className="border border-line bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-2 transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          x / twitter
        </a>
      </div>
    </article>
  )
}

export default function Team() {
  const gridRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const items = gridRef.current.querySelectorAll('[data-reveal-item]')
      if (!items.length) return
      gsap.fromTo(
        items,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out', overwrite: 'auto' },
      )
    },
    { scope: gridRef, dependencies: [reduced] },
  )

  return (
    <section className="grid-texture relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <Reveal>
        <SectionHeading index="06" kicker="organizers" title="The team keeping the lights on" />
      </Reveal>
      <Reveal delay={0.05}>
        <p className="max-w-2xl text-ink-2">
          Volunteer organizers running meetups, workshops, and infrastructure for the community — all on top of day
          jobs in tech.
        </p>
      </Reveal>

      <div ref={gridRef} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((person) => (
          <OrganizerCard key={person.id} person={person} />
        ))}
      </div>
    </section>
  )
}