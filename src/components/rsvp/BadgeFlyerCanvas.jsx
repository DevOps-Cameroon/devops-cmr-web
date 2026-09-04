import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import cardFrontUrl from '@/assets/images/card-front.png';

// ── Canvas dimensions ────────────────────────────────────────────────────────
// card-front.png is 585×888 — rendered at exactly 2× for sharp output
const W = 1170;
const H = 1776;

const ACCENT = '#3ddc84';
const WHITE  = '#ffffff';

// ── Helpers ──────────────────────────────────────────────────────────────────

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!src.startsWith('data:')) img.crossOrigin = 'anonymous';
    img.onload  = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load: ${src}`));
    img.src = src;
  });
}

/** Break text into lines that fit within maxWidth. */
function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/** Draw wrapped left-aligned text; returns total pixel height consumed. */
function drawWrapped(ctx, text, x, y, maxWidth, lineHeight) {
  const lines = wrapText(ctx, text, maxWidth);
  lines.forEach((line, i) => ctx.fillText(line, x, y + i * lineHeight));
  return lines.length * lineHeight;
}

// ── Main draw ────────────────────────────────────────────────────────────────

async function drawFlyer(canvas, { name, title, date, location }) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Dark safety fill, then card-front as full-bleed background
  ctx.fillStyle = '#0a0e0c';
  ctx.fillRect(0, 0, W, H);

  const bg = await loadImage(cardFrontUrl);
  // card-front is 585×888; canvas is exactly 2× that, so this is pixel-perfect
  ctx.drawImage(bg, 0, 0, W, H);

  // ── Layout constants (all % of canvas, derived from the reference image) ──
  const PAD_LEFT   = Math.round(W * 0.068);  // ~80px  — left margin
  const TEXT_MAX_W = Math.round(W * 0.56);   // stay within left 56%; right side is decorative

  // 2a. "I WILL BE ATTENDING" label — small, dimmed, above the title
  const labelFontSize = Math.round(W * 0.028);  // ~33px
  const labelY        = Math.round(H * 0.138);  // just above title

  ctx.font         = `500 ${labelFontSize}px "JetBrains Mono", monospace`;
  ctx.fillStyle    = 'rgba(255,255,255,0.5)';
  ctx.textAlign    = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('I WILL BE ATTENDING', PAD_LEFT, labelY);

  // 2b. Event title — white, top-left, shifted down to sit below the label
  const titleFontSize = titleFontPx(title.length);
  const titleLineH    = Math.round(titleFontSize * 1.18);
  const titleY        = labelY + labelFontSize + Math.round(H * 0.014);

  ctx.font         = `800 ${titleFontSize}px "Geist", sans-serif`;
  ctx.fillStyle    = WHITE;
  ctx.textAlign    = 'left';
  ctx.textBaseline = 'top';
  drawWrapped(ctx, title, PAD_LEFT, titleY, TEXT_MAX_W, titleLineH);

  // 3. Date — white, top-right, ~y=7.8%
  // Reference: "21 NOV 2026" right-aligned at ~x=92%
  const dateFontSize = Math.round(W * 0.038);
  const dateX        = Math.round(W * 0.92);
  const dateY        = Math.round(H * 0.078);

  ctx.font         = `600 ${dateFontSize}px "JetBrains Mono", monospace`;
  ctx.fillStyle    = WHITE;
  ctx.textAlign    = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText(date, dateX, dateY);

  // 4. Attendee name — large green, middle-left, ~y=60.5%
  // Reference: name occupies roughly y=60–72%, left-aligned
  const nameFontSize = nameFontPx(name.length);
  const nameLineH    = Math.round(nameFontSize * 1.1);
  const nameY        = Math.round(H * 0.605);

  ctx.font         = `800 ${nameFontSize}px "Geist", sans-serif`;
  ctx.fillStyle    = ACCENT;
  ctx.textAlign    = 'left';
  ctx.textBaseline = 'top';
  drawWrapped(ctx, name, PAD_LEFT, nameY, TEXT_MAX_W, nameLineH);

  // 5. Location — small white monospace, bottom-left, ~y=83.2%
  // Reference: "DOUALA POLYTECHNIC, CAMEROON" at roughly y=82–86%
  const locFontSize = Math.round(W * 0.033);
  const locLineH    = Math.round(locFontSize * 1.45);
  const locY        = Math.round(H * 0.832);

  ctx.font         = `500 ${locFontSize}px "JetBrains Mono", monospace`;
  ctx.fillStyle    = WHITE;
  ctx.textAlign    = 'left';
  ctx.textBaseline = 'top';
  drawWrapped(ctx, location, PAD_LEFT, locY, TEXT_MAX_W, locLineH);
}

// ── Font-size helpers ─────────────────────────────────────────────────────────

/** Event title: bold, scales with canvas width, shrinks for longer strings */
function titleFontPx(len) {
  const base = Math.round(W * 0.060); // ~70px at 1170
  if (len <= 18) return base;
  if (len <= 28) return Math.round(base * 0.82);
  if (len <= 40) return Math.round(base * 0.68);
  return Math.round(base * 0.56);
}

/** Attendee name: large, shrinks gracefully for long names */
function nameFontPx(len) {
  const base = Math.round(W * 0.112); // ~131px at 1170
  if (len <= 10) return base;
  if (len <= 16) return Math.round(base * 0.86);
  if (len <= 22) return Math.round(base * 0.72);
  if (len <= 30) return Math.round(base * 0.60);
  return Math.round(base * 0.50);
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * BadgeFlyerCanvas — off-screen canvas that renders a shareable badge flyer.
 *
 * Ref exposes:
 *   generateBlob(type?, quality?)    → Promise<Blob>
 *   generateDataURL(type?, quality?) → string
 */
const BadgeFlyerCanvas = forwardRef(function BadgeFlyerCanvas(
  { event, attendeeName },
  ref,
) {
  const canvasRef = useRef(null);

  const flyerData = {
    name:     attendeeName.toUpperCase(),
    title:    event.title.toUpperCase(),
    date:     new Date(event.dateISO)
                .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                .toUpperCase(),
    location: event.venue.toUpperCase(),
  };

  useImperativeHandle(ref, () => ({
    generateBlob: (type = 'image/png', quality = 0.95) =>
      new Promise((resolve) => canvasRef.current?.toBlob(resolve, type, quality)),
    generateDataURL: (type = 'image/png', quality = 0.95) =>
      canvasRef.current?.toDataURL(type, quality),
  }));

  useEffect(() => {
    if (!canvasRef.current) return;
    drawFlyer(canvasRef.current, flyerData).catch(console.warn);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendeeName, event.title, event.dateISO, event.venue]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      aria-hidden="true"
      style={{
        position:      'absolute',
        left:          '-9999px',
        top:           '-9999px',
        pointerEvents: 'none',
      }}
    />
  );
});

export default BadgeFlyerCanvas;
