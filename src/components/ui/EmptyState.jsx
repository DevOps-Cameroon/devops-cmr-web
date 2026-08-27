import { Link } from "react-router-dom";

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  className = "",
}) {
  const Action = actionTo ? Link : "button";
  const actionProps = actionTo
    ? { to: actionTo }
    : { type: "button", onClick: onAction };

  return (
    <div
      role="status"
      className={`border border-dashed border-line-strong bg-surface px-6 py-12 text-center sm:px-10 ${className}`}
    >
      <span
        aria-hidden="true"
        className="mx-auto mb-5 flex h-10 w-10 items-center justify-center bg-accent font-mono text-lg font-bold text-accent-ink"
      >
        —
      </span>
      <h3 className="font-sans text-xl font-bold uppercase leading-tight tracking-tight text-ink">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-[460px] text-sm leading-relaxed text-ink-2">
        {description}
      </p>
      {actionLabel && (
        <Action
          {...actionProps}
          className="mt-6 inline-flex items-center justify-center border border-ink bg-ink px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {actionLabel}
        </Action>
      )}
    </div>
  );
}
