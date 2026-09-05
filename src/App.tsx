import { lazy, Suspense, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import AppShell from './components/layout/AppShell';
import BackToTopButton from './components/layout/BackToTopButton';
import CookieConsent from './components/layout/CookieConsent';
import SiteStructuredData from './components/shared/SiteStructuredData';
import RouteAnnouncer from './components/system/RouteAnnouncer';
import RouteFallback from './components/system/RouteFallback';
import SkipLink from './components/system/SkipLink';

import Home from './pages/Home';
const Fleet = lazy(() => import('./pages/Fleet'));
const AircraftDetail = lazy(() => import('./pages/AircraftDetail'));
const Membership = lazy(() => import('./pages/Membership'));
const Destinations = lazy(() => import('./pages/Destinations'));
const DestinationDetail = lazy(() => import('./pages/DestinationDetail'));
const Safety = lazy(() => import('./pages/Safety'));
const About = lazy(() => import('./pages/About'));
const Experience = lazy(() => import('./pages/Experience'));
const Contact = lazy(() => import('./pages/Contact'));
const Quote = lazy(() => import('./pages/Quote'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Disclosures = lazy(() => import('./pages/Disclosures'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Concierge = lazy(() => import('./pages/Concierge'));
const EmptyLeg = lazy(() => import('./pages/EmptyLeg'));
const CorporateCharter = lazy(() => import('./pages/CorporateCharter'));
const Blog = lazy(() => import('./pages/Blog'));
const Sustainability = lazy(() => import('./pages/Sustainability'));
const Partners = lazy(() => import('./pages/Partners'));
const ManageBooking = lazy(() => import('./pages/ManageBooking'));
const Article = lazy(() => import('./pages/Article'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Careers = lazy(() => import('./pages/Careers'));
const Press = lazy(() => import('./pages/Press'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Accessibility = lazy(() => import('./pages/Accessibility'));

function RoutedContent() {
  const location = useLocation();
  const wrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    gsap.killTweensOf(el);

    /* Home owns its opening sequence. Applying the route fade as well would
       multiply two opacity animations and make the eagerly loaded hero appear
       to blink. Inner pages keep the shared transition. */
    if (location.pathname === '/') {
      gsap.set(el, { clearProps: 'opacity' });
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // IMPORTANT: fade only — do NOT animate y/x/scale on this wrapper.
    // GSAP leaves a `transform` on the element after a y tween, and a
    // transformed ancestor makes `position: fixed` resolve against IT
    // instead of the viewport. ScrollTrigger pins with position: fixed,
    // so any transform here silently breaks every pinned section on the
    // home page. clearProps removes the inline opacity when it finishes.
    const transition = gsap.fromTo(el,
      { opacity: 0 },
      { opacity: 1, duration: prefersReduced ? 0.2 : 0.55, ease: 'power2.out', clearProps: 'opacity' }
    );

    return () => {
      transition.kill();
    };
  }, [location.pathname]);

  return (
    <div ref={wrapRef}>
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/fleet/:aircraftId" element={<AircraftDetail />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclosures" element={<Disclosures />} />
          <Route path="/concierge" element={<Concierge />} />
          <Route path="/empty-legs" element={<EmptyLeg />} />
          <Route path="/corporate" element={<CorporateCharter />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/manage-booking" element={<ManageBooking />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<Press />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <SiteStructuredData />
      <BrowserRouter>
        <SkipLink />
        <RouteAnnouncer />
        <AppShell />
        <RoutedContent />
        <BackToTopButton />
        <CookieConsent />
      </BrowserRouter>
    </HelmetProvider>
  );
}
