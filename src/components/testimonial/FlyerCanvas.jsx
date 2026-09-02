import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { wrapText } from '@/lib/canvasText';

const W = 1080;
const H = 1080;
const ACCENT = '#3ddc84';
const INK = '#111827';
const SURFACE = '#1a1f1c';
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

      // ── Background ──
      const bgImg = await loadImage(event.img);
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
      ctx.textAlign = 'left';
      ctx.fillText('I ATTENDED', 72, 140);

      // ── Event title ──
      ctx.font = '800 64px Poppins, sans-serif';
      ctx.fillStyle = WHITE;
      const titleLines = wrapText(ctx, event.title, W - 144);
      titleLines.forEach((line, i) => {
        ctx.fillText(line, 72, 210 + i * 78);
      });
      const titleEndY = 210 + titleLines.length * 78;

      // ── Event tag ──
      ctx.font = '500 24px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillText(event.tag, 72, titleEndY + 30);

      // ── Divider line ──
      const divY = titleEndY + 70;
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(72, divY);
      ctx.lineTo(280, divY);
      ctx.stroke();

      // ── Profile photo (circular) ──
      const photoSize = 180;
      const photoX = 72;
      const photoY = divY + 40;

      if (photoUrl) {
        const profileImg = await loadImage(photoUrl);
        if (cancelled) return;

        // Accent ring
        ctx.beginPath();
        ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2 + 6, 0, Math.PI * 2);
        ctx.fillStyle = ACCENT;
        ctx.fill();

        // Circular clip for photo
        ctx.save();
        ctx.beginPath();
        ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(profileImg, photoX, photoY, photoSize, photoSize);
        ctx.restore();
      }

      // ── Name (next to photo) ──
      const nameX = photoUrl ? photoX + photoSize + 30 : photoX;
      const nameY = photoY + photoSize / 2 + 8;
      ctx.font = '700 36px Poppins, sans-serif';
      ctx.fillStyle = WHITE;
      ctx.textAlign = 'left';
      ctx.fillText(name, nameX, nameY);

      // ── "My biggest takeaway" card ──
      const cardX = 72;
      const cardY = photoY + photoSize + 50;
      const cardW = W - 144;
      const cardPad = 40;

      // Takeaway text height estimation
      ctx.font = '400 30px Poppins, sans-serif';
      const takeawayLines = wrapText(ctx, takeaway, cardW - cardPad * 2);
      const takeawayTextHeight = takeawayLines.length * 44;
      const cardH = cardPad + 50 + takeawayTextHeight + cardPad + 60;

      // Card background
      ctx.fillStyle = SURFACE;
      ctx.fillRect(cardX, cardY, cardW, cardH);

      // Accent left border
      ctx.fillStyle = ACCENT;
      ctx.fillRect(cardX, cardY, 5, cardH);

      // Card heading
      ctx.font = '700 30px Poppins, sans-serif';
      ctx.fillStyle = WHITE;
      ctx.textAlign = 'left';
      ctx.fillText('My biggest takeaway', cardX + cardPad, cardY + cardPad + 30);

      // Takeaway text
      ctx.font = '400 30px Poppins, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      takeawayLines.forEach((line, i) => {
        ctx.fillText(line, cardX + cardPad, cardY + cardPad + 80 + i * 44);
      });

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
