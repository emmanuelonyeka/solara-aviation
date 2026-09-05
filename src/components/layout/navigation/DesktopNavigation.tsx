import {
  useEffect,
  useRef,
  useState,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Link } from 'react-router-dom';
import {
  isNavigationGroup,
  isPathActive,
  navigationId,
  primaryNavigation,
  type NavigationLink,
} from '../../../config/navigation';
import { cta } from '../../../config/site';

interface DesktopNavigationProps {
  pathname: string;
  drawerOpen: boolean;
}

const MENU_NAVIGATION_KEYS = new Set(['ArrowDown', 'ArrowUp', 'Home', 'End']);

export default function DesktopNavigation({ pathname, drawerOpen }: DesktopNavigationProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setOpenMenu(null));
    return () => window.cancelAnimationFrame(frame);
  }, [drawerOpen, pathname]);

  useEffect(() => {
    if (!openMenu) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      const trigger = document.getElementById(`${navigationId('desktop', openMenu)}-trigger`);
      setOpenMenu(null);
      trigger?.focus();
    };

    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [openMenu]);

  const isCurrent = (to: string) => isPathActive(pathname, to);
  const isGroupCurrent = (children: readonly NavigationLink[]) =>
    children.some((child) => isCurrent(child.to));

  const hoverProps = (label: string) => ({
    onPointerEnter: (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType === 'mouse') setOpenMenu(label);
    },
    onPointerLeave: (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType === 'mouse') setOpenMenu(null);
    },
    onBlur: (event: ReactFocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenMenu(null);
    },
  });

  const moveMenuFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!MENU_NAVIGATION_KEYS.has(event.key)) return;

    const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>('a[href]'));
    if (links.length === 0) return;

    event.preventDefault();

    const currentIndex = links.indexOf(document.activeElement as HTMLAnchorElement);
    let nextIndex = currentIndex;

    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = links.length - 1;
    if (event.key === 'ArrowDown') nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % links.length;
    if (event.key === 'ArrowUp') nextIndex = currentIndex <= 0 ? links.length - 1 : currentIndex - 1;

    links[nextIndex]?.focus();
  };

  return (
    <nav
      ref={navRef}
      className="hidden items-center gap-[clamp(1.5rem,2.2vw,2.5rem)] lg:flex"
      aria-label="Primary"
    >
      {primaryNavigation.map((item) =>
        isNavigationGroup(item) ? (
          <div key={item.label} className="relative" {...hoverProps(item.label)}>
            <button
              id={`${navigationId('desktop', item.label)}-trigger`}
              type="button"
              aria-controls={`${navigationId('desktop', item.label)}-panel`}
              aria-expanded={openMenu === item.label}
              onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
              onKeyDown={(event: ReactKeyboardEvent<HTMLButtonElement>) => {
                if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

                event.preventDefault();
                const openFromEnd = event.key === 'ArrowUp';
                setOpenMenu(item.label);

                window.requestAnimationFrame(() => {
                  const links = document
                    .getElementById(`${navigationId('desktop', item.label)}-panel`)
                    ?.querySelectorAll<HTMLAnchorElement>('a[href]');
                  const target = openFromEnd ? links?.item((links?.length ?? 1) - 1) : links?.item(0);
                  target?.focus();
                });
              }}
              className={`desktop-nav-link flex cursor-pointer items-center gap-2 py-2 text-micro font-sans uppercase transition-colors duration-400 ${
                isGroupCurrent(item.children)
                  ? 'is-active text-beige'
                  : 'text-white/60 hoverable:text-white'
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`inline-block h-1.5 w-1.5 border-b border-r border-current transition-transform ease-lux duration-400 ${
                  openMenu === item.label
                    ? 'translate-y-[-1px] rotate-[225deg]'
                    : 'translate-y-[-2px] rotate-45'
                }`}
              />
            </button>

            <div
              id={`${navigationId('desktop', item.label)}-panel`}
              aria-labelledby={`${navigationId('desktop', item.label)}-trigger`}
              aria-hidden={openMenu !== item.label}
              inert={openMenu !== item.label}
              onKeyDown={moveMenuFocus}
              className={`absolute left-0 top-full min-w-[15rem] border border-white/10 bg-[#121317] shadow-2xl shadow-black/50 transition-all ease-lux duration-400 ${
                openMenu === item.label
                  ? 'pointer-events-auto translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-2 opacity-0'
              }`}
            >
              {item.children.map((child) => (
                <Link
                  key={child.to}
                  to={child.to}
                  onClick={() => setOpenMenu(null)}
                  aria-current={isCurrent(child.to) ? 'page' : undefined}
                  className={`block border-b border-white/[0.06] px-6 py-4 font-sans text-body transition-colors duration-400 last:border-b-0 hoverable:bg-white/[0.04] hoverable:text-beige ${
                    isCurrent(child.to) ? 'text-beige' : 'text-white/65'
                  }`}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setOpenMenu(null)}
            aria-current={isCurrent(item.to) ? 'page' : undefined}
            className={`desktop-nav-link py-2 text-micro font-sans uppercase transition-colors duration-400 ${
              isCurrent(item.to) ? 'is-active text-beige' : 'text-white/60 hoverable:text-white'
            }`}
          >
            {item.label}
          </Link>
        ),
      )}

      <Link
        to={cta.primary.to}
        onClick={() => setOpenMenu(null)}
        className="btn-beige-outline ml-[clamp(0rem,calc(5.333vw-58.67px),2rem)] uppercase !tracking-[0.14em] !px-[clamp(0.9rem,1.6vw,1.35rem)] !py-[clamp(0.5rem,0.9vw,0.7rem)] !text-[clamp(0.72rem,0.84rem-0.12vw,0.8rem)]"
      >
        {cta.primary.label}
      </Link>
    </nav>
  );
}