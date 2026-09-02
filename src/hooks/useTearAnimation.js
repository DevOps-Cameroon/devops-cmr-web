import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

const TEAR_PROGRESS_BY_STEP = [0, 0.4, 0.74];

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function useTearAnimation(step, onComplete) {
  const cardRef = useRef(null);
  const tearGroupRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!tearGroupRef.current) return;
    const progress = TEAR_PROGRESS_BY_STEP[step] ?? 0;

    gsap.to(tearGroupRef.current, {
      '--cut-progress': progress,
      x: -progress * 10,
      y: progress * 16,
      rotation: -progress * 3,
      scale: 1 - progress * 0.03,
      duration: prefersReducedMotion() ? 0 : 0.7,
      ease: 'power2.inOut',
      transformOrigin: 'calc(100% - 0.5rem) 50%',
    });
  }, [step]);

  const playFinalTear = useCallback(() => new Promise((resolve) => {
    const tearEl = tearGroupRef.current;
    const cardEl = cardRef.current;

    if (prefersReducedMotion() || !tearEl || !cardEl) {
      onCompleteRef.current?.();
      resolve();
      return;
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        onCompleteRef.current?.();
        resolve();
      },
    });

    timeline
      .to(tearEl, {
        '--cut-progress': 1,
        duration: 0.58,
        ease: 'power2.inOut',
      })
      .to(tearEl, {
        x: -40,
        y: 320,
        rotation: -35,
        scale: 0.82,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
        transformOrigin: 'calc(100% - 0.5rem) 50%',
      }, '<0.08')
      .to(cardEl, {
        opacity: 0,
        y: -18,
        scale: 0.985,
        duration: 0.3,
        ease: 'power2.in',
      }, '-=0.34');
  }), []);

  return { cardRef, tearGroupRef, playFinalTear };
}
