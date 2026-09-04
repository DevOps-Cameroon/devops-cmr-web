import { Link } from 'react-router-dom'

export default function ViewMoreCard({ count = 0, to = '/events', className = '' }) {
  return (
    <Link
      to={to}
      className={`group relative flex aspect-[4/4] flex-col items-center justify-center gap-5 overflow-hidden border border-ink/10 bg-accent text-ink ${className}`}
      role="listitem"
      aria-label={`View all ${count} more events`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.35),rgba(255,255,255,0)_55%)] transition-opacity duration-500 group-hover:opacity-0"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-7 -right-3 font-sans text-[7rem] font-extrabold leading-none text-ink/10"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-2 font-mono text-[13px] font-bold leading-none text-ink/30"
      >
        ▶
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-3 flex flex-col gap-[7px]"
      >
        <span className="block h-4 w-[2px] bg-ink/25" />
        <span className="block h-4 w-[2px] bg-ink/25" />
        <span className="block h-4 w-[2px] bg-ink/25" />
      </span>

      <span className="relative z-[2] flex flex-col items-center px-6 text-center">
        <span className="font-sans text-lg font-extrabold uppercase leading-tight tracking-tight">
          {count > 0 ? `+${count} more ` : 'View More'}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="relative z-[2] inline-flex items-center border border-ink/30 bg-transparent px-[1.7rem] py-[0.85rem] font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors duration-200 hover:bg-ink hover:text-accent"
      >
        See all →
      </span>
    </Link>
  )
}