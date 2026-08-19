import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Watermark({ children, className = '', ...rest }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      gsap.to(ref.current, {
        y: () => gsap.utils.random(-40, 60),
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current.closest('.wm-section') || ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    },
    { scope: ref },
  )

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`wm pointer-events-none absolute z-0 select-none whitespace-nowrap font-sans font-extrabold uppercase leading-[0.8] text-accent/5 [-webkit-text-stroke:2px_rgba(61,220,132,0.28)] ${className}`}
      {...rest}
    >
      {children}
    </span>
  )
}