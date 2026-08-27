import { useEffect, useState } from "react";
import { useShowcase } from "@/hooks/useShowcase";
import Container from "@/components/ui/container";
import SweepButton from "@/components/ui/SweepButton";
import ScrollReveal from "@/components/ScrollReveal";
import Watermark from "@/components/pages/events/Watermark";
import SectionHeading from "@/components/pages/events/SectionHeading";
import EventHero from "@/components/pages/events/EventHero";
import FeaturedEventSection from "@/components/pages/events/FeaturedEventSection";
import EventShowcase from "@/components/pages/events/EventShowcase";

export default function EventsOverview() {
  const [openFaq, setOpenFaq] = useState(0);
  const { events, faqs, photos, loading } = useShowcase();

  useEffect(() => {
    document.title = "Events — DevOps Cameroon";
  }, []);

  const featured =
    events.find((e) => e.featured) ||
    [...events].sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO))[0];
  const upcoming = events.filter((e) => e.id !== featured?.id);
  const ready = !loading;

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
      <FeaturedEventSection event={featured} />

      {/* ================= UPCOMING EVENTS ================= */}
      {ready && (
        <EventShowcase
          events={upcoming}
          title="Upcoming Events"
          subtitle="Every edition, talk, and lab on the calendar. Open any event to see speakers, schedule, and how to RSVP."
        />
      )}

      {/* ================= FAQ =================
      <section
        id="faq"
        className="wm-section relative overflow-hidden py-16 lg:py-24"
      >
        <Watermark className="right-[-20px] top-[-50px] text-[clamp(150px,20vw,240px)]">
          ?
        </Watermark>
        <Container>
          <ScrollReveal
            as="div"
            variant="block"
            className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[0.85fr_1.4fr]"
          >
            <div className="flex min-h-[380px] flex-col items-center justify-center rounded bg-accent p-8 text-center text-ink lg:min-h-[380px]">
              <ScrollReveal
                as="h2"
                variant="scrub"
                className="font-sans text-[2.1rem] font-extrabold uppercase leading-tight tracking-tight text-ink"
              >
                FAQ
              </ScrollReveal>
              <div className="my-[22px] h-px w-[70%] bg-ink/25" />
              <ScrollReveal
                as="p"
                variant="scrub"
                className="mb-[18px] text-[13.5px] leading-relaxed text-ink/75"
              >
                Do you have another question?
              </ScrollReveal>
              <SweepButton
                as="a"
                href="#contact"
                onClick={(e) => e.preventDefault()}
              >
                Contact Us →
              </SweepButton>
            </div>

            {ready && (
              <div className="flex flex-col">
                {faqs.map((item, i) => (
                  <div
                    key={item.q}
                    className={`mb-3.5 border border-line last:mb-0 ${openFaq === i ? "border-line-strong" : ""}`}
                  >
                    <div
                      className="flex cursor-pointer items-center justify-between px-5 py-[19px] text-sm font-semibold text-ink"
                      onClick={() => toggleFaq(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleFaq(i);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={openFaq === i}
                    >
                      <span>{item.q}</span>
                      <span
                        className={`chev ml-4 text-ink-2 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                      >
                        ⌄
                      </span>
                    </div>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${openFaq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-[13.5px] leading-[1.7] text-ink-2">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollReveal> 
        </Container>
      </section> */}
    </div>
  );
}
