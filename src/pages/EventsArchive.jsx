import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useShowcase } from '@/hooks/useShowcase'
import Container from '@/components/ui/container'
import SweepButton from '@/components/ui/SweepButton'
import ScrollReveal from '@/components/ScrollReveal'
import Watermark from '@/components/pages/events/Watermark'
import SectionHeading from '@/components/pages/events/SectionHeading'
import EventCard from '@/components/pages/events/EventCard'

const ALL = 'All events'

export default function EventsArchive() {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()
  const { events, loading } = useShowcase()
  const [filter, setFilter] = useState(ALL)

  useEffect(() => {
    document.title = 'Past Events — DevOps Cameroon'
  }, [])

  const tabs = useMemo(() => {
    const tags = [...new Set(events.map((e) => e.tag).filter(Boolean))]
    return [ALL, ...tags]
  }, [events])

  const filtered = useMemo(() => {
    const list = filter === ALL ? events : events.filter((e) => e.tag === filter)
    return [...list].sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO))
  }, [events, filter])

  useGSAP(
    () => {
      if (reduced) return

      const heroPhoto = rootRef.current?.querySelector('.archive-hero .photo')
      if (heroPhoto) {
        gsap.fromTo(
          heroPhoto,
          { y: -40 },
          {
            y: 40,
            ease: 'none',
            scrollTrigger: {
              trigger: '.archive-hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      }

      gsap.fromTo(
        '.archive-hero-content > *',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      )
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <div ref={rootRef} className="overflow-x-clip bg-base text-ink">
      {/* ================= HERO ================= */}
      <section id="events" className="archive-hero relative min-h-[420px] overflow-hidden md:min-h-[460px]">
        <div
          aria-hidden="true"
          className="photo absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${events[0]?.img})` }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0a0b0e]/35 via-[#0a0b0e]/35 to-[#08090c]/92" />

        <Container className="archive-hero-content relative z-[2] flex min-h-[420px] flex-col justify-end pb-14 pt-20 md:min-h-[460px]">
          <div className="mb-3.5 font-sans text-[13px] font-medium text-white/85">Events · DevOps Cameroon</div>
          <h1 className="font-sans text-[clamp(2.6rem,7vw,5rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-white">
            Past
            <br />
            <span className="text-accent">Events</span>
          </h1>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-[420px] text-[13px] leading-relaxed text-white/72">
              Every edition, talk, and lab we&apos;ve run so far — browse by focus area and revisit what happened.
            </p>
            <SweepButton as={Link} to="/events" variant="outline" className="border-white/80 text-white [&_.label-default]:text-white">
              ← Back to upcoming
            </SweepButton>
          </div>
        </Container>

        <div className="scroll-hint absolute bottom-0 left-1/2 z-[3] -translate-x-1/2 bg-surface px-5 pb-1 pt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-3">
          SCROLL DOWN
        </div>
      </section>

      {/* ================= ARCHIVE ================= */}
      <section id="archive" className="wm-section relative overflow-hidden py-16 lg:py-24">
        <Watermark className="right-[-40px] top-[-90px] text-[clamp(160px,22vw,280px)]">{'~/events'}</Watermark>
        <Container>
          <SectionHeading title="All Events" sub="Filter by focus area. Tabs sort the full archive." />

          {/* Tab bar */}
          <div
            role="tablist"
            aria-label="Filter events by focus area"
            className="mt-8 flex flex-wrap gap-1 border-b border-line pb-0"
          >
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={filter === t}
                onClick={() => setFilter(t)}
                className={`relative px-4 py-2.5 font-mono text-[12.5px] font-semibold uppercase tracking-[0.04em] transition-colors ${
                  filter === t ? 'bg-accent text-ink' : 'text-ink-3 hover:bg-surface-2 hover:text-ink'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <ScrollReveal
            as="div"
            variant="block"
            key={filter}
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Past events"
          >
            {filtered.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </ScrollReveal>

          {filtered.length === 0 && (
            <p className="mt-10 py-10 text-center font-mono text-sm text-ink-3">
              No events in this category yet.
            </p>
          )}
        </Container>
      </section>
    </div>
  )
}