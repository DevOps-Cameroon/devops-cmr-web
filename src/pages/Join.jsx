import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { socials } from '../data/community'

const channels = [
  {
    key: 'Slack',
    desc: 'Daily threads, mentoring, job posts, deep dives. The main hub.',
    tag: '#general',
    recommended: true,
  },
  {
    key: 'WhatsApp',
    desc: 'Fast, low-barrier pings. Great for quick questions and event reminders.',
    tag: 'announcements',
    recommended: false,
  },
  {
    key: 'Discord',
    desc: 'Voice labs, screen-sharing sessions, and quiet rooms for pairing.',
    tag: 'voice-lab',
    recommended: false,
  },
]

function JoinForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const email = new FormData(e.target).get('email')
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      setError('Enter a valid email address to join the list.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div role="status" className="border border-ok/40 bg-ok/10 p-6 font-mono text-sm text-ink">
        <p className="text-ok">✓ subscription queued</p>
        <p className="mt-2 text-ink-2">You're on the list. We'll ping you before the next event ships.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="email" className="label-mono mb-2 block">
        email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@company.cm"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? 'email-error' : undefined}
          className="h-12 flex-1 border border-line bg-surface px-4 font-mono text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 border border-accent bg-accent px-6 font-mono text-sm font-bold uppercase tracking-wider text-accent-ink transition-colors hover:bg-transparent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          subscribe <span aria-hidden="true">→</span>
        </button>
      </div>
      {error && (
        <p id="email-error" role="alert" className="mt-2 font-mono text-sm text-danger">
          {error}
        </p>
      )}
      <p className="mt-3 text-xs text-ink-3">One email per event. No spam. Unsubscribe anytime.</p>
    </form>
  )
}

export default function Join() {
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
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', overwrite: 'auto' },
      )
    },
    { scope: gridRef, dependencies: [reduced] },
  )

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-px w-full max-w-5xl -translate-x-1/2 bg-line" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,90,31,0.07),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <p className="label-mono mb-6">
            <span className="text-accent">$</span> ./join --community dvc
          </p>
          <h1 className="max-w-3xl font-mono text-4xl font-bold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Pull request approved. Welcome aboard.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            Whether you've shipped to production for years or you're still learning what YAML is, there's a place for
            you here. Pick a channel, show up to a meetup, and get your hands on something real.
          </p>
        </div>
      </section>

      <section aria-labelledby="channels-heading" className="grid-texture relative border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal>
            <SectionHeading index="07" kicker="choose your channel" title="Where we talk" />
          </Reveal>
          <div ref={gridRef} className="mt-8 grid gap-6 md:grid-cols-3">
            {channels.map((c) => {
              const soc = socials.find((s) => s.label === c.key)
              return (
                <div key={c.key} data-reveal-item className="panel flex flex-col p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-mono text-lg font-bold uppercase tracking-tight text-ink">{c.key}</h3>
                    {c.recommended && (
                      <span className="border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-accent">
                        recommended
                      </span>
                    )}
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-ink-2">{c.desc}</p>
                  <p className="mt-4 font-mono text-xs text-ink-3">{c.tag}</p>
                  <a
                    href={soc?.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center justify-center gap-2 border border-line bg-surface-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    join {c.key.toLowerCase()} <span aria-hidden="true">→</span>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="expect-heading" className="grid-texture relative border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal>
            <SectionHeading index="08" kicker="what to expect" title="No gatekeeping, no slides-only" />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                t: 'Hands-on everything',
                d: 'Workshops that end with you deploying something real, not just watching a demo.',
              },
              {
                t: 'Real engineers, local context',
                d: 'Learn from people running systems in Cameroon — bandwidth, costs, and constraints included.',
              },
              {
                t: 'A ladder, not a wall',
                d: 'Clear paths from your first command to production SRE, with mentors at each rung.',
              },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 0.1}>
                <div className="border-l-2 border-accent pl-4">
                  <h3 className="font-mono text-base font-bold uppercase tracking-tight text-ink">{item.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="mailing-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <div className="panel relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            </div>
            <div className="relative p-8 sm:p-12">
              <h2 id="mailing-heading" className="max-w-2xl font-mono text-2xl font-bold uppercase leading-tight tracking-tight text-ink sm:text-3xl">
                Get the next event in your inbox.
              </h2>
              <p className="mt-4 max-w-xl text-ink-2">
                A short, practical email when something ships — no noise.
              </p>
              <div className="mt-8 max-w-2xl">
                <JoinForm />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}