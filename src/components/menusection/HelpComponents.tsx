/**
 * Corp Astro - Help Components
 *
 * Contains reusable components:
 * - ContactCard
 * - HelpButton
 * - HelpSection
 *
 * Provides consistent styling for help & support UI.
 *
 * @module HelpComponents
 * @version 1.0.0
 * @since 2025
 */

import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { corpAstroDarkTheme } from "../../components/DesignSystem/DarkTheme";
import { designTokens } from "../../components/DesignSystem/designTokens";

/* ------------------------------- Types ------------------------------- */
interface ContactCardProps {
  icon: string;
  title: string;
  description: string;
  availability: string;
  onPress: () => void;
}

interface HelpButtonProps {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
}

interface HelpSectionProps {
  title: string;
  children: React.ReactNode;
}

/* ----------------------------- ContactCard ----------------------------- */
/**
 * Contact Card Component
 *
 * Displays contact support options with availability
 * information and call-to-action.
 */
export const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  description,
  availability,
  onPress,
}) => {
  return (
    <Pressable
      style={styles.contactContainer}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${description}. ${availability}`}
    >
      <View style={styles.contactIconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contactTitle}>{title}</Text>
        <Text style={styles.contactDescription}>{description}</Text>
        <Text style={styles.contactAvailability}>{availability}</Text>
      </View>

      <Text style={styles.arrow}>→</Text>
    </Pressable>
  );
};

/* ----------------------------- HelpButton ----------------------------- */
/**
 * Help Button Component
 *
 * Interactive button for help topics with icon, title, and description.
 */
export const HelpButton: React.FC<HelpButtonProps> = ({
  icon,
  title,
  description,
  onPress,
}) => {
  return (
    <Pressable
      style={styles.helpContainer}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${description}`}
    >
      <View style={styles.helpIconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.helpTitle}>{title}</Text>
        <Text style={styles.helpDescription}>{description}</Text>
      </View>

      <Text style={styles.arrow}>→</Text>
    </Pressable>
  );
};

/* ----------------------------- HelpSection ----------------------------- */
/**
 * Help Section Component
 *
 * Groups related help content under a common title.
 */
export const HelpSection: React.FC<HelpSectionProps> = ({
  title,
  children,
}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
};

/* ----------------------------- Styles ----------------------------- */
const styles = StyleSheet.create({
  /* Contact Card */
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: designTokens.spacing.lg,
    paddingVertical: designTokens.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: corpAstroDarkTheme.colors.cosmos.medium,
    minHeight: 80,
  },
  contactIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: corpAstroDarkTheme.colors.mystical.royal,
    justifyContent: "center",
    alignItems: "center",
    marginRight: designTokens.spacing.md,
  },
  content: {
    flex: 1,
  },
  contactTitle: {
    fontSize: designTokens.typography.bodyLarge.fontSize,
    fontWeight: designTokens.typography.bodyLarge.fontWeight,
    color: corpAstroDarkTheme.colors.neutral.text,
    marginBottom: designTokens.spacing.xs,
  },
  contactDescription: {
    fontSize: designTokens.typography.body.fontSize,
    color: corpAstroDarkTheme.colors.neutral.muted,
    marginBottom: designTokens.spacing.xs,
  },
  contactAvailability: {
    fontSize: designTokens.typography.caption.fontSize,
    color: corpAstroDarkTheme.colors.brand.primary,
    fontWeight: "500",
  },

  /* Help Button */
  helpContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: designTokens.spacing.lg,
    paddingVertical: designTokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: corpAstroDarkTheme.colors.cosmos.medium,
    minHeight: 72,
  },
  helpIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: corpAstroDarkTheme.colors.brand.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: designTokens.spacing.md,
  },
  helpTitle: {
    fontSize: designTokens.typography.body.fontSize,
    fontWeight: "600",
    color: corpAstroDarkTheme.colors.neutral.text,
    marginBottom: designTokens.spacing.xs,
  },
  helpDescription: {
    fontSize: designTokens.typography.caption.fontSize,
    color: corpAstroDarkTheme.colors.neutral.muted,
    lineHeight: 18,
  },

  /* Shared */
  icon: {
    fontSize: 20,
  },
  arrow: {
    fontSize: 18,
    color: corpAstroDarkTheme.colors.neutral.muted,
    fontWeight: "600",
  },

  /* Section */
  sectionContainer: {
    marginHorizontal: designTokens.spacing.md,
    marginBottom: designTokens.spacing.lg,
  },
  sectionTitle: {
    fontSize: designTokens.typography.heading3.fontSize,
    fontWeight: designTokens.typography.heading3.fontWeight,
    color: corpAstroDarkTheme.colors.neutral.text,
    marginBottom: designTokens.spacing.sm,
    paddingHorizontal: designTokens.spacing.xs,
  },
  sectionContent: {
    backgroundColor: corpAstroDarkTheme.colors.cosmos.dark,
    borderRadius: designTokens.radius.lg,
    overflow: "hidden",
  },
});

export default {
  ContactCard,
  HelpButton,
  HelpSection,
};
