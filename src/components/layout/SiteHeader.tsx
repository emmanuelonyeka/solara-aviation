import { Link, useLocation } from 'react-router-dom';
import { site } from '../../config/site';
import DesktopNavigation from './navigation/DesktopNavigation';
import MobileNavigation from './navigation/MobileNavigation';
import useHeaderVisibility from './useHeaderVisibility';
import useMobileNavigationDrawer from './useMobileNavigationDrawer';

export default function SiteHeader() {
  const location = useLocation();

  const {
    drawerOpen,
    drawerClosing,
    openAccordion,
    drawerRef,
    menuButtonRef,
    closeButtonRef,
    openDrawer,
    closeDrawer,
    dismissDrawer,
    toggleAccordion,
  } = useMobileNavigationDrawer(location.pathname);

  const { scrolled, hidden } = useHeaderVisibility(drawerOpen);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b will-change-transform transition-[transform,background-color,border-color,backdrop-filter] ease-lux duration-600 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled ? 'border-white/[0.08] bg-charcoal/92 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <div
          className={`flex items-center justify-between px-gutter transition-all ease-lux duration-600 ${
            scrolled ? 'py-[clamp(0.75rem,1.6vw,1.1rem)]' : 'py-[clamp(1rem,2.4vw,1.9rem)]'
          } ${drawerOpen ? 'pointer-events-none opacity-0 duration-200' : 'opacity-100'}`}
        >
          <Link to="/" aria-label={`${site.name} — home`} className="group flex flex-col">
            <span className="font-serif leading-none text-white text-[clamp(1.45rem,1.15rem+1.2vw,2rem)] tracking-[0.01em] transition-[color,letter-spacing] duration-400 ease-lux group-hoverable:text-beige group-hoverable:tracking-[0.04em]">
              {site.shortName}
            </span>
            <span
              className={`overflow-hidden text-micro font-sans uppercase text-beige/60 transition-all ease-lux duration-600 ${
                scrolled ? 'max-h-0 opacity-0' : 'mt-1.5 max-h-6 opacity-100'
              }`}
            >
              Private Aviation
            </span>
          </Link>

          <DesktopNavigation pathname={location.pathname} drawerOpen={drawerOpen} />

          <button
            ref={menuButtonRef}
            type="button"
            onClick={openDrawer}
            aria-label="Open menu"
            aria-controls="mobile-navigation-dialog"
            aria-expanded={drawerOpen}
            className="group flex cursor-pointer items-center gap-3 py-2 transition-opacity duration-400 active:opacity-60 lg:hidden"
          >
            <span className="text-micro font-sans uppercase text-white/60 transition-colors duration-400 group-hoverable:text-white">
              Menu
            </span>
            <span className="flex w-6 flex-col items-end gap-[6px]" aria-hidden="true">
              <span className="h-px w-6 bg-white/80 transition-all ease-lux duration-400" />
              <span className="h-px w-4 bg-white/80 transition-all ease-lux duration-400 group-hoverable:w-6" />
            </span>
          </button>
        </div>
      </header>

      <MobileNavigation
        pathname={location.pathname}
        drawerOpen={drawerOpen}
        drawerClosing={drawerClosing}
        openAccordion={openAccordion}
        drawerRef={drawerRef}
        closeButtonRef={closeButtonRef}
        closeDrawer={closeDrawer}
        dismissDrawer={dismissDrawer}
        toggleAccordion={toggleAccordion}
      />
    </>
  );
}