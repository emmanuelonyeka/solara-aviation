import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   HOME PAGE SCROLL CHOREOGRAPHY
   ------------------------------------------------------------
   Six pinned sections — hero, experience, fleet, destinations,
   safety, membership — each pinned at 'top top' and scrubbed
   against the scroll, plus the reveals for the sections that flow
   normally, and a snap that settles each pinned section at the
   point its content has fully arrived.

   Lenis is NOT created here. AppShell owns the single instance for
   the whole app and already feeds ScrollTrigger.update; a second
   one would double-drive the scroll.

   Everything runs inside gsap.context() scoped to the page root,
   so leaving the route reverts pins and inline styles cleanly
   instead of leaking triggers into the next page.
   ============================================================ */

export function useHomeScroll(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let removeHeroInterruptListeners = () => {};

    const ctx = gsap.context(() => {
      /* The hero copy is hidden before a single ScrollTrigger exists.

         Creating a pinned trigger wraps its section in a pin-spacer, and that
         DOM change forces a reflow — which is early enough for the browser to
         paint once with the hero still at its CSS defaults, i.e. fully
         visible. Setting the hidden state here, at the very top of the layout
         effect, means there is nothing to flash: the first paint already has
         it hidden, and the entrance below then fades it in.

         These write exactly the start states the entrance fromTo tweens
         declare below, so no timeline and no timing is changed. */
      gsap.set('#heroHeadline .hero-word', {
        y: prefersReduced ? 20 : 74,
        rotateX: prefersReduced ? 0 : 24,
        opacity: 0,
      });
      gsap.set(['#heroSub', '#heroCta'], { y: 24, opacity: 0 });
      gsap.set('#heroBg', { opacity: 0, scale: prefersReduced ? 1 : 1.12 });
      gsap.set('#heroStrip', { x: '120%', opacity: 0 });

      /* pinned scrub timeline shared by the six pinned sections */
      const pinnedTimeline = (triggerId: string, end: string) =>
        gsap.timeline({
          scrollTrigger: {
            trigger: '#' + triggerId,
            start: 'top top',
            end: end,
            pin: true,
            scrub: 0.5,
          },
        });

      /* ============================================================
         SECTION 1 — HERO (auto entrance + pinned scroll exit)
         ============================================================ */
      {
        const words = gsap.utils.toArray<HTMLElement>('#heroHeadline .hero-word');

        /* The entrance and scroll exit touch the same properties, so the exit
           must never infer its reverse state from the DOM. At setup time the
           DOM is intentionally hidden for the entrance; a `.to()` therefore
           caches opacity 0 and restores that hidden value when the user scrolls
           back to the top. Explicit visible `from` values make the pinned exit
           perfectly reversible, while `immediateRender: false` leaves the intro
           as the sole owner of the first paint. */
        const noRender = { immediateRender: false } as const;

        const st = pinnedTimeline('hero', '+=130%');
        st.fromTo('#heroBg', { y: 0 }, { y: '-2vh', ease: 'none', ...noRender }, 0);
        st.fromTo(words, { y: 0, rotateX: 0, opacity: 1 }, { y: '-18vh', rotateX: 0, opacity: 0, ease: 'power2.in', ...noRender }, 0.70);
        st.fromTo('#heroSub', { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in', ...noRender }, 0.72);
        st.fromTo('#heroCta', { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in', ...noRender }, 0.74);
        st.fromTo('#heroStrip', { x: '0%', opacity: 1 }, { x: '120%', opacity: 0, ease: 'power2.in', ...noRender }, 0.70);
        st.fromTo('#heroBg', { scale: 1, y: '-2vh' }, { scale: 1.06, y: '-10vh', ease: 'none', ...noRender }, 0.70);
        /* The entrance is deliberately slow and heavily overlapped. A short
           snappy stagger reads as a web animation; a long one where the image
           is still settling as the last word lands reads as a title sequence.
           expo.out spends most of its time decelerating, which is what makes
           the type look like it is coming to rest rather than stopping. */
        const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'expo.out' } });
        tl.fromTo('#heroBg',
          { opacity: 0, scale: prefersReduced ? 1 : 1.12 },
          { opacity: 1, scale: 1, duration: prefersReduced ? 0.6 : 2.6, ease: 'power2.out' }, 0);
        tl.fromTo(words,
          { y: prefersReduced ? 20 : 74, rotateX: prefersReduced ? 0 : 24, opacity: 0 },
          { y: 0, rotateX: 0, opacity: 1, duration: prefersReduced ? 0.5 : 1.7, stagger: prefersReduced ? 0.02 : 0.095 }, 0.25);
        tl.fromTo('#heroStrip', { x: '120%', opacity: 0 }, { x: '0%', opacity: 1, duration: 1.5 }, 0.75);
        tl.fromTo('#heroSub', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3 }, 1.05);
        tl.fromTo('#heroCta', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3 }, 1.25);

        /* Commit the completed entrance as the permanent progress-zero state.
           Without this handoff, returning to exact scroll position zero makes
           the exit tween release its properties and exposes the hidden setup
           values underneath. */
        let entranceCommitted = false;
        const applyHeroBaseline = () => {
          gsap.set('#heroBg', { y: 0, scale: 1, opacity: 1 });
          gsap.set(words, { y: 0, rotateX: 0, opacity: 1 });
          gsap.set(['#heroSub', '#heroCta'], { y: 0, opacity: 1 });
          gsap.set('#heroStrip', { x: '0%', opacity: 1 });
        };

        const commitEntrance = () => {
          if (entranceCommitted) return;
          entranceCommitted = true;
          st.invalidate();
          applyHeroBaseline();
          tl.kill();
        };

        tl.eventCallback('onComplete', commitEntrance);
        st.eventCallback('onUpdate', () => {
          if (entranceCommitted && st.progress() <= 0.001) applyHeroBaseline();
        });

        /* Starting to scroll completes and commits the entrance immediately:
           the reader has signalled they are done watching, and control passes
           cleanly to the scrubbed exit above. */
        const finishEntrance = () => {
          if (entranceCommitted) return;
          tl.progress(1);
          commitEntrance();
        };
        window.addEventListener('wheel', finishEntrance, { passive: true, once: true });
        window.addEventListener('touchstart', finishEntrance, { passive: true, once: true });
        window.addEventListener('scroll', finishEntrance, { passive: true, once: true });
        window.addEventListener('keydown', finishEntrance, { once: true });

        removeHeroInterruptListeners = () => {
          window.removeEventListener('wheel', finishEntrance);
          window.removeEventListener('touchstart', finishEntrance);
          window.removeEventListener('scroll', finishEntrance);
          window.removeEventListener('keydown', finishEntrance);
        };
      }

      /* ============================================================
         SECTION 2 — EXPERIENCE
         ============================================================ */
      {
        const words = gsap.utils.toArray<HTMLElement>('#expHeadline .exp-word');
        const st = pinnedTimeline('experience', '+=130%');
        st.fromTo('#expBg', { y: '18vh', scale: 1.08, opacity: 0.6 }, { y: 0, scale: 1, opacity: 1, ease: 'none' }, 0);
        st.fromTo(words, { y: prefersReduced ? 20 : 70, rotateX: prefersReduced ? 0 : 35, opacity: 0 }, { y: 0, rotateX: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0);
        st.fromTo('#expBody', { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);
        st.fromTo('#expCta', { x: 60, opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.1);
        st.fromTo(words, { y: 0, opacity: 1 }, { y: '-16vh', opacity: 0, ease: 'power2.in' }, 0.70);
        st.fromTo('#expBody', { y: 0, opacity: 1 }, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.72);
        st.fromTo('#expCta', { x: 0, opacity: 1 }, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.72);
        st.fromTo('#expBg', { y: 0, scale: 1 }, { y: '-10vh', scale: 1.06, ease: 'none' }, 0.70);
      }

      /* ============================================================
         SECTION 3 — FLEET
         ============================================================ */
      {
        const lines = gsap.utils.toArray<HTMLElement>('#fleetHead .fleet-line');
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
      }

      /* ============================================================
         SECTION 4 — JOURNEY (normal flow reveals)
         ============================================================ */
      {
        gsap.fromTo('#journeyPara', { y: 24, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: '#journey', start: 'top 80%', end: 'top 55%', scrub: 0.5 },
        });
        gsap.fromTo('#journeyQuote', { y: 40, opacity: 0 }, {
          y: prefersReduced ? 0 : -18, opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: '#journey', start: 'top 70%', end: 'top 30%', scrub: 0.5 },
        });
        const cards = gsap.utils.toArray<HTMLElement>('#journeyCards .journey-card');
        gsap.fromTo(cards, { y: prefersReduced ? 20 : 60, rotateX: prefersReduced ? 0 : 18, opacity: 0 }, {
          y: 0, rotateX: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: '#journeyCards', start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      }

      /* ============================================================
         SECTION 5 — DESTINATIONS
         ============================================================ */
      {
        const words = gsap.utils.toArray<HTMLElement>('#destHead .word');
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
      }

      /* ============================================================
         SECTION 6 — SAFETY
         ============================================================ */
      {
        const lines = gsap.utils.toArray<HTMLElement>('#safetyHead .safety-line');
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
      }

      /* ============================================================
         SECTION 7 — MEMBERSHIP INVITE
         ============================================================ */
      {
        const words = gsap.utils.toArray<HTMLElement>('#memHead .word');
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
      }

      /* ============================================================
         SECTION 8 — TIERS (normal flow reveals)
         ============================================================ */
      {
        gsap.fromTo('#tiersHead', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: '#tiers', start: 'top 80%', toggleActions: 'play none none reverse' } });
        gsap.fromTo('#tiersIntro', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: '#tiers', start: 'top 75%', toggleActions: 'play none none reverse' } });
        gsap.fromTo('#tierA', { x: prefersReduced ? '-5vw' : '-10vw', rotateY: prefersReduced ? 0 : 12, opacity: 0 }, { x: 0, rotateY: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: '#tierA', start: 'top 85%', toggleActions: 'play none none reverse' } });
        gsap.fromTo('#tierB', { x: prefersReduced ? '5vw' : '10vw', rotateY: prefersReduced ? 0 : -12, opacity: 0 }, { x: 0, rotateY: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: '#tierB', start: 'top 85%', toggleActions: 'play none none reverse' } });
        const feats = gsap.utils.toArray<HTMLElement>('#tiersFeatures .feature-item');
        gsap.fromTo(feats, { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: '#tiersFeatures', start: 'top 85%', toggleActions: 'play none none reverse' } });
      }

      /* ============================================================
         Generic AnimatedSection (trust box, testimonials label/cards)
         ============================================================ */
      {
        gsap.utils.toArray<HTMLElement>('.anim-section').forEach((el, i) => {
          gsap.fromTo(el, { y: prefersReduced ? 10 : 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, delay: (i % 3) * 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
          });
        });
      }

      /* ============================================================
         SECTION 9 — BOOK / FOOTER (normal flow reveals)
         ============================================================ */
      {
        gsap.fromTo('#bookHead', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: '#contact', start: 'top 80%', toggleActions: 'play none none reverse' } });
        gsap.fromTo('#bookSub', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '#contact', start: 'top 75%', toggleActions: 'play none none reverse' } });
        gsap.fromTo('#bookCta', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '#contact', start: 'top 70%', toggleActions: 'play none none reverse' } });
      }
    }, root);

    /* ============================================================
       GLOBAL SNAP to pinned-section centers (identical to source)
       ============================================================ */
    let snapTrigger: ScrollTrigger | null = null;
    const snapTimer = window.setTimeout(() => {
      if (prefersReduced) return;
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      if (pinned.length === 0) return;
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll) return;

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

      snapTrigger = ScrollTrigger.create({
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

    return () => {
      clearTimeout(snapTimer);
      snapTrigger?.kill();
      removeHeroInterruptListeners();
      ctx.revert();
    };
  }, [rootRef]);
}

export default useHomeScroll;
