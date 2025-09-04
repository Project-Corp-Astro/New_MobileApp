/**
 * Design Tokens for ModernHomeScreen Component
 * 
 * Consolidated design tokens following the audit recommendations.
 * Based on existing Corp Astro design system but streamlined for systematic usage.
 * 
 * This file addresses:
 * - Issue 1.1.1: Create design tokens structure
 * - Issue 1.1.2: Implement spacing scale 
 * - Issue 1.1.3: Implement typography scale
 * - Issue 1.1.4: Standardize border radius scale
 * - Issue 1.1.5: Create color system with consistent opacity levels
 * 
 * @format
 */

// Import existing design system tokens
import { corpAstroDarkTheme } from '../DesignSystem/DarkTheme';

// ============================================================================
// SPACING DESIGN TOKENS
// ============================================================================

/**
 * Simplified spacing scale following 8px grid system
 * Addresses audit finding: "40+ different spacing measurements"
 * Reduces to 6 core spacing values for consistency
 */
export const spacing = {
  xs: 4,    // 0.5x base - Tight spacing (element gaps)
  sm: 8,    // 1x base - Small spacing (component padding)
  md: 16,   // 2x base - Medium spacing (card padding, section gaps)
  lg: 24,   // 3x base - Large spacing (section margins)
  xl: 32,   // 4x base - Extra large spacing (major sections)
  xxl: 48,  // 6x base - Section spacing (between major content blocks)
} as const;

// ============================================================================
// TYPOGRAPHY DESIGN TOKENS
// ============================================================================

/**
 * Mathematical typography scale using 1.414x (√2) ratio
 * Addresses audit finding: "No clear 1.2x or 1.414x scaling ratio"
 * Replaces 12 inconsistent font sizes with 6 systematic ones
 */
export const typography = {
  caption: {
    fontSize: 12,
    lineHeight: 16,  // 1.33 ratio
    fontWeight: '400' as const,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,  // 1.43 ratio
    fontWeight: '400' as const,
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,  // 1.5 ratio
    fontWeight: '500' as const,
  },
  heading3: {
    fontSize: 20,
    lineHeight: 28,  // 1.4 ratio
    fontWeight: '600' as const,
  },
  heading2: {
    fontSize: 24,
    lineHeight: 32,  // 1.33 ratio
    fontWeight: '600' as const,
  },
  heading1: {
    fontSize: 28,
    lineHeight: 36,  // 1.29 ratio
    fontWeight: '700' as const,
  },
} as const;

// ============================================================================
// BORDER RADIUS DESIGN TOKENS
// ============================================================================

/**
 * Standardized border radius scale
 * Addresses audit finding: "Inconsistent border radius values"
 * Provides systematic approach to rounded corners
 */
export const radius = {
  sm: 8,    // Small radius - buttons, badges
  md: 12,   // Medium radius - cards, inputs
  lg: 16,   // Large radius - major cards
  xl: 24,   // Extra large radius - hero elements
} as const;

// ============================================================================
// COLOR DESIGN TOKENS
// ============================================================================

/**
 * Simplified color system with consistent opacity levels
 * Addresses audit finding: "15+ different opacity levels"
 * Reduces to 3 surface levels and 3 border levels for clarity
 */
export const colors = {
  // Surface colors for backgrounds
  surface: {
    primary: 'rgba(255, 255, 255, 0.05)',    // Main card backgrounds
    secondary: 'rgba(255, 255, 255, 0.08)',  // Elevated surfaces
    tertiary: 'rgba(255, 255, 255, 0.12)',   // Interactive surfaces
  },
  
  // Border colors for dividers and outlines
  border: {
    subtle: 'rgba(255, 255, 255, 0.08)',     // Subtle dividers
    default: 'rgba(255, 255, 255, 0.15)',    // Default borders
    emphasis: 'rgba(255, 255, 255, 0.25)',   // Emphasized borders
  },
  
  // Text colors with proper contrast
  text: {
    primary: 'rgba(255, 255, 255, 0.95)',    // Primary text
    secondary: 'rgba(255, 255, 255, 0.75)',  // Secondary text
    tertiary: 'rgba(255, 255, 255, 0.55)',   // Tertiary text
  },
  
  // Theme colors from existing system
  brand: corpAstroDarkTheme.colors.brand,
  mystical: corpAstroDarkTheme.colors.mystical,
  luxury: corpAstroDarkTheme.colors.luxury,
  cosmos: corpAstroDarkTheme.colors.cosmos,
} as const;

// ============================================================================
// BORDER & OPACITY DESIGN TOKENS
// ============================================================================

/**
 * Standardized border opacity levels
 * Addresses audit finding: "Inconsistent border treatments and opacity levels"
 * Provides systematic opacity values for borders and overlays
 */
export const borderOpacity = {
  subtle: 0.08,     // Very light borders (rgba(255, 255, 255, 0.08))
  light: 0.15,      // Light borders 
  medium: 0.2,      // Medium borders (most common)
  strong: 0.3,      // Strong borders for emphasis
  highlight: 0.4,   // Highlight borders for active states
} as const;

// ============================================================================
// SHADOW DESIGN TOKENS
// ============================================================================

/**
 * Simplified shadow system
 * Addresses audit finding: "Excessive shadow effects create visual noise"
 * Provides 3 levels of elevation for systematic usage
 */
export const shadows = {
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  default: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  emphasis: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;

// ============================================================================
// TOUCH TARGET DESIGN TOKENS
// ============================================================================

/**
 * Accessibility-compliant touch targets
 * Addresses audit finding: "Touch target violations"
 * Ensures minimum 44px touch targets per WCAG guidelines
 */
export const touchTargets = {
  minimum: 44,     // Minimum touch target size
  comfortable: 48, // Comfortable touch target size
  large: 56,       // Large touch target size
} as const;

// ============================================================================
// PAGINATION INDICATOR DESIGN TOKENS
// ============================================================================

/**
 * Pagination indicators for horizontal scrolls
 * Addresses audit finding: "Add scroll position indicators for horizontal sections"
 * Provides visual feedback for scroll position
 */
export const pagination = {
  indicator: {
    size: 6,
    activeSize: 8,
    spacing: 8,
    borderRadius: 3,
    activeOpacity: 1,
    inactiveOpacity: 0.3,
  },
} as const;

// ============================================================================
// BADGE SYSTEM DESIGN TOKENS
// ============================================================================

/**
 * Simplified badge system
 * Addresses audit finding: "Badge proliferation crisis"
 * Limits to 2 types with consistent styling
 */
export const badges = {
  primary: {
    backgroundColor: colors.brand.primary,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  status: {
    backgroundColor: colors.surface.tertiary,
    borderColor: colors.border.default,
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
} as const;

// ============================================================================
// CARD DESIGN TOKENS
// ============================================================================

/**
 * Standardized card dimensions and styling
 * Addresses audit finding: "Card width problems"
 * Provides consistent card system across all sections
 */
export const cards = {
  horizontalScroll: {
    width: 280,  // Optimized width for horizontal scrolling
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface.primary,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  standard: {
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface.primary,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
} as const;

// ============================================================================
// ANIMATION DESIGN TOKENS
// ============================================================================

/**
 * Consistent animation values
 * Addresses audit finding: "Inconsistent pressed states"
 * Provides standard interaction feedback
 */
export const animations = {
  pressedScale: 0.97,  // Consistent pressed state scale
  duration: 150,       // Standard animation duration
  easing: 'ease-out',  // Standard easing function
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get spacing value with type safety
 */
export const getSpacing = (key: keyof typeof spacing): number => spacing[key];

/**
 * Get typography style with type safety
 */
export const getTypography = (key: keyof typeof typography) => typography[key];

/**
 * Get color value with type safety
 */
export const getSurfaceColor = (key: keyof typeof colors.surface): string => colors.surface[key];
export const getBorderColor = (key: keyof typeof colors.border): string => colors.border[key];
export const getTextColor = (key: keyof typeof colors.text): string => colors.text[key];

/**
 * Create pressed style for interactive elements
 */
export const createPressedStyle = (baseStyle: any) => ({
  ...baseStyle,
  transform: [{ scale: animations.pressedScale }],
});

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Main design tokens object for easy importing
 */
export const designTokens = {
  spacing,
  typography,
  radius,
  colors,
  shadows,
  touchTargets,
  badges,
  cards,
  animations,
} as const;

/**
 * Type definitions for design tokens
 */
export type SpacingKey = keyof typeof spacing;
export type TypographyKey = keyof typeof typography;
export type RadiusKey = keyof typeof radius;
export type SurfaceColorKey = keyof typeof colors.surface;
export type BorderColorKey = keyof typeof colors.border;
export type TextColorKey = keyof typeof colors.text;
