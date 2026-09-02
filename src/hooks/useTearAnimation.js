import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

const TEAR_PROGRESS_BY_STEP = [0, 0.4, 0.74];

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function useTearAnimation(step, onComplete) {
  const cardRef = useRef(null);
  const tearGroupRef = useRef(null);
  const rightPanelRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // All step transitions in one effect — no conflicts
  useEffect(() => {
    const tearEl = tearGroupRef.current;
    if (!tearEl) return;
    const reduced = prefersReducedMotion();

    const tl = gsap.timeline();

    if (step === 2) {
      // Forward: tumble off — save original width for smooth restore
      tearEl.dataset.origW = String(tearEl.offsetWidth);
      const dur = reduced ? 0 : 1.15;
      tl.to(tearEl, {
        x: '-40%',
        y: 300,
        rotation: -35,
        opacity: 0,
        '--cut-progress': 1,
        duration: dur,
        ease: 'power1.in',
        transformOrigin: 'left center',
      });
      tl.to(tearEl, {
        width: 0,
        minWidth: 0,
        paddingLeft: 0,
        paddingRight: 0,
        duration: 0.75,
        ease: 'power2.inOut',
        overflow: 'hidden',
      }, '-=0.35');
    } else {
      // Back or between 0-1: restore smoothly
      const progress = TEAR_PROGRESS_BY_STEP[step] ?? 0;
      const needsWidthRestore = tearEl.offsetWidth === 0 || tearEl.style.width === '0px';

      if (needsWidthRestore) {
        const targetW = Number(tearEl.dataset.origW) || 360;
        tl.to(tearEl, {
          width: targetW,
          minWidth: targetW,
          duration: 1.1,
          ease: 'power3.out',
        });
        tl.to(tearEl, {
          paddingLeft: '',
          paddingRight: '',
          duration: 0.3,
          ease: 'power2.out',
        }, '-=0.9');
      }

      tl.to(tearEl, {
        x: -progress * 10,
        y: progress * 16,
        rotation: -progress * 3,
        opacity: 1,
        scale: 1 - progress * 0.03,
        '--cut-progress': progress,
        duration: reduced ? 0 : 1.6,
        ease: 'power3.out',
        transformOrigin: 'left center',
      }, needsWidthRestore ? 0.35 : 0);

      if (needsWidthRestore) {
        tl.set(tearEl, { clearProps: 'width,minWidth,overflow' });
      } else {
        tl.set(tearEl, { clearProps: 'overflow' });
      }
    }
  }, [step]);

  const playFinalTear = useCallback(() => new Promise((resolve) => {
    const cardEl = cardRef.current;

    if (prefersReducedMotion() || !cardEl) {
      onCompleteRef.current?.();
      resolve();
      return;
    }

    gsap.to(cardEl, {
      opacity: 0,
      y: -16,
      scale: 0.985,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        onCompleteRef.current?.();
        resolve();
      },
    });
  }), []);

  return { cardRef, tearGroupRef, rightPanelRef, playFinalTear };
}
