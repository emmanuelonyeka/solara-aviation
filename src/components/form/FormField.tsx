import { useEffect, useRef, type ReactNode } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  /** Increment on every failed submit to replay the correction. */
  attempt?: number;
  hint?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Label, control and error, with the invalid-field correction.
 *
 * The motion is a damped horizontal settle rather than a shake: three
 * decreasing oscillations over half a second, small enough that it reads as
 * the field correcting itself rather than an alarm. Driven by the Web
 * Animations API because a CSS class only plays once, and the second failed
 * submit is when the prompt matters most.
 */
export default function FormField({
  id,
  label,
  optional = false,
  error,
  attempt = 0,
  hint,
  className = '',
  children,
}: FormFieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!error || attempt === 0) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    el.animate(
      [
        { transform: 'translate3d(0,0,0)' },
        { transform: 'translate3d(-5px,0,0)', offset: 0.15 },
        { transform: 'translate3d(4px,0,0)', offset: 0.35 },
        { transform: 'translate3d(-2.5px,0,0)', offset: 0.55 },
        { transform: 'translate3d(1.5px,0,0)', offset: 0.75 },
        { transform: 'translate3d(0,0,0)' },
      ],
      { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    );
  }, [attempt, error]);

  return (
    <div ref={ref} className={className}>
      <label
        htmlFor={id}
        className={`block text-micro font-sans uppercase transition-colors duration-500 ease-lux ${
          error ? 'text-red-300/80' : 'text-white/50'
        }`}
      >
        {label}
        {optional && <span className="ml-2 normal-case tracking-normal text-white/25">optional</span>}
      </label>

      {children}

      {hint && !error && (
        <p
          id={`${id}-hint`}
          className="mt-2 font-sans text-[0.72rem] leading-relaxed text-white/30"
        >
          {hint}
        </p>
      )}

      {/* Held in the layout and revealed by height, so nothing below jumps. */}
      <div
        className={`grid transition-all duration-500 ease-lux ${
          error ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p
            id={`${id}-error`}
            role="alert"
            className={`flex items-baseline gap-2 font-sans text-[0.72rem] leading-relaxed text-red-300/85 transition-transform duration-500 ease-lux ${
              error ? 'translate-y-0' : '-translate-y-1'
            }`}
          >
            <span aria-hidden="true" className="mt-[0.4em] h-px w-2.5 flex-none bg-red-300/60" />
            {error}
          </p>
        </div>
      </div>
    </div>
  );
}
