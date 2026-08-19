import { Link } from 'react-router-dom'
import { showcaseEventIcon } from '@/lib/eventIcons'

export default function EventCard({ event: ev }) {
  return (
    <Link
      to={`/events/${ev.id}`}
      className="group relative aspect-[4/3.1] overflow-hidden border border-ink/10 bg-ink"
      role="listitem"
      style={{ '--ev-accent': ev.accent }}
      aria-label={`Open details for ${ev.tag} edition ${ev.year}`}
    >
      <img
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
        src={ev.img}
        alt=""
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
      <span
        className="absolute right-4 top-4 z-[2] flex h-9 w-9 items-center justify-center text-[var(--ev-accent)] backdrop-blur-[2px]"
      >
        {showcaseEventIcon[ev.tag]}
      </span>
      <div className="ev-footer absolute bottom-0 left-0 right-0 z-[2] flex min-h-[64px] flex-col justify-center gap-1 border-t border-white/10 bg-ink px-5 py-3 transition-all duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-full group-hover:opacity-0">
        <h3 className="font-mono text-base font-medium text-white">
          {ev.title} <span className="ml-1.5 text-[0.82em] text-ink-3">{ev.year}</span>
        </h3>
        <p className="mt-0 flex items-center gap-2 font-mono text-[11.5px] font-semibold tracking-[0.02em] text-ink-3">
          <span>{ev.dateLabel}</span>
          <span className="text-[var(--ev-accent)]">·</span>
          <span>{ev.seats}</span>
        </p>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 z-[3] flex h-[62%] translate-y-full flex-col justify-end p-5 transition-transform duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0"
        style={{
          background:
            'linear-gradient(to top, rgba(18, 19, 25, 0.94) 0%, rgba(18, 19, 25, 0.75) 55%, rgba(18, 19, 25, 0) 100%), linear-gradient(100deg, color-mix(in srgb, var(--ev-accent) 35%, transparent) 0%, transparent 60%)',
        }}
      >
        <h4 className="mb-1.5 flex items-center gap-1.5 font-mono text-base font-semibold text-[var(--ev-accent)]">
          {ev.tag} <span className="transition-transform duration-[350ms] group-hover:translate-x-[3px]">›</span>
        </h4>
        <p className="text-[0.85rem] leading-relaxed text-ink-3">{ev.desc}</p>
      </div>
    </Link>
  )
}