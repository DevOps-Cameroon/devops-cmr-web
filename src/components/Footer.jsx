import { Link } from 'react-router-dom'
import { nav, socials, site } from '../data/community'

export default function Footer() {
  return (
    <footer className="scanlines relative border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-ink">
              <span className="inline-block h-2.5 w-2.5 bg-accent" aria-hidden="true" />
              {site.shortName}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-2">{site.tagline} A community built on hands-on practice, not slides.</p>
          </div>

          <nav aria-label="Footer" className="text-sm">
            <h2 className="label-mono mb-4">Site map</h2>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-ink-2 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm">
            <h2 className="label-mono mb-4">Community channels</h2>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink-2 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm">
            <h2 className="label-mono mb-4">Contact</h2>
            <p className="text-ink-2">{site.location}</p>
            <p className="mt-1 text-ink-2">
              <a href="mailto:hello@devopscameroon.org" className="text-ink-2 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                hello@devopscameroon.org
              </a>
            </p>
            <div className="mt-6 border border-line bg-base p-3">
              <p className="font-mono text-xs text-ok">
                <span aria-hidden="true">●</span> all systems operational
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 font-mono text-xs text-ink-3 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {site.name}. Built by the community, for the community.</p>
          <p>
            <span className="text-accent" aria-hidden="true">deploy --env production</span>
            <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-ok" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  )
}
