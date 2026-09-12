import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useShowcaseEvent, useShowcase } from '@/hooks/useShowcase';
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

  // stableEvent never goes back to null once set — prevents RSVPForm from
  // unmounting mid-fill when a background re-render produces a new object reference
  const [stableEvent, setStableEvent] = useState(null);
  useEffect(() => {
    if (activeEvent) setStableEvent(activeEvent);
  }, [activeEvent]);

  useEffect(() => {
    const title = stableEvent?.title ?? activeEvent?.title;
    if (title) {
      document.title = `RSVP — ${title} — DevOps Cameroon`;
    } else {
      document.title = 'RSVP — DevOps Cameroon';
    }
  }, [stableEvent, activeEvent]);

  if (loading && !stableEvent) {
    return (
      <div className="min-h-screen bg-base text-ink">
        <Container className="px-6 py-32">
          <p className="font-mono text-sm text-ink-3">Loading event…</p>
        </Container>
      </div>
    );
  }

  if (!loading && !stableEvent && !activeEvent) {
    return (
      <div className="min-h-screen bg-base text-ink">
        <Container className="px-6 py-32 text-center">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-ink">No Event Found</h1>
          <p className="mt-4 text-ink-2">There&apos;s no event to RSVP to right now.</p>
        </Container>
      </div>
    );
  }

  // Use stableEvent once available — falls back to activeEvent on first render
  const eventToRender = stableEvent ?? activeEvent;
  if (!eventToRender) return null;

  return (
    <div className="overflow-x-clip bg-base text-ink">
      {!submitted && (
        <section className="">
          <Container>
            <SectionHeading
              title="Secure Your Spot"
              sub={`Fill in your details below to reserve your seat at ${eventToRender.title}.`}
            />
          </Container>
        </section>
      )}

      <RSVPForm event={eventToRender} onSubmitted={handleSubmitted} />
    </div>
  );
}
