import React from 'react';

/**
 * A button with a green sweep-fill hover effect.
 * The label sits in two layers: a white one underneath, and a black
 * copy inside the growing overlay — so text appears to turn black
 * exactly as the sweep passes over it.
 */
const SweepButton = React.forwardRef(function SweepButton(
  { children, as: Tag = 'button', className = '', overlayClassName = '', variant = 'solid', ...rest },
  ref
) {
  const isOutline = variant === 'outline';

  return (
    <Tag
      ref={ref}
      className={`btn-sweep ${isOutline ? 'btn-outline' : 'btn-primary border-none'} group relative z-1 overflow-hidden rounded-none cursor-pointer ${className}`}
      {...rest}
    >
      <span
        className={`btn-overlay pointer-events-none absolute inset-y-0 left-0 z-2 w-0 overflow-hidden bg-accent transition-[width] duration-[420ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:w-full ${overlayClassName}`}
        aria-hidden="true"
      >
        <span className="label-overlay absolute left-0 top-0 flex h-full items-center whitespace-nowrap px-[1.7rem] py-[0.85rem] text-ink">
          {children}
        </span>
      </span>

      <span className={`label-default relative z-1 block whitespace-nowrap px-[1.7rem] py-[0.85rem] ${isOutline ? 'text-ink' : 'text-white'}`}>
        {children}
      </span>
    </Tag>
  );
});

export default SweepButton;
