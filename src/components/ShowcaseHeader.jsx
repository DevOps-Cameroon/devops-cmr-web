import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function renderNavLink(item, close) {
  if (item.type === 'anchor') {
    return (
      <a key={item.to} href={item.to} onClick={close}>
        {item.label}
      </a>
    )
  }
  return (
    <Link key={item.to} to={item.to} className={item.active ? 'active' : undefined} onClick={close}>
      {item.active && <span className="chev-mark">›</span>}
      {item.label}
    </Link>
  )
}

export default function ShowcaseHeader({ items }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <header>
      <nav className="wrap">
        <Link to="/" className="logo-text">
          <span className="logo-strong">DC</span>
          <span className="logo-sep">/</span>
          <span className="logo-sub">DevOps Cameroon</span>
        </Link>
        <div className="nav-links">{items.map((item) => renderNavLink(item, close))}</div>
        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="showcase-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? '✕' : '≡'}
        </button>
      </nav>
      <div id="showcase-menu" className={`nav-mobile${menuOpen ? ' open' : ''}`}>
        {items.map((item) => renderNavLink(item, close))}
      </div>
    </header>
  )
}