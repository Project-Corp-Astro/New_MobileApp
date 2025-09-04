/**
 * Corp Astro UI Library - Animation Timing Tokens
 * 
 * Standardized animation timing values for consistent motion design
 * Based on UI Docs specifications for professional, smooth interactions
 * 
 * @module AnimationTiming
 * @version 1.0.0
 * @since 2025
 */

// ============================================================================
// ANIMATION TIMING VALUES
// ============================================================================

/**
 * Core animation timing tokens
 * Values aligned with UI Docs animation specifications
 */
export const animationTiming = {
  /** Ultra fast - micro interactions (100ms) */
  ultraFast: 100,
  
  /** Fast - button presses, quick feedback (150ms) */
  fast: 150,
  
  /** Standard - most UI animations (250ms) */
  standard: 250,
  
  /** Medium - card transitions, modals (300ms) */
  medium: 300,
  
  /** Slow - page transitions, complex animations (400ms) */
  slow: 400,
  
  /** Ultra slow - dramatic entrance effects (600ms) */
  ultraSlow: 600,
  
  /** Shimmer - skeleton loading effects (1500ms) */
  shimmer: 1500,
  
  /** Spinner - loading spinner rotation (1000ms) */
  spinner: 1000,
  
  /** Orbital rotation - background orbital motion (20000ms) */
  orbital: 20000,
  
  /** Physics - orbital physics simulations (3000ms) */
  physics: 3000,
  
  /** Long pulse - extended breathing effects (4000ms) */
  longPulse: 4000,
  
  /** Glow pulse - glow effects timing (2500ms) */
  glowPulse: 2500,
  
  /** Orbital medium - medium orbital motion (15000ms) */
  orbitalMedium: 15000,
  
  /** Orbital long - long orbital motion (10000ms) */
  orbitalLong: 10000,
  
  /** Orbital extra long - 12s cosmic timing (12000ms) */
  orbitalExtraLong: 12000,
  
  /** Orbital short - 5s motion (5000ms) */
  orbitalShort: 5000,
  
  /** Orbital medium-short - 6s motion (6000ms) */
  orbitalMediumShort: 6000,
  
  /** Orbital cosmic - 7s cosmic timing (7000ms) */
  orbitalCosmic: 7000,
  
  /** Orbital extended - 8s timing (8000ms) */
  orbitalExtended: 8000,
  
  /** Orbital vast - 9s timing (9000ms) */
  orbitalVast: 9000,
  
  /** Floating long - 4s floating motion (4000ms) */
  floatingLong: 4000,
  
  /** Floating pulse - 2s pulse effects (2000ms) */
  floatingPulse: 2000,
  
  /** Floating medium - 6s floating motion (6000ms) */
  floatingMedium: 6000,
} as const;

/**
 * Easing curves for different animation types
 */
export const animationEasing = {
  /** Standard easing for most interactions */
  standard: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  
  /** Smooth entrance animations */
  easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  
  /** Sharp, responsive feedback */
  easeIn: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  
  /** Bouncy, playful animations */
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

/**
 * Button-specific animation timings
 */
export const buttonAnimations = {
  /** Button press feedback */
  press: animationTiming.fast,
  
  /** Button hover transitions */
  hover: animationTiming.standard,
  
  /** Loading state transitions */
  loading: animationTiming.medium,
  
  /** Scale animation timing */
  scale: animationTiming.fast,
  
  /** Opacity transitions */
  opacity: animationTiming.standard,
} as const;

/**
 * Standardized delay values for staggered animations
 */
export const animationDelays = {
  /** No delay */
  none: 0,
  
  /** Small stagger delay */
  small: 50,
  
  /** Medium stagger delay */
  medium: 100,
  
  /** Large stagger delay */
  large: 150,
} as const;

export type AnimationTimingToken = keyof typeof animationTiming;
export type AnimationEasingToken = keyof typeof animationEasing;
export type ButtonAnimationToken = keyof typeof buttonAnimations;
export type AnimationDelayToken = keyof typeof animationDelays;
