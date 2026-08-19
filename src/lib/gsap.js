import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, useGSAP)

export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export { gsap, ScrollTrigger, Draggable, InertiaPlugin, useGSAP }
