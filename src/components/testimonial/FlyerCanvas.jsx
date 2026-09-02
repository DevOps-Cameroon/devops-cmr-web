import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { wrapText } from '@/lib/canvasText';

const W = 1080;
const H = 1080;
const ACCENT = '#3ddc84';
const FLYER_BG = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80';
const WHITE = '#ffffff';

const FlyerCanvas = forwardRef(function FlyerCanvas({ name, takeaway, photoUrl, event }, ref) {
  const canvasRef = useRef(null);

  useImperativeHandle(ref, () => ({
    toBlob: (type = 'image/png', quality = 0.95) =>
      new Promise((resolve) => {
        canvasRef.current?.toBlob(resolve, type, quality);
      }),
    toDataURL: (type = 'image/png', quality = 0.95) =>
      canvasRef.current?.toDataURL(type, quality),
  }));

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    let cancelled = false;

    async function draw() {
      if (cancelled) return;

      ctx.clearRect(0, 0, W, H);

      // ── Fallback accent background ──
      ctx.fillStyle = ACCENT;
      ctx.fillRect(0, 0, W, H);

      // ── Background ──
      const bgImg = await loadImage(FLYER_BG);
      if (cancelled) return;

      ctx.drawImage(bgImg, 0, 0, W, H);

      // Dark overlay gradient
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, 'rgba(10,14,12,0.82)');
      grad.addColorStop(0.5, 'rgba(10,14,12,0.7)');
      grad.addColorStop(1, 'rgba(10,14,12,0.92)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // ── Accent strip top ──
      ctx.fillStyle = ACCENT;
      ctx.fillRect(0, 0, W, 6);

      // ── "I attended" label ──
      ctx.font = '600 28px "JetBrains Mono", monospace';
      ctx.fillStyle = ACCENT;
      ctx.textAlign = 'center';
      ctx.fillText('I ATTENDED', W / 2, 140);

      // ── Event title ──
      ctx.font = '800 64px Poppins, sans-serif';
      ctx.fillStyle = WHITE;
      const titleLines = wrapText(ctx, event.title, W - 200);
      titleLines.forEach((line, i) => {
        ctx.fillText(line, W / 2, 210 + i * 78);
      });
      const titleEndY = 210 + titleLines.length * 78;

      // ── Event tag ──
      ctx.font = '500 24px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillText(event.tag, W / 2, titleEndY + 30);

      // ── Divider line ──
      const divY = titleEndY + 70;
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(W / 2 - 100, divY);
      ctx.lineTo(W / 2 + 100, divY);
      ctx.stroke();

      // ── Profile photo (circular, centered) ──
      const photoSize = 180;
      const photoCx = W / 2;
      const photoCy = divY + 40 + photoSize / 2;

      // Accent ring
      ctx.beginPath();
      ctx.arc(photoCx, photoCy, photoSize / 2 + 6, 0, Math.PI * 2);
      ctx.fillStyle = ACCENT;
      ctx.fill();

      if (photoUrl) {
        const profileImg = await loadImage(photoUrl);
        if (cancelled) return;

        ctx.save();
        ctx.beginPath();
        ctx.arc(photoCx, photoCy, photoSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(profileImg, photoCx - photoSize / 2, photoCy - photoSize / 2, photoSize, photoSize);
        ctx.restore();
      } else {
        // WhatsApp-style placeholder silhouette
        ctx.save();
        ctx.beginPath();
        ctx.arc(photoCx, photoCy, photoSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillStyle = '#d9dde0';
        ctx.fillRect(photoCx - photoSize / 2, photoCy - photoSize / 2, photoSize, photoSize);
        const r = photoSize / 2;
        // head
        ctx.fillStyle = '#9aa0a6';
        ctx.beginPath();
        ctx.arc(photoCx, photoCy - r * 0.22, r * 0.32, 0, Math.PI * 2);
        ctx.fill();
        // shoulders
        ctx.beginPath();
        ctx.ellipse(photoCx, photoCy + r * 0.68, r * 0.58, r * 0.42, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ── Takeaway section (centered, below photo) ──
      const takeawayTop = photoCy + photoSize / 2 + 55;
      const quoteMaxW = 680;

      // Opening big quote
      ctx.font = '800 120px Poppins, sans-serif';
      ctx.fillStyle = ACCENT;
      ctx.textAlign = 'left';
      ctx.fillText('\u201C', 100, takeawayTop + 60);

      // Takeaway text
      ctx.font = '400 32px Poppins, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.textAlign = 'center';
      const takeawayLines = wrapText(ctx, takeaway, quoteMaxW);
      const lineHeight = 48;
      const textStartY = takeawayTop + 80;
      takeawayLines.forEach((line, i) => {
        ctx.fillText(line, W / 2, textStartY + i * lineHeight);
      });
      const textEndY = textStartY + takeawayLines.length * lineHeight;

      // Closing big quote
      ctx.font = '800 120px Poppins, sans-serif';
      ctx.fillStyle = ACCENT;
      ctx.textAlign = 'right';
      ctx.fillText('\u201D', W - 100, textEndY + 30);

      // "by [name]" at bottom right of takeaway
      ctx.font = '500 26px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.textAlign = 'right';
      ctx.fillText(`by ${name}`, W - 100, textEndY + 80);

      // ── Bottom branding ──
      const bottomY = H - 60;

      // Accent strip bottom
      ctx.fillStyle = ACCENT;
      ctx.fillRect(0, H - 6, W, 6);

      ctx.font = '600 22px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.textAlign = 'center';
      ctx.fillText('DEVOPS CAMEROON', W / 2, bottomY);

      ctx.font = '400 18px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.fillText(event.dateLabel + ' · ' + event.venue, W / 2, bottomY + 30);
    }

    draw();

    return () => { cancelled = true; };
  }, [name, takeaway, photoUrl, event]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className="h-auto w-full max-w-[540px] border border-white/10"
      style={{ imageRendering: 'auto' }}
    />
  );
});

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!src.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

export default FlyerCanvas;
