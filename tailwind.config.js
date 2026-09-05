const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        // Brand palette. Without these, utilities such as bg-beige/5 or
        // border-beige/20 silently produce nothing.
        beige: "#F3F0E6",
        "beige-dim": "#d9d4c4",
        charcoal: "#0B0C0F",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
            /* ---- Typographic scale -------------------------------------
         Every size is fluid between a 350px and a 1440px viewport and
         flat outside that range, so nothing ever snaps at a breakpoint.
         Read the middle term as: size at 350px, plus the slope needed
         to arrive at the 1440px size.

         Pair them with the serif for display sizes and Inter for the
         rest. Line height and tracking are baked in so a heading is one
         class, not four.                                              */
      fontSize: {
        'display-xl': ['clamp(2.25rem, 1.528rem + 3.303vw, 4.5rem)', { lineHeight: '0.96', letterSpacing: '-0.022em' }],
        'display': ['clamp(1.875rem, 1.514rem + 1.651vw, 3rem)', { lineHeight: '1.04', letterSpacing: '-0.018em' }],
        'title': ['clamp(1.1875rem, 1.047rem + 0.642vw, 1.625rem)', { lineHeight: '1.16', letterSpacing: '-0.012em' }],
        'subtitle': ['clamp(1rem, 0.96rem + 0.183vw, 1.125rem)', { lineHeight: '1.4', letterSpacing: '-0.006em' }],
        'lead': ['clamp(0.875rem, 0.815rem + 0.275vw, 1.0625rem)', { lineHeight: '1.72' }],
        'body': ['clamp(0.875rem, 0.835rem + 0.183vw, 0.975rem)', { lineHeight: '1.72' }],
        'micro': ['clamp(0.625rem, 0.585rem + 0.183vw, 0.75rem)', { lineHeight: '1.4', letterSpacing: '0.14em' }],
      },

      /* ---- Spatial rhythm ----------------------------------------
         Inner pages override `--gutter` inside design-system.css, so
         their wide editorial grids stay disciplined without changing
         the protected home-page geometry.                             */
      spacing: {
        gutter: 'var(--gutter)',
        section: 'clamp(4.75rem, 7vw, 7.5rem)',
        'section-sm': 'clamp(2.75rem, 4.5vw, 4.5rem)',
        flow: 'clamp(0.9rem, 1.5vw, 1.25rem)',
        block: 'clamp(1.5rem, 2.5vw, 2.25rem)',
        stack: 'clamp(2.5rem, 4.5vw, 4rem)',
        layout: 'clamp(2rem, 5vw, 5rem)',
      },
      maxWidth: {
        measure: '60ch',
        prose: '44rem',
        content: '90rem',
        frame: '103rem',
      },

      /* ---- Motion -------------------------------------------------
         One easing for everything that moves. Consistency in motion is
         what separates a designed site from a decorated one.          */
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.22, 1, 0.36, 1)',
        soft: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
        1200: '1200ms',
      },

      borderRadius: {

        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        /* Route loader: a hairline draws in from the left, then retracts
           to the right. Reads as measurement rather than waiting. */
        "line-sweep": {
          "0%": { transform: "scaleX(0)", transformOrigin: "left center" },
          "48%": { transform: "scaleX(1)", transformOrigin: "left center" },
          "52%": { transform: "scaleX(1)", transformOrigin: "right center" },
          "100%": { transform: "scaleX(0)", transformOrigin: "right center" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "line-sweep": "line-sweep 1.9s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        breathe: "breathe 2.6s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [
    /* `hoverable:` applies only on devices with a real pointer, so a tap
       can never leave a hover state stuck on a phone. Use it in place of
       `hover:` everywhere. */
        plugin(({ addVariant }) => {
      addVariant("hoverable", "@media (hover: hover) and (pointer: fine) { &:hover }");
      addVariant(
        "group-hoverable",
        "@media (hover: hover) and (pointer: fine) { :merge(.group):hover & }"
      );
    }),

  ],

}