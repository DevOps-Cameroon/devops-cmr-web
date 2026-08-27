import { Link } from "react-router-dom";
import Container from "@/components/ui/container";
import SweepButton from "@/components/ui/SweepButton";
import ScrollReveal from "@/components/ScrollReveal";
import Watermark from "@/components/pages/events/Watermark";
import SectionHeading from "@/components/pages/events/SectionHeading";

const DEFAULT_EVENT = {
  id: 'devops-showcase-2026',
  title: 'DevOps Showcase',
  year: '2026',
  summary: 'The most anticipated edition yet: 18 talks, hands-on labs, live incident drills, and hiring conversations with our partners.',
  desc: "Cameroon's flagship cloud and infrastructure event — talks, workshops, and a hiring fair that turns real skill into real roles.",
  img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80',
  dateLabel: '21 November 2026',
  venue: 'Douala Polytechnic, Cameroon',
  organizers: [{ name: 'DevOps Cameroon' }],
};

const DetailIcon = ({ type }) => {
  if (type === "when")
    return (
      <svg
        className="mb-3 h-6 w-6 text-accent"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
        <path d="M9 14h.01M12 14h.01M15 14h.01" strokeLinecap="round" />
      </svg>
    );
  if (type === "where")
    return (
      <svg
        className="mb-3 h-6 w-6 text-accent"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.4" />
      </svg>
    );
  return (
    <svg
      className="mb-3 h-6 w-6 text-accent"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="9" y="3" width="6" height="10" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" strokeLinecap="round" />
    </svg>
  );
};

export default function FeaturedEventSection({ event = DEFAULT_EVENT }) {
  if (!event) return null;

  return (
    <section className="wm-section relative overflow-hidden py-16 lg:py-24">
      <Watermark className="left-[-30px] top-[-60px] text-[clamp(140px,18vw,240px)]">
        ★
      </Watermark>
      <Container>
        <SectionHeading
          title="Featured Event"
          sub="The one everyone's watching. Don't sleep on this."
        />
        {/* ---- Top row ---- */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Info card */}
          <ScrollReveal
            as="div"
            variant="scrub"
            className="relative flex min-h-[420px] flex-col justify-between overflow-hidden border border-line bg-white p-8 sm:p-10"
          >
            <div>
              <p className=" font-sans text-[clamp(1.25rem,2.4vw,1.7rem)] font-bold uppercase leading-[1.32] tracking-tight text-ink">
                {event.summary}
              </p>
              <p className="mt-6 font-sans text-sm leading-relaxed text-ink-2 sm:text-[15px]">
                {event.desc}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-start gap-4">
              <SweepButton as={Link} to={`/events/${event.id}`}>
                LEARN MORE
              </SweepButton>
            </div>
          </ScrollReveal>

          {/* Image card */}
          <ScrollReveal
            as="div"
            variant="block"
            className="relative min-h-[420px] overflow-hidden border border-neutral-200"
          >
            <img
              src={event.img}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-top brightness-[1.08] contrast-[1.06] saturate-[1.05]"
              loading="lazy"
            />
          </ScrollReveal>
        </div>

        {/* ---- Bottom row ---- */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[7fr_3fr]">
          {/* Details bar */}
          <div className="grid grid-cols-1 gap-8 bg-ink px-8 py-10 sm:grid-cols-3 sm:px-10">
            {[
              { key: "when", label: "WHEN", detail: event.dateLabel },
              { key: "where", label: "WHERE", detail: event.venue },
              {
                key: "who",
                label: "WHO",
                detail: event.organizers?.[0]?.name ?? "DevOps Cameroon",
              },
            ].map((col) => (
              <div key={col.key}>
                <DetailIcon type={col.key} />
                <p className="mb-2 font-sans text-sm font-bold tracking-widest text-white">
                  {col.label}
                </p>
                <p className="font-sans text-sm leading-relaxed text-white/60">
                  {col.detail}
                </p>
              </div>
            ))}
          </div>

          {/* CTA block */}
          <div className="relative flex items-center justify-center bg-accent px-10 py-12">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-3 -right-1 font-sans text-[7rem] font-extrabold leading-none text-ink/10"
            >
              +
            </span>

            <div className="flex flex-col items-center gap-6 ">
              <p className="font-sans text-md font-bold uppercase tracking-widest text-ink">
                GET TICKETS
              </p>
              <SweepButton as={Link} to={`/events/${event.id}`}>
                RSVP
              </SweepButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
