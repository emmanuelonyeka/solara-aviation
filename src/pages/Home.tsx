import { useRef } from 'react';

import Footer from '../components/layout/Footer';
import SiteHeader from '../components/layout/SiteHeader';
import MetaTags from '../components/shared/MetaTags';
import { HomeBooking, HomeDestinations, HomeExperience, HomeFleet, HomeHero, HomeJourney, HomeMembership, HomeMembershipTiers, HomeSafety, HomeTeaser, HomeTestimonials, HomeTrust } from '../components/home';
import { homeTeasers } from '../data/home';
import useHomeScroll from '../hooks/useHomeScroll';
import '../styles/home-motion.css';

/* ============================================================
   SOLARA — HOME PAGE
   ------------------------------------------------------------
   Page order lives here. Section markup and editable content are
   isolated; the protected scroll choreography remains entirely in
   hooks/useHomeScroll.ts.
   ============================================================ */

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useHomeScroll(mainRef);

  return (
    <>
      <MetaTags
        title="Private Jet Charter & Membership"
        titleOrder="brand-first"
        description="Private jet charter and membership designed around your time, your schedule, and the way you travel. Explore our fleet, destinations, and membership programs."
        canonical="/"
      />

      <div className="grain-overlay" aria-hidden="true" />
      <SiteHeader />

      <main className="relative" id="main" ref={mainRef} tabIndex={-1}>
        <HomeHero />
        <HomeExperience />
        <HomeFleet />
        <HomeTeaser {...homeTeasers.fleet} className="z-[4]" />
        <HomeJourney />
        <HomeDestinations />
        <HomeTeaser {...homeTeasers.destinations} className="z-[6]" />
        <HomeSafety />
        <HomeMembership />
        <HomeMembershipTiers />
        <HomeTeaser {...homeTeasers.membership} className="z-[9]" />
        <HomeTrust />
        <HomeTestimonials />
        <HomeBooking />
        <Footer />
      </main>
    </>
  );
}