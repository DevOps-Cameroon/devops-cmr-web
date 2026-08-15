import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import HeroImg from '/src/assets/images/devops.png'
import MapSvg from '@/components/MapSvg'
import { Users } from 'lucide-react'
import SweepButton from '@/components/ui/SweepButton'

// no ScrollTrigger: map animation plays on load (finite)

const DevOpsHero = React.forwardRef(function DevOpsHero(props, forwardedRef) {
  const internalRef = useRef(null);
  const heroRef = forwardedRef || internalRef;

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;

    // content entrance
    const content = root.querySelectorAll('.content-animation');
    gsap.fromTo(content, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.18, ease: 'power3.out' });

    // content animation only; map handled by MapSvg component
    return undefined;
  }, [heroRef]);

  return (
    <section ref={heroRef} className="hero relative grid grid-cols-[1.05fr_0.95fr] items-center gap-8 overflow-hidden">

      <div className="hero-image absolute -top-10 -left-30 z-1">
        <img src={HeroImg} alt="DevOps Cameroon" className="w-[1000px] h-auto opacity-5" />
      </div>

      <div className="content relative z-10 text-left">
        <div className="eyebrow label-mono mb-6 content-animation">
          <Users />
          Community&middot;Learning&middot;Growth 
        </div>

        <h1 className="content-animation text-4xl" data-hero-title>
          DevOps{" "}
          <span className="text-primary relative whitespace-nowrap">Cameroon</span>
        </h1>

        <div className="content-animation" data-hero-sub>
          <p className="lede content-animation flex items-center whitespace-nowrap" data-hero-sub>
            Automate. Collaborate. Deliver.{" "}
            <span className="text-primary font-semibold"> Together</span>
          </p>
        </div>

        <p className="content-animation md:max-w-[500px] mb-12">
          We are a community of builders, learners and innovators passionate about DevOps culture and cloud technologies. Let's build, ship and scale the future. Together.
        </p>

        <div className="cta-row content-animation">
          <SweepButton onClick={() => {/* join handler */}}>
            Join the community
          </SweepButton>
          <button className="btn-ghost">See upcoming meetups &rarr;</button>
        </div>
      </div>

      <div className="map-wrap">
        <MapSvg />
      </div>
    </section>
  );
});

export default DevOpsHero;
