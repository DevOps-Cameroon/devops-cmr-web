import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import svgMarkup from '@/assets/cameroon-map.svg?raw';

const MapSvg = () => {
  const ref = useRef(null);

  useEffect(() => {
    let tl = null;
    let mounted = true;

    function animate() {
      const container = ref.current;
      if (!container) return;

      try {
        // inject the SVG markup into the container
        container.innerHTML = svgMarkup;
        const svgNode = container.querySelector('svg');
        if (!svgNode) return;

        // ensure clip rect is expanded if animate isn't present
        const clipRect = svgNode.querySelector('#reveal-rect');
        if (clipRect) clipRect.setAttribute('height', '1250');

        // set responsive attributes
        svgNode.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svgNode.style.width = '100%';
        svgNode.style.height = 'auto';

        // remove outline filter and group fill so paths render as single-line strokes
        const groups = Array.from(svgNode.querySelectorAll('g'));
        groups.forEach((g) => {
          try {
            if (g.hasAttribute('filter')) g.removeAttribute('filter');
            if (g.hasAttribute('fill')) g.setAttribute('fill', 'none');
          } catch (e) {}
        });

        // collect paths
        const paths = Array.from(svgNode.querySelectorAll('path'));

        // normalize: single-line look
        paths.forEach((p) => {
          try {
            p.style.fill = 'none';
            p.style.stroke = 'var(--accent)';
            p.style.strokeWidth = '1.6';
            p.style.strokeLinecap = 'round';
            p.style.strokeLinejoin = 'round';
            p.style.filter = 'none';
          } catch (e) {}
        });

        tl = gsap.timeline();

        paths.forEach((p, i) => {
          try {
            const len = p.getTotalLength();
            p.style.strokeDasharray = len;
            p.style.strokeDashoffset = len;
            tl.to(p, { strokeDashoffset: 0, duration: 0.9, ease: 'power1.out' }, i * 0.02);
          } catch (e) {}
        });

        const longest = paths.reduce((best, cur) => {
          try {
            const l = cur.getTotalLength();
            return !best || l > best.len ? { el: cur, len: l } : best;
          } catch (e) {
            return best;
          }
        }, null);

        if (longest && longest.el) {
          const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          dot.setAttribute('r', '4');
          dot.setAttribute('fill', 'var(--accent)');
          dot.setAttribute('class', 'map-travel-dot');
          svgNode.appendChild(dot);

          tl.call(() => {
            const path = longest.el;
            const len = longest.len;
            const head = { t: 0 };
            gsap.to(head, {
              t: 1,
              duration: Math.max(2.5, Math.min(6, len / 200)),
              ease: 'power1.inOut',
              onUpdate: () => {
                try {
                  const pt = path.getPointAtLength(head.t * len);
                  dot.setAttribute('cx', String(pt.x));
                  dot.setAttribute('cy', String(pt.y));
                } catch (e) {}
              },
            });
          });
        }
      } catch (e) {
        // ignore
      }
    }

    animate();

    return () => {
      mounted = false;
      if (tl && tl.kill) tl.kill();
    };
  }, []);

  return <div ref={ref} className="map-svg" aria-hidden="true"></div>;
};

export default MapSvg;
