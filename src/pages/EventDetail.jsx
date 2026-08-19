import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useShowcaseEvent } from '../hooks/useShowcase'
import { showcaseEventIcon } from '../lib/eventIcons'
import ShowcaseHeader from '../components/ShowcaseHeader'
import ShowcaseFooter from '../components/ShowcaseFooter'
import SpeakersSection from '../components/SpeakersSection'
import '../events-showcase.css'

const navItems = [
  { label: 'home', to: '/', type: 'route' },
  { label: 'about', to: '/about', type: 'route' },
  { label: 'events', to: '/events', type: 'route', active: true },
  { label: 'partners', to: '#partners', type: 'anchor' },
  { label: 'join', to: '/join', type: 'route' },
]

const partners = ['AWS', 'Google Cloud', 'MTN', 'Orange', 'GitHub', 'Docker', 'HashiCorp', 'Datadog', 'Microsoft Azure', 'Canonical']

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, target - now)
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export default function EventDetail() {
  const { id } = useParams()
  const rootRef = useRef(null)
  const reduced = useReducedMotion()
  const { event, photos, loading: eventLoading } = useShowcaseEvent(id)

  const targetDate = new Date(event?.dateISO || Date.now()).getTime()
  const { days, hours, minutes, seconds } = useCountdown(targetDate)

  const pad = (n) => String(n).padStart(2, '0')

  useEffect(() => {
    const onPop = () => {
      document.getElementById('top')?.scrollIntoView()
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    if (event) document.title = `${event.title} ${event.year} — DevOps Cameroon`
  }, [event])

  useGSAP(
    () => {
      if (reduced) return
      if (!event) return

      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })

      gsap.utils.toArray('[data-scrub-text]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.1, filter: 'grayscale(1)' },
          {
            opacity: 1,
            filter: 'grayscale(0)',
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              end: 'top 30%',
              scrub: 0.5,
            },
          },
        )
      })

      gsap.utils.toArray('.dc-showcase .wm').forEach((wm) => {
        gsap.to(wm, {
          y: () => gsap.utils.random(-40, 60),
          ease: 'none',
          scrollTrigger: {
            trigger: wm.closest('.wm-section') || wm,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      })

      const heroPhoto = rootRef.current?.querySelector('.detail-hero .photo')
      if (heroPhoto) {
        gsap.fromTo(
          heroPhoto,
          { y: -40 },
          {
            y: 40,
            ease: 'none',
            scrollTrigger: {
              trigger: '.dc-showcase .detail-hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      }

      const hint = rootRef.current?.querySelector('.scroll-hint')
      if (hint) {
        gsap.to(hint, {
          y: -8,
          duration: 1.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      gsap.fromTo(
        '.dc-showcase .detail-hero-content > *',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      )
    },
    { scope: rootRef, dependencies: [reduced, event?.id] },
  )

  if (eventLoading || !event) {
    return (
      <div className="dc-showcase" id="top" ref={rootRef} style={{ minHeight: '100vh' }}>
        <ShowcaseHeader items={navItems} />
        <div className="wrap" style={{ padding: '120px 24px', color: '#8b8f98' }}>Loading event…</div>
      </div>
    )
  }

  return (
    <div className="dc-showcase" id="top" ref={rootRef}>
      <ShowcaseHeader items={navItems} />

      {/* ================= HERO ================= */}
      <section className="detail-hero hero" id="events" style={{ '--ev-accent': event.accent }}>
        <div className="photo" style={{ backgroundImage: `url(${event.img})` }} aria-hidden="true" />
        <div className="hero-overlay" />

        <div className="hero-content detail-hero-content wrap">
          <div className="hero-eyebrow">
            Events · DevOps Cameroon <span className="detail-hero-tag">/ {event.tag}</span>
          </div>
          <h1>
            {event.title}
            <br />
            <span className="hero-accent">{event.year}</span>
          </h1>

          <div className="hero-bottom">
            <div className="countdown" role="timer" aria-live="off">
              <div className="cell">
                <div className="num">{pad(days)}</div>
                <div className="lbl">Days</div>
              </div>
              <div className="cell">
                <div className="num">{pad(hours)}</div>
                <div className="lbl">Hours</div>
              </div>
              <div className="cell">
                <div className="num">{pad(minutes)}</div>
                <div className="lbl">Min</div>
              </div>
              <div className="cell">
                <div className="num">{pad(seconds)}</div>
                <div className="lbl">Sec</div>
              </div>
            </div>

            <div className="hero-date">
              <div className="date-badge">{showcaseEventIcon[event.tag]}</div>
              <div>
                <b>{event.dateLabel}</b>
                <span>{event.venue}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-hint">SCROLL DOWN</div>
      </section>

      {/* ================= ABOUT THIS EVENT ================= */}
      <section className="wm-section">
        <div className="wm" style={{ bottom: '-70px', left: '-30px', fontSize: 'clamp(140px,18vw,240px)', transform: 'rotate(-6deg)' }}>
          {'</>'}
        </div>
        <div className="wrap">
          <div className="about-card" data-reveal>
            <div className="about-top wrap" style={{ padding: '0 24px' }}>
              <h2 data-scrub-text>About this event</h2>
              <p className="about-statement" data-scrub-text>
                {event.summary}
              </p>
            </div>

            <ul className="about-highlights wrap" style={{ padding: '0 24px' }} data-scrub-text>
              {event.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <div className="about-cols wrap" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
              <div>
                <h5 data-scrub-text>Who it's for</h5>
                <p data-scrub-text>
                  Built for the engineers, SREs, and platform teams behind Cameroon's growing stacks — a stage to
                  demonstrate real skill and stand out.
                </p>
              </div>
              <div>
                <h5 data-scrub-text>Format</h5>
                <p data-scrub-text>{event.format}. Live walkthroughs, hiring conversations, and networking that turns into real offers.</p>
                <p data-scrub-text className="about-seats">{event.seats} available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section>
        <div className="wrap">
          <div className="cta-card" data-reveal>
            <div className="photo" style={{ backgroundImage: `url(${photos.cta})` }} aria-hidden="true" />
            <div className="cta-shade" />
            <div className="cta-body">
              <div>
                <h3 data-scrub-text>
                  {event.title}
                  <br />
                  {event.year}
                </h3>
              </div>
              <div className="cta-foot">
                <Link to="/join" className="btn btn-white">
                  RSVP
                </Link>
                <p>{event.dateLabel} · <strong className="cta-seats">{event.seats}</strong></p>
              </div>
            </div>
            <div className="cta-stats">
              <div className="stat">
                <div className="n">{String(event.speakers.length).padStart(2, '0')}</div>
                <div className="l">Speakers</div>
              </div>
              <div className="stat">
                <div className="n">04</div>
                <div className="l">Workshops</div>
              </div>
              <div className="stat">
                <div className="n">01</div>
                <div className="l">Event</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LOCATION ================= */}
      <section id="location">
        <div className="wrap">
          <div className="location-card" data-reveal>
            <div className="location-info">
              <h2 data-scrub-text>Location</h2>
              <div className="loc-date">
                <div className="date-badge">◎</div>
                <div>
                  <b>{event.dateLabel}</b>
                  <span>{event.venue}</span>
                </div>
                <a href="#map" onClick={(e) => e.preventDefault()} className="btn btn-white">
                  Open Map
                </a>
              </div>
            </div>
            <div className="location-img">
              <div className="photo" style={{ backgroundImage: `url(${photos.location})` }} aria-hidden="true" />
              <div className="map-nav">
                <button type="button" aria-label="Previous venue photo">‹</button>
                <button type="button" aria-label="Next venue photo">›</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PARTNERS pyramid ================= */}
      <section className="partners-section wm-section" id="partners">
        <div className="wm" style={{ top: '-90px', left: '50%', transform: 'translateX(-50%)', fontSize: 'clamp(180px,24vw,300px)' }}>
          #
        </div>
        <div className="wrap">
          <h2 style={{ fontSize: '34px' }} data-scrub-text>
            Partners
          </h2>
          <div className="partners-grid" data-reveal>
            {partners.map((p) => (
              <div key={p}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SPEAKERS ================= */}
      <SpeakersSection speakers={event.speakers} accent={event.accent} />

      {/* ================= ORGANIZERS ================= */}
      <section className="wm-section">
        <div className="wm" style={{ bottom: '-70px', right: '-30px', fontSize: 'clamp(140px,18vw,240px)' }}>
          #
        </div>
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <h2 data-scrub-text>Organizers</h2>
            <p data-scrub-text>The crew running this edition.</p>
          </div>

          <div className="organizer-grid" data-reveal>
            {event.organizers.map((o) => (
              <article key={o.name} className="organizer-card">
                <div className="organizer-avatar">{o.initials}</div>
                <h3 className="organizer-name">{o.name}</h3>
                <p className="organizer-role">{o.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ShowcaseFooter event={event} />
    </div>
  )
}