import { Outlet, useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

function RootLayout() {
  const location = useLocation()
  const isShowcase =
    location.pathname === '/events' || location.pathname.startsWith('/events/')

  if (isShowcase) {
    return (
      <div className="flex min-h-screen flex-col bg-base text-ink">
        <a href="#main" className="skip-link focus:outline-none">
          Skip to content
        </a>
        <main id="main" className="flex-1">
          <Outlet />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-base text-ink">
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

export default RootLayout