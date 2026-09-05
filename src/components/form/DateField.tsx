import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateFieldProps {
  id: string;
  value: string;
  min: string;
  max: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  required?: boolean;
  describedBy?: string;
  className: string;
}

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const monthFormatter = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });
const selectedDateFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const accessibleDateFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function toDateValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return [year, month, day].join('-');
}

function fromDateValue(value: string): Date | null {
  if (!ISO_DATE_PATTERN.test(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return toDateValue(date) === value ? date : null;
}

function monthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function clampDateValue(value: string, min: string, max: string): string {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function getMonthFocusValue(month: Date, min: string, max: string): string {
  return clampDateValue(toDateValue(monthStart(month)), min, max);
}

export default function DateField({
  id,
  value,
  min,
  max,
  onChange,
  invalid = false,
  required = false,
  describedBy,
  className,
}: DateFieldProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => monthStart(fromDateValue(value) ?? fromDateValue(min) ?? new Date()));
  const [focusedValue, setFocusedValue] = useState(() => clampDateValue(value || min, min, max));
  const calendarId = id + '-calendar';
  const selectedDate = fromDateValue(value);
  const minDate = fromDateValue(min) ?? new Date();
  const maxDate = fromDateValue(max) ?? minDate;
  const minMonthTime = monthStart(minDate).getTime();
  const maxMonthTime = monthStart(maxDate).getTime();
  const displayedMonthTime = monthStart(visibleMonth).getTime();
  const canGoPrevious = displayedMonthTime > minMonthTime;
  const canGoNext = displayedMonthTime < maxMonthTime;

  const days = useMemo(() => {
    const first = monthStart(visibleMonth);
    const mondayOffset = (first.getDay() + 6) % 7;
    const gridStart = addDays(first, -mondayOffset);
    const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    const cellCount = Math.max(35, Math.ceil((mondayOffset + daysInMonth) / 7) * 7);
    return Array.from({ length: cellCount }, (_, index) => addDays(gridStart, index));
  }, [visibleMonth]);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (event.target instanceof Node && !wrapperRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener('pointerdown', closeOnOutsidePress);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      const selector = 'button[data-date="' + focusedValue + '"]';
      wrapperRef.current?.querySelector<HTMLButtonElement>(selector)?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [focusedValue, open, visibleMonth]);

  const openCalendar = () => {
    const nextFocus = clampDateValue(value || min, min, max);
    setFocusedValue(nextFocus);
    setVisibleMonth(monthStart(fromDateValue(nextFocus) ?? minDate));
    setOpen(true);
  };

  const selectDate = (nextValue: string) => {
    if (nextValue < min || nextValue > max) return;
    onChange(nextValue);
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const focusDate = (nextValue: string) => {
    const clamped = clampDateValue(nextValue, min, max);
    const nextDate = fromDateValue(clamped);
    if (!nextDate) return;
    setFocusedValue(clamped);
    setVisibleMonth(monthStart(nextDate));
  };

  const handleDayKeyDown = (event: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    let nextDate: Date | null = null;

    if (event.key === 'ArrowLeft') nextDate = addDays(date, -1);
    if (event.key === 'ArrowRight') nextDate = addDays(date, 1);
    if (event.key === 'ArrowUp') nextDate = addDays(date, -7);
    if (event.key === 'ArrowDown') nextDate = addDays(date, 7);
    if (event.key === 'Home') nextDate = addDays(date, -((date.getDay() + 6) % 7));
    if (event.key === 'End') nextDate = addDays(date, 6 - ((date.getDay() + 6) % 7));
    if (event.key === 'PageUp') nextDate = addMonths(date, -1);
    if (event.key === 'PageDown') nextDate = addMonths(date, 1);
    if (!nextDate) return;

    event.preventDefault();
    focusDate(toDateValue(nextDate));
  };

  const changeMonth = (amount: -1 | 1) => {
    const nextMonth = addMonths(visibleMonth, amount);
    setVisibleMonth(nextMonth);
    setFocusedValue(getMonthFocusValue(nextMonth, min, max));
  };

  return (
    <div ref={wrapperRef} className="relative">
      <input type="hidden" name={id} value={value} />
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={calendarId}
        aria-required={required}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => {
          if (open) setOpen(false);
          else openCalendar();
        }}
        className={[className, 'flex items-center justify-between gap-4 text-left'].join(' ')}
      >
        <span className={value ? 'text-white' : 'text-white/25'}>
          {selectedDate ? selectedDateFormatter.format(selectedDate) : 'Select a date'}
        </span>
        <CalendarDays size={17} strokeWidth={1.5} className="shrink-0 text-beige/75" aria-hidden="true" />
      </button>

      {open && (
        <div
          id={calendarId}
          role="dialog"
          aria-modal="false"
          aria-label="Choose a date"
          className="relative mt-3 w-full max-w-[30rem] border border-white/15 bg-[#121317] p-[clamp(0.85rem,2vw,1.1rem)] shadow-[0_24px_70px_rgba(0,0,0,0.42)]"
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              disabled={!canGoPrevious}
              aria-label="Show previous month"
              className="grid size-9 place-items-center border border-white/10 text-white/65 transition-[border-color,color,transform] duration-300 disabled:cursor-not-allowed disabled:opacity-25 active:scale-[0.96] hoverable:border-beige/45 hoverable:text-white"
            >
              <ChevronLeft size={17} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <p className="font-serif text-[1.05rem] text-white" aria-live="polite">
              {monthFormatter.format(visibleMonth)}
            </p>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              disabled={!canGoNext}
              aria-label="Show next month"
              className="grid size-9 place-items-center border border-white/10 text-white/65 transition-[border-color,color,transform] duration-300 disabled:cursor-not-allowed disabled:opacity-25 active:scale-[0.96] hoverable:border-beige/45 hoverable:text-white"
            >
              <ChevronRight size={17} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7" aria-hidden="true">
            {WEEKDAYS.map((weekday) => (
              <span key={weekday} className="py-2 text-center font-sans text-[0.625rem] uppercase tracking-[0.12em] text-white/35">
                {weekday}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px">
            {days.map((date) => {
              const dateValue = toDateValue(date);
              const outsideMonth = date.getMonth() !== visibleMonth.getMonth();
              const disabled = outsideMonth || dateValue < min || dateValue > max;
              const selected = dateValue === value;
              const today = dateValue === toDateValue(new Date());

              return (
                <button
                  key={dateValue}
                  type="button"
                  data-date={dateValue}
                  disabled={disabled}
                  tabIndex={dateValue === focusedValue && !disabled ? 0 : -1}
                  aria-label={`${accessibleDateFormatter.format(date)}${disabled ? ', unavailable' : selected ? ', selected' : ''}`}
                  aria-pressed={selected}
                  aria-current={today ? 'date' : undefined}
                  onClick={() => selectDate(dateValue)}
                  onKeyDown={(event) => handleDayKeyDown(event, date)}
                  className={[
                    'grid h-[clamp(2.35rem,4vw,3rem)] place-items-center font-sans text-[0.75rem] transition-[background-color,color,opacity] duration-300 active:opacity-60 disabled:cursor-not-allowed',
                    outsideMonth ? 'text-white opacity-[0.08]' : '',
                    disabled && !outsideMonth ? 'text-white opacity-20' : '',
                    !disabled && !selected ? 'text-white/65 hoverable:bg-white/[0.07] hoverable:text-white' : '',
                    today && !disabled && !selected ? 'ring-1 ring-inset ring-beige/45 text-beige' : '',
                    selected ? 'bg-beige !text-charcoal opacity-100' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <p className="mt-4 border-t border-white/[0.08] pt-3 font-sans text-[0.6875rem] leading-relaxed text-white/35">
            Tomorrow is the first available date. Dimmed dates are unavailable; requests can be made up to six months ahead.
          </p>
        </div>
      )}
    </div>
  );
}