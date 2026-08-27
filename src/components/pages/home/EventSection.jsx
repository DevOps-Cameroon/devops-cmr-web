import React from 'react';
import { Calendar, MapPin, Users, Ticket, Bell } from 'lucide-react';
import { useShowcase } from '@/hooks/useShowcase';
import EventShowcase from '@/components/pages/events/EventShowcase';
import SweepButton from '@/components/ui/SweepButton';

/* ── Featured event spotlight — ticket-style card ── */
function FeaturedSpotlight({ event }) {
  if (!event) return null;
  const date = new Date(event.dateISO);
  const taken = event.taken ?? 0;
  const fill = Math.min(100, Math.round((taken / event.capacity) * 100));
  const dayNum = date.getDate();
  const monthShort = date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' }).toUpperCase();

  return (
    <div className="mb-20">
      <div className="ticket-container grid sm:grid-cols-[3fr_1fr]">
        {/* ── Left: event info ── */}
        <div className="flex flex-col justify-center px-6 py-6 sm:px-8 sm:py-8 lg:pl-12 lg:pr-8 border-b sm:border-b-0 sm:border-r border-dashed border-white/30">
          <div className="mb-3 inline-flex w-fit items-center gap-2 py-1">
            <span className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-accent">
              Featured Event
            </span>
          </div>

          <div className="mb-3 inline-flex w-fit items-center gap-2 border border-white/20 bg-accent/5 px-2 py-1">
            <span className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-accent">
              {event.tag}
            </span>
          </div>

          <h3 className="text-xl font-extrabold leading-tight text-white md:text-2xl lg:text-4xl">
            {event.title}
          </h3>

          <p className="mt-2 max-w-lg text-md leading-relaxed text-white/80">
            {event.desc}
          </p>

          <dl className="mt-4 grid grid-cols-3 gap-x-4 gap-y-3">
            <div>
              <dt className="mb-1 flex items-center gap-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-white/80">
                <Calendar className="h-3 w-3 text-white/80" />
                When
              </dt>
              <dd className="font-mono text-xs font-semibold text-white">
                {date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
              </dd>
              <dd className="font-mono text-[0.65rem] text-white/80">{date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</dd>
            </div>
            <div>
              <dt className="mb-1 flex items-center gap-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-white/80">
                <MapPin className="h-3 w-3 text-white/80" />
                Where
              </dt>
              <dd className="font-mono text-xs font-semibold text-white/80">{event.venue}</dd>
              <dd className="font-mono text-[0.65rem] text-white/80">{event.format}</dd>
            </div>
            <div>
              <dt className="mb-1 flex items-center gap-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-white/80">
                <Users className="h-3 w-3 text-white/80" />
                Seats
              </dt>
              <dd className="font-mono text-xs font-semibold text-white">
                {taken}/{event.capacity} filled
              </dd>
              <dd className="font-mono text-[0.65rem] text-white/70">{event.capacity - taken} left</dd>
            </div>
          </dl>

          <div className="mt-4 max-w-sm">
            <div className="h-1.5 w-full bg-accent/20">
              <div className="h-full bg-accent" style={{ width: `${fill}%` }} />
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[0.6rem] uppercase tracking-widest text-white/70">
              <span>{fill}% full</span>
              <span>{event.capacity - taken} seats left</span>
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

/* ── Main section ── */
export default function EventSection() {
  const { events: showcaseEvents, loading } = useShowcase();

  const featured = showcaseEvents.find((e) => e.featured) || showcaseEvents[0];
  const upcoming = showcaseEvents.filter((e) => e.id !== featured?.id);

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
      {!loading && <FeaturedSpotlight event={featured} />}

      {/* Upcoming label
      <div className="mb-5 px-4 sm:px-6">
        <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-ink-3">Upcoming</h3>
      </div> */}

      {/* Event showcase */}
      {!loading && (
        <EventShowcase
          events={upcoming}
          title="Upcoming events"
          subtitle=" "
          className="!py-0"
        />
      )}

      <style>{`
        .ticket-container {
          width: 100%;
          max-width: 100%;
          background-color: var(--color-ink);
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
