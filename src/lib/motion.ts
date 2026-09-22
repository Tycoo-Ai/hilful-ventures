/**
 * Hilful Ventures — Motion Configuration
 *
 * Centralized animation tokens for Framer Motion. All animation components
 * pull durations, easings, and variants from here for consistency.
 *
 * GSAP is NOT included here — it should only be imported on pages that
 * genuinely require scroll-driven or timeline animations.
 */

import type { Transition, Variants } from "framer-motion";

/* --------------------------------------------------------------------------
   DURATION TOKENS
   -------------------------------------------------------------------------- */

export const duration = {
  instant: 0,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.7,
} as const;

/* --------------------------------------------------------------------------
   EASING TOKENS
   -------------------------------------------------------------------------- */

export const ease = {
  default: [0.25, 0.1, 0.25, 1] as const,
  in: [0.4, 0, 1, 1] as const,
  out: [0, 0, 0.2, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
  gentleSpring: { type: "spring" as const, stiffness: 120, damping: 20 },
} as const;

/* --------------------------------------------------------------------------
   DEFAULT TRANSITIONS
   -------------------------------------------------------------------------- */

export const transition: Record<string, Transition> = {
  fast: { duration: duration.fast, ease: ease.default },
  normal: { duration: duration.normal, ease: ease.default },
  slow: { duration: duration.slow, ease: ease.out },
  spring: { ...ease.spring },
  gentleSpring: { ...ease.gentleSpring },
};

/* --------------------------------------------------------------------------
   SHARED VARIANTS
   --------------------------------------------------------------------------
   Used by the animation primitive components (FadeIn, SlideUp, etc.)
   -------------------------------------------------------------------------- */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transition.normal,
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.normal,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.normal,
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.out },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.out },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.out },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transition.normal,
  },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slower, ease: ease.out },
  },
};

/* --------------------------------------------------------------------------
   STAGGER CONTAINER
   --------------------------------------------------------------------------
   Parent variant that staggers its children's animations.
   -------------------------------------------------------------------------- */

export const staggerContainer = (
  staggerDelay = 0.1,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

/* --------------------------------------------------------------------------
   VIEWPORT DETECTION DEFAULTS
   --------------------------------------------------------------------------
   Used with Framer Motion's whileInView for scroll-triggered animations.
   -------------------------------------------------------------------------- */

export const viewportConfig = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -80px 0px",
} as const;
