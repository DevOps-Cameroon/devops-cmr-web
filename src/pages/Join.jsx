import { socialIcons } from '../components/pages/home/CTASection'

export default function Join() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-base">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-px w-full max-w-5xl -translate-x-1/2 bg-line" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(61,220,132,0.08),transparent_62%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <p className="eyebrow mb-6">
           Join.DevOpsCameroon
        </p>

        <h1 className="max-w-3xl font-sans text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Pull request approved. Welcome aboard.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
          Whether you&apos;ve shipped to production for years or you&apos;re still learning what YAML is,
          there&apos;s a place for you here.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          {socialIcons.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line bg-surface text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {social.svg}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}