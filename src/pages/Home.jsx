import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import TerminalHero from '../components/TerminalHero'
import StatCounter from '../components/StatCounter'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { communityStats } from '../data/community'
import { events } from '../data/events'

function EventSpotlight() {
  const next = events.find((e) => e.status === 'open')
  if (!next) return null
  const date = new Date(`${next.date}T09:00:00`)
  const taken = next.taken ?? 0
  const fill = Math.min(100, Math.round((taken / next.capacity) * 100))

  return (
    <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
      <div className="p-6 sm:p-8">
        <p className="label-mono mb-4">
          [ upcoming ] <span className="text-accent">{next.type}</span>
        </p>
        <h3 className="font-mono text-xl font-bold uppercase tracking-tight text-ink sm:text-2xl">{next.title}</h3>
        <p className="mt-3 max-w-xl text-ink-2">{next.description}</p>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 font-mono text-sm sm:grid-cols-3">
          <div>
            <dt className="label-mono mb-1">when</dt>
            <dd className="text-ink">
              {date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
              <span className="text-ink-3"> · {next.time}</span>
            </dd>
          </div>
          <div>
            <dt className="label-mono mb-1">where</dt>
            <dd className="text-ink">{next.mode}</dd>
          </div>
          <div>
            <dt className="label-mono mb-1">seats</dt>
            <dd className="text-ink">
              {taken}/{next.capacity} filled
            </dd>
          </div>
        </dl>
        <div className="mt-4 max-w-md" aria-hidden="true">
          <div className="h-2 w-full bg-surface-2">
            <div className="h-full bg-accent" style={{ width: `${fill}%` }} />
          </div>
          <div className="mt-1 flex justify-between font-mono text-[0.7rem] uppercase tracking-widest text-ink-3">
            <span>{fill}% full</span>
            <span>{next.capacity - taken} seats left</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-end justify-between gap-4 border-t border-line p-6 lg:flex-col lg:border-l lg:border-t-0 lg:p-8">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 border border-accent bg-accent px-5 py-3 font-mono text-sm font-bold uppercase tracking-wider text-accent-ink transition-colors hover:bg-transparent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Reserve a seat <span aria-hidden="true">→</span>
        </Link>
        <p className="font-mono text-xs text-ink-3">spots fill fast — set a reminder</p>
      </div>
    </div>
  )
}

function CommunityCTA() {
  return (
    <div className="panel relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      </div>
      <div className="relative p-8 sm:p-12">
        <p className="label-mono mb-3">[ join the fleet ]</p>
        <h2 className="max-w-2xl font-mono text-2xl font-bold uppercase leading-tight tracking-tight text-ink sm:text-3xl">
          One deploy command away from the community.
        </h2>
        <p className="mt-4 max-w-xl text-ink-2">
          Slack for daily threads, WhatsApp for quick pings, Discord for voice labs. Pick your channel — the work is the same.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { label: 'Slack', href: 'https://slack.com' },
            { label: 'WhatsApp', href: 'https://whatsapp.com' },
            { label: 'Discord', href: 'https://discord.com' },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-line bg-surface-2 px-5 py-3 font-mono text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span className="inline-block h-2 w-2 bg-accent" aria-hidden="true" />
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
        '[data-hero-title]',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
      )
        .fromTo('[data-hero-sub]', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3')
        .fromTo('[data-hero-terminal]', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.4')
        .fromTo('[data-hero-status]', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.3')
    },
    { scope: heroRef },
  )

  return (
    <>
      <section ref={heroRef} className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-px w-full max-w-5xl -translate-x-1/2 bg-line" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,90,31,0.18),transparent_50%)]" />
          <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.06)_2px,rgba(255,255,255,0.06)_3px)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-line" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:py-24">
          <div>
            <p data-hero-status className="label-mono mb-6">
              <span className="text-ok" aria-hidden="true">●</span> online · {new Date().getFullYear()} cohort now onboarding
            </p>
            <h1 className="font-mono text-4xl font-bold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              <span data-hero-title className="block">Build. Automate.</span>
              <span data-hero-title className="block">
                Ship. <span className="text-accent">In Cameroon.</span>
              </span>
            </h1>
            <p data-hero-sub className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              DevOps Cameroon is the home for engineers who automate, harden, and ship infrastructure across Cameroon —
              through meetups, hands-on labs, and open-source tools built together.
            </p>
            <div data-hero-sub className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/join"
                className="inline-flex items-center gap-2 border border-accent bg-accent px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-accent-ink transition-colors hover:bg-transparent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Join the community <span aria-hidden="true">→</span>
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 border border-line bg-surface px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Upcoming events
              </Link>
            </div>
          </div>

          <div data-hero-terminal>
            <TerminalHero />
          </div>
        </div>
      </section>

      <section aria-labelledby="stats-heading" className="grid-texture relative border-b border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:py-20">
          <h2 id="stats-heading" className="sr-only">
            Community in numbers
          </h2>
          {communityStats.map((s) => (
            <StatCounter key={s.key} value={s.value} suffix={s.suffix} label={s.label} pct={s.pct} />
          ))}
        </div>
      </section>

      <section aria-labelledby="spotlight-heading" className="grid-texture relative border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal>
            <SectionHeading index="02" kicker="next deploy" title="Upcoming event" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="panel">
              <EventSpotlight />
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="cta-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <CommunityCTA />
        </Reveal>
      </section>
    </>
  )
}
