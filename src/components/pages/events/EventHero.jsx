import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Container from "@/components/ui/container";

const defaultOverlay =
  "bg-gradient-to-b from-[#0a0b0e]/35 via-[#0a0b0e]/35 to-[#08090c]";

export default function EventHero({
  image,
  eyebrow,
  title,
  accentTitle,
  bottomLeft,
  bottomRight,
  overlayClassName = defaultOverlay,
  style,
  sectionId = "events",
}) {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      const heroPhoto = rootRef.current?.querySelector(".event-hero-photo");
      if (heroPhoto) {
        gsap.fromTo(
          heroPhoto,
          { y: -40 },
          {
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      }

      gsap.fromTo(
        ".event-hero-content > *",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      );

      const hint = rootRef.current?.querySelector(".event-hero-scroll-hint");
      if (hint) {
        gsap.to(hint, {
          y: -8,
          duration: 1.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  return (
    <section
      id={sectionId}
      ref={rootRef}
      className="event-hero relative min-h-[520px] overflow-hidden bg-[#08090c] md:min-h-[574px]"
      style={style}
    >
      <div
        aria-hidden="true"
        className="event-hero-photo absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${overlayClassName}`}
      />

      <Container className="event-hero-content relative z-[2] flex min-h-[520px] flex-col justify-end pb-16 pt-20 md:min-h-[574px]">
        <div className="mb-3.5 font-sans text-[13px] font-medium text-white/85">
          {eyebrow}
        </div>
        <h1 className="font-sans text-[clamp(3.25rem,8.6vw,6.75rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-white">
          {title}
          <br />
          <span className="text-accent">{accentTitle}</span>
        </h1>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          {bottomLeft}
          {bottomRight}
        </div>
      </Container>

      <div className="event-hero-scroll-hint absolute bottom-0 left-1/2 z-[3] -translate-x-1/2 bg-surface px-5 pb-1 pt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-3">
        SCROLL DOWN
      </div>
    </section>
  );
}
