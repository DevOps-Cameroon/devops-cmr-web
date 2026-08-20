import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useShowcase } from '@/hooks/useShowcase'
import { showcaseEventIcon } from '@/lib/eventIcons'
import Container from '@/components/ui/container'
import SweepButton from '@/components/ui/SweepButton'
import ScrollReveal from '@/components/ScrollReveal'
import Watermark from '@/components/pages/events/Watermark'
import SectionHeading from '@/components/pages/events/SectionHeading'
import EventCard from '@/components/pages/events/EventCard'
import ViewMoreCard from '@/components/pages/events/ViewMoreCard'

export default function EventsOverview() {
  const [openFaq, setOpenFaq] = useState(0)
  const rootRef = useRef(null)
  const reduced = useReducedMotion()
  const { events, faqs, photos, loading } = useShowcase()

  useEffect(() => {
    document.title = 'Events — DevOps Cameroon'
  }, [])

  const featured = events.find((e) => e.featured) || [...events].sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO))[0]
  const upcoming = events.filter((e) => e.id !== featured?.id)
  const ready = !loading

  useGSAP(
    () => {
      if (reduced) return

      const heroPhoto = rootRef.current?.querySelector('.overview-hero .photo')
      if (heroPhoto) {
        gsap.fromTo(
          heroPhoto,
          { y: -40 },
          {
            y: 40,
            ease: 'none',
            scrollTrigger: {
              trigger: '.overview-hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      }

      gsap.fromTo(
        '.overview-hero-content > *',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      )
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  const toggleFaq = (i) => setOpenFaq((cur) => (cur === i ? -1 : i))

  return (
    <div ref={rootRef} className="overflow-x-clip bg-base text-ink">
      {/* ================= HERO ================= */}
      <section id="events" className="overview-hero relative min-h-[520px] overflow-hidden md:min-h-[574px]">
        <div
          aria-hidden="true"
          className="photo absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${photos.hero})` }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0a0b0e]/35 via-[#0a0b0e]/35 to-[#08090c]/92" />

        <Container className="overview-hero-content relative z-[2] flex min-h-[520px] flex-col justify-end pb-16 pt-20 md:min-h-[574px]">
          <div className="mb-3.5 font-sans text-[13px] font-medium text-white/85">Events · DevOps Cameroon</div>
          <h1 className="font-sans text-[clamp(3.25rem,8.6vw,6.75rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-white">
            Upcoming
            <br />
            <span className="text-accent">Events</span>
          </h1>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-[220px] text-[13px] leading-relaxed text-white/72">
              Live infrastructure talks, hands-on labs, and hiring conversations — across Cameroon, all year round.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 flex-none items-center justify-center bg-accent text-ink">◎</div>
              <div>
                <b className="block font-sans text-sm font-bold text-white">{events.length} events this season</b>
                <span className="text-xs text-white/60">Douala &amp; Yaoundé, Cameroon</span>
              </div>
            </div>
          </div>
        </Container>

        <div className="scroll-hint absolute bottom-0 left-1/2 z-[3] -translate-x-1/2 bg-surface px-5 pb-1 pt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-3">
          SCROLL DOWN
        </div>
      </section>

      {/* ================= FEATURED EVENT ================= */}
      <section className="wm-section relative overflow-hidden py-16 lg:py-24">
        <Watermark className="left-[-30px] top-[-60px] text-[clamp(140px,18vw,240px)]">★</Watermark>
        <Container>
          <SectionHeading
            title="Featured Event"
            sub="The one everyone&apos;s watching. Don&apos;t sleep on this."
          />

          <ScrollReveal
            as={Link}
            to={`/events/${featured?.id || ''}`}
            variant="block"
            className="featured-card group grid grid-cols-1 overflow-hidden bg-ink text-white transition-transform duration-300 hover:-translate-y-1 lg:grid-cols-2"
            style={{ '--ev-accent': featured?.accent }}
          >
            <div className="relative min-h-[280px] lg:min-h-[460px]">
              <img className="absolute inset-0 h-full w-full object-cover" src={featured?.img} alt="" />
              <span className="absolute left-4 top-4 z-[2] flex h-10 w-10 items-center justify-center bg-accent text-ink">
                {showcaseEventIcon[featured?.tag]}
              </span>
            </div>
            <div className="flex flex-col items-start gap-4 p-8 lg:p-11">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.04em]" style={{ color: featured?.accent }}>
                {featured?.tag}
              </span>
              <ScrollReveal
                as="h3"
                variant="scrub"
                className="font-sans text-[clamp(1.75rem,3.4vw,2.625rem)] font-extrabold uppercase leading-tight tracking-tight text-white"
              >
                {featured?.title}
                <span className="ml-2 align-baseline text-sm font-semibold text-ink-3">{featured?.year}</span>
              </ScrollReveal>
              <p className="text-sm leading-[1.7] text-ink-3">{featured?.summary}</p>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[12.5px] text-ink-3">
                <span>{featured?.dateLabel}</span>
                <span className="text-accent">·</span>
                <span>{featured?.venue}</span>
                <span className="text-accent">·</span>
                <span>{featured?.seats}</span>
              </div>
              <SweepButton
                as="span"
                aria-hidden="true"
                variant="outline"
                className="mt-1 border-white/80 text-white [&_.label-default]:text-white"
              >
                View Event →
              </SweepButton>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ================= UPCOMING EVENTS ================= */}
      <section id="upcoming" className="wm-section relative overflow-hidden py-16 lg:py-24">
        <Watermark className="right-[-40px] top-[-90px] text-[clamp(160px,22vw,280px)]">{'{ }'}</Watermark>
        <Container>
          <SectionHeading
            title="Upcoming Events"
            sub="Every edition, talk, and lab on the calendar. Open any event to see speakers, schedule, and how to RSVP."
          />

          {ready && (
            <ScrollReveal as="div" variant="block" className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Upcoming events">
              {upcoming.slice(0, upcoming.length > 3 ? 2 : 3).map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))}
              {upcoming.length > 3 && <ViewMoreCard count={upcoming.length - 2} />}
            </ScrollReveal>
          )}
        </Container>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="wm-section relative overflow-hidden py-16 lg:py-24">
        <Watermark className="right-[-20px] top-[-50px] text-[clamp(150px,20vw,240px)]">?</Watermark>
        <Container>
          <ScrollReveal as="div" variant="block" className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[0.85fr_1.4fr]">
            <div className="flex min-h-[380px] flex-col items-center justify-center rounded bg-accent p-8 text-center text-ink lg:min-h-[380px]">
              <ScrollReveal
                as="h2"
                variant="scrub"
                className="font-sans text-[2.1rem] font-extrabold uppercase leading-tight tracking-tight text-ink"
              >
                FAQ
              </ScrollReveal>
              <div className="my-[22px] h-px w-[70%] bg-ink/25" />
              <ScrollReveal as="p" variant="scrub" className="mb-[18px] text-[13.5px] leading-relaxed text-ink/75">
                Do you have another question?
              </ScrollReveal>
              <SweepButton as="a" href="#contact" onClick={(e) => e.preventDefault()}>
                Contact Us →
              </SweepButton>
            </div>

            {ready && (
              <div className="flex flex-col">
                {faqs.map((item, i) => (
                  <div key={item.q} className={`mb-3.5 border border-line last:mb-0 ${openFaq === i ? 'border-line-strong' : ''}`}>
                    <div
                      className="flex cursor-pointer items-center justify-between px-5 py-[19px] text-sm font-semibold text-ink"
                      onClick={() => toggleFaq(i)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          toggleFaq(i)
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={openFaq === i}
                    >
                      <span>{item.q}</span>
                      <span className={`chev ml-4 text-ink-2 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>⌄</span>
                    </div>
                    <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-[13.5px] leading-[1.7] text-ink-2">{item.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollReveal>
        </Container>
      </section>
    </div>
  )
}