import { useEffect, useState } from 'react'

const LINES = [
  { text: '$ dvc deploy --env production --region cm', cls: 'text-accent' },
  { text: '▸ auth    ✓  verified pipeline token', cls: 'text-ink-2' },
  { text: '▸ build   ✓  docker build -t dvc-app:1.4.2', cls: 'text-ink-2' },
  { text: '▸ lint    ✓  0 errors · 0 warnings', cls: 'text-ink-2' },
  { text: '▸ test    ✓  32 passed · 0 failed · 1 skipped', cls: 'text-ink-2' },
  { text: '▸ scan    ✓  0 critical · 2 low · 0 high', cls: 'text-ink-2' },
  { text: '▸ push    ✓  registry.cm/dvc-app:1.4.2', cls: 'text-ink-2' },
  { text: '▸ deploy  ✓  rolling update · 3/3 pods ready', cls: 'text-ok' },
  { text: '', cls: '' },
  { text: 'STATUS: SHIPPED · uptime 99.98% · latency p95 42ms', cls: 'text-accent' },
]

export default function TerminalHero() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [visible, setVisible] = useState(() => (reduced ? LINES.length : 0))
  const [typing, setTyping] = useState(() => (reduced ? LINES.length : 1))

  useEffect(() => {
    if (reduced) return
    const timers = []
    LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setTyping((v) => Math.max(v, i + 1)), 400 + i * 500),
        setTimeout(() => setVisible((v) => Math.max(v, i + 1)), 700 + i * 500),
      )
    })
    return () => timers.forEach (clearTimeout)
  }, [reduced])

  return (
    <div className="panel overflow-hidden font-mono text-[0.8rem] leading-6 sm:text-sm" aria-label="Deploy output">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-warn/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-ok/80" />
        <span className="ml-3 text-xs text-ink-3">dvc — deploy.log</span>
      </div>
      <div className="min-h-[14rem] px-4 py-4 sm:min-h-[16rem]">
        {LINES.slice(0, visible).map((line, i) => (
          <p key={i} className={line.cls} aria-hidden={line.cls !== ''}>
            {line.text}
          </p>
        ))}
        {typing < LINES.length && (
          <span className="inline-block h-4 w-2.5 animate-pulse bg-accent align-middle" aria-hidden="true" />
        )}
      </div>
    </div>
  )
}