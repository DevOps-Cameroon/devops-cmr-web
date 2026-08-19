import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

const socialIcons = {
  linkedin: (
    <svg viewBox="0 0 24 24" className="dc-social-icon" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.48V23h-4V8z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" className="dc-social-icon" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.6.24 2.77.12 3.06.74.8 1.19 1.82 1.19 3.08 0 4.43-2.7 5.4-5.27 5.68.42.36.78 1.07.78 2.17v3.22c0 .31.21.67.8.56A11.53 11.53 0 0 0 23.5 12C23.5 5.66 18.35.5 12 .5z" />
    </svg>
  ),
  website: (
    <svg viewBox="0 0 24 24" className="dc-social-icon" aria-hidden="true">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm7.9 9h-3.52a15.6 15.6 0 00-1.15-5.42A8.03 8.03 0 0119.9 11zM12 4.05c.86 1.1 1.94 3.08 2.24 6.95H9.76c.3-3.87 1.38-5.85 2.24-6.95zM9.76 13h4.48c-.3 3.87-1.38 5.85-2.24 6.95-.86-1.1-1.94-3.08-2.24-6.95zm-2.2-2H4.1a8.03 8.03 0 014.67-5.42A15.6 15.6 0 007.63 11H4.1zm0 2h3.52a15.6 15.6 0 001.15 5.42A8.03 8.03 0 014.1 13zm12.35 5.42A15.6 15.6 0 0017.6 13h2.3a8.03 8.03 0 01-3.45 5.42z" />
    </svg>
  ),
}

export default function SpeakersSection({ speakers = [], accent = '#3ddc84' }) {
  const rootRef = useRef(null)
  const photoWrapRef = useRef(null)
  const infoRef = useRef(null)
  const rowRef = useRef(null)
  const viewportRef = useRef(null)
  const swapTl = useRef(null)
  const marqueeTl = useRef(null)
  const pausedRef = useRef(false)

  const reduced = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [duplicated, setDuplicated] = useState(false)
  const [animated, setAnimated] = useState(false)

  const count = speakers.length
  const featured = speakers[displayIndex]

  // Measure whether the thumbnail row overflows its viewport so we can loop it.
  useEffect(() => {
    const measure = () => {
      if (reduced) return
      setDuplicated(false)
      setAnimated(false)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const row = rowRef.current
          const viewport = viewportRef.current
          if (!row || !viewport) return
          if (row.scrollWidth > viewport.clientWidth + 4) {
            setDuplicated(true)
            setAnimated(true)
          }
        })
      })
    }

    measure()
    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(measure, 200)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimer)
    }
  }, [reduced, count])

  // Seamless marquee loop driven by GSAP (linear ease, pauses on hover).
  useGSAP(
    () => {
      const row = rowRef.current
      if (reduced || !animated || !row) {
        marqueeTl.current = null
        return
      }
      const tl = gsap.fromTo(
        row,
        { xPercent: 0 },
        { xPercent: -50, duration: 60, ease: 'none', repeat: -1, paused: pausedRef.current },
      )
      marqueeTl.current = tl
      return () => tl.kill()
    },
    { scope: rootRef, dependencies: [animated, reduced, duplicated] },
  )

  // Entrance reveal + scroll textures for the whole section.
  useGSAP(
    () => {
      if (reduced) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      })

      tl.fromTo('[data-sp-eyebrow]', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: 'power2.out' }, 0)
        .fromTo('[data-sp-title]', { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' }, 0.1)
        .fromTo('[data-sp-photo]', { y: 44, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.9, ease: 'power3.out' }, 0.18)
        .fromTo('[data-sp-info]', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65, ease: 'power3.out' }, 0.28)
        .fromTo('[data-sp-row]', { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }, 0.42)
        .fromTo('[data-sp-wm]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, 0.55)

      // Watermark drifts slower than the scroll for depth.
      gsap.to('[data-sp-wm]', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      // Subtle skew on the marquee row as you scroll through.
      gsap.fromTo(
        viewportRef.current,
        { skewX: 0 },
        {
          skewX: 1.5,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        },
      )
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  const selectSpeaker = (i) => {
    if (reduced) {
      setActiveIndex(i)
      setDisplayIndex(i)
      return
    }
    if (i === activeIndex) return
    setActiveIndex(i)
    swapTl.current?.kill()
    const targets = [photoWrapRef.current, infoRef.current].filter(Boolean)
    swapTl.current = gsap
      .timeline()
      .to(targets, { autoAlpha: 0, y: 14, duration: 0.2, ease: 'power2.in', overwrite: 'auto' })
      .add(() => setDisplayIndex(i))
      .to(targets, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
  }

  const renderThumb = (s, i, isClone) => (
    <div
      key={`${i}-${isClone ? 'c' : 'a'}`}
      className={`speaker-thumb${i === activeIndex ? ' is-active' : ''}`}
      role="button"
      tabIndex={isClone ? -1 : 0}
      aria-hidden={isClone || undefined}
      aria-label={isClone ? undefined : `${s.name} — ${s.role}`}
      aria-pressed={!isClone && i === activeIndex}
      data-index={i}
      onClick={() => selectSpeaker(i)}
      onMouseEnter={() => selectSpeaker(i)}
      onFocus={() => selectSpeaker(i)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          selectSpeaker(i)
        }
      }}
    >
      <div className="speaker-tag">
        <p className="speaker-tag-name">{s.name}</p>
        <p className="speaker-tag-role">{s.role}</p>
      </div>
      <img src={s.thumb} alt={s.name} loading="lazy" />
    </div>
  )

  if (count === 0) return null

  return (
    <section ref={rootRef} className="speakers-section" aria-label="Speakers" style={{ '--ev-accent': accent }}>
      <div className="speakers-shell">
        <span className="speakers-eyebrow" data-sp-eyebrow>
          Our Speakers
        </span>
        <h2 className="speakers-title" data-sp-title>
          We Bring Bold Voices, Fresh Ideas, and
          <br />
          Stories that Matter to You.
        </h2>

        <div className="speakers-featured">
          <div className="speakers-watermark" data-sp-wm aria-hidden="true">
            Speakers
          </div>

          <div className="speakers-photo-wrap" ref={photoWrapRef} data-sp-photo>
            <img className="speakers-photo" src={featured.img} alt={featured.name} />
          </div>

          <div className="speakers-info">
            <div className="speakers-info-inner" ref={infoRef} data-sp-info>
              <h3>{featured.name}</h3>
              <p className="speakers-role">{featured.role}</p>
              <div className="speakers-bio">
                {featured.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="speakers-social">
                {Object.keys(featured.social).map((key) => (
                  <a key={key} href={featured.social[key]} target="_blank" rel="noopener" aria-label={key}>
                    {socialIcons[key]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="row-viewport"
          ref={viewportRef}
          data-sp-row
          onMouseEnter={() => {
            pausedRef.current = true
            marqueeTl.current?.pause()
          }}
          onMouseLeave={() => {
            pausedRef.current = false
            if (animated && !reduced) marqueeTl.current?.play()
          }}
        >
          <div className={`speaker-row${animated ? ' is-marquee' : ''}`} ref={rowRef}>
            {speakers.map((s, i) => renderThumb(s, i, false))}
            {duplicated && speakers.map((s, i) => renderThumb(s, i, true))}
          </div>
        </div>
      </div>
    </section>
  )
}
