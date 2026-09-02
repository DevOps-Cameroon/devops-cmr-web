import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Camera, X } from 'lucide-react';
import SweepButton from '@/components/ui/SweepButton';

const MAX_CHARS = 200;

const testimonialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  takeaway: z.string().min(10, 'Tell us at least a little about your experience').max(MAX_CHARS, `Takeaway must be ${MAX_CHARS} characters or less`),
});

function charCount(text) {
  return text.length;
}

const inputCls =
  'w-full rounded-none border border-line bg-surface px-4 py-3.5 text-[15px] text-ink outline-none transition-all placeholder:text-ink-3 focus:border-accent focus:ring-1 focus:ring-accent/30';

export default function TestimonialForm({ onSubmit }) {
  const fileRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: { name: '', takeaway: '' },
    mode: 'onChange',
  });

  const takeaway = watch('takeaway');
  const photo = watch('photo');
  const chars = charCount(takeaway || '');

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setValue('photo', reader.result, { shouldValidate: true });
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setValue('photo', null, { shouldValidate: true });
    if (fileRef.current) fileRef.current.value = '';
  };

  const onValid = (data) => {
    onSubmit({ name: data.name, takeaway: data.takeaway, photoUrl: photo || null });
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="space-y-6">
      <div>
        <label className="mb-2 block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-ink-2">
          Your Name
        </label>
        <input
          {...register('name')}
          placeholder="e.g. Achille Mballa"
          className={inputCls}
        />
        {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="mb-2 block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-ink-2">
          Your Takeaway
        </label>
        <textarea
          {...register('takeaway')}
          rows={6}
          placeholder="What did you learn or take away from the event?"
          className={`${inputCls} resize-none`}
        />
        <div className="mt-1.5 flex items-center justify-between">
          {errors.takeaway && <p className="text-xs text-red-500">{errors.takeaway.message}</p>}
          <span className={`ml-auto font-mono text-xs ${chars > MAX_CHARS ? 'text-red-500' : 'text-ink-3'}`}>
            {chars}/{MAX_CHARS}
          </span>
        </div>
      </div>

      <div>
        <label className="mb-2 block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-ink-2">
          Profile Photo
        </label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handlePhoto}
          className="hidden"
          id="photo-upload"
        />

        {photo ? (
          <div className="relative inline-flex items-center gap-3">
            <img
              src={photo}
              alt="Preview"
              className="h-16 w-16 rounded-full border-2 border-accent object-cover"
            />
            <span className="text-sm text-ink-2">Photo selected</span>
            <button
              type="button"
              onClick={removePhoto}
              className="ml-2 flex h-6 w-6 items-center justify-center text-ink-3 transition-colors hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-3 border border-dashed border-line px-5 py-4 transition-colors hover:border-accent/50 hover:bg-surface-2"
          >
            <Camera className="h-5 w-5 text-ink-3" />
            <span className="text-sm text-ink-3">Choose a profile photo</span>
          </button>
        )}
      </div>

      <SweepButton type="submit" className="w-full" contentClassName="px-8 py-3.5">
        Generate Flyer
      </SweepButton>
    </form>
  );
}
