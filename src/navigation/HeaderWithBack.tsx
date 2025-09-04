/**
 * Corp Astro - Header with Back Button Component
 * 
 * Reusable header component with back navigation.
 * Provides consistent header styling across screens.
 * 
 * @module HeaderWithBack
 * @version 1.0.0
 * @since 2025
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { corpAstroDarkTheme } from '../components/DesignSystem/DarkTheme';
import { designTokens } from '../components/DesignSystem/designTokens';

interface HeaderWithBackProps {
  title: string;
  onBack: () => void;
  rightComponent?: React.ReactNode;
}

/**
 * Header with Back Button Component
 * 
 * Provides consistent header with back navigation.
 * Follows design system guidelines and accessibility standards.
 */
export const HeaderWithBack: React.FC<HeaderWithBackProps> = ({
  title,
  onBack,
  rightComponent,
}) => {
  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.backButton}
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Text style={styles.backIcon}>←</Text>
      </Pressable>
      
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      
      <View style={styles.rightContainer}>
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: designTokens.spacing.md,
    paddingVertical: designTokens.spacing.sm,
    backgroundColor: corpAstroDarkTheme.colors.cosmos.void,
    borderBottomWidth: 1,
    borderBottomColor: corpAstroDarkTheme.colors.neutral.medium,
  },
  backButton: {
    padding: designTokens.spacing.xs,
    borderRadius: designTokens.radius.sm,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: corpAstroDarkTheme.colors.brand.primary,
    fontWeight: '600',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: designTokens.typography.heading3.fontSize,
    fontWeight: designTokens.typography.heading3.fontWeight,
    color: corpAstroDarkTheme.colors.neutral.text,
    marginHorizontal: designTokens.spacing.sm,
  },
  rightContainer: {
    minWidth: 44,
    alignItems: 'flex-end',
  },
});

export default HeaderWithBack;
