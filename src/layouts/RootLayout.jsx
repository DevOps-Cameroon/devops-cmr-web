import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import BootOverlay from '../components/BootOverlay'

function RootLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-base text-ink">
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

export default RootLayout