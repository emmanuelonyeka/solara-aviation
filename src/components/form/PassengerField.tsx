import { Minus, Plus } from 'lucide-react';

interface PassengerFieldProps {
  id: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  invalid?: boolean;
  describedBy?: string;
  className: string;
}

export default function PassengerField({ id, value, min, max, onChange, invalid = false, describedBy, className }: PassengerFieldProps) {
  const update = (amount: -1 | 1) => onChange(Math.min(max, Math.max(min, value + amount)));

  return (
    <div className={[className, 'flex min-h-11 items-stretch overflow-hidden !p-0'].join(' ')}>
      <button type="button" onClick={() => update(-1)} disabled={value <= min} aria-label="Remove one passenger" className="grid w-[clamp(2.75rem,6vw,3.25rem)] shrink-0 place-items-center border-r border-white/10 text-white/55 transition-[background-color,color,opacity] duration-300 disabled:cursor-not-allowed disabled:opacity-25 active:opacity-60 hoverable:bg-white/[0.05] hoverable:text-white">
        <Minus size={18} strokeWidth={1.5} aria-hidden="true" />
      </button>

      <input id={id} name={id} type="text" inputMode="numeric" pattern="[0-9]*" role="spinbutton" aria-valuemin={min} aria-valuemax={max} aria-valuenow={value} required value={value} onChange={(event) => { const digits = event.target.value.replace(/\D/g, ''); if (digits) onChange(Math.min(max, Math.max(min, Number(digits)))); }} onKeyDown={(event) => { if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); update(event.key === 'ArrowUp' ? 1 : -1); } }} aria-invalid={invalid} aria-describedby={describedBy} className="min-w-0 flex-1 bg-transparent px-3 text-center font-sans text-[16px] tabular-nums text-white focus:outline-none" />

      <button type="button" onClick={() => update(1)} disabled={value >= max} aria-label="Add one passenger" className="grid w-[clamp(2.75rem,6vw,3.25rem)] shrink-0 place-items-center border-l border-white/10 text-white/55 transition-[background-color,color,opacity] duration-300 disabled:cursor-not-allowed disabled:opacity-25 active:opacity-60 hoverable:bg-white/[0.05] hoverable:text-white">
        <Plus size={18} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
  );
}