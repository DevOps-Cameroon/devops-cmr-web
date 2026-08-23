import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Calendar, ArrowUpRight, ArrowLeft, ArrowRight, MapPin, Clock, Zap, Bell, Users, Ticket } from 'lucide-react';
import { events } from '@/data/events';
import cardBg from '/src/assets/images/Screenshot 2026-08-20 170951.png';
import SweepButton from '@/components/ui/SweepButton';


/* ── Featured event spotlight — ticket-style card ── */
function FeaturedSpotlight() {
  const next = events.find((e) => e.status === 'open');
  if (!next) return null;
  const date = new Date(`${next.date}T09:00:00`);
  const taken = next.taken ?? 0;
  const fill = Math.min(100, Math.round((taken / next.capacity) * 100));
  const dayNum = date.getDate();
  const monthShort = date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' }).toUpperCase();

  return (
    <div className="mb-20">
      {/* Ticket container — CSS radial-gradient mask creates scalloped edges */}
      <div className="ticket-container grid sm:grid-cols-[3fr_1fr]">
        {/* ── Left: event info ── */}
        <div className="flex flex-col justify-center px-6 py-6 sm:px-8 sm:py-8 lg:pl-12 lg:pr-8 border-b sm:border-b-0 sm:border-r border-dashed border-ink/15">
        
          {/* Featured badge */}
          <div className="mb-3 inline-flex w-fit items-center gap-2 py-1">
            {/* <Zap className="h-3 w-3 fill-accent text-ink" /> */}
            <span className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-ink">
              Featured Event  
            </span>
          </div>

          {/* Type badge */}
          <div className="mb-3 inline-flex w-fit items-center gap-2 border border-ink/20 bg-accent/5 px-2 py-1">
            {/* <Zap className="h-3 w-3 fill-accent text-ink" /> */}
            <span className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-ink">
              {next.type}  
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-extrabold leading-tight text-ink md:text-2xl lg:text-4xl">
            {next.title}
          </h3>

          {/* Description */}
          <p className="mt-2 max-w-lg text-md leading-relaxed text-ink-2">
            {next.description}
          </p>

          {/* When / Where / Seats grid */}
          <dl className="mt-4 grid grid-cols-3 gap-x-4 gap-y-3">
            <div>
              <dt className="mb-1 flex items-center gap-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-ink-2">
                <Calendar className="h-3 w-3 text-ink-2" />
                When
              </dt>
              <dd className="font-mono text-xs font-semibold text-ink">
                {date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
              </dd>
              <dd className="font-mono text-[0.65rem] text-ink-2">{next.time}</dd>
            </div>
            <div>
              <dt className="mb-1 flex items-center gap-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-ink-2">
                <MapPin className="h-3 w-3 text-ink-2" />
                Where
              </dt>
              <dd className="font-mono text-xs font-semibold text-ink">{next.location}</dd>
              <dd className="font-mono text-[0.65rem] text-ink-2">{next.mode}</dd>
            </div>
            <div>
              <dt className="mb-1 flex items-center gap-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-ink-2">
                <Users className="h-3 w-3 text-ink-2" />
                Seats
              </dt>
              <dd className="font-mono text-xs font-semibold text-ink">
                {taken}/{next.capacity} filled
              </dd>
              <dd className="font-mono text-[0.65rem] text-ink-3">{next.capacity - taken} left</dd>
            </div>
          </dl>

          {/* Capacity bar */}
          <div className="mt-4 max-w-sm">
            <div className="h-1.5 w-full bg-ink/20">
              <div className="h-full bg-ink" style={{ width: `${fill}%` }} />
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[0.6rem] uppercase tracking-widest text-ink-3">
              <span>{fill}% full</span>
              <span>{next.capacity - taken} seats left</span>
            </div>
          </div>
        </div>

        {/* ── Right stub: calendar badge ── */}
        <div className="flex flex-col items-center gap-4 md:gap-8 justify-center px-4 py-6 sm:px-6">
          <div className="relative">
            <div className="rounded-2xl border border-line bg-surface px-4 pt-3 pb-2 text-center shadow-sm">
              <p className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-accent">
                {monthShort}
              </p>
              <p className="mt-0.5 text-4xl font-extrabold leading-none text-ink">
                {String(dayNum).padStart(2, '0')}
              </p>
              <p className="mt-1 rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.5rem] font-bold uppercase tracking-widest text-accent">
                {weekday}
              </p>
            </div>
            <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-accent shadow-md">
              <Bell className="h-3.5 w-3.5 text-accent-ink" />
            </span>
          </div>
          <SweepButton>
            RSVP
          </SweepButton>
        </div>
      </div>
    </div>
  );
}

/* ── Event card — compact, image bg, noise overlay ── */
function EventCard({ event }) {
  const date = new Date(`${event.date}T09:00:00`);
  const taken = event.taken ?? 0;
  const fill = Math.min(100, Math.round((taken / event.capacity) * 100));
  const isClosed = event.status === 'closed';

  return (
    <div
      tabIndex={0}
      className="event-card group relative shrink-0 snap-start overflow-hidden rounded-xl border border-line w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] outline-none"
      style={{ aspectRatio: '4 / 5' }}
    >
      {/* Background image */}
      <img src={cardBg} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      {/* <div className="absolute inset-0 bg-ink/40" /> */}

      {/* Natural state — content at bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-3.5 pt-12">
        <span className="label-mono mb-0.5 inline-block text-[0.55rem] text-accent">{event.type}</span>
        <h3 className="text-lg font-extrabold leading-snug text-white">{event.title}</h3>
        <p className="mt-0.5 text-xs leading-snug text-white/70 line-clamp-2">{event.description}</p>

        <dl className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-0 font-mono text-[0.5rem] text-white/60 mt-4 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-accent shrink-0" />
            <span className='text-xs'>{date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-accent shrink-0" />
            <span className='text-xs'>{event.mode}</span>
          </div>
        </dl>

        <div className="mt-1.5" aria-hidden="true">
          <div className="h-1 w-full bg-white/15">
            <div className="h-full rounded-none bg-accent" style={{ width: `${fill}%` }} />
          </div>
          <div className="mt-0.5 flex justify-between font-mono text-[0.45rem] uppercase tracking-widest text-white/75">
            <span>{taken}/{event.capacity}</span>
            <span>{isClosed ? 'closed' : `${event.capacity - taken} left`}</span>
          </div>
        </div>

        {/* Mobile: always-visible RSVP */}
        <div className="mt-2 flex gap-1 sm:hidden">
          <a
            href="#rsvp"
            onClick={(e) => e.stopPropagation()}
            className="flex h-7 items-center gap-1 rounded-none bg-accent px-2 text-[0.55rem] font-semibold text-accent-ink"
          >
            {isClosed ? 'Closed' : 'RSVP'} <ArrowUpRight className="h-2.5 w-2.5" />
          </a>
        </div>
      </div>

      {/* Hover overlay — noise pattern sweep from bottom-left (tablet & desktop) */}
      <div
        className="card-overlay absolute inset-0 z-20 hidden sm:flex items-center justify-center"
        style={{
          clipPath: 'circle(0% at 0% 100%)',
          transition: 'clip-path 0.9s cubic-bezier(.2,.8,.2,1)',
        }}
      >
        <div
          className="absolute inset-0 bg-accent"
        />
        <div
          className="card-overlay-content relative z-10 flex flex-col items-center gap-2.5 px-4 text-center"
          style={{ opacity: 0, transform: 'translateY(10px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}
        >
          <p className="flex items-center gap-1 text-xs font-semibold text-accent-ink">
            {isClosed ? 'Event ended' : 'View details'}
            <ArrowUpRight className="h-3 w-3" />
          </p>
          {!isClosed && (
            <a
              href="#rsvp"
              onClick={(e) => e.stopPropagation()}
              className="flex h-9 items-center gap-1 bg-ink px-3 text-[0.65rem] font-semibold text-white transition-transform hover:scale-105"
            >
              RSVP <ArrowUpRight className="h-2.5 w-2.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── "See more" CTA card ── */
function SeeMoreCard() {
  return (
    <Link
      to="/events"
      className="group relative flex shrink-0 snap-start flex-col items-center justify-center overflow-hidden rounded-xl border border-line bg-ink transition-colors hover:border-accent/40 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
      style={{ aspectRatio: '4 / 5' }}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors group-hover:border-accent group-hover:text-accent">
          <Calendar className="h-3.5 w-3.5" />
        </span>
        <h3 className="text-sm font-extrabold leading-snug text-white">See All Events</h3>
        <p className="text-[0.55rem] leading-snug text-white/50">
          Workshops, meetups &amp; hackathons
        </p>
        <span className="mt-0.5 inline-flex items-center gap-1 bg-accent px-3 py-1.5 text-[0.55rem] font-semibold text-accent-ink transition-transform group-hover:scale-105">
          View Events <ArrowUpRight className="h-2.5 w-2.5" />
        </span>
      </div>
    </Link>
  );
}

/* ── Main section ── */
export default function EventSection() {
  const scrollRef = useRef(null);
  const prevOverlayRef = useRef(null);
  const nextOverlayRef = useRef(null);

  const scroll = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector(':scope > div');
    if (!card) return;
    const step = card.offsetWidth + 20;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  const next = events.find((e) => e.status === 'open');
  const upcoming = events.filter((e) => e.status === 'open').slice(1);
  const cards = next ? [next, ...upcoming] : upcoming;
  const TOTAL = cards.length + 1;

  return (
    <section className="bg-base min-h-screen py-24">
      {/* Header */}
      <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end sm:justify-between mb-16 sm:mb-20 md:mb-24">
        <div>
          <span className="eyebrow label-mono mb-6 content-animation"><Ticket />Events</span>
          <div className='flex items-center'>
            <h2 className="content-animation text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl">
              What's Happening<br className="hidden sm:block" /> in the Community 
            </h2>
            <div className='flex items-center justify-center z-2 -ml-3 mt-10 text-accent font-bold text-7xl rotate-25'>
              ?
            </div>
          </div>
        </div>
        <p className="content-animation max-w-sm leading-relaxed text-ink-2 sm:text-right">
          Workshops, meetups, and hackathons — real sessions solving real problems, open to everyone.
        </p>
      </div>

      {/* Featured event spotlight */}
      <FeaturedSpotlight />

      {/* Upcoming label */}
      <div className="mb-5">
        <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-ink-3">Upcoming</h3>
      </div>

      {/* Card track */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="scrollbar-none flex gap-4 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
        >
          {cards.map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
          <SeeMoreCard />
        </div>

        {/* Nav arrows */}
        <div className="mt-5 flex items-center justify-between">
          <span className="font-mono text-xs text-ink-3">
            {'01' + ' / ' + String(TOTAL).padStart(2, '0')}
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
                gsap.to(el, { clipPath: 'circle(' + diag + 'px at 0% 100%)', duration: 0.45, ease: 'power3.out' });
              }}
              onMouseLeave={() => {
                const el = prevOverlayRef.current;
                if (!el) return;
                gsap.to(el, { clipPath: 'circle(0px at 0% 100%)', duration: 0.35, ease: 'power2.in' });
              }}
              aria-label="Previous events"
              className="relative h-10 w-10 overflow-hidden rounded-full border border-line cursor-pointer"
            >
              <span
                ref={prevOverlayRef}
                className="absolute inset-0 z-2 flex items-center justify-center bg-accent text-ink"
                style={{ clipPath: 'circle(0px at 0% 100%)' }}
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
                gsap.to(el, { clipPath: 'circle(' + diag + 'px at 0% 100%)', duration: 0.45, ease: 'power3.out' });
              }}
              onMouseLeave={() => {
                const el = nextOverlayRef.current;
                if (!el) return;
                gsap.to(el, { clipPath: 'circle(0px at 0% 100%)', duration: 0.35, ease: 'power2.in' });
              }}
              aria-label="Next events"
              className="relative h-10 w-10 overflow-hidden rounded-full bg-ink cursor-pointer"
            >
              <span
                ref={nextOverlayRef}
                className="absolute inset-0 z-2 flex items-center justify-center bg-accent text-ink"
                style={{ clipPath: 'circle(0px at 0% 100%)' }}
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

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; }
        .event-card:hover .card-overlay,
        .event-card:focus-visible .card-overlay {
          clip-path: circle(150% at 0% 100%) !important;
        }
        .event-card:hover .card-overlay-content,
        .event-card:focus-visible .card-overlay-content {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transition-delay: 0.25s !important;
        }
        .event-card:not(:hover):not(:focus-visible) .card-overlay-content {
          transition-delay: 0s !important;
        }
        /* Ticket container — radial-gradient mask for scalloped edges */
        .ticket-container {
          width: 100%;
          max-width: 100%;
          background-color: var(--color-primary);
          box-shadow: 0 8px 40px rgba(0,0,0,.12), 0 2px 8px rgba(0,0,0,.06);
          mask-image:
            radial-gradient(circle 16px at 75% 0px, transparent 99%, #000 100%),
            radial-gradient(circle 16px at 75% 100%, transparent 99%, #000 100%),
            radial-gradient(circle 7px at 0px 12.5%, transparent 99%, #000 100%),
            radial-gradient(circle 7px at 0px 25.0%, transparent 99%, #000 100%),
            radial-gradient(circle 7px at 0px 37.5%, transparent 99%, #000 100%),
            radial-gradient(circle 7px at 0px 50.0%, transparent 99%, #000 100%),
            radial-gradient(circle 7px at 0px 62.5%, transparent 99%, #000 100%),
            radial-gradient(circle 7px at 0px 75.0%, transparent 99%, #000 100%),
            radial-gradient(circle 7px at 0px 87.5%, transparent 99%, #000 100%),
            radial-gradient(circle 7px at 100% 12.5%, transparent 99%, #000 100%),
            radial-gradient(circle 7px at 100% 25.0%, transparent 99%, #000 100%),
            radial-gradient(circle 7px at 100% 37.5%, transparent 99%, #000 100%),
            radial-gradient(circle 7px at 100% 50.0%, transparent 99%, #000 100%),
            radial-gradient(circle 7px at 100% 62.5%, transparent 99%, #000 100%),
            radial-gradient(circle 7px at 100% 75.0%, transparent 99%, #000 100%),
            radial-gradient(circle 7px at 100% 87.5%, transparent 99%, #000 100%);
          mask-composite: intersect;
          -webkit-mask-composite: source-in;
        }
      `}</style>
    </section>
  );
}
