export default function SectionHeading({ kicker, title, index, className = '' }) {
  return (
    <div className={`mb-10 ${className}`}>
      {index && <p className="label-mono mb-3">[ {index} ]</p>}
      {kicker && <p className="label-mono mb-3">{kicker}</p>}
      <div className="flex items-end gap-6">
        <h2 className="font-mono text-2xl font-bold uppercase tracking-tight text-ink sm:text-3xl">{title}</h2>
        <div className="tick-rule mb-1.5 min-w-[6rem] flex-1" aria-hidden="true" />
      </div>
    </div>
  )
}