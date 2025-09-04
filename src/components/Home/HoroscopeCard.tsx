/**
 * HoroscopeCard Component
 * 
 * Extracted from ModernHomeScreen for better component architecture
 * Handles individual horoscope category cards with time period data
 */

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { corpAstroDarkTheme } from '../DesignSystem/DarkTheme';
import { typography, spacing, cards, animations } from '../DesignSystem/designTokens';

interface HoroscopeData {
  insight: string;
  guidance: string;
  energy: string;
  bestTime: string;
}

interface HoroscopeCategory {
  title: string;
  icon: string;
  today: HoroscopeData;
  thisWeek: HoroscopeData;
  thisMonth: HoroscopeData;
  color: string;
  gradient: string[];
}

interface HoroscopeCardProps {
  category: HoroscopeCategory;
  currentData: HoroscopeData;
  index: number;
  onPress?: () => void;
}

export const HoroscopeCard: React.FC<HoroscopeCardProps> = ({ 
  category, 
  currentData, 
  index,
  onPress 
}) => {
  const theme = corpAstroDarkTheme;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.horoscopeCard,
        {
          backgroundColor: theme.colors.cosmos.deep,
          borderColor: `${String(category.color)}20`,
          transform: [{ scale: pressed ? animations.pressedScale : 1 }],
        }
      ]}
      onPress={onPress}
      accessibilityLabel={`${category.title} horoscope card`}
      accessibilityHint="Double tap to view detailed horoscope information"
      accessibilityRole="button"
    >
      <View style={styles.horoscopeCardHeader}>
        <Text style={[styles.categoryIcon, { fontSize: 28 }]}>
          {category.icon}
        </Text>
        <View style={styles.horoscopeCardHeaderText}>
          <Text style={[styles.horoscopeCardTitle, { color: category.color }]}>
            {category.title}
          </Text>
          <View style={styles.energyBadge}>
            <View style={[
              styles.energyDot,
              { backgroundColor: category.color }
            ]} />
            <Text style={[styles.energyText, { color: theme.colors.neutral.light }]}>
              {currentData.energy}
            </Text>
          </View>
        </View>
      </View>

      <Text style={[styles.insightText, { color: theme.colors.neutral.text }]}>
        {currentData.insight}
      </Text>

      <Text style={[styles.guidanceText, { color: theme.colors.neutral.light }]}>
        {currentData.guidance}
      </Text>

      <View style={styles.bestTimeContainer}>
        <View style={[
          styles.bestTimeIndicator,
          { borderColor: `${String(category.color)}40` }
        ]}>
          <Text style={[styles.bestTimeLabel, { color: theme.colors.neutral.light }]}>
            Best Time
          </Text>
          <Text style={[styles.bestTimeValue, { color: category.color }]}>
            {currentData.bestTime}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  horoscopeCard: {
    width: cards.horizontalScroll.width,
    marginRight: spacing.md,
    borderRadius: cards.horizontalScroll.borderRadius,
    padding: cards.horizontalScroll.padding,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  horoscopeCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  categoryIcon: {
    fontSize: 28,
  },
  horoscopeCardHeaderText: {
    flex: 1,
  },
  horoscopeCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  energyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  energyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  energyText: {
    ...typography.caption,
    fontWeight: '500',
  },
  insightText: {
    ...typography.body,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  guidanceText: {
    ...typography.caption,
    marginBottom: spacing.md,
    fontStyle: 'italic',
    opacity: 0.9,
  },
  bestTimeContainer: {
    marginTop: 'auto',
  },
  bestTimeIndicator: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  bestTimeLabel: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  bestTimeValue: {
    ...typography.caption,
    fontWeight: '600',
  },
});
