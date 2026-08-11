import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Reveals children when scrolled into view with a configurable stagger + direction.
 * All motion is disabled under prefers-reduced-motion.
 */
export default function Reveal({ children, className = '', y = 24, delay = 0, stagger = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const targets = stagger
        ? ref.current.querySelectorAll('[data-reveal-item]')
        : [ref.current.firstElementChild || ref.current]
      if (!targets.length) return
      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: stagger ? stagger : 0,
          delay,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        },
      )
    },
    { scope: ref, dependencies: [reduced] },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}