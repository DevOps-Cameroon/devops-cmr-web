import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useShowcaseEvent, useShowcase } from '@/hooks/useShowcase';
import EventHero from '@/components/pages/events/EventHero';
import RSVPForm from '@/components/rsvp/RSVPForm';
import Container from '@/components/ui/container';
import SectionHeading from '@/components/pages/events/SectionHeading';

export default function RSVP() {
  const { id } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const { event, loading: eventLoading } = useShowcaseEvent(id);
  const { events, loading: eventsLoading } = useShowcase();
  const handleSubmitted = useCallback(() => setSubmitted(true), []);

  const loading = id ? eventLoading : eventsLoading;
  const activeEvent = id ? event : events.find((e) => e.featured) || events[0];

  useEffect(() => {
    if (activeEvent) {
      document.title = `RSVP — ${activeEvent.title} — DevOps Cameroon`;
    } else {
      document.title = 'RSVP — DevOps Cameroon';
    }
  }, [activeEvent]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base text-ink">
        <Container className="px-6 py-32">
          <p className="font-mono text-sm text-ink-3">Loading event…</p>
        </Container>
      </div>
    );
  }

  if (!activeEvent) {
    return (
      <div className="min-h-screen bg-base text-ink">
        <Container className="px-6 py-32 text-center">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-ink">No Event Found</h1>
          <p className="mt-4 text-ink-2">There&apos;s no event to RSVP to right now.</p>
        </Container>
      </div>
    );
  }

  const heroImage = activeEvent.img || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80';
  const dateObj = new Date(activeEvent.dateISO);
  const remaining = activeEvent.capacity - activeEvent.taken;

  return (
    <div className="overflow-x-clip bg-base text-ink">
      {!submitted && (
        <>
          <EventHero
            image={heroImage}
            eyebrow={`Events · ${activeEvent.tag}`}
            title="Reserve"
            accentTitle="Your Spot"
            bottomLeft={
              <div>
                <p className="max-w-[280px] text-[13px] leading-relaxed text-white/72">
                  {activeEvent.desc}
                </p>
              </div>
            }
            bottomRight={
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-white/60">
                    {dateObj.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <p className="font-mono text-[0.6rem] text-white/45">{activeEvent.venue}</p>
                </div>
                <div className="flex h-12 w-12 flex-none items-center justify-center border border-white/20 bg-white/5 text-white">
                  <span className="font-mono text-sm font-bold">{remaining}</span>
                </div>
              </div>
            }
          />

          <section className="bg-base py-16 -mb-20 sm:py-20 md:py-24">
            <Container>
              <SectionHeading
                title="Secure Your Spot"
                sub={`Fill in your details below to reserve your seat at ${activeEvent.title}.`}
              />
            </Container>
          </section>
        </>
      )}

      <RSVPForm event={activeEvent} onSubmitted={handleSubmitted} />
    </div>
  );
}
