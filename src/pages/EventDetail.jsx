import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useShowcaseEvent } from "@/hooks/useShowcase";
import { showcaseEventIcon } from "@/lib/eventIcons";
import Container from "@/components/ui/container";
import SweepButton from "@/components/ui/SweepButton";
import ScrollReveal from "@/components/ScrollReveal";
import Watermark from "@/components/pages/events/Watermark";
import SectionHeading from "@/components/pages/events/SectionHeading";
import SpeakersSection from "@/components/pages/events/SpeakersSection";
import OrganizersSection from "@/components/pages/events/OrganizersSection";
import Countdown from "@/components/pages/events/Countdown";
import EventHero from "@/components/pages/events/EventHero";

const partners = [
  "AWS",
  "Google Cloud",
  "MTN",
  "Orange",
  "GitHub",
  "Docker",
  "HashiCorp",
  "Datadog",
  "Microsoft Azure",
  "Canonical",
];

export default function EventDetail() {
  const { id } = useParams();
  const rootRef = useRef(null);
  const { event, photos, loading: eventLoading } = useShowcaseEvent(id);

  useEffect(() => {
    const onPop = () => {
      document.getElementById("top")?.scrollIntoView();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (event)
      document.title = `${event.title} ${event.year} — DevOps Cameroon`;
  }, [event]);

  if (eventLoading || !event) {
    return (
      <div id="top" ref={rootRef} className="min-h-screen bg-base text-ink">
        <Container className="px-6 py-32">
          <p className="font-mono text-sm text-ink-3">Loading event…</p>
        </Container>
      </div>
    );
  }

  return (
    <div id="top" ref={rootRef} className="overflow-x-clip bg-base text-ink">
      {/* ================= HERO ================= */}
      <EventHero
        image={event.img}
        eyebrow={
          <>
            Events · DevOps Cameroon{" "}
            <span className="font-semibold uppercase tracking-wide text-[var(--ev-accent)]">
              / {event.tag}
            </span>
          </>
        }
        title={event.title}
        accentTitle={event.year}
        style={{ "--ev-accent": event.accent }}
        overlayClassName="bg-gradient-to-t from-[#000000] via-[#060709]/70 to-[#060709]/20"
        bottomLeft={<Countdown target={event.dateISO} />}
        bottomRight={
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 flex-none items-center justify-center bg-accent text-ink">
              {showcaseEventIcon[event.tag]}
            </div>
            <div>
              <b className="block font-sans text-sm font-bold text-white">
                {event.dateLabel}
              </b>
              <span className="text-xs text-white/60">{event.venue}</span>
            </div>
          </div>
        }
      />

      {/* ================= ABOUT THIS EVENT ================= */}
      <section className="wm-section relative overflow-hidden py-16 lg:py-24">
        <Watermark
          className="bottom-[-70px] left-[-30px] text-[clamp(140px,18vw,240px)]"
          style={{ transform: "rotate(-6deg)" }}
        >
          {"</>"}
        </Watermark>
        <Container>
          <ScrollReveal
            as="div"
            variant="block"
            className="rounded-t border border-line"
          >
            <div className="flex flex-wrap items-start justify-between gap-10 px-6 pt-14 lg:px-8">
              <ScrollReveal
                as="h2"
                variant="scrub"
                className="font-sans text-[2.4rem] font-extrabold uppercase leading-none tracking-tight text-accent"
              >
                About this event
              </ScrollReveal>
              <ScrollReveal
                as="p"
                variant="scrub"
                className="about-statement max-w-[640px] text-left font-sans text-[clamp(1.25rem,2.4vw,1.7rem)] font-extrabold uppercase leading-[1.32] tracking-tight text-ink"
              >
                {event.summary}
              </ScrollReveal>
            </div>

            <ScrollReveal
              as="ul"
              variant="scrub"
              className="mt-10 border-y border-line"
            >
              {event.highlights.map((h) => (
                <li
                  key={h}
                  className="relative border-b border-line py-[17px] pl-8 pr-4 text-sm font-semibold text-ink last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-2 top-1/2 -translate-y-1/2 font-bold text-accent"
                  >
                    →
                  </span>
                  {h}
                </li>
              ))}
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-10 px-6 py-11 md:grid-cols-2 lg:px-8">
              <div>
                <ScrollReveal
                  as="h5"
                  variant="scrub"
                  className="mb-2.5 font-mono text-xs font-semibold uppercase tracking-[0.04em] text-ink"
                >
                  Who it&apos;s for
                </ScrollReveal>
                <ScrollReveal
                  as="p"
                  variant="scrub"
                  className="text-[13.5px] leading-[1.75] text-ink-2"
                >
                  Built for the engineers, SREs, and platform teams behind
                  Cameroon&apos;s growing stacks — a stage to demonstrate real
                  skill and stand out.
                </ScrollReveal>
              </div>
              <div>
                <ScrollReveal
                  as="h5"
                  variant="scrub"
                  className="mb-2.5 font-mono text-xs font-semibold uppercase tracking-[0.04em] text-ink"
                >
                  Format
                </ScrollReveal>
                <ScrollReveal
                  as="p"
                  variant="scrub"
                  className="text-[13.5px] leading-[1.75] text-ink-2"
                >
                  {event.format}. Live walkthroughs, hiring conversations, and
                  networking that turns into real offers.
                </ScrollReveal>
                <ScrollReveal
                  as="p"
                  variant="scrub"
                  className="mt-3 inline-block bg-accent px-3.5 py-[7px] font-mono text-xs font-bold uppercase tracking-[0.04em] text-ink"
                >
                  {event.seats} available
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 lg:py-24">
        <Container>
          <ScrollReveal
            as="div"
            variant="block"
            className="relative grid min-h-[400px] overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${photos.cta})` }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#060709]/90 via-[#060709]/50 to-[#060709]/15"
            />
            <div className="cta-body relative z-[2] flex min-h-[400px] flex-col justify-between p-11">
              <div>
                <ScrollReveal
                  as="h3"
                  variant="scrub"
                  className="max-w-[360px] font-sans text-[clamp(1.875rem,4.2vw,2.875rem)] font-extrabold uppercase leading-tight tracking-tight text-white"
                >
                  {event.title}
                  <br />
                  {event.year}
                </ScrollReveal>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <SweepButton
                  as={Link}
                  to={`/rsvp/${event.id}`}
                  variant="outline"
                  className="border-white/80 text-white [&_.label-default]:text-white"
                >
                  RSVP
                </SweepButton>
                <p className="max-w-[170px] text-[12.5px] leading-relaxed text-white/65">
                  {event.dateLabel} ·{" "}
                  <strong className="text-accent">{event.seats}</strong>
                </p>
              </div>
            </div>
            <div className="cta-stats z-[3] bg-accent shadow-[0_20px_50px_rgba(0,0,0,0.45)] md:absolute md:right-9 md:top-1/2 md:w-[170px] md:-translate-y-1/2">
              <div className="flex md:block">
                {[
                  {
                    n: String(event.speakers.length).padStart(2, "0"),
                    l: "Speakers",
                  },
                  { n: "04", l: "Workshops" },
                  { n: "01", l: "Event" },
                ].map((stat, i) => (
                  <div
                    key={stat.l}
                    className={`flex-1 border-ink/15 px-3 py-4 text-center md:flex-none md:border-b md:px-5 md:text-left ${
                      i > 0 ? "border-l md:border-l-0" : ""
                    } ${i < 2 ? "md:border-b" : ""}`}
                  >
                    <div className="font-sans text-[2rem] font-extrabold leading-none text-ink">
                      {stat.n}
                    </div>
                    <div className="mt-0.5 text-[11px] text-ink/65">
                      {stat.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ================= LOCATION ================= */}
      <section id="location" className="py-16 lg:py-24">
        <Container>
          <ScrollReveal
            as="div"
            variant="block"
            className="grid min-h-[340px] grid-cols-1 overflow-hidden bg-ink text-white lg:grid-cols-[0.85fr_1.15fr]"
          >
            <div className="flex flex-col justify-between gap-6 p-10 lg:p-11">
              <ScrollReveal
                as="h2"
                variant="scrub"
                className="font-sans text-[2rem] font-extrabold uppercase leading-tight tracking-tight text-white"
              >
                Location
              </ScrollReveal>
              <div className="flex flex-col items-start gap-3.5 lg:items-start">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-none items-center justify-center bg-accent text-ink">
                    ◎
                  </div>
                  <div>
                    <b className="block font-sans text-base font-bold text-white">
                      {event.dateLabel}
                    </b>
                    <span className="text-[12.5px] text-ink-3">
                      {event.venue}
                    </span>
                  </div>
                </div>
                <SweepButton
                  as="a"
                  href="#map"
                  onClick={(e) => e.preventDefault()}
                  variant="outline"
                  className="border-white/80 text-white [&_.label-default]:text-white"
                >
                  Open Map
                </SweepButton>
              </div>
            </div>
            <div className="relative min-h-[240px] overflow-hidden lg:ml-0 lg:min-h-0 lg:rounded-r-lg lg:m-5 lg:mr-5">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${photos.location})` }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-transparent"
              />
              <div className="absolute bottom-3.5 right-3.5 z-[2] flex gap-2">
                {["‹", "›"].map((g, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={
                      i === 0 ? "Previous venue photo" : "Next venue photo"
                    }
                    className="flex h-9 w-9 items-center justify-center bg-white text-sm text-ink transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ================= PARTNERS ================= */}
      <section
        id="partners"
        className="wm-section relative overflow-hidden py-16 text-center lg:py-24"
      >
        <Watermark className="left-1/2 top-[-90px] -translate-x-1/2 text-[clamp(180px,24vw,300px)]">
          #
        </Watermark>
        <Container>
          <SectionHeading title="Partners" />
          <ScrollReveal
            as="div"
            variant="block"
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded border border-line bg-line md:grid-cols-3 lg:grid-cols-5"
          >
            {partners.map((p) => (
              <div
                key={p}
                className="flex items-center justify-center bg-surface px-2.5 py-8 font-mono text-sm font-semibold uppercase tracking-[0.01em] text-ink-2 transition-colors hover:bg-base hover:text-ink"
              >
                {p}
              </div>
            ))}
          </ScrollReveal>
        </Container>
      </section>

      {/* ================= SPEAKERS ================= */}
      <SpeakersSection speakers={event.speakers} accent={event.accent} />

      {/* ================= ORGANIZERS ================= */}
      <OrganizersSection organizers={event.organizers} />
    </div>
  );
}
