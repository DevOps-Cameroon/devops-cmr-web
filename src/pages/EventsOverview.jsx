import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useShowcase } from '../hooks/useShowcase'
import { showcaseEventIcon } from '../lib/eventIcons'
import ShowcaseHeader from '../components/ShowcaseHeader'
import ShowcaseFooter from '../components/ShowcaseFooter'
import '../events-showcase.css'

const navItems = [
  { label: 'home', to: '/', type: 'route' },
  { label: 'about', to: '/about', type: 'route' },
  { label: 'events', to: '/events', type: 'route', active: true },
  { label: 'partners', to: '#partners', type: 'anchor' },
  { label: 'faq', to: '#faq', type: 'anchor' },
  { label: 'join', to: '/join', type: 'route' },
]

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

      const heroPhoto = rootRef.current?.querySelector('.overview-hero .photo')
      if (heroPhoto) {
        gsap.fromTo(
          heroPhoto,
          { y: -40 },
          {
            y: 40,
            ease: 'none',
            scrollTrigger: {
              trigger: '.dc-showcase .overview-hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )
      }

      gsap.fromTo(
        '.dc-showcase .overview-hero-content > *',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      )
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  const toggleFaq = (i) => setOpenFaq((cur) => (cur === i ? -1 : i))

  return (
    <div className="dc-showcase" ref={rootRef}>
      <ShowcaseHeader items={navItems} />

      {/* ================= HERO ================= */}
      <section className="overview-hero hero" id="events">
        <div className="photo" style={{ backgroundImage: `url(${photos.hero})` }} aria-hidden="true" />
        <div className="hero-overlay" />

        <div className="hero-content overview-hero-content wrap">
          <div className="hero-eyebrow">Events · DevOps Cameroon</div>
          <h1>
            Upcoming
            <br />
            <span className="hero-accent">Events</span>
          </h1>

          <div className="hero-bottom">
            <p className="hero-desc">
              Live infrastructure talks, hands-on labs, and hiring conversations — across Cameroon, all year round.
            </p>
            <div className="hero-date">
              <div className="date-badge">◎</div>
              <div>
                <b>{events.length} events this season</b>
                <span>Douala & Yaoundé, Cameroon</span>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-hint">SCROLL DOWN</div>
      </section>

      {/* ================= FEATURED EVENT ================= */}
      <section className="wm-section">
        <div className="wm" style={{ top: '-60px', left: '-30px', fontSize: 'clamp(140px,18vw,240px)' }}>
          ★
        </div>
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <h2 data-scrub-text>Featured Event</h2>
            <p data-scrub-text>
              The one everyone's watching. Don't sleep on this.
            </p>
          </div>

          <Link
            to={`/events/${featured?.id || ''}`}
            className="featured-card"
            data-reveal
            style={{ '--ev-accent': featured?.accent }}
          >
            <div className="featured-media">
              <img className="featured-img" src={featured?.img} alt="" />
              <span className="featured-badge">{showcaseEventIcon[featured?.tag]}</span>
            </div>
            <div className="featured-body">
              <span className="featured-tag" style={{ color: featured?.accent }}>
                {featured?.tag}
              </span>
              <h3 className="featured-title" data-scrub-text>
                {featured?.title}
                <span className="ev-year">{featured?.year}</span>
              </h3>
              <p className="featured-desc">{featured?.summary}</p>
              <div className="featured-meta">
                <span>{featured?.dateLabel}</span>
                <span className="ev-meta-dot">·</span>
                <span>{featured?.venue}</span>
                <span className="ev-meta-dot">·</span>
                <span>{featured?.seats}</span>
              </div>
              <div className="featured-cta">
                <span className="btn btn-primary">View Event →</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ================= UPCOMING EVENTS ================= */}
      <section id="upcoming" className="wm-section">
        <div className="wm" style={{ top: '-90px', right: '-40px', fontSize: 'clamp(160px,22vw,280px)' }}>
          {'{ }'}
        </div>
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <h2 data-scrub-text>Upcoming Events</h2>
            <p data-scrub-text>
              Every edition, talk, and lab on the calendar. Open any event to see speakers, schedule, and how to RSVP.
            </p>
          </div>

          {ready && (
            <div className="ev-grid" data-reveal role="list" aria-label="Upcoming events">
              {upcoming.map((ev) => (
                <Link
                  key={ev.id}
                  to={`/events/${ev.id}`}
                  className="ev-card"
                  role="listitem"
                  style={{ '--ev-accent': ev.accent }}
                  aria-label={`Open details for ${ev.tag} edition ${ev.year}`}
                >
                  <img className="ev-img" src={ev.img} alt="" />
                  <span className="ev-badge">{showcaseEventIcon[ev.tag]}</span>
                  <div className="ev-footer">
                    <h3 className="ev-title">
                      {ev.title} <span className="ev-year">{ev.year}</span>
                    </h3>
                    <p className="ev-meta">
                      <span>{ev.dateLabel}</span>
                      <span className="ev-meta-dot">·</span>
                      <span>{ev.seats}</span>
                    </p>
                  </div>
                  <div className="ev-overlay">
                    <h4 className="ev-overlay-title">
                      {ev.tag} <span className="arrow">›</span>
                    </h4>
                    <p className="ev-overlay-desc">{ev.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="wm-section">
        <div className="wm" style={{ top: '-50px', right: '-20px', fontSize: 'clamp(150px,20vw,240px)' }}>
          ?
        </div>
        <div className="wrap">
          <div className="faq-grid" data-reveal>
            <div className="faq-card">
              <h2 data-scrub-text>FAQ</h2>
              <div className="faq-divider" />
              <p data-scrub-text>Do you have another question?</p>
              <a href="#contact" onClick={(e) => e.preventDefault()} className="btn btn-dark">
                Contact Us →
              </a>
            </div>

            {ready && (
              <div className="faq-list">
                {faqs.map((item, i) => (
                  <div key={item.q} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                    <div
                      className="faq-q"
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
                      <span className="chev">⌄</span>
                    </div>
                    <div className="faq-a">
                      <div>
                        <p>{item.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <ShowcaseFooter />
    </div>
  )
}