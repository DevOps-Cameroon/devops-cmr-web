import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShowcaseEvent } from '@/hooks/useShowcase';
import Container from '@/components/ui/container';
import SectionHeading from '@/components/pages/events/SectionHeading';
import TestimonialForm from '@/components/testimonial/TestimonialForm';
import FlyerPreview from '@/components/testimonial/FlyerPreview';
import { saveTestimonial, getTestimonialsByEvent } from '@/lib/testimonials';
import { ArrowLeft } from 'lucide-react';

export default function Testimonial() {
  const { id } = useParams();
  const { event, loading } = useShowcaseEvent(id);
  const [flyerData, setFlyerData] = useState(null);
  const [saved, setSaved] = useState(false);
  const [pastFlyers, setPastFlyers] = useState([]);

  useEffect(() => {
    if (event) {
      document.title = `Testimonial — ${event.title} — DevOps Cameroon`;
      setPastFlyers(getTestimonialsByEvent(event.id));
    }
  }, [event]);

  const isPast = event ? new Date(event.dateISO) < new Date() : false;

  const handleGenerate = (data) => {
    setFlyerData(data);
    setSaved(false);
  };

  const handleSave = (data) => {
    if (!event) return;
    saveTestimonial({
      eventId: event.id,
      eventName: event.title,
      name: data.name,
      takeaway: data.takeaway,
      photoUrl: data.photoUrl,
    });
    setSaved(true);
    setPastFlyers(getTestimonialsByEvent(event.id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base text-ink">
        <Container className="px-6 py-32">
          <p className="font-mono text-sm text-ink-3">Loading event…</p>
        </Container>
      </div>
    );
  }

  if (!event || !isPast) {
    return (
      <div className="min-h-screen bg-base text-ink">
        <Container className="px-6 py-32 text-center">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-ink">Not Available</h1>
          <p className="mt-4 text-ink-2">
            {!event
              ? 'Event not found.'
              : 'Testimonial generation is available after the event has ended.'}
          </p>
          <Link
            to="/events"
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-accent transition-colors hover:text-accent-dim"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base text-ink">
      <Container className="px-6 py-16 lg:py-24">
        <Link
          to={`/events/${event.id}`}
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-ink-3 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to {event.title}
        </Link>

        <SectionHeading
          title="Share Your Takeaway"
          sub={`Tell us what you learned at ${event.title} and generate a flyer to share.`}
        />

        <div className="mx-auto mt-10 max-w-[540px]">
          {flyerData ? (
            <FlyerPreview
              name={flyerData.name}
              takeaway={flyerData.takeaway}
              photoUrl={flyerData.photoUrl}
              event={event}
              onReset={() => { setFlyerData(null); setSaved(false); }}
              onSave={() => handleSave(flyerData)}
              saved={saved}
            />
          ) : (
            <TestimonialForm onSubmit={handleGenerate} />
          )}
        </div>

        {pastFlyers.length > 0 && (
          <div className="mx-auto mt-16 max-w-[540px]">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-ink-3">
              Your past testimonials for this event
            </h3>
            <div className="mt-4 space-y-3">
              {pastFlyers.map((flyer) => (
                <div
                  key={flyer.id}
                  className="flex items-center justify-between border border-line bg-surface px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-ink">{flyer.name}</p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-ink-3">{flyer.takeaway}</p>
                  </div>
                  <span className="font-mono text-[0.6rem] text-ink-3">
                    {new Date(flyer.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
