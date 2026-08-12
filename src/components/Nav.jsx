import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav, site } from '../data/community'
import Container from './ui/container'

function NavLinkItem({ item, onNavigate }) {
  return (
    <li>
      <NavLink
        to={item.path}
        end={item.path === '/'}
        onClick={onNavigate}
        className={({ isActive }) =>
          `group inline-flex items-center gap-1.5 px-3 py-2 font-sans font-medium text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            isActive ? 'text-accent' : 'text-ink-2 hover:text-ink'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span
              aria-hidden="true"
              className={`mr-2 inline-block transform transition-transform duration-200 ${
                isActive ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
              }`}
            >
              &gt;
            </span>
            {item.label.toLowerCase()}
          </>
        )}
      </NavLink>
    </li>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 bg-base backdrop-blur-sm">
      <nav aria-label="Primary">
        <Container className="flex items-center justify-between py-3">

          <Link
            to="/"
            className="group flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="transition-colors group-hover:text-accent">{site.shortName}</span>
            <span className="hidden text-ink-3 sm:inline">/ {site.name}</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <NavLinkItem key={item.path} item={item} />
            ))}
          </ul>

          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center border border-line bg-surface font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
          >
            <span aria-hidden="true">{open ? '✕' : '≡'}</span>
          </button>
        </Container>
      </nav>

      {open && (
        <div id="mobile-menu" ref={menuRef} className="border-t border-line bg-base lg:hidden">
          <Container as="ul" className="flex flex-col py-2">
            {nav.map((item) => (
              <NavLinkItem key={item.path} item={item} onNavigate={() => setOpen(false)} />
            ))}
          </Container>
        </div>
      )}
    </header>
  )
}
