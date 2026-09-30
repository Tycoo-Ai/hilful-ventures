"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  fadeIn,
  fadeInUp,
  slideUp,
  slideInLeft,
  slideInRight,
  scaleIn,
  imageReveal,
  staggerContainer,
  viewportConfig,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   SHARED TYPES
   -------------------------------------------------------------------------- */

interface AnimationPrimitiveProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Override the default viewport detection settings */
  viewport?: typeof viewportConfig;
  /** HTML element to render as */
  as?: keyof typeof motion;
}

/* --------------------------------------------------------------------------
   FadeIn
   --------------------------------------------------------------------------
   Simple opacity fade. Use for subtle content reveals.
   -------------------------------------------------------------------------- */

export function FadeIn({
  children,
  className,
  delay = 0,
  viewport,
}: AnimationPrimitiveProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? viewportConfig}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   Reveal (FadeInUp)
   --------------------------------------------------------------------------
   Content slides up while fading in. The default scroll-reveal animation.
   -------------------------------------------------------------------------- */

export function Reveal({
  children,
  className,
  delay = 0,
  viewport,
}: AnimationPrimitiveProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? viewportConfig}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   SlideUp
   --------------------------------------------------------------------------
   More pronounced upward slide. Use for hero content or key callouts.
   -------------------------------------------------------------------------- */

export function SlideUp({
  children,
  className,
  delay = 0,
  viewport,
}: AnimationPrimitiveProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? viewportConfig}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   SlideInLeft / SlideInRight
   -------------------------------------------------------------------------- */

export function SlideInLeft({
  children,
  className,
  delay = 0,
  viewport,
}: AnimationPrimitiveProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      variants={slideInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? viewportConfig}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function SlideInRight({
  children,
  className,
  delay = 0,
  viewport,
}: AnimationPrimitiveProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      variants={slideInRight}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? viewportConfig}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   ScaleIn
   --------------------------------------------------------------------------
   Scales up from 95% while fading in. Use for cards and modals.
   -------------------------------------------------------------------------- */

export function ScaleIn({
  children,
  className,
  delay = 0,
  viewport,
}: AnimationPrimitiveProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? viewportConfig}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   ImageReveal
   --------------------------------------------------------------------------
   Image-specific reveal: fades in with a subtle zoom-out.
   -------------------------------------------------------------------------- */

export function ImageReveal({
  children,
  className,
  delay = 0,
  viewport,
}: AnimationPrimitiveProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn("overflow-hidden", className)}>{children}</div>;
  }

  return (
    <motion.div
      variants={imageReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? viewportConfig}
      transition={{ delay }}
      className={cn("overflow-hidden", className)}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   StaggerChildren
   --------------------------------------------------------------------------
   Wraps children and staggers their entrance animations.
   Each direct child should use a shared variant (fadeInUp, slideUp, etc.)
   -------------------------------------------------------------------------- */

interface StaggerChildrenProps extends AnimationPrimitiveProps {
  /** Delay between each child's animation (seconds) */
  staggerDelay?: number;
  /** Delay before the first child animates (seconds) */
  delayChildren?: number;
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0,
  viewport,
}: StaggerChildrenProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      variants={staggerContainer(staggerDelay, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? viewportConfig}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   StaggerItem
   --------------------------------------------------------------------------
   A child element within a StaggerChildren container.
   -------------------------------------------------------------------------- */

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div variants={fadeInUp} className={cn(className)}>
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   PageTransition
   --------------------------------------------------------------------------
   Wraps page content with a fade-in-up entrance animation.
   Use in layout.tsx or page.tsx files.
   -------------------------------------------------------------------------- */

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <main className={cn(className)}>{children}</main>;
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.main>
  );
}
