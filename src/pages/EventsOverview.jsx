import { useEffect, useMemo, useState } from "react";
import { useShowcase } from "@/hooks/useShowcase";
import Container from "@/components/ui/container";
import SweepButton from "@/components/ui/SweepButton";
import ScrollReveal from "@/components/ScrollReveal";
import Watermark from "@/components/pages/events/Watermark";
import SectionHeading from "@/components/pages/events/SectionHeading";
import EventHero from "@/components/pages/events/EventHero";
import FeaturedEventSection from "@/components/pages/events/FeaturedEventSection";
import EventShowcase from "@/components/pages/events/EventShowcase";
import EventCard from "@/components/pages/events/EventCard";
import EmptyState from "@/components/ui/EmptyState";

const ALL = "All events";

export default function EventsOverview() {
  const [openFaq, setOpenFaq] = useState(0);
  const [filter, setFilter] = useState(ALL);
  const { events, faqs, photos, loading } = useShowcase();

  useEffect(() => {
    document.title = "Events — DevOps Cameroon";
  }, []);

  const featured =
    events.find((e) => e.featured) ||
    [...events].sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO))[0];
  const upcoming = events.filter((e) => e.id !== featured?.id);
  const ready = !loading;

  const tabs = useMemo(() => {
    const tags = [...new Set(events.map((e) => e.tag).filter(Boolean))];
    return [ALL, ...tags];
  }, [events]);

  const filtered = useMemo(() => {
    const list =
      filter === ALL ? events : events.filter((e) => e.tag === filter);
    return [...list].sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO));
  }, [events, filter]);

  const toggleFaq = (i) => setOpenFaq((cur) => (cur === i ? -1 : i));

  return (
    <div className="overflow-x-clip bg-base text-ink">
      {/* ================= HERO ================= */}
      <EventHero
        image={photos.hero}
        eyebrow="Events · DevOps Cameroon"
        title="Upcoming"
        accentTitle="Events"
        bottomLeft={
          <p className="max-w-[220px] text-[13px] leading-relaxed text-white/72">
            Live infrastructure talks, hands-on labs, and hiring conversations —
            across Cameroon, all year round.
          </p>
        }
        bottomRight={
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 flex-none items-center justify-center bg-accent text-ink">
              ◎
            </div>
            <div>
              <b className="block font-sans text-sm font-bold text-white">
                {events.length} events this season
              </b>
              <span className="text-xs text-white/60">
                Douala &amp; Yaoundé, Cameroon
              </span>
            </div>
          </div>
        }
      />

      {/* ================= FEATURED EVENT ================= */}
      {ready && <FeaturedEventSection event={featured} />}

      {/* ================= ALL EVENTS ARCHIVE ================= */}
      <section
        id="archive"
        className="wm-section relative overflow-hidden py-16 lg:py-24"
      >
        <Watermark className="right-[-40px] top-0 text-[clamp(160px,22vw,280px)] opacity-45">
          {"~/events"}
        </Watermark>
        <Container>
          <SectionHeading
            title="All Events"
            sub="Filter by focus area. Tabs sort the full archive."
          />

          {events.length === 0 ? (
            <EmptyState
              className="mt-8"
              title="The event calendar is between editions"
              description="There are no events published right now. Join the community to hear first when the next workshop, meetup, or hackathon is announced."
              actionLabel="Join the community"
              actionTo="/join"
            />
          ) : (
            <>
              <div
                role="tablist"
                aria-label="Filter events by focus area"
                className="mt-8 flex flex-wrap gap-1 border-b border-line pb-0"
              >
                {tabs.map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={filter === t}
                    onClick={() => setFilter(t)}
                    className={`relative px-4 py-2.5 font-mono text-[12.5px] font-semibold uppercase tracking-[0.04em] transition-colors ${
                      filter === t
                        ? "bg-accent text-ink"
                        : "text-ink-3 hover:bg-surface-2 hover:text-ink"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {filtered.length > 0 ? (
                <ScrollReveal
                  as="div"
                  variant="block"
                  key={filter}
                  className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  role="list"
                  aria-label="All events"
                >
                  {filtered.map((ev) => (
                    <EventCard key={ev.id} event={ev} />
                  ))}
                </ScrollReveal>
              ) : (
                <EmptyState
                  className="mt-10"
                  title={`No ${filter.toLowerCase()} events yet`}
                  description="Try another focus area or return to the full event archive to see everything currently scheduled."
                  actionLabel="Show all events"
                  onAction={() => setFilter(ALL)}
                />
              )}
            </>
          )}
        </Container>
      </section>
    </div>
  );
}
