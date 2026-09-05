import { useCallback, useEffect, useRef, useState } from 'react';
import { primaryNavigation } from '../../config/navigation';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const DESKTOP_QUERY = '(min-width: 1024px)';
const DRAWER_CONTENT_DURATION = 200;
const DRAWER_STAGGER = 40;
const DRAWER_EXIT_DURATION = DRAWER_CONTENT_DURATION + primaryNavigation.length * DRAWER_STAGGER;

/**
 * Owns the mobile navigation's modal behaviour and lifecycle. Keeping focus,
 * scroll-lock and breakpoint concerns here leaves SiteHeader responsible for
 * rendering navigation rather than becoming an interaction monolith.
 */
export default function useMobileNavigationDrawer(pathname: string) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerClosing, setDrawerClosing] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef(false);
  const closeTimerRef = useRef(0);

  const completeClose = useCallback(() => {
    setDrawerOpen(false);
    setDrawerClosing(false);
    setOpenAccordion(null);
  }, []);

  const beginClose = useCallback((restoreFocus: boolean) => {
    restoreFocusRef.current = restoreFocus;
    window.clearTimeout(closeTimerRef.current);
    setDrawerClosing(true);
    closeTimerRef.current = window.setTimeout(completeClose, DRAWER_EXIT_DURATION);
  }, [completeClose]);

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      window.clearTimeout(closeTimerRef.current);
      restoreFocusRef.current = false;
      setDrawerOpen(false);
      setDrawerClosing(false);
      setOpenAccordion(null);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;

    const previousOverflow = document.body.style.overflow;

    window.__lenis?.scrollTo(window.scrollY, { immediate: true });
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [drawerOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_QUERY);

    const onBreakpointChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return;

      window.clearTimeout(closeTimerRef.current);
      restoreFocusRef.current = false;
      setDrawerOpen(false);
      setDrawerClosing(false);
      setOpenAccordion(null);
    };

    desktopQuery.addEventListener('change', onBreakpointChange);

    return () => {
      desktopQuery.removeEventListener('change', onBreakpointChange);
    };
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const menuButton = menuButtonRef.current;

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        beginClose(true);
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter(
        (element) =>
          !element.closest('[inert]') &&
          element.getClientRects().length > 0,
      );

      if (focusable.length === 0) {
        event.preventDefault();
        drawer.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !drawer.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', onKeyDown);

      if (restoreFocusRef.current) {
        window.requestAnimationFrame(() => {
          if (menuButton && document.contains(menuButton)) {
            menuButton.focus();
          }
        });
      }
    };
  }, [beginClose, drawerOpen]);

  const openDrawer = () => {
    window.clearTimeout(closeTimerRef.current);
    restoreFocusRef.current = true;
    setDrawerClosing(false);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    beginClose(false);
  };

  const dismissDrawer = () => {
    beginClose(true);
  };

  const toggleAccordion = (label: string) => {
    setOpenAccordion((current) => (current === label ? null : label));
  };

  return {
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
  };
}