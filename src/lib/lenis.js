/**
 * Shared access to the global Lenis instance.
 *
 * The instance itself is created by <ReactLenis root> in App.jsx (per the
 * lenis/react docs). Components that need programmatic control —
 * lenis.scrollTo(), lenis.stop(), lenis.start() — import this module instead
 * of creating their own instance, so there is always exactly one scroller.
 *
 * Docs: https://lenis.darkroom.engineering/
 */
let lenis = null

export function setLenis(instance) {
  lenis = instance
}

export function getLenis() {
  return lenis
}
