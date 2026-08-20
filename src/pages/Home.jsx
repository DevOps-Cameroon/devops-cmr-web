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
import HeroSection from '@/components/pages/home/hero'
import ImpactStats from '@/components/pages/home/ImpactStats'
import WhyDevOps from '@/components/pages/home/whyDevOps'
import SweepButton from '@/components/ui/SweepButton'
import CommunityBuilds from '@/components/pages/home/CommunityBuilds'
import ProjectShowcase from '@/components/pages/home/ProjectShowcase'

function EventSpotlight() {
  const next = events.find((e) => e.status === 'open')
  if (!next) return null
  const date = new Date(`${next.date}T09:00:00`)
  const taken = next.taken ?? 0
  const fill = Math.min(100, Math.round((taken / next.capacity) * 100))

  return (
    <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
      <div className="py-6 sm:p-8">
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
        <SweepButton>
          RSVP  
        </SweepButton>
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
    },
    { scope: heroRef },
  )

  return (
    <>
      <HeroSection ref={heroRef} />
      <ImpactStats />
      <WhyDevOps />
      {/* <ProjectShowcase /> */}
      {/* <CommunityBuilds /> */}
      {/* <EventSpotlight /> */}
      {/* <CommunityCTA /> */}
    </>
  )
}
