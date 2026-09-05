import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { airports, type Airport } from '../../data/airports';
import { FORM_INPUT_CLASS } from '../../lib/forms';

interface AirportFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  /** Excluded from the list — you cannot fly a city to itself. */
  exclude?: string;
}

/**
 * Airport picker with a suggestion list.
 *
 * The panel is fully opaque: at 90-odd percent the page copy reads straight
 * through a dropdown and the whole control looks broken. It is also rendered
 * only while open, so it can never intercept a tap on the field beneath it.
 */
export default function AirportField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder = 'City or airport code',
  required = false,
  exclude,
}: AirportFieldProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', onDown);

    return () => {
      document.removeEventListener('pointerdown', onDown);
    };
  }, []);

  const term = value.trim().toLowerCase();

  const excludedCode =
    exclude?.match(/\(([A-Z0-9]{3,4})\)$/)?.[1] ??
    exclude?.trim().toUpperCase();

  const matches: Airport[] = term
    ? airports
        .filter((airport) => airport.code !== excludedCode)
        .filter(
          (airport) =>
            airport.city.toLowerCase().includes(term) ||
            airport.code.toLowerCase().includes(term) ||
            airport.name.toLowerCase().includes(term),
        )
        .slice(0, 6)
    : [];

  const listboxId = `${id}-listbox`;
  const listVisible = open && term.length > 0;

  const safeActiveIndex =
    matches.length > 0
      ? Math.min(activeIndex, matches.length - 1)
      : -1;

  const select = (airport: Airport) => {
    const airportLabel = `${airport.city} (${airport.code})`;

    onChange(airportLabel);
    setOpen(false);
    setActiveIndex(-1);
  };

  const onKeyDown = (
    event: ReactKeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);

      setActiveIndex((current) => {
        if (matches.length === 0) return -1;

        if (event.key === 'ArrowDown') {
          return current >= matches.length - 1 ? 0 : current + 1;
        }

        return current <= 0 ? matches.length - 1 : current - 1;
      });

      return;
    }

    if (
      event.key === 'Enter' &&
      listVisible &&
      safeActiveIndex >= 0
    ) {
      event.preventDefault();
      select(matches[safeActiveIndex]);
      return;
    }

    if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <label
        htmlFor={id}
        className="block text-micro font-sans uppercase text-white/50"
      >
        {label}
      </label>

      <input
        id={id}
        name={id}
        value={value}
        required={required}
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={listVisible}
        aria-controls={listVisible ? listboxId : undefined}
        aria-activedescendant={
          listVisible && safeActiveIndex >= 0
            ? `${id}-option-${matches[safeActiveIndex].code}`
            : undefined
        }
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
          setActiveIndex(0);
        }}
        onFocus={() => {
          setOpen(true);
          setActiveIndex(matches.length > 0 ? 0 : -1);
        }}
        onBlur={() => {
          setOpen(false);
          setActiveIndex(-1);
        }}
        onKeyDown={onKeyDown}
        className={`${FORM_INPUT_CLASS} ${
          error
            ? 'border-red-400/60'
            : 'border-white/15 focus:border-beige/60'
        }`}
      />

      {listVisible && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={`${label} suggestions`}
          className="absolute inset-x-0 top-full z-30 mt-1 max-h-64 overflow-y-auto border border-white/12 bg-[#121317] shadow-2xl shadow-black/60"
        >
          {matches.length > 0 ? (
            matches.map((airport, index) => (
              <li
                id={`${id}-option-${airport.code}`}
                key={airport.code}
                role="option"
                aria-selected={index === safeActiveIndex}
                onPointerDown={(event) => event.preventDefault()}
                onPointerEnter={() => setActiveIndex(index)}
                onClick={() => select(airport)}
                className={`flex cursor-pointer items-baseline justify-between gap-4 border-b border-white/[0.06] px-4 py-3 text-left transition-colors duration-300 last:border-b-0 active:bg-white/[0.06] ${
                  index === safeActiveIndex
                    ? 'bg-white/[0.05]'
                    : 'hoverable:bg-white/[0.05]'
                }`}
              >
                <span className="font-sans text-body text-white">
                  {airport.city}
                </span>
                <span className="text-micro font-sans tabular-nums text-white/40">
                  {airport.code}
                </span>
              </li>
            ))
          ) : (
            <li
              role="option"
              aria-disabled="true"
              className="px-4 py-3 font-sans text-body text-white/45"
            >
              No listed match — you can keep this airport as entered.
            </li>
          )}
        </ul>
      )}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 font-sans text-body text-red-300/90"
        >
          {error}
        </p>
      )}
    </div>
  );
}