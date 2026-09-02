import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

const TEAR_PROGRESS_BY_STEP = [0, 0.4, 0.74];

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function useTearAnimation(step, onComplete) {
  const cardRef = useRef(null);
  const tearGroupRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 },
      );
    }
  }, []);

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
    if (prefersReducedMotion()) {
      onComplete?.();
      resolve();
      return;
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        onComplete?.();
        resolve();
      },
    });

    timeline
      .to(tearGroupRef.current, {
        '--cut-progress': 1,
        duration: 0.58,
        ease: 'power2.inOut',
      })
      .to(tearGroupRef.current, {
        x: -40,
        y: 320,
        rotation: -35,
        scale: 0.82,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
        transformOrigin: 'calc(100% - 0.5rem) 50%',
      }, '<0.08')
      .to(cardRef.current, {
        opacity: 0,
        y: -18,
        scale: 0.985,
        duration: 0.3,
        ease: 'power2.in',
      }, '-=0.34');
  }), [onComplete]);

  return { cardRef, tearGroupRef, playFinalTear };
}
