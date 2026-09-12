import { useEffect, useLayoutEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from './lib/gsap'
import { setLenis } from './lib/lenis'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import About from './pages/About'
import EventsOverview from './pages/EventsOverview'
import EventDetail from './pages/EventDetail'
import Projects from './pages/Projects'
import RSVP from './pages/RSVP'
import Join from './pages/Join'
import Testimonial from './pages/Testimonial'

function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useLayoutEffect(() => {
    if (lenis) {
      // Jump instantly (no smoothing) so route changes always start at the top.
      lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, lenis])

  return null
}

/**
 * GSAP ScrollTrigger integration, per the official Lenis docs:
 * - keep ScrollTrigger in sync with Lenis's animated scroll position
 * - drive lenis.raf() from gsap.ticker so both share ONE loop (autoRaf off)
 * - disable GSAP lag smoothing so scroll animations never fall behind
 */
function ScrollTriggerBridge() {
  const lenis = useLenis(
    (instance) => {
      ScrollTrigger.update()
      setLenis(instance)
    },
    [],
    // Priority -1: run before other scroll callbacks so ScrollTrigger and the
    // shared-instance store are updated before any component reacts to it.
    -1,
  )

  useEffect(() => {
    if (!lenis) return undefined

    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Content height can change after images/mount; keep triggers in sync.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(tick)
      window.removeEventListener('load', refresh)
      setLenis(null)
    }
  }, [lenis])

  return null
}

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto'
      }
    }
  }, [])

  return (
    <ReactLenis
      root
      options={{
        // Single rAF loop: gsap.ticker drives lenis.raf (see ScrollTriggerBridge)
        autoRaf: false,
        // Make in-page anchor links (#map, #community-tools, #main) scroll smoothly
        anchors: true,
        // Horizontal carousels (OrganizersSection, EventShowcase) keep native scroll
        allowNestedScroll: true,
        lerp: 0.1,
      }}
    >
      <ScrollTriggerBridge />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="events" element={<EventsOverview />} />
            <Route path="events/:id" element={<EventDetail />} />
            <Route path="events/:id/testimonial" element={<Testimonial />} />
            <Route path="projects" element={<Projects />} />
            <Route path="rsvp" element={<RSVP />} />
            <Route path="rsvp/:id" element={<RSVP />} />
            <Route path="join" element={<Join />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  )
}

export default App
