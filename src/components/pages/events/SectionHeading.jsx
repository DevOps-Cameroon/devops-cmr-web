import ScrollReveal from '@/components/ScrollReveal'

export default function SectionHeading({ title, sub }) {
  return (
    <ScrollReveal as="div" variant="block" className="sec-head mx-auto mb-12 max-w-[520px] text-center">
      <ScrollReveal
        as="h2"
        variant="scrub"
        className="font-sans text-[clamp(1.875rem,4vw,2.5rem)] font-extrabold uppercase leading-tight tracking-tight text-ink"
      >
        {title}
      </ScrollReveal>
      {sub && (
        <ScrollReveal as="p" variant="scrub" className="mt-4 text-sm leading-[1.7] text-ink-2">
          {sub}
        </ScrollReveal>
      )}
    </ScrollReveal>
  )
}