import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav, site } from '../data/community'

function NavLinkItem({ item, onNavigate }) {
  return (
    <li>
      <NavLink
        to={item.path}
        end={item.path === '/'}
        onClick={onNavigate}
        className={({ isActive }) =>
          `group inline-flex items-center gap-1.5 px-3 py-2 font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            isActive ? 'text-accent' : 'text-ink-2 hover:text-ink'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span className={isActive ? 'text-accent' : 'text-accent-dim group-hover:text-accent'}>$</span>
            {item.label.toLowerCase()}
            {isActive && <span className="h-3 w-px bg-accent" aria-hidden="true" />}
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
    <header className="sticky top-0 z-40 border-b border-line bg-base/95 backdrop-blur-sm">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="group flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="inline-block h-2.5 w-2.5 bg-accent" aria-hidden="true" />
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
      </nav>

      {open && (
        <div id="mobile-menu" ref={menuRef} className="border-t border-line bg-base lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {nav.map((item) => (
              <NavLinkItem key={item.path} item={item} onNavigate={() => setOpen(false)} />
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
