import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MapSvg = () => {
  const ref = useRef(null);

  useEffect(() => {
    let tl = null;
    let mounted = true;

    async function loadAndAnimate() {
      const container = ref.current;
      if (!container) return;

      try {
        const resp = await fetch('/devops-cameroon.html');
        if (!resp.ok) return;
        const html = await resp.text();
        console.debug('MapSvg: loaded HTML length', html.length);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const svg = doc.querySelector('svg.map-svg');
        console.debug('MapSvg: svg found in parsed HTML?', !!svg);
        if (!svg) return;

        // clone the verbatim SVG from the HTML file and insert it
        const svgNode = svg.cloneNode(true);

        // clear container and append
        container.innerHTML = '';
        container.appendChild(svgNode);

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
            tl.to(p, { strokeDashoffset: 0, duration: 1.8, ease: 'power1.out' }, i * 0.06);
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

    loadAndAnimate();

    return () => {
      mounted = false;
      if (tl && tl.kill) tl.kill();
    };
  }, []);

  return <div ref={ref} className="map-svg" aria-hidden="true"></div>;
};

export default MapSvg;
