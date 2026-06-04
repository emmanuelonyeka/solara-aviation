/* ============================================================
   Solara Jets — homepage behavior (plain JS replica)
   GSAP + ScrollTrigger + Lenis, identical to the React build.
   ============================================================ */
gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Testimonials data + injection ---------- */
const testimonials = [
  { quote: 'Solara has completely transformed how I think about travel. What used to be a full day of airports and connections is now a three-hour door-to-door journey. The crew remembered my preferences from the first flight.', name: 'Private Client', role: 'Family Office Principal', location: 'Geneva' },
  { quote: 'We fly our executive team between London, New York, and Dubai regularly. The consistency of service, the aircraft availability, and the ground coordination are flawless. I have not missed a meeting in two years.', name: 'Corporate Client', role: 'CFO, Global Investment Firm', location: 'London' },
  { quote: "After years with fractional programs, switching to Solara's membership was the best decision we made. More flexibility, better aircraft, and a team that genuinely cares about every detail.", name: 'Private Client', role: 'Technology Entrepreneur', location: 'Palo Alto' },
  { quote: "The ability to book on 24 hours' notice and have the exact aircraft we want, every time, has been invaluable for our family. The pet-friendly policy means our golden retriever comes too.", name: 'Private Client', role: 'Philanthropist & Board Director', location: 'New York' },
  { quote: 'From the moment we land to the moment we take off, everything is handled. Ground transport, catering preferences, even the newspaper I like. It is the closest thing to having your own aircraft without the overhead.', name: 'Private Client', role: 'Real Estate Developer', location: 'Dubai' },
  { quote: 'Our firm requires discretion and reliability above all else. Solara delivers both, consistently. The 24/7 support team has handled every last-minute change without a single issue.', name: 'Corporate Client', role: 'Managing Partner, Law Firm', location: 'Monaco' },
];
(function injectTestimonials() {
  const track = document.getElementById('testiTrack');
  if (!track) return;
  const make = (t) => {
    const card = document.createElement('div');
    card.className = 'testi-card';
    card.innerHTML =
      '<p class="quote">&ldquo;' + t.quote + '&rdquo;</p>' +
      '<div class="who"><div class="av"><span>' + t.name.charAt(0) + '</span></div>' +
      '<div><p class="nm">' + t.name + '</p><p class="rl">' + t.role + ' &middot; ' + t.location + '</p></div></div>';
    return card;
  };
  // duplicate the set so the -50% keyframe loops seamlessly
  testimonials.forEach((t) => track.appendChild(make(t)));
  testimonials.forEach((t) => track.appendChild(make(t)));
})();

/* ---------- Navbar ---------- */
(function navbar() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('mobileMenu');
  let open = false;

  const onScroll = () => {
    const y = window.scrollY;
    if (y < 800) {
      // top + first 50px: transparent header stays visible
      nav.classList.add('at-top');
      nav.classList.remove('hiding', 'revealed');
    } else if (y < 800) {
      // 50–120px: transparent header subtly fades out
      nav.classList.add('hiding');
      nav.classList.remove('at-top', 'revealed');
    } else {
      // past 120px: black sticky header subtly fades in
      nav.classList.add('revealed');
      nav.classList.remove('at-top', 'hiding');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const closeBtn = document.getElementById('menuClose');
  const links = Array.from(menu.querySelectorAll('.m-link'));

  function setLinkStagger(opening) {
    // each link animates individually, fast-in then slow-out (ease handled in CSS),
    // staggered 60ms apart, bottom -> top
    links.forEach((el, i) => {
      el.style.transitionDelay = opening ? (i * 60) + 'ms' : '0ms';
    });
  }
  function setOpen(v) {
    open = v;
    setLinkStagger(v);
    menu.classList.toggle('open', v);
    document.body.style.overflow = v ? 'hidden' : '';
    nav.classList.toggle('revealed', open || window.scrollY > 120);
    burger.setAttribute('aria-expanded', v ? 'true' : 'false');
  }
  burger.addEventListener('click', () => setOpen(!open));
  if (closeBtn) closeBtn.addEventListener('click', () => setOpen(false));
  links.forEach((a) => a.addEventListener('click', () => setOpen(false)));
})();

/* ---------- Lenis smooth scroll ---------- */
let lenis = null;
if (!prefersReduced && window.Lenis) {
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* helper to build a pinned scrub timeline exactly like the source */
function pinnedTimeline(triggerId, end) {
  return gsap.timeline({
    scrollTrigger: {
      trigger: '#' + triggerId,
      start: 'top top',
      end: end,
      pin: true,
      scrub: 0.5,
    },
  });
}

/* ============================================================
   SECTION 1 — HERO (auto entrance + pinned scroll exit)
   ============================================================ */
(function hero() {
  const words = gsap.utils.toArray('#heroHeadline .hero-word');
  // entrance
  const tl = gsap.timeline({ delay: 0.1 });
  tl.fromTo('#heroBg', { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 0);
  tl.fromTo(words, { y: prefersReduced ? 20 : 60, rotateX: prefersReduced ? 0 : 28, opacity: 0 }, { y: 0, rotateX: 0, opacity: 1, duration: 0.9, stagger: 0.06, ease: 'power2.out' }, 0.3);
  tl.fromTo('#heroSub', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.8);
  tl.fromTo('#heroCta', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.95);
  tl.fromTo('#heroStrip', { x: '120%' }, { x: '0%', duration: 0.7, ease: 'power3.out' }, 0.6);

  // pinned exit
  const st = pinnedTimeline('hero', '+=130%');
  st.scrollTrigger.vars.onLeaveBack = () => {
    gsap.set(words, { y: 0, rotateX: 0, opacity: 1 });
    gsap.set('#heroSub', { y: 0, opacity: 1 });
    gsap.set('#heroCta', { y: 0, opacity: 1 });
    gsap.set('#heroStrip', { x: '0%', opacity: 1 });
    gsap.set('#heroBg', { y: 0, scale: 1 });
  };
  st.fromTo('#heroBg', { y: 0 }, { y: '-2vh', ease: 'none' }, 0);
  st.fromTo(words, { y: 0, opacity: 1 }, { y: '-18vh', opacity: 0, ease: 'power2.in' }, 0.70);
  st.fromTo('#heroSub', { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.72);
  st.fromTo('#heroCta', { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.74);
  st.fromTo('#heroStrip', { x: '0%', opacity: 1 }, { x: '120%', opacity: 0, ease: 'power2.in' }, 0.70);
  st.fromTo('#heroBg', { scale: 1, y: '-2vh' }, { scale: 1.06, y: '-10vh', ease: 'none' }, 0.70);
})();

/* ============================================================
   SECTION 2 — EXPERIENCE
   ============================================================ */
(function experience() {
  const words = gsap.utils.toArray('#expHeadline .exp-word');
  const st = pinnedTimeline('experience', '+=130%');
  st.fromTo('#expBg', { y: '18vh', scale: 1.08, opacity: 0.6 }, { y: 0, scale: 1, opacity: 1, ease: 'none' }, 0);
  st.fromTo(words, { y: prefersReduced ? 20 : 70, rotateX: prefersReduced ? 0 : 35, opacity: 0 }, { y: 0, rotateX: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0);
  st.fromTo('#expBody', { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);
  st.fromTo('#expCta', { x: 60, opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.1);
  st.fromTo(words, { y: 0, opacity: 1 }, { y: '-16vh', opacity: 0, ease: 'power2.in' }, 0.70);
  st.fromTo('#expBody', { y: 0, opacity: 1 }, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.72);
  st.fromTo('#expCta', { x: 0, opacity: 1 }, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.72);
  st.fromTo('#expBg', { y: 0, scale: 1 }, { y: '-10vh', scale: 1.06, ease: 'none' }, 0.70);
})();

/* ============================================================
   SECTION 3 — FLEET
   ============================================================ */
(function fleet() {
  const lines = gsap.utils.toArray('#fleetHead .fleet-line');
  const st = pinnedTimeline('fleet', '+=140%');
  st.fromTo('#fleetImg', { x: '60vw', scale: 1.08, opacity: 0.7 }, { x: 0, scale: 1, opacity: 1, ease: 'none' }, 0);
  st.fromTo(lines, { x: prefersReduced ? '-20vw' : '-40vw', opacity: 0 }, { x: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 0);
  st.fromTo('#fleetBody', { y: 24, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1);
  st.fromTo('#fleetCta', { y: 24, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12);
  st.fromTo('#fleetStrip', { x: '120%' }, { x: '0%', ease: 'none' }, 0.05);
  st.fromTo(lines, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.70);
  st.fromTo('#fleetBody', { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.72);
  st.fromTo('#fleetCta', { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.72);
  st.fromTo('#fleetImg', { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.70);
  st.fromTo('#fleetStrip', { x: '0%', opacity: 1 }, { x: '120%', opacity: 0, ease: 'power2.in' }, 0.70);
  st.fromTo('#fleetBg', { scale: 1, y: 0 }, { scale: 1.06, y: '-8vh', ease: 'none' }, 0.70);
})();

/* ============================================================
   SECTION 4 — JOURNEY (normal flow reveals)
   ============================================================ */
(function journey() {
  gsap.fromTo('#journeyPara', { y: 24, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '#journey', start: 'top 80%', end: 'top 55%', scrub: 0.5 },
  });
  gsap.fromTo('#journeyQuote', { y: 40, opacity: 0 }, {
    y: prefersReduced ? 0 : -18, opacity: 1, duration: 1, ease: 'power2.out',
    scrollTrigger: { trigger: '#journey', start: 'top 70%', end: 'top 30%', scrub: 0.5 },
  });
  const cards = gsap.utils.toArray('#journeyCards .journey-card');
  gsap.fromTo(cards, { y: prefersReduced ? 20 : 60, rotateX: prefersReduced ? 0 : 18, opacity: 0 }, {
    y: 0, rotateX: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '#journeyCards', start: 'top 85%', toggleActions: 'play none none reverse' },
  });
})();

/* ============================================================
   SECTION 5 — DESTINATIONS
   ============================================================ */
(function destinations() {
  const words = gsap.utils.toArray('#destHead .word');
  const st = pinnedTimeline('destinations', '+=140%');
  st.fromTo(words, { x: prefersReduced ? '-20vw' : '-55vw', opacity: 0 }, { x: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 0);
  st.fromTo('#destImg', { x: '60vw', scale: 1.08, opacity: 0.7 }, { x: 0, scale: 1, opacity: 1, ease: 'none' }, 0);
  st.fromTo('#destBody', { y: 18, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1);
  st.fromTo('#destCta', { y: 18, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12);
  st.fromTo('#destStrip', { x: '120%' }, { x: '0%', ease: 'none' }, 0.05);
  st.fromTo(words, { x: 0, opacity: 1 }, { x: '-14vw', opacity: 0, ease: 'power2.in' }, 0.70);
  st.fromTo('#destBody', { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.72);
  st.fromTo('#destCta', { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.72);
  st.fromTo('#destImg', { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.70);
  st.fromTo('#destStrip', { x: '0%', opacity: 1 }, { x: '120%', opacity: 0, ease: 'power2.in' }, 0.70);
  st.fromTo('#destBg', { scale: 1, y: 0 }, { scale: 1.07, y: '-10vh', ease: 'none' }, 0.70);
})();

/* ============================================================
   SECTION 6 — SAFETY
   ============================================================ */
(function safety() {
  const lines = gsap.utils.toArray('#safetyHead .safety-line');
  const st = pinnedTimeline('safety', '+=130%');
  st.fromTo(lines, { x: prefersReduced ? '-20vw' : '-55vw', opacity: 0 }, { x: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 0);
  st.fromTo('#safetyBody', { y: 22, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1);
  st.fromTo('#safetyCta', { y: 22, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12);
  st.fromTo('#safetyImg', { x: '60vw', scale: 1.08, opacity: 0.7 }, { x: 0, scale: 1, opacity: 1, ease: 'none' }, 0);
  st.fromTo('#safetyStrip', { x: '120%' }, { x: '0%', ease: 'none' }, 0.05);
  st.fromTo(lines, { x: 0, opacity: 1 }, { x: '-14vw', opacity: 0, ease: 'power2.in' }, 0.70);
  st.fromTo('#safetyBody', { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.72);
  st.fromTo('#safetyCta', { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.72);
  st.fromTo('#safetyImg', { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.70);
  st.fromTo('#safetyStrip', { x: '0%', opacity: 1 }, { x: '120%', opacity: 0, ease: 'power2.in' }, 0.70);
})();

/* ============================================================
   SECTION 7 — MEMBERSHIP INVITE
   ============================================================ */
(function membership() {
  const words = gsap.utils.toArray('#memHead .word');
  const st = pinnedTimeline('membership', '+=140%');
  st.fromTo(words, { x: prefersReduced ? '-20vw' : '-55vw', opacity: 0 }, { x: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 0);
  st.fromTo('#memImg', { x: '60vw', scale: 1.08, opacity: 0.7 }, { x: 0, scale: 1, opacity: 1, ease: 'none' }, 0);
  st.fromTo('#memBody', { y: 18, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1);
  st.fromTo('#memCta', { y: 18, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12);
  st.fromTo('#memQuote', { y: prefersReduced ? 20 : '24vh', rotateX: prefersReduced ? 0 : 18, opacity: 0 }, { y: 0, rotateX: 0, opacity: 1, ease: 'none' }, 0.08);
  st.fromTo('#memStrip', { x: '120%' }, { x: '0%', ease: 'none' }, 0.05);
  st.fromTo(words, { x: 0, opacity: 1 }, { x: '-14vw', opacity: 0, ease: 'power2.in' }, 0.70);
  st.fromTo('#memBody', { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.72);
  st.fromTo('#memCta', { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.72);
  st.fromTo('#memImg', { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.70);
  st.fromTo('#memQuote', { y: 0, opacity: 1 }, { y: '18vh', opacity: 0, ease: 'power2.in' }, 0.72);
  st.fromTo('#memStrip', { x: '0%', opacity: 1 }, { x: '120%', opacity: 0, ease: 'power2.in' }, 0.70);
  st.fromTo('#memBg', { scale: 1, y: 0 }, { scale: 1.07, y: '-10vh', ease: 'none' }, 0.70);
})();

/* ============================================================
   SECTION 8 — TIERS (normal flow reveals)
   ============================================================ */
(function tiers() {
  gsap.fromTo('#tiersHead', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '#tiers', start: 'top 80%', toggleActions: 'play none none reverse' } });
  gsap.fromTo('#tiersIntro', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '#tiers', start: 'top 75%', toggleActions: 'play none none reverse' } });
  gsap.fromTo('#tierA', { x: prefersReduced ? '-5vw' : '-10vw', rotateY: prefersReduced ? 0 : 12, opacity: 0 }, { x: 0, rotateY: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
    scrollTrigger: { trigger: '#tierA', start: 'top 85%', toggleActions: 'play none none reverse' } });
  gsap.fromTo('#tierB', { x: prefersReduced ? '5vw' : '10vw', rotateY: prefersReduced ? 0 : -12, opacity: 0 }, { x: 0, rotateY: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
    scrollTrigger: { trigger: '#tierB', start: 'top 85%', toggleActions: 'play none none reverse' } });
  const feats = gsap.utils.toArray('#tiersFeatures .feature-item');
  gsap.fromTo(feats, { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: '#tiersFeatures', start: 'top 85%', toggleActions: 'play none none reverse' } });
})();

/* ============================================================
   Generic AnimatedSection (trust box, testimonials label/cards)
   ============================================================ */
(function animSections() {
  gsap.utils.toArray('.anim-section').forEach((el, i) => {
    gsap.fromTo(el, { y: prefersReduced ? 10 : 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, delay: (i % 3) * 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
    });
  });
})();

/* ============================================================
   SECTION 9 — BOOK / FOOTER (normal flow reveals)
   ============================================================ */
(function book() {
  gsap.fromTo('#bookHead', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '#contact', start: 'top 80%', toggleActions: 'play none none reverse' } });
  gsap.fromTo('#bookSub', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: '#contact', start: 'top 75%', toggleActions: 'play none none reverse' } });
  gsap.fromTo('#bookCta', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: '#contact', start: 'top 70%', toggleActions: 'play none none reverse' } });
})();

/* ============================================================
   GLOBAL SNAP to pinned-section centers (identical to source)
   ============================================================ */
if (!prefersReduced) {
  setTimeout(() => {
    const pinned = ScrollTrigger.getAll().filter((st) => st.vars.pin).sort((a, b) => a.start - b.start);
    if (pinned.length === 0) return;
    const maxScroll = ScrollTrigger.maxScroll(window);
    if (!maxScroll) return;
    const ranges = pinned.map((st) => ({
      start: st.start / maxScroll,
      end: (st.end ?? st.start) / maxScroll,
      center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
    }));
    // Build "settled" snap targets: the point in each pinned section where ALL
    // content is fully revealed and done animating (measured at timeline progress
    // ~0.525, the centre of the settled window 0.50–0.575).
    const SETTLE = 0.525;
    const settleRanges = pinned.map((st) => {
      const span = (st.end ?? st.start) - st.start;
      return {
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        target: (st.start + span * SETTLE) / maxScroll,
      };
    });

    ScrollTrigger.create({
      snap: {
        snapTo: (value) => {
          // stay at true top so the transparent hero header shows on load
          if (value <= 0.02) return 0;
          const inPinned = settleRanges.some((r) => value >= r.start - 0.02 && value <= r.end + 0.02);
          if (!inPinned) return value;
          const nearest = settleRanges.reduce((closest, r) =>
            Math.abs(r.target - value) < Math.abs(closest - value) ? r.target : closest,
            settleRanges[0] ? settleRanges[0].target : value);
          return nearest <= 0.02 ? value : nearest;
        },
        duration: { min: 0.2, max: 0.4 },
        delay: 0,
        ease: 'power2.inOut',
      },
    });
    ScrollTrigger.refresh();
  }, 500);
}

function updateSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  document.getElementById('viewport-size').textContent = `${width}px x ${height}px`;
}
window.addEventListener('resize', updateSize);
updateSize(); // Initial call

/* Refresh after all images load so pin positions are correct */
window.addEventListener('load', () => ScrollTrigger.refresh());
