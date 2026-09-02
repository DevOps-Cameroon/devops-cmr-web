import { Outlet, useLocation } from 'react-router-dom'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BootOverlay from '@/components/BootOverlay'
import Container from '@/components/ui/container'

function RootLayout() {
  const location = useLocation()
  const isShowcase =
    location.pathname === '/events' || location.pathname.startsWith('/events/') || location.pathname === '/projects' || location.pathname === '/rsvp' || location.pathname.startsWith('/rsvp/')

  if (isShowcase) {
    return (
      <div className="flex min-h-screen flex-col bg-base text-ink">
        <BootOverlay />
        <a href="#main" className="skip-link focus:outline-none">
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-base text-ink">
      <BootOverlay />
      <a href="#main" className="skip-link focus:outline-none">
        Skip to content
      </a>
      <Nav />
      <main id="main" className="flex-1">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout