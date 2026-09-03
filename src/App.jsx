import { useEffect, useLayoutEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

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
  )
}

export default App
