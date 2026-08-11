import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { resources } from '../data/resources'

const typeIcon = {
  talk: '▶',
  guide: '§',
  workshop: '⌘',
}

const typeClass = {
  talk: 'text-accent',
  guide: 'text-ok',
  workshop: 'text-warn',
}

export default function Resources() {
  return (
    <section className="grid-texture relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <Reveal>
        <SectionHeading index="05" kicker="knowledge base" title="Learning resources" />
      </Reveal>
      <Reveal delay={0.05}>
        <p className="max-w-2xl text-ink-2">
          Talk recordings, workshop replays, and field guides. Scanned fast, so no fancy tricks — just the list.
        </p>
      </Reveal>

      <div className="mt-12">
        <Reveal stagger={0.04}>
          <ul className="divide-y divide-line border-y border-line">
            {resources.map((r) => (
              <li key={r.id}>
                <a
                  href={r.url}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 px-2 py-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:gap-6 sm:px-4"
                >
                  <span
                    className={`hidden w-10 shrink-0 font-mono text-lg sm:inline ${typeClass[r.type]}`}
                    aria-hidden="true"
                  >
                    {typeIcon[r.type]}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-sm font-bold uppercase tracking-tight text-ink group-hover:text-accent">
                      {r.title}
                    </span>
                    <span className="mt-1 block text-sm text-ink-2">
                      {r.author} · <span className="text-ink-3">{r.duration}</span>
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="hidden font-mono text-xs uppercase tracking-widest text-ink-3 md:inline">
                      {r.type}
                    </span>
                    <span className="font-mono text-xs text-ink-3">{r.date}</span>
                    <span className="font-mono text-accent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                      →
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}