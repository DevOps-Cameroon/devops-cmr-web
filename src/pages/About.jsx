import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Terminal, Users, Target, Zap, ArrowUpRight } from 'lucide-react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import ScrollReveal from '../components/ScrollReveal'
import Container from '../components/ui/container'
import SweepButton from '../components/ui/SweepButton'
import Watermark from '../components/pages/events/Watermark'
import SectionHeading from '../components/pages/events/SectionHeading'
import OrganizersSection from '../components/pages/events/OrganizersSection'

/* ── Team members ── */
const TEAM = [
  { name: 'Ange KOUAM', role: 'Founder · Community Lead', initials: 'AK', photo: '/images/org1.png' },
  { name: 'DevOps Cameroon', role: 'Core Organizers', initials: 'DC', photo: '/images/org2.png' },
  { name: 'Volunteer Crew', role: 'Oversight, logistics & AV', initials: 'VC', photo: '/images/org3.png' },
  { name: 'Cloud Partners', role: 'Sponsors & cloud credits', initials: 'CP', photo: '/images/org4.png' },
  { name: 'Logistics Team', role: 'Venue, catering & setup', initials: 'LT', photo: '/images/org5.png' },
  { name: 'Marketing & Comms', role: 'Social, press & outreach', initials: 'MC', photo: '/images/IMG2.png' },
  { name: 'Tech Operations', role: 'Infra, AV & on-site support', initials: 'TO', photo: '/images/org1.png' },
  { name: 'Workshop Leads', role: 'Hands-on lab facilitators', initials: 'WL', photo: '/images/org2.png' },
]

/* ═══════════════════════════════════════════════════════════════
   HERO — full-screen, dark bg image, parallax (EventHero style)
   ═══════════════════════════════════════════════════════════════ */
function AboutHero() {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const heroPhoto = rootRef.current?.querySelector('.about-hero-photo')
      if (heroPhoto) {
        gsap.fromTo(
          heroPhoto,
          { y: -40 },
          {
            y: 40,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      }
      gsap.fromTo(
        '.about-hero-content > *',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      )
      const hint = rootRef.current?.querySelector('.about-hero-scroll-hint')
      if (hint) {
        gsap.to(hint, { y: -8, duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      }
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section
      id="about"
      ref={rootRef}
      className="about-hero relative min-h-[520px] overflow-hidden bg-[#08090c] md:min-h-[574px]"
    >
      <div
        aria-hidden="true"
        className="about-hero-photo absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=80)` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#0a0b0e]/35 via-[#0a0b0e]/35 to-[#08090c]"
      />

      <Container className="about-hero-content  relative z-[2] flex min-h-[520px] flex-col justify-end pb-16 pt-20 md:min-h-[574px]">
        <div className="mb-3.5 font-sans text-[13px] font-medium text-white/85">
          About · DevOps Cameroon
        </div>
        <h1 className="font-sans text-[clamp(3.25rem,8.6vw,6.75rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-white">
          We don&apos;t talk about
          <br />
          <span className="text-accent">DevOps.</span> We run it.
        </h1>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-wrap gap-3">
            {['CI/CD', 'containers', 'cloud', 'IaC', 'observability', 'SRE'].map((t) => (
              <span
                key={t}
                className="border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-white/70 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Container>

      <div className="about-hero-scroll-hint absolute bottom-0 left-1/2 z-[3] -translate-x-1/2 bg-surface px-5 pb-1 pt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-3">
        SCROLL DOWN
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   DEVOPS CAMEROON — home page style header + event detail body
   ═══════════════════════════════════════════════════════════════ */
function DevOpsCameroonSection() {
  return (
    <section className="wm-section relative overflow-hidden py-20 sm:py-28">
      <Watermark
        className="bottom-[-70px] left-[-30px] text-[clamp(140px,18vw,240px)]"
        style={{ transform: 'rotate(-6deg)' }}
      >
        {'</>'}
      </Watermark>
      <Container>
        {/* Home page style header */}
        <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end sm:justify-between mb-16 sm:mb-20 md:mb-24">
          <div>
            <span className="eyebrow label-mono mb-6 content-animation"><Terminal /> About</span>
            <h2 className="content-animation text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl">
              DevOps Cameroon
            </h2>
          </div>
          <p className="content-animation max-w-sm leading-relaxed text-ink-2 sm:text-right">
            A volunteer-run community of engineers building Cameroon&apos;s infrastructure future — together.
          </p>
        </div>

        <ScrollReveal as="div" variant="block" className="border border-line bg-surface px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <div className="">
            <ScrollReveal
              as="p"
              variant="scrub"
              className="font-sans text-sm font-medium tracking-tight text-ink"
            >
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc vel nisl. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc vel nisl.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc vel nisl. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc vel nisl.
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc vel nisl. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc vel nisl.
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc vel nisl. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc vel nisl.
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc vel nisl. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc vel nisl.
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc vel nisl. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc vel nisl.
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc vel nisl. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc vel nisl.
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc vel nisl. Sed euismod, nisl vel tincidunt lacinia, nunc est aliquam nunc, eget aliquam nisl nunc vel nisl.
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MISSION — home page style header
   ═══════════════════════════════════════════════════════════════ */
function MissionSection() {
  return (
    <section aria-labelledby="mission-heading" className="grid-texture relative border-y border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:py-32">
        <div>
          <span className="eyebrow label-mono mb-6 content-animation"><Target /> Mission</span>
          <h2 id="mission-heading" className="content-animation text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl">
            What we&apos;re on-call for
          </h2>
        </div>
        <div>
          <ul className="space-y-6">
            {[
              { t: 'Lower the barrier to entry', d: 'Hands-on labs where a laptop + internet is enough. No paywall, no gatekeeping.' },
              { t: 'Build real tools together', d: 'Community projects ship to open source and stay useful for teams across Cameroon.' },
              { t: 'Close the mentorship gap', d: 'Working engineers pair with people moving into infra roles — reviews, guidance, referrals.' },
              { t: 'Make infra a career, not a mystery', d: 'Clear learning paths from first YAML to production SLOs, in local context and language.' },
            ].map((item, i) => (
              <ScrollReveal key={item.t} as="li" variant="block" delay={i * 0.08} className="border-l-2 border-accent pl-4">
                <h3 className="font-mono text-base font-bold uppercase tracking-tight text-ink">{item.t}</h3>
                <p className="mt-1 text-ink-2">{item.d}</p>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HOW IT WORKS — home page style header
   ═══════════════════════════════════════════════════════════════ */
function HowItWorksSection() {
  return (
    <section aria-labelledby="how-heading" className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end sm:justify-between mb-16 sm:mb-20 md:mb-24">
          <div>
            <span className="eyebrow label-mono mb-6 content-animation"><Zap /> How it works</span>
            <h2 id="how-heading" className="content-animation text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Three ways in
            </h2>
          </div>
          <p className="content-animation max-w-sm leading-relaxed text-ink-2 sm:text-right">
            Show up, get your hands dirty, leave with something working.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { n: '01', t: 'Show up', d: 'Join a meetup or workshop. First one is always free, always hands-on.' },
            { n: '02', t: 'Build', d: 'Get your hands on a real pipeline, cluster, or dashboard during the lab.' },
            { n: '03', t: 'Ship', d: 'Leave with something working — and a community behind you when it doesn\u2019t.' },
          ].map((s, i) => (
            <ScrollReveal key={s.n} as="div" variant="block" delay={i * 0.1}>
              <div className="panel p-6">
                <p className="font-mono text-3xl font-bold text-accent">{s.n}</p>
                <h3 className="mt-4 font-mono text-lg font-bold uppercase tracking-tight text-ink">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal as="div" variant="block" delay={0.2}>
          <div className="cta-row content-animation mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SweepButton as={Link} to="/join">
              Get involved
            </SweepButton>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   OUR TEAM — reuse the shared organizers card section
   ═══════════════════════════════════════════════════════════════ */
function OurTeamSection() {
  return (
    <OrganizersSection
      organizers={TEAM}
      title="Our Team"
      subtitle="The crew building and running the community."
      mode="grid"
    />
  )
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT PAGE — composed sections
   ═══════════════════════════════════════════════════════════════ */
export default function About() {
  return (
    <div id="top" className="overflowx-x-clip bg-base text-ink">
      <AboutHero />
      <DevOpsCameroonSection />
      <MissionSection />
      <HowItWorksSection />
      <OurTeamSection />
    </div>
  )
}
