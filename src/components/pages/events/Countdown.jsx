import { useEffect, useState } from 'react'

const pad = (n) => String(n).padStart(2, '0')

export default function Countdown({ target }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = Math.max(0, new Date(target).getTime() - now)
  const cells = [
    { n: pad(Math.floor(diff / 86400000)), l: 'Days' },
    { n: pad(Math.floor((diff % 86400000) / 3600000)), l: 'Hours' },
    { n: pad(Math.floor((diff % 3600000) / 60000)), l: 'Min' },
    { n: pad(Math.floor((diff % 60000) / 1000)), l: 'Sec' },
  ]

  return (
    <div className="flex overflow-hidden rounded border border-white/14 bg-ink/75" role="timer" aria-live="off">
      {cells.map((cell, i) => (
        <div key={cell.l} className={`px-[22px] py-3.5 text-center ${i < 3 ? 'border-r border-white/14' : ''}`}>
          <div className="font-sans text-3xl font-extrabold leading-none text-white">{cell.n}</div>
          <div className="mt-0.5 text-[10px] uppercase tracking-[0.05em] text-white/55">{cell.l}</div>
        </div>
      ))}
    </div>
  )
}