import { useRef, useCallback } from 'react';
import { Download, Copy, Check, Bookmark, BookmarkCheck } from 'lucide-react';
import { useState } from 'react';
import SweepButton from '@/components/ui/SweepButton';
import FlyerCanvas from './FlyerCanvas';

export default function FlyerPreview({ name, takeaway, photoUrl, event, onReset, onSave, saved }) {
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!canvasRef.current) return;
    const blob = await canvasRef.current.toBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devops-cameroon-testimonial-${name.replace(/\s+/g, '-').toLowerCase()}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, [name]);

  const handleCopyLink = useCallback(async () => {
    const url = `${window.location.origin}/events/${event.id}/testimonial`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }, [event.id]);

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <FlyerCanvas
          ref={canvasRef}
          key={photoUrl || 'no-photo'}
          name={name}
          takeaway={takeaway}
          photoUrl={photoUrl}
          event={event}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <SweepButton onClick={handleDownload} contentClassName="px-6 py-3">
          <Download className="mr-2 inline h-4 w-4" />
          Download PNG
        </SweepButton>

        <SweepButton variant="outline" onClick={handleCopyLink} className="border-line text-ink" contentClassName="px-6 py-3">
          {copied ? <Check className="mr-2 inline h-4 w-4" /> : <Copy className="mr-2 inline h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </SweepButton>

        <SweepButton
          variant="outline"
          onClick={onSave}
          disabled={saved}
          className={`border-line ${saved ? 'text-accent' : 'text-ink'}`}
          contentClassName="px-6 py-3"
        >
          {saved ? <BookmarkCheck className="mr-2 inline h-4 w-4" /> : <Bookmark className="mr-2 inline h-4 w-4" />}
          {saved ? 'Saved' : 'Save'}
        </SweepButton>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={onReset}
          className="font-mono text-xs font-bold uppercase tracking-widest text-ink-3 transition-colors hover:text-ink"
        >
          ← Create another
        </button>
      </div>
    </div>
  );
}
