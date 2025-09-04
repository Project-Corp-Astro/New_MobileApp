/**
 * Corp Astro - Profile Components
 *
 * Reusable profile components for header and sections.
 *
 * @module ProfileComponents
 * @version 1.0.0
 * @since 2025
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { corpAstroDarkTheme } from "../DesignSystem/DarkTheme";
import { designTokens, typography } from "../DesignSystem/designTokens";

/* ------------------------------- Types ------------------------------- */
interface ProfileHeaderProps {
  name?: string;
  subscription?: string;
  avatarText?: string;
}

interface ProfileItem {
  label: string;
  value: string;
}

interface ProfileSectionProps {
  title: string;
  items: ProfileItem[];
}

/* ----------------------------- Header ----------------------------- */
/**
 * Profile Header Component
 *
 * Displays user profile information in a header format.
 * Shows avatar, name, and subscription status.
 */
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name = "Rajesh Kumar",
  subscription = "PREMIUM",
  avatarText = "RK",
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{avatarText}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.subscriptionBadge}>
          <Text style={styles.subscriptionText}>{subscription}</Text>
        </View>
      </View>
    </View>
  );
};

/* ----------------------------- Section ----------------------------- */
/**
 * Profile Section Component
 *
 * Displays a section of profile information with a title
 * and list of label-value pairs.
 */
export const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  items,
}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {items.map((item, index) => (
        <View key={index} style={styles.sectionItem}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

/* ----------------------------- Styles ----------------------------- */
const styles = StyleSheet.create({
  /* Header */
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: designTokens.spacing.lg,
    backgroundColor: corpAstroDarkTheme.colors.cosmos.dark,
    borderRadius: designTokens.radius.lg,
    marginHorizontal: designTokens.spacing.md,
    marginVertical: designTokens.spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: corpAstroDarkTheme.colors.luxury.pure,
    justifyContent: "center",
    alignItems: "center",
    marginRight: designTokens.spacing.md,
  },
  avatarText: {
  ...typography.heading2,
    color: corpAstroDarkTheme.colors.cosmos.void,
  },
  info: {
    flex: 1,
  },
  name: {
  ...typography.heading3,
    color: corpAstroDarkTheme.colors.neutral.text,
    marginBottom: designTokens.spacing.xs,
  },
  subscriptionBadge: {
    alignSelf: "flex-start",
    backgroundColor: corpAstroDarkTheme.colors.brand.primary,
    paddingHorizontal: designTokens.spacing.sm,
    paddingVertical: designTokens.spacing.xs,
    borderRadius: designTokens.radius.sm,
  },
  subscriptionText: {
  ...typography.caption,
    color: corpAstroDarkTheme.colors.neutral.text,
  },

  /* Section */
  sectionContainer: {
    backgroundColor: corpAstroDarkTheme.colors.cosmos.dark,
    borderRadius: designTokens.radius.lg,
    padding: designTokens.spacing.lg,
    marginHorizontal: designTokens.spacing.md,
    marginBottom: designTokens.spacing.md,
  },
  sectionTitle: {
  ...typography.heading3,
    color: corpAstroDarkTheme.colors.neutral.text,
    marginBottom: designTokens.spacing.md,
  },
  sectionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: designTokens.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: corpAstroDarkTheme.colors.cosmos.medium,
  },
  label: {
  ...typography.body,
    color: corpAstroDarkTheme.colors.neutral.muted,
    flex: 1,
  },
  value: {
  ...typography.body,
  fontWeight: "500",
    color: corpAstroDarkTheme.colors.neutral.text,
    textAlign: "right",
    flex: 1,
  },
});

export default {
  ProfileHeader,
  ProfileSection,
};
