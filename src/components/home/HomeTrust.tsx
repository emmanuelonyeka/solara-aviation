import type { ReactNode } from 'react';
import CountUp from '../shared/CountUp';
import { homeTrust, type TrustIcon as TrustIconName } from '../../data/home';

const TRUST_PATHS: Record<TrustIconName, ReactNode> = {
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
};

function TrustIcon({ name }: { name: TrustIconName }) {
  return (
    <svg className="mb-3 h-5 w-5 stroke-[#E3E3E3]" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {TRUST_PATHS[name]}
    </svg>
  );
}

/** Operating proof with one accessible reading of every animated figure. */
export default function HomeTrust() {
  return (
    <section className="relative z-10 bg-charcoal bg-[radial-gradient(circle_at_50%_0%,rgba(243,240,230,0.035),transparent_30rem)] px-[max(9vw,calc((100vw-90rem)/2))] py-[clamp(4.5rem,7vw,7rem)]" id="trust">
      <div className="anim-section relative overflow-hidden border border-white/[0.11] bg-[linear-gradient(155deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008))] p-[clamp(1.75rem,4vw,3.5rem)] shadow-[0_2rem_5rem_-3.5rem_rgba(0,0,0,0.9)]">
        <span className="pointer-events-none absolute inset-x-[12%] -top-px h-px bg-gradient-to-r from-transparent via-beige/70 to-transparent" aria-hidden="true" />
        <div className="grid grid-cols-2 gap-[clamp(1.25rem,3vw,3rem)] sm:grid-cols-6 lg:grid-cols-5">
          {homeTrust.map((item, index) => (
            <div className={`group relative flex min-w-0 flex-col items-center py-2 text-center last:col-span-2 sm:col-span-2 sm:last:col-span-2 lg:col-span-1 lg:last:col-span-1 ${index === 3 ? 'sm:col-start-2 lg:col-start-auto' : ''}`} key={item.label}>
              {index > 0 && <span className="pointer-events-none absolute -left-[calc(clamp(1.25rem,3vw,3rem)/2)] bottom-[8%] top-[8%] hidden w-px bg-white/[0.08] lg:block" aria-hidden="true" />}
              <TrustIcon name={item.icon} />
              <CountUp end={item.value} suffix={item.suffix} className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] font-medium leading-none tracking-[0.025em] text-white [font-variant-numeric:lining-nums_tabular-nums]" />
              <span className="mt-3 max-w-[15ch] text-[0.68rem] uppercase leading-[1.3] tracking-[0.1em] text-white/60 transition-colors duration-300 group-hoverable:text-white">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}