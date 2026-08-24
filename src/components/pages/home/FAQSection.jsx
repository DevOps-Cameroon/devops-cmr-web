// src/components/FAQSection.jsx
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Terminal } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const FAQS = [
  {
    q: 'What is DevOps Cameroon?',
    a: "A community of engineers across Cameroon building real infrastructure, tools, and careers together — through meetups, hands-on projects, and mentorship.",
  },
  {
    q: 'Do I need prior DevOps experience to join?',
    a: 'No. We have members ranging from students shipping their first pipeline to senior engineers running production systems. Workshops are pitched to meet you where you are.',
  },
  {
    q: 'Is membership free?',
    a: 'Yes — joining the community, attending meetups, and contributing to projects is free. Some in-person events may have limited seats.',
  },
  {
    q: 'How do I contribute to community projects?',
    a: 'Check the Projects section for active repos, then open an issue or PR on GitHub. Most projects also have a dedicated Discord channel for coordination.',
  },
  {
    q: 'Can my company partner or sponsor an event?',
    a: 'Yes — reach out via the email in the Connect section below. We work with sponsors on talks, hiring access, and venue support.',
  },
  {
    q: 'Where are events held?',
    a: 'Mostly Douala and Yaoundé, with some sessions streamed or fully online. Check the Events page for upcoming dates and locations.',
  },
];

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const innerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const toggle = () => {
    const next = !open;
    setOpen(next);

    const panel = panelRef.current;
    const inner = innerRef.current;
    if (!panel || !inner) return;

    if (reducedMotion) {
      gsap.set(panel, { height: next ? 'auto' : 0 });
      return;
    }

    if (next) {
      const targetHeight = inner.scrollHeight;
      gsap.fromTo(
        panel,
        { height: 0 },
        {
          height: targetHeight,
          duration: 0.45,
          ease: 'power3.out',
          onComplete: () => gsap.set(panel, { height: 'auto' }),
        }
      );
      gsap.fromTo(inner, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.3, delay: 0.1, ease: 'power2.out' });
    } else {
      gsap.to(panel, {
        height: 0,
        duration: 0.35,
        ease: 'power2.inOut',
      });
      gsap.to(inner, { opacity: 0, duration: 0.15, ease: 'power1.in' });
    }
  };

  return (
    <div className="border-b border-line">
      {/* ---- Question row, styled as a terminal command line ---- */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 py-5 text-left"
      >
        <span className="font-mono text-sm text-accent shrink-0">
          [{String(index + 1).padStart(2, '0')}]
        </span>
        <span className="font-mono text-xs text-ink-3 shrink-0 hidden sm:inline">~/devops-cameroon$</span>
        <span className="flex-1 font-medium text-ink">{item.q}</span>
        <span
          className={`shrink-0 font-mono text-lg text-ink-3 transition-transform duration-300 ${open ? 'rotate-45 text-accent' : ''}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {/* ---- Terminal output panel ---- */}
      <div ref={panelRef} className="overflow-hidden" style={{ height: 0 }}>
        <div ref={innerRef} className="mb-5 rounded-lg bg-ink px-5 py-4 font-mono text-sm leading-relaxed">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-3 text-white/40">
            <Terminal className="h-3.5 w-3.5" />
            <span className="text-xs uppercase tracking-wider">stdout</span>
          </div>
          <p className="text-white/85">
            <span className="text-accent">&gt;</span> {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="bg-base px-6 py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
        {/* ---- Left: eyebrow + title, sticky on desktop ---- */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="label-mono inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1 text-ink-2">
            <Terminal className="h-3.5 w-3.5" />
            FAQs
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Frequently Asked
            <br />
            Questions
          </h2>
        </div>

        {/* ---- Right: question list ---- */}
        <div className="border-t border-line">
          {FAQS.map((item, i) => (
            <FAQItem key={item.q} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}