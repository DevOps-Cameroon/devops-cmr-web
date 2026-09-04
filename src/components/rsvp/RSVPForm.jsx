import { useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, MapPin, Users, ChevronDown, CalendarPlus, Share2, Mail } from 'lucide-react';
import SweepButton from '@/components/ui/SweepButton';
import useTearAnimation from '@/hooks/useTearAnimation';
import InteractiveBadge from '@/components/rsvp/InteractiveBadge';
import Container from '@/components/ui/container'

const rsvpSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid WhatsApp number'),
  city: z.string().min(1, 'Please select your city'),
  experience: z.string().min(1, 'Please select your experience level'),
  questions: z.string().optional(),
});

const CITIES = ['Yaoundé', 'Douala', 'Buea', 'Bafoussam', 'Other'];
const LEVELS = ['Just getting started', 'Shipping to production', 'Running the platform'];
const STEPS = ['Basic Details', 'Your Interests', 'Confirm & Reserve'];

const inputCls =
  'w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3.5 text-[15px] text-white outline-none transition-all placeholder:text-white/35 focus:border-accent focus:ring-1 focus:ring-accent/30';

const selectCls =
  'w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-4 py-3.5 pr-10 text-[15px] text-white outline-none transition-all cursor-pointer focus:border-accent focus:ring-1 focus:ring-accent/30';

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-white/60">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function Step0({ register, errors }) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
      <Field label="First Name" error={errors.firstName?.message}>
        <input {...register('firstName')} placeholder="Achille" className={inputCls} />
      </Field>
      <Field label="Last Name" error={errors.lastName?.message}>
        <input {...register('lastName')} placeholder="Mballa" className={inputCls} />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <input {...register('email')} type="email" placeholder="you@example.com" className={inputCls} />
      </Field>
      <Field label="WhatsApp Number" error={errors.phone?.message}>
        <input {...register('phone')} type="tel" placeholder="+237 6xx xxx xxx" className={inputCls} />
      </Field>
      <Field label="City" error={errors.city?.message}>
        <div className="relative">
          <select {...register('city')} className={selectCls}>
            <option value="">Select city</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        </div>
      </Field>
    </div>
  );
}

function Step1({ register, errors }) {
  return (
    <div className="space-y-8">
      <Field label="Experience level" error={errors.experience?.message}>
        <div className="relative">
          <select {...register('experience')} className={selectCls}>
            <option value="">Select level</option>
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        </div>
      </Field>

      <Field label="Any specific questions?" error={errors.questions?.message}>
        <textarea
          {...register('questions')}
          rows={4}
          placeholder="Anything you'd like us to know or prepare for you..."
          className={`${inputCls} resize-none`}
        />
      </Field>
    </div>
  );
}

function Step2({ watch, event }) {
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const experience = watch('experience');
  const questions = watch('questions');
  const dateObj = new Date(event.dateISO);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-accent/20 bg-accent/5 p-6 text-[15px] text-white/80 leading-relaxed">
        You&apos;re reserving a seat for{' '}
        <strong className="text-white">DevOps Cameroon — {event.title}</strong>,
        {dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}, {event.venue}. Confirmation goes to{' '}
        <strong className="text-accent">{email}</strong>.
      </div>

      <div className="space-y-3 text-[15px]">
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-5 py-4">
          <span className="text-white/50">Name</span>
          <span className="font-medium text-white">{firstName} {lastName}</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-5 py-4">
          <span className="text-white/50">Level</span>
          <span className="font-medium text-white">{experience}</span>
        </div>
        {questions && (
          <div className="rounded-lg border border-white/10 bg-white/5 px-5 py-4">
            <span className="block text-white/50 mb-1">Questions</span>
            <span className="text-[15px] text-white/80 leading-relaxed">{questions}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Success ── */
export function RSVPSuccess({ event, attendeeName }) {
  const date = new Date(event.dateISO);
  const calendarDate = date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${calendarDate}/${calendarDate}&details=${encodeURIComponent('DevOps Cameroon event')}&location=${encodeURIComponent(event.venue)}`;

  const shareEvent = async () => {
    const shareData = {
      title: `DevOps Cameroon — ${event.title}`,
      text: `I am attending ${event.title}. See you there!`,
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }
    await navigator.clipboard?.writeText(window.location.href);
  };

  return (
    <section>
      <Container>
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-0 lg:py-20">
          <h2 className="font-sans text-[clamp(2.75rem,4vw,5rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.06em] text-ink">
            See you at
            <span className="block text-accent">{event.title}</span>
          </h2>
          <p className="mt-10 max-w-lg border-t border-line pt-6 font-mono text-sm leading-relaxed sm:text-base" style={{ color: 'var(--ink-2)' }}>
            Your spot is reserved. We&apos;ve sent the confirmation and event details to your email.
          </p>

          <div className="mt-8 grid max-w-xl gap-3 border-y border-line py-6 text-sm text-ink-2 sm:grid-cols-2">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-accent-ink" />{date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent-ink" />{event.venue}</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={calendarUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white transition hover:bg-accent hover:text-accent-ink">
              <CalendarPlus className="h-4 w-4" /> Add to calendar
            </a>
            <button type="button" onClick={shareEvent} className="inline-flex items-center gap-2 border border-line bg-white px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-ink transition hover:border-accent hover:text-accent">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>

          <p className="mt-6 flex items-center gap-2 font-mono text-xs" style={{ color: 'var(--ink-3)' }}><Mail className="h-4 w-4" /> Confirmation email on its way.</p>

          <div className="mt-10 flex gap-5 font-mono text-xs font-bold uppercase tracking-wider">
            <a href="/events" className="text-ink transition hover:text-accent">View events →</a>
            <a href="/" className="text-ink-3 transition hover:text-accent">Home →</a>
          </div>
        </div>

        <div className="relative min-h-105 overflow-hidden border-t border-line lg:min-h-0 lg:border-t-0">
          <InteractiveBadge event={event} attendeeName={attendeeName} />
        </div>
      </div>
      </Container>
    </section>
  );
}

/* ── Mobile step indicator ── */
function MobileStepIndicator({ step }) {
  return (
    <div className="flex items-center gap-3 px-1">
      {STEPS.map((_, i) => (
        <div key={i} className="flex items-center gap-2 flex-1">
          <span className={`flex h-6 w-6 shrink-0 items-center justify-center text-[10px] font-bold font-mono ${
            i === step ? 'bg-accent text-ink' : i < step ? 'bg-white/20 text-white' : 'bg-white/10 text-white/40'
          }`}>
            {i < step ? '✓' : i + 1}
          </span>
          {i < STEPS.length - 1 && (
            <div className={`h-px flex-1 ${i < step ? 'bg-accent/50' : 'bg-white/10'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Main form component ── */
export default function RSVPForm({ event, onSubmitted }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [attendeeName, setAttendeeName] = useState('');

  useLayoutEffect(() => {
    if (submitted) window.scrollTo(0, 0);
  }, [submitted]);

  const { cardRef, tearGroupRef, rightPanelRef, playFinalTear } = useTearAnimation(step, () => {
    setSubmitted(true);
    onSubmitted?.();
  });

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {},
    mode: 'all',
  });

  const next = async () => {
    let fields;
    if (step === 0) fields = ['firstName', 'lastName', 'email', 'phone', 'city'];
    else if (step === 1) fields = ['experience'];

    if (fields) {
      const valid = await trigger(fields);
      if (!valid) return;
    }
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const prev = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = (data) => {
    console.log('RSVP:', data);
    setAttendeeName(`${data.firstName} ${data.lastName}`);
    return playFinalTear();
  };

  const dateObj = new Date(event.dateISO);
  const fill = Math.min(100, Math.round((event.taken / event.capacity) * 100));
  const remaining = event.capacity - event.taken;

  if (submitted) {
    return <RSVPSuccess event={event} attendeeName={attendeeName} />;
  }

  return (
    <section className="flex min-h-150 items-center justify-start px-3 py-10 sm:px-6 md:justify-center lg:py-28">
      <div ref={cardRef} className="ticket-rsvp w-full max-w-275">
        {/* ── Mobile & tablet: stacked layout ── */}
        <div className="ticket-scallop bg-ink md:hidden">
          <div className="border-b border-dashed border-white/20 px-5 py-5 sm:px-8 sm:py-7">
            <div className="mb-3 inline-flex w-fit border border-white/20 bg-accent/10 px-2.5 py-1">
              <span className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-accent">{event.tag}</span>
            </div>
            <h2 className="text-xl font-extrabold leading-tight text-white sm:text-2xl">{event.title}</h2>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/60 sm:text-sm">
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{dateObj.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{event.venue}</span>
              <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{remaining} left</span>
            </div>
          </div>

          <div className="px-5 pt-5 pb-2 sm:px-8">
            <MobileStepIndicator step={step} />
          </div>

          <div className="bg-ink px-5 py-6 sm:px-8 sm:py-8">
            <div className="mb-5 flex items-baseline justify-between">
              <h2 className="font-sans text-lg font-semibold text-white sm:text-xl">{STEPS[step]}</h2>
              <span className="font-mono text-xs text-white/35">{step + 1} / {STEPS.length}</span>
            </div>
            <div className="mb-6 h-px bg-white/10" />

            <form id="rsvpForm" onSubmit={(e) => e.preventDefault()}>
              {step === 0 && <Step0 register={register} errors={errors} />}
              {step === 1 && <Step1 register={register} errors={errors} />}
              {step === 2 && <Step2 watch={watch} event={event} />}

              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={prev}
                  disabled={step === 0}
                  className="font-mono text-xs font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white disabled:opacity-30 disabled:hover:text-white/40"
                >
                  ← Back
                </button>
                <div className="ml-auto">
                  {step < STEPS.length - 1 ? (
                    <SweepButton type="button" onClick={next} contentClassName="px-6 py-3">
                      Continue
                    </SweepButton>
                  ) : (
                    <SweepButton type="button" onClick={handleSubmit(onSubmit)} disabled={isSubmitting} contentClassName="px-6 py-3">
                      {isSubmitting ? 'Submitting...' : 'Reserve my seat'}
                    </SweepButton>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* ── Desktop: side-by-side layout ── */}
        <div className="hidden md:flex min-h-140">
          <div ref={tearGroupRef} className="ticket-tear-group relative z-2 flex shrink-0" style={{ '--cut-progress': 0 }}>
            <div className="ticket-stub ticket-scallop relative flex w-85 shrink-0 flex-col justify-between border-b border-dashed border-white/20 bg-ink px-8 py-8 lg:w-100 lg:px-10 xl:px-14 md:border-b-0">
              <div>
                <div className="mb-5 inline-flex w-fit border border-white/20 bg-accent/10 px-3 py-1">
                  <span className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-accent">{event.tag}</span>
                </div>
                <h2 className="text-xl font-extrabold leading-tight text-white lg:text-2xl xl:text-[28px]">{event.title}</h2>
                <p className="mt-4 max-w-65 text-sm leading-relaxed text-white/65 lg:max-w-75">
                  Reserve your seat before spots run out. Confirmation sent to your email.
                </p>

                <dl className="mt-8 grid grid-cols-3 gap-x-4 gap-y-4 lg:mt-9 lg:gap-x-6 lg:gap-y-5">
                  <div>
                    <dt className="mb-2 flex items-center gap-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-white/50">
                      <Calendar className="h-3 w-3" /> When
                    </dt>
                    <dd className="font-mono text-xs font-semibold text-white lg:text-[13px]">
                      {dateObj.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </dd>
                    <dd className="font-mono text-[0.6rem] text-white/60 lg:text-[0.65rem]">{event.format}</dd>
                  </div>
                  <div>
                    <dt className="mb-2 flex items-center gap-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-white/50">
                      <MapPin className="h-3 w-3" /> Where
                    </dt>
                    <dd className="font-mono text-xs font-semibold text-white/90 lg:text-[13px]">{event.venue}</dd>
                  </div>
                  <div>
                    <dt className="mb-2 flex items-center gap-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-white/50">
                      <Users className="h-3 w-3" /> Seats
                    </dt>
                    <dd className="font-mono text-xs font-semibold text-white lg:text-[13px]">{event.taken}/{event.capacity}</dd>
                    <dd className="font-mono text-[0.6rem] text-white/50 lg:text-[0.65rem]">{remaining} left</dd>
                  </div>
                </dl>

                <div className="mt-6 max-w-70 lg:mt-7 lg:max-w-80">
                  <div className="h-1.5 w-full rounded-full bg-white/15">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${fill}%` }} />
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[0.6rem] uppercase tracking-widest text-white/45">
                    <span>{fill}% full</span>
                    <span>{remaining} seats left</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-10 lg:gap-5">
                {STEPS.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStep(i)}
                    disabled={i > step}
                    aria-current={i === step ? 'step' : undefined}
                    className={`flex items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-widest transition-colors lg:gap-2.5 ${
                      i === step ? 'text-accent' : i < step ? 'text-white/60' : 'text-white/30'
                    } disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    <span className={`flex h-6 w-6 items-center justify-center text-[10px] font-bold ${
                      i === step ? 'bg-accent text-ink' : i < step ? 'bg-white/20 text-white' : 'bg-white/10 text-white/40'
                    }`}>
                      {i < step ? '✓' : i + 1}
                    </span>
                    <span className="hidden lg:inline">{s}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="ticket-seam relative w-4 shrink-0">
              <div className="ticket-perforation" aria-hidden="true">
                <span className="ticket-perforation__opening" />
                <div className="ticket-perforation__track">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <span key={i} className="ticket-perforation__dot" style={{ '--dot': i }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div ref={rightPanelRef} className="flex-1 bg-ink px-8 py-8 lg:px-10 xl:pl-12 xl:pr-14 flex flex-col transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="font-sans text-xl font-semibold text-white">{STEPS[step]}</h2>
              <span className="font-mono text-xs text-white/35">{step + 1} / {STEPS.length}</span>
            </div>
            <div className="mb-8 h-px bg-white/10" />

            <form id="rsvpFormDesktop" onSubmit={(e) => e.preventDefault()} className="flex-1">
              {step === 0 && <Step0 register={register} errors={errors} />}
              {step === 1 && <Step1 register={register} errors={errors} />}
              {step === 2 && <Step2 watch={watch} event={event} />}

              <div className="mt-10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prev}
                  disabled={step === 0}
                  className="font-mono text-xs font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white disabled:opacity-30 disabled:hover:text-white/40"
                >
                  ← Back
                </button>
                <div className="ml-auto">
                  {step < STEPS.length - 1 ? (
                    <SweepButton type="button" onClick={next} contentClassName="px-8 py-3">
                      Continue
                    </SweepButton>
                  ) : (
                    <SweepButton type="button" onClick={handleSubmit(onSubmit)} disabled={isSubmitting} contentClassName="px-8 py-3">
                      {isSubmitting ? 'Submitting...' : 'Reserve my seat'}
                    </SweepButton>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .ticket-rsvp {
          background-color: transparent;
          isolation: isolate;
          overflow: visible;
        }

        .ticket-stub {
          backface-visibility: hidden;
        }

        .ticket-scallop {
          mask-image:
            radial-gradient(circle 8px at 0px 10%, transparent 99%, #000 100%),
            radial-gradient(circle 8px at 0px 20%, transparent 99%, #000 100%),
            radial-gradient(circle 8px at 0px 30%, transparent 99%, #000 100%),
            radial-gradient(circle 8px at 0px 40%, transparent 99%, #000 100%),
            radial-gradient(circle 8px at 0px 50%, transparent 99%, #000 100%),
            radial-gradient(circle 8px at 0px 60%, transparent 99%, #000 100%),
            radial-gradient(circle 8px at 0px 70%, transparent 99%, #000 100%),
            radial-gradient(circle 8px at 0px 80%, transparent 99%, #000 100%),
            radial-gradient(circle 8px at 0px 90%, transparent 99%, #000 100%);
          mask-composite: intersect;
          -webkit-mask-composite: source-in;
        }

        .ticket-tear-group {
          backface-visibility: hidden;
          will-change: transform, opacity;
        }

        .ticket-seam {
          --cut-progress: 0;
          background: var(--color-ink);
          transform-style: preserve-3d;
        }

        .ticket-perforation {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .ticket-perforation__opening {
          position: absolute;
          left: 50%;
          top: 0;
          width: 5px;
          height: calc(var(--cut-progress) * 100%);
          transform: translateX(-50%);
          background: var(--color-base);
        }

        .ticket-perforation__track {
          position: absolute;
          inset: 10px 0;
        }

        .ticket-perforation__dot {
          position: absolute;
          left: 50%;
          top: calc(var(--dot) * 3.45%);
          width: 5px;
          height: 6px;
          transform: translate(-50%, -50%);
        }

        .ticket-perforation__dot::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          width: 5px;
          height: 6px;
          transform: translateX(-50%);
          border: 1px solid rgba(255,255,255,.34);
          background: var(--color-ink);
          border-radius: 999px;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,.35);
        }

        @media (prefers-reduced-motion: reduce) {
          .ticket-stub,
          .ticket-tear-group,
          .ticket-seam,
          .ticket-perforation__opening {
            transition: none !important;
            animation: none !important;
          }
        }

        .ticket-rsvp select {
          color-scheme: dark;
        }

        .ticket-rsvp select option {
          background-color: #1a1a1a;
          color: #fff;
        }
      `}</style>
    </section>
  );
}
