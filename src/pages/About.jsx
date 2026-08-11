import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { milestones } from '../data/milestones'

function PipelineTimeline() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const track = trackRef.current
      const section = sectionRef.current
      const getDistance = () => track.scrollWidth - section.clientWidth

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-y border-line bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-10 sm:px-6 lg:py-14">
        <div>
          <p className="label-mono mb-3">[ pipeline ]</p>
          <h2 className="font-mono text-2xl font-bold uppercase tracking-tight text-ink sm:text-3xl">
            Community milestones — shipped
          </h2>
        </div>
        <p className="hidden font-mono text-sm text-ink-3 lg:block">scroll to move the pipeline →</p>
      </div>

      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max gap-8 px-4 pb-16 sm:px-6">
          {milestones.map((m, i) => (
            <article
              key={m.id}
              className="relative w-[19rem] shrink-0 border border-line bg-base p-6 sm:w-[22rem]"
            >
              <div className="mb-5 flex items-center justify-between">
                <span
                  className={`font-mono text-xs font-bold uppercase tracking-widest ${
                    m.status === 'done' ? 'text-ok' : 'text-accent'
                  }`}
                >
                  {m.status === 'done' ? '✓' : '▸'} {m.stage}
                </span>
                <span className="font-mono text-sm text-ink-3">{m.year}</span>
              </div>
              <div className="mb-5 h-px w-full bg-line">
                <div
                  className={`h-full ${m.status === 'done' ? 'w-full bg-ok' : 'w-1/3 bg-accent'}`}
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-mono text-lg font-bold uppercase tracking-tight text-ink">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{m.detail}</p>
              {i < milestones.length - 1 && (
                <span
                  className="absolute -right-8 top-1/2 z-10 -translate-y-1/2 font-mono text-accent"
                  aria-hidden="true"
                >
                  ›
                </span>
              )}
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <p className="label-mono">
          {milestones.length} stages · {milestones.filter((m) => m.status === 'done').length} shipped · next: {milestones[milestones.length - 1].title}
        </p>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <p className="label-mono mb-6">
            <span className="text-accent">$</span> cat about.md
          </p>
          <h1 className="max-w-3xl font-mono text-4xl font-bold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            We don't talk about DevOps. We run it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            DevOps Cameroon is a volunteer-run community of engineers across Douala, Yaoundé, and beyond. We organize
            meetups, hands-on workshops, and open labs on CI/CD, containers, cloud, infrastructure-as-code, and
            observability — taught by people who run these systems for a living.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {['CI/CD', 'containers', 'cloud', 'IaC', 'observability', 'SRE'].map((t) => (
              <span
                key={t}
                className="border border-line bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-2"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <PipelineTimeline />

      <section aria-labelledby="mission-heading" className="grid-texture relative border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <SectionHeading index="01" kicker="mission" title="What we're on-call for" />
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-6">
              {[
                {
                  t: 'Lower the barrier to entry',
                  d: 'Hands-on labs where a laptop + internet is enough. No paywall, no gatekeeping.',
                },
                {
                  t: 'Build real tools together',
                  d: 'Community projects ship to open source and stay useful for teams across Cameroon.',
                },
                {
                  t: 'Close the mentorship gap',
                  d: 'Working engineers pair with people moving into infra roles — reviews, guidance, referrals.',
                },
                {
                  t: 'Make infra a career, not a mystery',
                  d: 'Clear learning paths from first YAML to production SLOs, in local context and language.',
                },
              ].map((item) => (
                <li key={item.t} className="border-l-2 border-accent pl-4">
                  <h3 className="font-mono text-base font-bold uppercase tracking-tight text-ink">{item.t}</h3>
                  <p className="mt-1 text-ink-2">{item.d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="how-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <SectionHeading index="02" kicker="how it works" title="Three ways in" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { n: '01', t: 'Show up', d: 'Join a meetup or workshop. First one is always free, always hands-on.' },
            { n: '02', t: 'Build', d: 'Get your hands on a real pipeline, cluster, or dashboard during the lab.' },
            { n: '03', t: 'Ship', d: 'Leave with something working — and a community behind you when it doesn’t.' },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="panel p-6">
                <p className="font-mono text-3xl font-bold text-accent">{s.n}</p>
                <h3 className="mt-4 font-mono text-lg font-bold uppercase tracking-tight text-ink">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <Link
              to="/join"
              className="inline-flex items-center gap-2 border border-accent bg-accent px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-accent-ink transition-colors hover:bg-transparent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Get involved <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
