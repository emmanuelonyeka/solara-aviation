import type { RefObject } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { isNavigationGroup, isPathActive, navigationId, primaryNavigation, type NavigationLink } from '../../../config/navigation';
import { cta, site } from '../../../config/site';

interface MobileNavigationProps {
  pathname: string;
  drawerOpen: boolean;
  drawerClosing: boolean;
  openAccordion: string | null;
  drawerRef: RefObject<HTMLDivElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  closeDrawer: () => void;
  dismissDrawer: () => void;
  toggleAccordion: (label: string) => void;
}

export default function MobileNavigation({
  pathname,
  drawerOpen,
  drawerClosing,
  openAccordion,
  drawerRef,
  closeButtonRef,
  closeDrawer,
  dismissDrawer,
  toggleAccordion,
}: MobileNavigationProps) {
  const isCurrent = (to: string) => isPathActive(pathname, to);
  const isGroupCurrent = (children: readonly NavigationLink[]) => children.some((child) => isCurrent(child.to));
  const contentVisible = drawerOpen && !drawerClosing;

  return createPortal(
    <div
      ref={drawerRef}
      id="mobile-navigation-dialog"
      role="dialog"
      aria-modal={drawerOpen ? true : undefined}
      aria-label="Mobile navigation"
      tabIndex={-1}
      aria-hidden={!drawerOpen}
      className={`fixed inset-0 z-[12000] bg-charcoal/98 backdrop-blur-xl transition-[transform,visibility] ease-lux duration-500 lg:hidden ${
        drawerOpen
          ? drawerClosing
            ? 'visible pointer-events-none translate-y-0'
            : 'visible pointer-events-auto translate-y-0'
          : 'invisible pointer-events-none -translate-y-full'
      }`}
    >
      <div
        data-lenis-prevent
        className="relative flex h-[100dvh] touch-pan-y flex-col overflow-y-auto overscroll-contain px-gutter py-[clamp(1rem,2.4vw,1.9rem)]"
      >
        <div className="flex items-center justify-between transition-all duration-400 ease-lux" style={{ transitionDelay: contentVisible ? '200ms' : drawerClosing ? `${(primaryNavigation.length + 1) * 40}ms` : '0ms', opacity: contentVisible ? 1 : 0, transform: contentVisible ? 'translateY(0)' : 'translateY(12px)' }}>
          <Link
            to="/"
            onClick={closeDrawer}
            className="font-serif leading-none text-white text-[clamp(1.45rem,1.15rem+1.2vw,2rem)]"
          >
            {site.shortName}
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={dismissDrawer}
            aria-label="Close menu"
            className="group flex cursor-pointer items-center gap-3 py-2 transition-opacity duration-400 active:opacity-60"
          >
            <span className="text-micro font-sans uppercase text-white/60 transition-colors duration-400 group-hoverable:text-white">
              Close
            </span>
            <span className="relative block h-4 w-4" aria-hidden="true">
              <span className="absolute left-0 top-1/2 h-px w-4 rotate-45 bg-white/80" />
              <span className="absolute left-0 top-1/2 h-px w-4 -rotate-45 bg-white/80" />
            </span>
          </button>
        </div>

        <nav className="mt-[clamp(2rem,6vw,3.5rem)] flex-[1_0_auto]" aria-label="Mobile primary">
          {primaryNavigation.map((item, index) => (
            <div
              key={item.label}
              className="border-b border-white/[0.09] transition-all ease-lux duration-400"
              style={{
                transitionDelay: contentVisible ? `${250 + (index + 1) * 40}ms` : drawerClosing ? `${(primaryNavigation.length - index) * 40}ms` : '0ms',
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              {isNavigationGroup(item) ? (
                <>
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.label)}
                    aria-controls={`${navigationId('mobile', item.label)}-panel`}
                    aria-expanded={openAccordion === item.label}
                    className="flex w-full cursor-pointer items-center justify-between py-[clamp(0.9rem,2.4vw,1.35rem)] text-left transition-opacity duration-400 active:opacity-60"
                  >
                    <span className={`font-serif text-[clamp(1.5rem,1.15rem+1.6vw,2.25rem)] ${isGroupCurrent(item.children) ? 'text-beige' : 'text-white'}`}>
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`inline-block h-2 w-2 border-b border-r border-beige/70 transition-transform ease-lux duration-400 ${
                        openAccordion === item.label ? 'rotate-[225deg]' : 'rotate-45'
                      }`}
                    />
                  </button>

                  <div
                    id={`${navigationId('mobile', item.label)}-panel`}
                    aria-hidden={openAccordion !== item.label}
                    inert={openAccordion !== item.label}
                    className={`grid transition-all ease-lux duration-600 ${
                      openAccordion === item.label
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-[clamp(0.75rem,2vw,1.25rem)]">
                        {item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={closeDrawer}
                            aria-current={isCurrent(child.to) ? 'page' : undefined}
                            className={`block py-[clamp(0.5rem,1.4vw,0.75rem)] font-sans text-body transition-[color,padding] duration-400 active:opacity-60 ${
                              isCurrent(child.to) ? 'pl-0 text-beige' : 'pl-[clamp(0.75rem,3vw,1.5rem)] text-white/55'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  to={item.to}
                  onClick={closeDrawer}
                  aria-current={isCurrent(item.to) ? 'page' : undefined}
                  className={`block py-[clamp(0.9rem,2.4vw,1.35rem)] font-serif text-[clamp(1.5rem,1.15rem+1.6vw,2.25rem)] transition-opacity duration-400 active:opacity-60 ${
                    isCurrent(item.to) ? 'text-beige' : 'text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div
          className="mt-[clamp(2rem,5vw,3rem)] pb-[clamp(2rem,6vw,3rem)] transition-all ease-lux duration-400"
          style={{
            transitionDelay: contentVisible ? `${300 + (primaryNavigation.length + 1) * 40}ms` : '0ms',
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          <Link
            to={cta.primary.to}
            onClick={closeDrawer}
            className="btn-beige-filled w-full !py-[clamp(11px,0.431vw+9.49px,12.8px)] !text-[clamp(12.6px,0.335vw+11.43px,14px)]"
          >
            {cta.primary.label}
          </Link>

          <div className="mt-[clamp(1.5rem,4vw,2.25rem)] space-y-2 border-t border-white/[0.09] pt-[clamp(1.25rem,3vw,1.75rem)]">
            <a href={`tel:${site.contact.phoneHref}`} className="block font-sans text-body text-white/55 transition-opacity duration-400 active:opacity-60">
              {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="block font-sans text-body text-white/55 transition-opacity duration-400 active:opacity-60">
              {site.contact.email}
            </a>
            <p className="pt-1 text-micro font-sans uppercase text-white/30">
              {site.contact.availability}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}