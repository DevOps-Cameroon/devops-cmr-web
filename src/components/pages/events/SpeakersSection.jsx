import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import EmptyState from "@/components/ui/EmptyState";

const DEFAULT_SPEAKERS = [
  {
    name: "Nadine Mbala",
    role: "Staff SRE · MTN",
    topic: "Keeping 12M users online at 2am",
    initials: "NM",
    img: "/images/org1.png",
    thumb: "/images/org1.png",
    bio: [
      "Nadine keeps MTN's mobile-money stack online around the clock — measurable, boring, and fast.",
      "She'll walk through the incident that took down services in three regions, and the runbook that stopped it from ever recurring.",
    ],
    social: { linkedin: "#", github: "#" },
  },
  {
    name: "Kevin Talla",
    role: "Platform Lead · Orange Cameroun",
    topic: "From Kubernetes toys to production fleets",
    initials: "KT",
    img: "/images/org2.png",
    thumb: "/images/org2.png",
    bio: [
      "Kevin runs the platform team that moved Orange Cameroun's workloads onto production Kubernetes.",
      "He talks about the boring decisions that made the migration stick, and the three mistakes he hopes you won't repeat.",
    ],
    social: { linkedin: "#", website: "#" },
  },
  {
    name: "Arielle Foko",
    role: "Cloud Architect · Kudi",
    topic: "Designing for failure in African fintech",
    initials: "AF",
    img: "/images/org3.png",
    thumb: "/images/org3.png",
    bio: [
      "Arielle designs fintech architectures that assume the worst and stay fast anyway.",
      "Her talk maps a multi-region AWS design built on a shoestring budget, fault injection included.",
    ],
    social: { linkedin: "#", github: "#" },
  },
  {
    name: "Brice Nganou",
    role: "Co-founder · Infra Labs",
    topic: "Terraform at team scale without the tears",
    initials: "BN",
    img: "/images/org4.png",
    thumb: "/images/org4.png",
    bio: [
      "Brice co-founded Infra Labs to give local startups infrastructure muscle on a budget.",
      "He demonstrates Terraform workflows that scale across teams without turning your repos into war zones.",
    ],
    social: { linkedin: "#", website: "#" },
  },
  {
    name: "Clarisse Ndongo",
    role: "CTO · Cauri",
    topic: "Building multi-cloud on a startup budget",
    initials: "CN",
    img: "/images/org5.png",
    thumb: "/images/org5.png",
    bio: [
      "Clarisse ships products on three clouds without letting cost control the roadmap.",
      "She's here to show how small teams stay multi-cloud without the multi-cloud headaches.",
    ],
    social: { linkedin: "#", website: "#" },
  },
  {
    name: "Fabrice Song",
    role: "Cloud Consultant · Google Cloud",
    topic: "Right-sizing every workload you run",
    initials: "FS",
    img: "/images/IMG2.png",
    thumb: "/images/IMG2.png",
    bio: [
      "Fabrice helps companies pay for capacity they actually use, not capacity they're afraid of running out of.",
      "Expect a live cost-optimization clinic on real customer bills.",
    ],
    social: { linkedin: "#", github: "#" },
  },
  {
    name: "Mireille Abena",
    role: "DevOps Lead · Ndovu Labs",
    topic: "Shipping observability before launch day",
    initials: "MA",
    img: "/images/org1.png",
    thumb: "/images/org1.png",
    bio: [
      "Mireille leads DevOps at Ndovu Labs, where observability is a launch requirement, not an afterthought.",
      "She'll share the instrumentation checklist her teams ship before any go-live.",
    ],
    social: { linkedin: "#", website: "#" },
  },
  {
    name: "Hugo Essomba",
    role: "Systems Engineer · Canal+",
    topic: "Bare metal that refuses to break",
    initials: "HE",
    img: "/images/org2.png",
    thumb: "/images/org2.png",
    bio: [
      "Hugo keeps broadcast infrastructure alive in environments where the cloud isn't an option.",
      "He defends boring, well-tested systems with surprising enthusiasm.",
    ],
    social: { linkedin: "#", github: "#" },
  },
  {
    name: "Diane Nkoulou",
    role: "Cloud Security Engineer · WiPay",
    topic: "Securing the pipeline end to end",
    initials: "DN",
    img: "/images/org3.png",
    thumb: "/images/org3.png",
    bio: [
      "Diane bakes security into the pipeline so releases stop being a trust exercise.",
      "Her session covers workload identity, secret handling, and the audits that actually catch things.",
    ],
    social: { linkedin: "#", website: "#" },
  },
];

const socialIcons = {
  linkedin: (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
      aria-hidden="true"
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.48V23h-4V8z" />
    </svg>
  ),
  github: (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.6.24 2.77.12 3.06.74.8 1.19 1.82 1.19 3.08 0 4.43-2.7 5.4-5.27 5.68.42.36.78 1.07.78 2.17v3.22c0 .31.21.67.8.56A11.53 11.53 0 0 0 23.5 12C23.5 5.66 18.35.5 12 .5z" />
    </svg>
  ),
  website: (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm7.9 9h-3.52a15.6 15.6 0 00-1.15-5.42A8.03 8.03 0 0119.9 11zM12 4.05c.86 1.1 1.94 3.08 2.24 6.95H9.76c.3-3.87 1.38-5.85 2.24-6.95zM9.76 13h4.48c-.3 3.87-1.38 5.85-2.24 6.95-.86-1.1-1.94-3.08-2.24-6.95zm-2.2-2H4.1a8.03 8.03 0 014.67-5.42A15.6 15.6 0 007.63 11H4.1zm0 2h3.52a15.6 15.6 0 001.15 5.42A8.03 8.03 0 014.1 13zm12.35 5.42A15.6 15.6 0 0017.6 13h2.3a8.03 8.03 0 01-3.45 5.42z" />
    </svg>
  ),
};

export default function SpeakersSection({
  speakers = DEFAULT_SPEAKERS,
  accent = "#3ddc84",
}) {
  const rootRef = useRef(null);
  const photoWrapRef = useRef(null);
  const infoRef = useRef(null);
  const rowRef = useRef(null);
  const viewportRef = useRef(null);
  const swapTl = useRef(null);
  const marqueeTl = useRef(null);
  const pausedRef = useRef(false);
  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startTime: 0,
    moved: 0,
    suppress: false,
  });

  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [duplicated, setDuplicated] = useState(false);
  const [animated, setAnimated] = useState(false);

  const count = speakers.length;
  const featured = speakers[displayIndex];

  // Measure whether the thumbnail row overflows its viewport so we can loop it.
  useEffect(() => {
    const measure = () => {
      if (reduced) return;
      setDuplicated(false);
      setAnimated(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const row = rowRef.current;
          const viewport = viewportRef.current;
          if (!row || !viewport) return;
          if (row.scrollWidth > viewport.clientWidth + 4) {
            setDuplicated(true);
            setAnimated(true);
          }
        });
      });
    };

    measure();
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, [reduced, count]);

  // Seamless marquee loop driven by GSAP (linear ease, pauses on hover).
  useGSAP(
    () => {
      const row = rowRef.current;
      if (reduced || !animated || !row) {
        marqueeTl.current = null;
        return;
      }
      const tl = gsap.fromTo(
        row,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 60,
          ease: "none",
          repeat: -1,
          paused: pausedRef.current,
        },
      );
      marqueeTl.current = tl;
      return () => tl.kill();
    },
    { scope: rootRef, dependencies: [animated, reduced, duplicated] },
  );

  // Entrance reveal + scroll textures for the whole section.
  useGSAP(
    () => {
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        "[data-sp-eyebrow]",
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" },
        0,
      )
        .fromTo(
          "[data-sp-title]",
          { y: 26, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
          0.1,
        )
        .fromTo(
          "[data-sp-photo]",
          { y: 44, autoAlpha: 0, scale: 0.95 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 0.9, ease: "power3.out" },
          0.18,
        )
        .fromTo(
          "[data-sp-info]",
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
          0.28,
        )
        .fromTo(
          "[data-sp-row]",
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
          0.42,
        )
        .fromTo(
          "[data-sp-wm]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5, ease: "power2.out" },
          0.55,
        );

      // Watermark drifts slower than the scroll for depth.
      gsap.to("[data-sp-wm]", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // Subtle skew on the marquee row as you scroll through.
      gsap.fromTo(
        viewportRef.current,
        { skewX: 0 },
        {
          skewX: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        },
      );
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  // Manual scrub of the running marquee: grab to drag, release to resume auto-scroll.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const d = dragRef.current;

    const onDown = (e) => {
      const tl = marqueeTl.current;
      if (!tl || reduced) return;
      d.active = true;
      d.pointerId = e.pointerId;
      d.startX = e.clientX;
      d.startTime = tl.time();
      d.moved = 0;
      d.suppress = false;
      try {
        viewport.setPointerCapture(e.pointerId);
      } catch {}
      tl.pause();
    };

    const onMove = (e) => {
      if (!d.active || e.pointerId !== d.pointerId) return;
      const tl = marqueeTl.current;
      const row = rowRef.current;
      if (!tl || !row) return;
      const delta = e.clientX - d.startX;
      d.moved = Math.max(d.moved, Math.abs(delta));
      const half = row.scrollWidth / 2;
      const duration = tl.duration();
      if (half <= 0 || !duration) return;
      const newTime = gsap.utils.clamp(
        0,
        duration,
        d.startTime - (delta / half) * duration,
      );
      tl.time(newTime);
    };

    const onUp = () => {
      if (!d.active) return;
      d.active = false;
      if (d.moved > 6) d.suppress = true;
    };

    const onClickCapture = (e) => {
      if (d.suppress) {
        e.preventDefault();
        e.stopPropagation();
        d.suppress = false;
      }
    };

    const onWheel = (e) => {
      const tl = marqueeTl.current;
      const row = rowRef.current;
      if (!tl || reduced || !row) return;
      const half = row.scrollWidth / 2;
      const duration = tl.duration();
      if (half <= 0 || !duration) return;
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      e.preventDefault();
      const newTime = gsap.utils.clamp(
        0,
        duration,
        tl.time() + (delta / half) * duration,
      );
      tl.time(newTime);
    };

    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);
    viewport.addEventListener("click", onClickCapture, true);
    viewport.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      viewport.removeEventListener("click", onClickCapture, true);
      viewport.removeEventListener("wheel", onWheel);
    };
  }, [reduced, animated]);

  const selectSpeaker = (i) => {
    if (dragRef.current.active) return;
    if (reduced) {
      setActiveIndex(i);
      setDisplayIndex(i);
      return;
    }
    if (i === activeIndex) return;
    setActiveIndex(i);
    swapTl.current?.kill();
    const targets = [photoWrapRef.current, infoRef.current].filter(Boolean);
    swapTl.current = gsap
      .timeline()
      .to(targets, {
        autoAlpha: 0,
        y: 14,
        duration: 0.2,
        ease: "power2.in",
        overwrite: "auto",
      })
      .add(() => setDisplayIndex(i))
      .to(targets, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" });
  };

  const renderThumb = (s, i, isClone) => (
    <div
      key={`${i}-${isClone ? "c" : "a"}`}
      className={`speaker-thumb relative flex h-[150px] w-[126px] flex-none cursor-pointer origin-bottom items-end justify-center transition-transform duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${
        i === activeIndex ? "z-30 scale-[1.08]" : ""
      }`}
      role="button"
      tabIndex={isClone ? -1 : 0}
      aria-hidden={isClone || undefined}
      aria-label={isClone ? undefined : `${s.name} — ${s.role}`}
      aria-pressed={!isClone && i === activeIndex}
      data-index={i}
      onClick={() => selectSpeaker(i)}
      onMouseEnter={() => selectSpeaker(i)}
      onFocus={() => selectSpeaker(i)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectSpeaker(i);
        }
      }}
    >
      <div
        className={`pointer-events-none absolute left-1/2 top-[-56px] whitespace-nowrap bg-white px-4 py-3 text-center shadow-[0_18px_34px_-14px_rgba(22,26,32,0.28)] transition-all duration-300 ${
          i === activeIndex
            ? "-translate-x-1/2 translate-y-0 opacity-100"
            : "-translate-x-1/2 translate-y-1.5 opacity-0"
        }`}
      >
        <p className="font-sans text-sm font-extrabold uppercase leading-tight tracking-tight text-ink">
          {s.name}
        </p>
        <p className="mt-0.5 text-[11px] font-semibold text-primary-500">
          {s.role}
        </p>
      </div>
      <img
        src={s.thumb}
        alt={s.name}
        loading="lazy"
        className={`h-[150px] w-full object-cover object-top brightness-[1.08] contrast-[1.06] saturate-[1.05] transition-[filter] duration-[400ms] ${
          i === activeIndex ? "grayscale-0" : "grayscale"
        }`}
      />
    </div>
  );

  if (count === 0) {
    return (
      <section aria-label="Speakers" className="bg-base py-16 lg:py-24">
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <EmptyState
            title="Speakers coming soon"
            description="Speaker details will be published here once the program is confirmed."
          />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      aria-label="Speakers"
      className="relative overflow-hidden py-[90px] pb-16"
      style={{
        "--ev-accent": accent,
        backgroundImage:
          "radial-gradient(circle at 88% 92%, rgba(61, 220, 132, 0.1), rgba(61, 220, 132, 0) 55%)",
      }}
    >
      <div className="relative mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
        <span
          data-sp-eyebrow
          className="mb-3 block select-none whitespace-nowrap text-center font-['Press_Start_2P',monospace] text-[length:min(8vw,18px)] leading-none tracking-[0.02em] text-accent/90 z-[9999]"
        >
          Our Speakers
        </span>
        <h2
          data-sp-title
          className="mx-auto mb-[60px] max-w-[760px] text-center font-sans text-[clamp(1.5rem,3.4vw,2.375rem)] font-extrabold uppercase leading-tight tracking-tight text-ink"
        >
          We Bring Bold Voices, Fresh Ideas, and Stories that Matter to You.
        </h2>

        <div className="relative z-[2] mb-10 grid min-h-[420px] items-center gap-10 md:grid-cols-[340px_1fr] md:gap-24">
          <span
            data-sp-wm
            aria-hidden="true"
            className="pointer-events-none absolute left-[300px] z-0 hidden -translate-y-1/2 select-none whitespace-nowrap font-sans font-extrabold uppercase leading-[0.86] text-primary-100/80 md:block"
            style={{ fontSize: "min(15vw, 150px)" }}
          >
            Speakers
          </span>

          <div
            ref={photoWrapRef}
            data-sp-photo
            className="relative z-10 mx-auto h-[340px] w-[280px] md:mx-0 md:h-[420px] md:w-[340px]"
          >
            <img
              src={featured.img}
              alt={featured.name}
              className="h-full w-full object-cover object-top brightness-[1.08] contrast-[1.06] saturate-[1.05]"
              style={{ borderRadius: 2 }}
            />
          </div>

          <div
            data-sp-info
            className="relative z-10 mx-auto max-w-[460px] text-center md:mx-0 md:text-left"
          >
            <h3 className="font-sans text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink">
              {featured.name}
            </h3>
            <p className="mb-5 mt-0 text-sm font-semibold text-primary-500">
              {featured.role}
            </p>
            <div className="flex flex-col gap-3.5">
              {featured.bio.map((p, i) => (
                <p key={i} className="m-0 text-sm leading-[1.85] text-ink-2">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-5 flex items-center  gap-3 md:items-center justify-center lg:justify-start">
              {Object.keys(featured.social).map((key) => (
                <a
                  key={key}
                  href={featured.social[key]}
                  target="_blank"
                  rel="noopener"
                  aria-label={key}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-3 transition-all duration-200 hover:border-accent hover:bg-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {socialIcons[key]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`relative z-0 cursor-grab select-none overflow-hidden py-20 active:cursor-grabbing before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-20 before:w-16 before:bg-gradient-to-r before:from-base after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-20 after:w-16 after:bg-gradient-to-l after:from-primary-100`}
          ref={viewportRef}
          data-sp-row
          style={{ touchAction: "pan-y" }}
          onMouseEnter={() => {
            pausedRef.current = true;
            marqueeTl.current?.pause();
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
            if (animated && !reduced) marqueeTl.current?.play();
          }}
        >
          <div
            className={`speaker-row flex w-max items-end ${animated ? "will-change-transform" : "mx-auto"}`}
            ref={rowRef}
          >
            {speakers.map((s, i) => renderThumb(s, i, false))}
            {duplicated && speakers.map((s, i) => renderThumb(s, i, true))}
          </div>
        </div>
      </div>
    </section>
  );
}
