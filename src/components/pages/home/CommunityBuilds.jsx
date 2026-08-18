// src/components/CommunityBuilds.jsx
import React from 'react';
import { Play, Cloud, Smartphone, Terminal, Boxes, ArrowUpRight } from 'lucide-react';

const STORIES = [
  {
    key: 'poultryops',
    variant: 'quote',
    project: 'PoultryOps',
    quote:
      '"We started with three screens and a spreadsheet mindset. Six weeks later, farm owners in Bamenda were logging batches from a bus stop with no signal, syncing later."',
    author: 'Member-built',
    role: 'React Native / Expo, offline-first',
    icons: [Smartphone, Boxes],
  },
  {
    key: 'summit',
    variant: 'feature',
    tag: 'Community Spotlight',
    title: 'DevOps Cameroon Summit 2026',
  },
  {
    key: 'petrotwin',
    variant: 'quote',
    project: 'PetroTwin',
    quote:
      '"Modeling tanker telemetry in real time taught more about MQTT and anomaly detection than any course could. The community code-reviewed every alert threshold."',
    author: 'Member-built',
    role: 'FastAPI, MQTT, Web3 anchoring',
    icons: [Terminal, Cloud],
  },
  {
    key: 'famigo',
    variant: 'image',
    project: 'Famigo',
    caption: 'Errands & delivery chat, built and shipped by the community',
  },
  {
    key: 'livedeck',
    variant: 'quote',
    project: 'LiveDeck',
    quote:
      '"Pairing on the sandboxing architecture with three other members changed how I think about isolation. We shipped WebContainers support in a weekend hack session."',
    author: 'Member-built',
    role: 'Monaco, WebContainers, live coding',
    icons: [Terminal],
  },
  {
    key: 'scholarship',
    variant: 'mock',
    project: 'Scholarship Platform',
    caption: 'Admin dashboard for a Cameroon-based scholarship agency',
  },
  {
    key: 'grabpic',
    variant: 'quote',
    project: 'GrabPic',
    quote:
      '"The pgvector similarity search was the hardest part of the whole build — and the community Slack thread that solved it is still pinned as reference material."',
    author: 'Member-built',
    role: 'FastAPI, pgvector, DeepFace',
    icons: [Cloud, Boxes],
  },
];

function TechIcons({ icons }) {
  return (
    <div className="mt-4 flex items-center gap-2">
      {icons.map((Icon, i) => (
        <span
          key={i}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70"
        >
          <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
      ))}
    </div>
  );
}

function QuoteCard({ story }) {
  return (
    <div className="mb-6 break-inside-avoid rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <p className="font-mono text-lg font-bold tracking-tight text-accent">{story.project}</p>
      <p className="mt-3 text-sm leading-relaxed text-white/75">{story.quote}</p>
      <div className="mt-5">
        <p className="text-sm font-semibold text-white">{story.author}</p>
        <p className="text-xs text-white/50">{story.role}</p>
      </div>
      <TechIcons icons={story.icons} />
    </div>
  );
}

function FeatureCard({ story }) {
  return (
    <div className="group relative mb-6 flex h-64 break-inside-avoid flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-primary-600 p-6">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-accent-ink/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-ink">
          {story.tag}
        </span>
      </div>
      <div className="flex items-end justify-between">
        <h3 className="max-w-[75%] text-2xl font-extrabold uppercase leading-[1.05] text-accent-ink">
          {story.title}
        </h3>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-ink/15 transition-transform group-hover:scale-105">
          <Play className="h-4 w-4 fill-accent-ink text-accent-ink" />
        </span>
      </div>
    </div>
  );
}

function ImageCard({ story }) {
  return (
    <div className="mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      <div className="flex items-center gap-2 px-6 pt-5">
        <span className="h-2 w-2 rounded-full bg-accent" />
        <p className="text-sm font-semibold text-white">{story.project}</p>
      </div>
      <p className="px-6 pb-5 pt-1 text-xs text-white/50">{story.caption}</p>
      <div className="relative h-40 bg-gradient-to-tr from-primary-700 via-primary-600 to-accent">
        <svg
          className="absolute bottom-0 left-0 w-full opacity-90"
          viewBox="0 0 400 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,60 C120,0 280,0 400,60 L400,60 L0,60 Z" fill="var(--ink)" fillOpacity="0.25" />
        </svg>
      </div>
    </div>
  );
}

function MockCard({ story }) {
  return (
    <div className="mb-6 break-inside-avoid rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <p className="text-sm font-semibold text-white">{story.project}</p>
      <p className="mt-1 text-xs text-white/50">{story.caption}</p>
      <div className="mt-4 aspect-[16/10] rounded-lg bg-white/[0.06]">
        <div className="flex h-full flex-col gap-2 p-4">
          <div className="h-2 w-1/3 rounded bg-white/15" />
          <div className="mt-2 grid flex-1 grid-cols-3 gap-2">
            <div className="rounded bg-white/10" />
            <div className="rounded bg-white/10" />
            <div className="rounded bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

const RENDERERS = {
  quote: QuoteCard,
  feature: FeatureCard,
  image: ImageCard,
  mock: MockCard,
};

export default function CommunityBuilds() {
  return (
    <section className="bg-ink px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <span className="label-mono block text-center text-accent">What We Ship</span>
        <h2 className="mt-4 text-center text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl">
          Built By The Community
        </h2>

        <div className="mt-14 columns-1 gap-6 md:columns-2">
          {STORIES.map((story) => {
            const Renderer = RENDERERS[story.variant];
            return <Renderer key={story.key} story={story} />;
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <button className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent">
            Explore more community builds
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}