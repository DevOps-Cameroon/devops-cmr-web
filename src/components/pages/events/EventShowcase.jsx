import { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ArrowLeft, ArrowRight, ArrowUpRight, Ticket } from "lucide-react";
import EventCard from "./EventCard";
import EmptyState from "@/components/ui/EmptyState";

const EVENTS = [
  {
    id: "devops-showcase-2026",
    title: "DevOps Showcase",
    tag: "Cloud · Infrastructure",
    year: "2026",
    accent: "#3ddc84",
    dateLabel: "21 November 2026",
    venue: "Douala Polytechnic, Cameroon",
    seats: "300 seats",
    capacity: 300,
    taken: 247,
    status: "open",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80",
    desc: "Cameroon's flagship cloud and infrastructure event — talks, workshops, and a hiring fair.",
  },
  {
    id: "sre-observability-2026",
    title: "SRE · Observability Day",
    tag: "SRE · Observability",
    year: "2026",
    accent: "#60a5fa",
    dateLabel: "29 August 2026",
    venue: "Institut Universitaire de la Côte, Douala",
    seats: "240 seats",
    capacity: 240,
    taken: 185,
    status: "open",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    desc: "Deep dives into on-call culture, monitoring, and the reliability engineering behind growing stacks.",
  },
  {
    id: "kube-cicd-week-2026",
    title: "Kubernetes · CI/CD Week",
    tag: "Kubernetes · CI/CD",
    year: "2026",
    accent: "#2dd4bf",
    dateLabel: "11 July 2026",
    venue: "Catholic University Institute, Douala",
    seats: "180 seats",
    capacity: 180,
    taken: 95,
    status: "open",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    desc: "A week-long deep dive into building, testing, and deploying — from first commit to a running cluster.",
  },
  {
    id: "cloud-summit-2026",
    title: "Cloud Summit",
    tag: "Cloud · Infrastructure",
    year: "2026",
    accent: "#3ddc84",
    dateLabel: "7 November 2026",
    venue: "Yaoundé · SaaS tech hub",
    seats: "150 seats",
    capacity: 150,
    taken: 72,
    status: "open",
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80",
    desc: "Hands-on labs and talks on cloud fundamentals, cost optimization, and getting teams to production safely.",
  },
  {
    id: "kube-cicd-week-2026-bis",
    title: "Kube · CI/CD Week",
    tag: "Kubernetes · CI/CD",
    year: "2026",
    accent: "#cfa342",
    dateLabel: "11 December 2026",
    venue: "Douala · bSpace coworking",
    seats: "200 seats",
    capacity: 200,
    taken: 120,
    status: "open",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    desc: "A second week of pipeline bootcamps, Kubernetes labs, and GitOps sessions.",
  },
];

function SeeMoreCard({ to = "#archive" }) {
  const isInternal = to.startsWith("#") || to.startsWith("/");
  const Component = isInternal && !to.startsWith("#") ? Link : "a";
  const props = to.startsWith("#") ? { href: to } : { to };

  return (
    <Component
      {...props}
      className="group relative flex shrink-0 snap-start flex-col items-center justify-center overflow-hidden rounded-xl border border-line bg-ink transition-colors hover:border-accent/40 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
      style={{ aspectRatio: "4 / 5" }}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors group-hover:border-accent group-hover:text-accent">
          <Ticket className="h-3.5 w-3.5" />
        </span>
        <h3 className="text-sm font-extrabold leading-snug text-white">
          See All Events
        </h3>
        <p className="text-[0.55rem] leading-snug text-white/50">
          Workshops, meetups &amp; hackathons
        </p>
        <span className="mt-0.5 inline-flex items-center gap-1 bg-accent px-3 py-1.5 text-[0.55rem] font-semibold text-accent-ink transition-transform group-hover:scale-105">
          View Events <ArrowUpRight className="h-2.5 w-2.5" />
        </span>
      </div>
    </Component>
  );
}

export default function EventShowcase({
  events: overrideEvents,
  title,
  subtitle,
  className = "",
  seeMoreTo,
}) {
  const scrollRef = useRef(null);
  const prevOverlayRef = useRef(null);
  const nextOverlayRef = useRef(null);

  const items = overrideEvents || EVENTS;

  const scroll = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector(":scope > div");
    if (!card) return;
    const step = card.offsetWidth + 16;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  const TOTAL = items.length + 1;

  return (
    <section className={`bg-base py-24 ${className}`}>
      {/* Header */}
      <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end sm:justify-between mb-16 sm:mb-20 md:mb-24 px-4 sm:px-6">
        <div>
          <span className="eyebrow label-mono mb-6 content-animation">
            <Ticket />
            Events
          </span>
          <h2 className="content-animation text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {title || (
              <>
                What's Happening
                <br className="hidden sm:block" /> in the Community
              </>
            )}
          </h2>
        </div>
        <p className="content-animation max-w-sm leading-relaxed text-ink-2 sm:text-right">
          {subtitle ||
            "Workshops, meetups, and hackathons — real sessions solving real problems, open to everyone."}
        </p>
      </div>

      {/* Card track */}
      {items.length === 0 ? (
        <div className="px-4 sm:px-6">
          <EmptyState
            title="No events scheduled yet"
            description="New workshops, meetups, and hackathons will appear here as soon as they are announced."
            actionLabel="Explore the community"
            actionTo="/join"
          />
        </div>
      ) : (
        <div className="relative px-4 sm:px-6">
          <div
            ref={scrollRef}
            className="scrollbar-none flex gap-4 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
          >
            {items.map((ev) => (
              <div
                key={ev.id}
                className="shrink-0 snap-start w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
              >
                <EventCard event={ev} />
              </div>
            ))}
            <SeeMoreCard to={seeMoreTo} />
          </div>

          {/* Nav arrows */}
          <div className="mt-5 flex items-center justify-between">
            <span className="font-mono text-xs text-ink-3">
              {"01" + " / " + String(TOTAL).padStart(2, "0")}
            </span>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => scroll(-1)}
                onMouseEnter={() => {
                  const el = prevOverlayRef.current;
                  if (!el) return;
                  const r = el.parentElement.getBoundingClientRect();
                  const diag = Math.hypot(r.width, r.height);
                  gsap.to(el, {
                    clipPath: "circle(" + diag + "px at 0% 100%)",
                    duration: 0.45,
                    ease: "power3.out",
                  });
                }}
                onMouseLeave={() => {
                  const el = prevOverlayRef.current;
                  if (!el) return;
                  gsap.to(el, {
                    clipPath: "circle(0px at 0% 100%)",
                    duration: 0.35,
                    ease: "power2.in",
                  });
                }}
                aria-label="Previous events"
                className="relative h-10 w-10 overflow-hidden rounded-full border border-line cursor-pointer"
              >
                <span
                  ref={prevOverlayRef}
                  className="absolute inset-0 z-2 flex items-center justify-center bg-accent text-ink"
                  style={{ clipPath: "circle(0px at 0% 100%)" }}
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                </span>
                <span className="relative z-1 flex h-full w-full items-center justify-center text-ink">
                  <ArrowLeft className="h-3.5 w-3.5" />
                </span>
              </button>

              <button
                type="button"
                onClick={() => scroll(1)}
                onMouseEnter={() => {
                  const el = nextOverlayRef.current;
                  if (!el) return;
                  const r = el.parentElement.getBoundingClientRect();
                  const diag = Math.hypot(r.width, r.height);
                  gsap.to(el, {
                    clipPath: "circle(" + diag + "px at 0% 100%)",
                    duration: 0.45,
                    ease: "power3.out",
                  });
                }}
                onMouseLeave={() => {
                  const el = nextOverlayRef.current;
                  if (!el) return;
                  gsap.to(el, {
                    clipPath: "circle(0px at 0% 100%)",
                    duration: 0.35,
                    ease: "power2.in",
                  });
                }}
                aria-label="Next events"
                className="relative h-10 w-10 overflow-hidden rounded-full bg-ink cursor-pointer"
              >
                <span
                  ref={nextOverlayRef}
                  className="absolute inset-0 z-2 flex items-center justify-center bg-accent text-ink"
                  style={{ clipPath: "circle(0px at 0% 100%)" }}
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="relative z-1 flex h-full w-full items-center justify-center text-white">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
