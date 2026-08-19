import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

const VARIANTS = {
  block: {
    from: { y: 36, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
    trigger: { start: 'top 88%', once: true },
  },
  scrub: {
    from: { opacity: 0.1, filter: 'grayscale(1)' },
    to: { opacity: 1, filter: 'grayscale(0)', ease: 'none' },
    trigger: { start: 'top 92%', end: 'top 30%', scrub: 0.5 },
  },
}

/**
 * Reveals its contents while scrolling into view.
 * `variant="block"` slides + fades the whole element in once.
 * `variant="scrub"` reveals the element's color/text in sync with the scroll position.
 * All motion is disabled under prefers-reduced-motion.
 */
export default function ScrollReveal({ as: Tag = 'div', variant = 'block', className = '', children, ...props }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const preset = VARIANTS[variant] || VARIANTS.block
      gsap.fromTo(ref.current, preset.from, {
        ...preset.to,
        scrollTrigger: { trigger: ref.current, ...preset.trigger },
      })
    },
    { scope: ref, dependencies: [reduced, variant] },
  )

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  )
}