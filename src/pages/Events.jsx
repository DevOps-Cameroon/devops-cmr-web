import { useRef, useState } from 'react'
import { Users, Wrench, Rocket } from 'lucide-react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { events, eventTypes } from '../data/events'

const statusLabels = { open: 'signups open', closed: 'archived' }
const typeMeta = {
  meetup: { icon: Users, cls: 'text-ok border-ok/40', label: 'Meetup' },
  workshop: { icon: Wrench, cls: 'text-accent border-accent/40', label: 'Workshop' },
  hackathon: { icon: Rocket, cls: 'text-warn border-warn/40', label: 'Hackathon' },
}

function EventCard({ event }) {
  const date = new Date(`${event.date}T09:00:00`)
  const meta = typeMeta[event.type] || typeMeta.workshop
  const Icon = meta.icon
  return (
    <article
      data-reveal-item
      className="panel flex h-full flex-col p-6 transition-colors hover:border-line-strong"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className={`inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[0.7rem] uppercase tracking-widest ${meta.cls}`}>
          <Icon size={12} strokeWidth={2.5} aria-hidden="true" />
          {meta.label}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-widest text-ink-3">
          <span
            className={`inline-block h-1.5 w-1.5 ${event.status === 'open' ? 'bg-ok' : 'bg-ink-3'}`}
            aria-hidden="true"
          />
          {statusLabels[event.status]}
        </span>
      </div>

      <h3 className="font-mono text-lg font-bold uppercase tracking-tight text-ink">{event.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{event.description}</p>

      <dl className="mt-6 space-y-2 border-t border-line pt-4 font-mono text-xs text-ink-2">
        <div className="flex justify-between gap-3">
          <dt className="text-ink-3">date</dt>
          <dd>
            {date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })} · {event.time}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-ink-3">location</dt>
          <dd className="text-right">{event.location}</dd>
        </div>
      </dl>

      <div className="mt-5">
        <div className="flex justify-between font-mono text-xs text-ink-2">
          <span className="text-ink-3">seats</span>
          <span>
            {event.taken ?? 0}/{event.capacity}
          </span>
        </div>
        <div className="mt-1.5 h-1.5 w-full bg-surface-2" aria-hidden="true">
          <div
            className="h-full bg-accent"
            style={{ width: `${Math.min(100, Math.round(((event.taken ?? 0) / event.capacity) * 100))}%` }}
          />
        </div>
      </div>

      {event.status === 'open' ? (
        <a
          href="#rsvp"
          onClick={(e) => e.preventDefault()}
          className="mt-5 inline-flex items-center justify-center gap-2 border border-accent bg-accent px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-accent-ink transition-colors hover:bg-transparent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          RSVP — mock link
        </a>
      ) : (
        <p className="mt-5 border border-line px-4 py-2.5 text-center font-mono text-xs uppercase tracking-wider text-ink-3">
          watch the recap
        </p>
      )}
    </article>
  )
}

export default function Events() {
  const [filter, setFilter] = useState('all')
  const gridRef = useRef(null)
  const reduced = useReducedMotion()

  const filtered = filter === 'all' ? events : events.filter((e) => e.type === filter)

  useGSAP(
    () => {
      if (reduced) return
      const items = gridRef.current.querySelectorAll('[data-reveal-item]')
      if (!items.length) return
      gsap.fromTo(
        items,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', overwrite: 'auto' },
      )
    },
    { scope: gridRef, dependencies: [filter, reduced] },
  )

  const handleKey = (e, type) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setFilter(type)
    }
  }

  return (
    <section className="grid-texture relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <Reveal>
        <SectionHeading index="03" kicker="event feed" title="Upcoming & past events" />
      </Reveal>

      <Reveal delay={0.1}>
        <div role="group" aria-label="Filter events by type" className="mb-10 flex flex-wrap gap-2">
          {['all', ...eventTypes].map((type) => {
            const meta = type === 'all' ? null : typeMeta[type]
            const Icon = meta?.icon
            return (
              <button
                key={type}
                type="button"
                onClick={() => setFilter(type)}
                onKeyDown={(e) => handleKey(e, type)}
                aria-pressed={filter === type}
                className={`inline-flex items-center gap-2 border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  filter === type
                    ? 'border-accent bg-accent text-accent-ink'
                    : 'border-line bg-surface text-ink-2 hover:border-accent hover:text-accent'
                }`}
              >
                {Icon && <Icon size={12} strokeWidth={2.5} aria-hidden="true" />}
                {type}
              </button>
            )
          })}
        </div>
      </Reveal>

      <div ref={gridRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center font-mono text-ink-3">no events in this queue</p>
      )}
    </section>
  )
}
