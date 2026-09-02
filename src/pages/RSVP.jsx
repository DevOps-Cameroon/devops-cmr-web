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

  return (
    <div className="overflow-x-clip bg-base text-ink">
      <section className="bg-base pt-28 -my-20 pb-12 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20">
        <Container>
          <SectionHeading
            title="Secure Your Spot"
            sub={`Fill in your details below to reserve your seat at ${activeEvent.title}.`}
          />
        </Container>
      </section>

      <RSVPForm event={activeEvent} onSubmitted={handleSubmitted} />
    </div>
  );
}
