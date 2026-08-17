// src/components/WhyDevOps.jsx
import React from 'react';
import { Layers, Link2, ArrowUpDown, Terminal} from 'lucide-react';

const CARDS = [
  {
    key: 'branding',
    icon: Layers,
    title: 'Hands-On Learning',
    body: 'Workshops and pairing sessions that turn theory into shipped infrastructure.',
    bg: 'bg-accent',
    text: 'text-ink',
  },
  {
    key: 'automation',
    icon: Link2,
    title: 'Real-World Projects',
    body: 'Build and maintain tools the community actually runs in production.',
    bg: 'bg-ink',
    text: 'text-white',
  },
  {
    key: 'scale',
    icon: ArrowUpDown,
    title: 'Growing Network',
    body: 'Connect with engineers scaling systems across Cameroon and beyond.',
    bg: 'bg-[#FFD60A]',
    text: 'text-ink',
  },
];

// Decorative placeholder blocks — plain squares for now, will be swapped
// for the notched/quarter-circle SVG shapes later.
function Deco({ className = '' }) {
  return <div className={`rounded-2xl bg-surface-2 ${className}`} aria-hidden="true" />;
}

export default function WhyDevOps() {
  return (
    <section className="min-h-screen py-20 sm:py-28">
      <div
        className="
          grid gap-4 sm:gap-6
          grid-cols-1
          md:grid-cols-3
          lg:grid-cols-3 lg:grid-rows-2
          xl:grid-cols-4 xl:grid-rows-2
        "
      >
        {/* ---------- Title ---------- */}
        <div
          className="
            order-1
            md:order-none md:col-span-3 md:row-start-1
            lg:col-span-2 lg:col-start-1 lg:row-start-1
            xl:col-span-2 xl:col-start-1 xl:row-start-1
            flex flex-col justify-center
          "
        >
          <span className="eyebrow label-mono mb-6 content-animation"><Terminal /> Why DevOps Cameroon</span>
          <h2 className="content-animation text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Trusted by developers building Cameroon&rsquo;s tech future
          </h2>
        </div>

        {/* ---------- Card 1 — Teal / accent ---------- */}
        <Card
          card={CARDS[0]}
          className="
            order-2
            md:order-none md:col-start-1 md:row-start-2
            lg:col-start-3 lg:row-start-1
            xl:col-start-3 xl:row-start-1
          "
        />

        {/* ---------- Top-right decorative — xl only ---------- */}
        <Deco className="hidden xl:block xl:col-start-4 xl:row-start-1" />

        {/* ---------- Card 2 — Dark / ink ---------- */}
        <Card
          card={CARDS[1]}
          className="
            order-3
            md:order-none md:col-start-2 md:row-start-2
            lg:col-start-1 lg:row-start-2
            xl:col-start-2 xl:row-start-2
          "
        />

        {/* ---------- Bottom-left decorative — xl only ---------- */}
        <Deco className="hidden xl:block xl:col-start-1 xl:row-start-2" />

        {/* ---------- Middle decorative — lg AND xl ---------- */}
        <Deco
          className="
            hidden
            lg:block lg:col-start-2 lg:row-start-2
            xl:col-start-3 xl:row-start-2
          "
        />

        {/* ---------- Card 3 — Yellow ---------- */}
        <Card
          card={CARDS[2]}
          className="
            order-4
            md:order-none md:col-start-3 md:row-start-2
            lg:col-start-3 lg:row-start-2
            xl:col-start-4 xl:row-start-2
          "
        />
      </div>
    </section>
  );
}

function Card({ card, className }) {
  const Icon = card.icon;
  return (
    <div className={`flex flex-col items-start w-full gap-32 relative justify-between rounded-2xl p-7 ${card.bg} ${card.text} ${className}`}>
      <Icon className="content-animation h-10 w-10" strokeWidth={2} />
      <div className="mt-8">
        <h3 className="content-animation text-3xl font-extrabold uppercase leading-tight">{card.title}</h3>
        <p className={`content-animation mt-3 text-sm ${card.text === 'text-white' ? 'text-white/80' : 'text-ink/75'}`}>
          {card.body}
        </p>
      </div>
    </div>
  );
}