import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { CalendarRange } from 'lucide-react'
import SweepButton from '@/components/ui/SweepButton'
import DevOpsO from '/src/assets/images/devops_O.png'
import HeroBg from '/src/assets/images/hero-bg.png'

const DevOpsHero = React.forwardRef(function DevOpsHero(props, forwardedRef) {
  const internalRef = useRef(null);
  const heroRef = forwardedRef || internalRef;

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;

    const content = root.querySelectorAll('.content-animation');
    gsap.fromTo(content, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.18, ease: 'power3.out' });

    return undefined;
  }, [heroRef]);

  return (
    <section ref={heroRef} className="hero hero-centered relative py-8 md:py-10">
      {/* Hero background image overlay – breaks out of Container to fill viewport width */}
      <div
        className="absolute z-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-15"
        style={{
          backgroundImage: `url(${HeroBg})`,
          width: '100vw',
          height: '100%',
        }}
        aria-hidden="true"
      />
      
      {/* Animated infinity background */}
      <div className="relative z-10 mx-auto flex md:max-w-4xl flex-col items-center text-center">
        <div className="content-animation inline-flex items-center gap-3 mb-4 rounded-full border border-primary bg-ink px-5 py-2.5 text-[0.5rem] md:text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-primary-200">
          <CalendarRange className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>Upcoming: DevOps Community #7</span>
          <span aria-hidden="true">→</span>
        </div>

        <h1 className="hero-wordmark relative content-animation text-center" data-hero-title>
          <div className="content-animation absolute top-20 left-40 hidden md:flex gap-3 items-center pb-2 font-medium text-ink-2 lg:block lg:pb-4 lg:text-lg xl:text-xl">
              <div class="flex items-center gap-4">
                <span>Automate</span>
                <span className='w-2 h-2 rounded-full bg-primary'></span>
                <span>Collaborate</span>
              </div>
            </div>

            <div className="content-animation absolute top-20 right-35 hidden md:flex gap-3 items-center pb-2 font-medium text-ink-2 lg:block lg:pb-4 lg:text-lg xl:text-xl">
              <div class="flex items-center gap-4">
                <span>Deliver</span>
                <span className='w-2 h-2 rounded-full bg-primary'></span>
                <span className='text-primary-500'>Together</span>
              </div>
            </div>
            <span className="content-animation flex items-end text-5xl md:text-[8rem] font-extrabold uppercase leading-[1.05] tracking-tight text-ink">
              <span>Dev</span>
              <div className="relative flex items-end justify-center">
                <img src={DevOpsO} alt="" aria-hidden="true" className="h-[5rem] md:h-[15rem] w-auto" />
                <span>ps</span>
              </div>
            </span>
            <span className="content-animation text-5xl md:text-[8rem] text-primary font-extrabold uppercase leading-[1.05] tracking-tight text-ink">Cameroon</span>
        </h1>

        <div className="content-animation" data-hero-sub>
          <p className="lede md:hidden text-center text-[1.05rem] font-light tracking-[-0.03em] text-[#1f262a] md:text-[1.15rem] lg:text-[1.3rem]">
            Automate. Collaborate. Deliver. <span className="font-semibold text-primary">Together</span>
          </p>
        </div>

        <p className="content-animation text-center text-[1.02rem] leading-relaxed text-[#3f4b52] md:text-[1.1rem]">
          We are a community of builders, learners and innovators passionate about DevOps culture and cloud technologies. Let&apos;s build, ship and scale the future. Together.
        </p>

        <div className="cta-row content-animation mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <SweepButton onClick={() => {/* join handler */}}>
            Join the community
          </SweepButton>
          <SweepButton as={Link} to="/about" variant="outline">
            Learn More
          </SweepButton>
        </div>
      </div>
    </section>
  );
});

export default DevOpsHero;
