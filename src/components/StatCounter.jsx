import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Animated stat counter with a mini progress bar.
 * Counts up and fills the bar when scrolled into view.
 * Renders final state immediately when motion is reduced.
 */
export default function StatCounter({ value, suffix = '', label, pct = 100, duration = 1.8 }) {
  const ref = useRef(null)
  const barRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) {
        ref.current.textContent = String(value).padStart(4, '0')
        gsap.set(barRef.current, { width: `${pct}%` })
        return
      }
      const obj = { n: 0 }
      const countTo = () => {
        ref.current.textContent = String(Math.round(obj.n)).padStart(4, '0')
      }
      gsap.to(obj, {
        n: value,
        duration,
        ease: 'power2.out',
        onUpdate: countTo,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      })
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        {
          width: `${pct}%`,
          duration: duration + 0.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        },
      )
    },
    { scope: ref, dependencies: [value, pct] },
  )

  return (
    <div className="min-w-0">
      <p className="font-mono text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        <span ref={ref}>0000</span>
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="label-mono mt-1">{label}</p>
      <div className="mt-3 h-1 w-full bg-surface-2" role="presentation" aria-hidden="true">
        <div ref={barRef} className="h-full bg-accent" style={{ width: reduced ? `${pct}%` : '0%' }} />
      </div>
    </div>
  )
}