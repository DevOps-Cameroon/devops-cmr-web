import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const STATS = [
  { value: 500, suffix: '+', label: 'Members', dark: false },
  { value: 80, suffix: '+', label: 'Meetups & Events', dark: true },
  { value: 45, suffix: '+', label: 'Projects & Initiatives', dark: false },
  { value: null, label: 'Possibilities', dark: true },
];

const TITLE = "Together, We're Making A Difference";
const SCROLL_VH_PER_PANEL = 1.1;
const ASCII_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+-=?';

function AsciiNumber({ value, suffix, trigger, reducedMotion }) {
  const ref = useRef(null);

  useEffect(() => {
    if (value == null || !ref.current) return undefined;

    if (reducedMotion) {
      ref.current.textContent = value.toLocaleString();
      return undefined;
    }

    const target = value.toLocaleString();
    const randomChar = () => ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
    ref.current.textContent = target.replace(/\d/g, randomChar);

    const animation = { progress: 0 };
    const tween = gsap.to(animation, {
      progress: 1,
      duration: 0.7,
      ease: 'power2.out',
      onUpdate: () => {
        if (!ref.current) return;

        const revealed = Math.floor(animation.progress * target.length);
        ref.current.textContent = target
          .split('')
          .map((character, index) => {
            if (!/\d/.test(character)) return character;
            return index < revealed ? character : randomChar();
          })
          .join('');
      },
      onComplete: () => {
        if (ref.current) ref.current.textContent = target;
      },
    });

    return () => tween.kill();
  }, [value, trigger, reducedMotion]);

  return (
    <span className="font-mono tabular-nums tracking-[0.08em]">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

function InfinityMetric({ trigger, reducedMotion }) {
  const numRef = useRef(null);
  const infinityRef = useRef(null);

  useEffect(() => {
    if (!numRef.current || !infinityRef.current) return undefined;

    if (reducedMotion) {
      gsap.set(numRef.current, { autoAlpha: 0 });
      gsap.set(infinityRef.current, { autoAlpha: 1, scale: 1 });
      return undefined;
    }

    const randomChar = () => ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
    gsap.set(numRef.current, { autoAlpha: 1 });
    gsap.set(infinityRef.current, { autoAlpha: 0, scale: 0.6 });
    numRef.current.textContent = randomChar();

    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: 999,
      duration: 0.55,
      ease: 'power2.out',
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = Math.floor(counter.value).toLocaleString();
      },
      onComplete: () => {
        gsap.to(numRef.current, { autoAlpha: 0, duration: 0.12 });
        gsap.fromTo(
          infinityRef.current,
          { autoAlpha: 0, scale: 0.5 },
          { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }
        );
      },
    });

    return () => tween.kill();
  }, [trigger, reducedMotion]);

  return (
    <span className="relative inline-flex items-center justify-center font-mono tabular-nums tracking-[0.08em]">
      <span className="invisible">000</span>
      <span ref={numRef} aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        0
      </span>
      <span ref={infinityRef} aria-label="infinity" className="absolute inset-0 flex items-center justify-center opacity-0">
        &infin;
      </span>
    </span>
  );
}

export default function ImpactStats() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const metricRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndexRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const current = STATS[activeIndex];

  useEffect(() => {
    if (reducedMotion) return undefined;

    const context = gsap.context(() => {
      const total = STATS.length;
      const step = 1 / (total - 1);

      const track = gsap.to(trackRef.current, {
        y: () => -window.innerHeight * (total - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${(total - 1) * window.innerHeight * SCROLL_VH_PER_PANEL}`,
          // No smoothing lag: background and metric both read this same
          // progress value directly, so they can never drift apart.
          scrub: true,
          pin: viewportRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // activeIndex is derived from the SAME progress that drives the
          // background — single source of truth, always in lockstep.
          onUpdate: (self) => {
            const idx = Math.min(total - 1, Math.round(self.progress / step));
            if (idx !== lastIndexRef.current) {
              lastIndexRef.current = idx;
              setActiveIndex(idx);
            }
          },
        },
      });

      const st = track.scrollTrigger;
      const lockRef = { current: false };

      // One scroll gesture = one metric: jump the real scroll position to
      // the next/previous panel's exact point. `scrub: true` + `onUpdate`
      // above then animates the background AND updates the text together,
      // in real time, as this tween plays — not after it.
      const stepOnce = (direction) => {
        if (lockRef.current || !st.isActive) return false;

        const currentIndex = Math.round(st.progress / step);
        const next = currentIndex + direction;
        if (next < 0 || next > total - 1) return false;

        lockRef.current = true;
        const targetY = st.start + (next / (total - 1)) * (st.end - st.start);
        gsap.to(window, {
          duration: 0.6,
          ease: 'power3.inOut',
          scrollTo: targetY,
          onComplete: () => {
            lockRef.current = false;
          },
        });
        return true;
      };

      const onWheel = (e) => {
        if (!st.isActive) return;
        if (lockRef.current) {
          e.preventDefault();
          return;
        }
        if (Math.abs(e.deltaY) < 4) return;
        const handled = stepOnce(e.deltaY > 0 ? 1 : -1);
        if (handled) e.preventDefault();
      };

      let touchStartY = null;
      const onTouchStart = (e) => {
        touchStartY = e.touches[0].clientY;
      };
      const onTouchMove = (e) => {
        if (!st.isActive || touchStartY == null) return;
        if (lockRef.current) {
          e.preventDefault();
          return;
        }
        const dy = touchStartY - e.touches[0].clientY;
        if (Math.abs(dy) < 40) return;
        const handled = stepOnce(dy > 0 ? 1 : -1);
        if (handled) {
          e.preventDefault();
          touchStartY = e.touches[0].clientY;
        }
      };

      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: false });

      return () => {
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        track.scrollTrigger?.kill();
      };
    }, sectionRef);

    return () => context.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !metricRef.current) return undefined;

    const tween = gsap.fromTo(
      metricRef.current,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power3.out', overwrite: true }
    );

    return () => tween.kill();
  }, [activeIndex, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="impact-title"
      style={{ height: `${100 + (STATS.length - 1) * SCROLL_VH_PER_PANEL * 100}vh` }}
      className="relative"
    >
      <div
        ref={viewportRef}
        className="relative h-screen w-screen max-w-none overflow-hidden"
        style={{ marginLeft: 'calc(50% - 50vw)' }}
      >
        <div ref={trackRef} className="absolute inset-x-0 top-0" style={{ height: `${STATS.length * 100}vh` }}>
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="relative w-full"
              style={{ height: '100vh', background: stat.dark ? 'var(--accent)' : 'var(--base)' }}
            >
              {index < STATS.length - 1 && (
                <svg
                  className="pointer-events-none absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 1440 220"
                  preserveAspectRatio="none"
                  height="220"
                  aria-hidden="true"
                >
                  <path
                    d="M0,220 C 320,-20 1120,-20 1440,220 L1440,220 L0,220 Z"
                    fill={STATS[index + 1].dark ? 'var(--accent)' : 'var(--base)'}
                  />
                </svg>
              )}
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
          <h2
            id="impact-title"
            className={`max-w-3xl text-4xl font-bold leading-tight transition-colors duration-300 sm:text-5xl ${
              current.dark ? 'text-white' : 'text-ink'
            }`}
          >
            {TITLE}
          </h2>

          <div ref={metricRef} className="mt-10">
            <div
              className={`text-[5rem] font-extrabold leading-none sm:text-[7rem] ${
                current.dark ? 'text-accent-ink' : 'text-accent'
              }`}
            >
              {current.value != null ? (
                <AsciiNumber
                  value={current.value}
                  suffix={current.suffix}
                  trigger={activeIndex}
                  reducedMotion={reducedMotion}
                />
              ) : (
                <InfinityMetric trigger={activeIndex} reducedMotion={reducedMotion} />
              )}
            </div>
            <p className={`label-mono mt-4 transition-colors duration-300 ${current.dark ? 'text-accent-ink/80' : 'text-ink-2'}`}>
              {current.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}