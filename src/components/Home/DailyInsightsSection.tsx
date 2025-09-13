/**
 * Daily Insights Section Component
 * 
 * Handles the expandable daily insights with refresh functionality
 * and haptic feedback for better user experience.
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { corpAstroDarkTheme } from '../DesignSystem/DarkTheme';

interface InsightData {
  icon: string;
  title: string;
  details: string;
  color: string;
}

interface DailyInsightsSectionProps {
  insightsData: InsightData[];
  insightsExpanded: number | null;
  refreshing: boolean;
  onInsightToggle: (index: number) => void;
  onRefresh: () => void;
  onHapticFeedback: () => void;
}

export const DailyInsightsSection: React.FC<DailyInsightsSectionProps> = ({
  insightsData,
  insightsExpanded,
  refreshing,
  onInsightToggle,
  onRefresh,
  onHapticFeedback,
}) => {
  const theme = corpAstroDarkTheme;

  return (
    <View style={[styles.insightsCard, { backgroundColor: theme.colors.brand.accent }]}>
      <View style={styles.insightsHeader}>
        <Text style={[styles.insightsTitle, { color: theme.colors.brand.primary }]}>
          ⭐ TODAY'S KEY INSIGHTS
        </Text>
        <Pressable 
          style={[styles.refreshButton, { backgroundColor: theme.colors.brand.primary }]}
          onPress={onRefresh}
          accessibilityLabel="Refresh insights"
          accessibilityHint="Double tap to refresh today's key insights"
          accessibilityRole="button"
        >
          {refreshing ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={[styles.refreshIcon, { 
              transform: [{ rotate: refreshing ? '360deg' : '0deg' }] 
            }]}>⟲</Text>
          )}
        </Pressable>
      </View>
      
      <View style={styles.insightsList}>
        {insightsData.map((insight, index) => (
          <Pressable
            key={index}
            style={[
              styles.insightItem,
              { backgroundColor: insightsExpanded === index ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)' }
            ]}
            onPress={() => {
              onHapticFeedback(); // Haptic feedback for insight expansion
              onInsightToggle(index);
            }}
            accessibilityLabel={`${insight.title} insight`}
            accessibilityHint={`Double tap to ${insightsExpanded === index ? 'collapse' : 'expand'} insight details`}
            accessibilityRole="button"
            accessibilityState={{ expanded: insightsExpanded === index }}
          >
            <View style={[styles.insightIndicator, { backgroundColor: insight.color }]} />
            <View style={styles.insightContent}>
              <Text style={[styles.insightText, { color: theme.colors.cosmos.deep}]}>
                {insight.icon} {insight.title}
              </Text>
              {insightsExpanded === index && (
                <Text style={[styles.insightDetails, { color: theme.colors.cosmos.deep }]}>
                  {insight.details}
                </Text>
              )}
            </View>
            <Text style={[
              styles.expandIcon, 
              { 
                color: theme.colors.cosmos.deep,
                transform: [{ rotate: insightsExpanded === index ? '90deg' : '0deg' }]
              }
            ]}>▶</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  insightsCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  insightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshIcon: {
    fontSize: 16,
    color: '#000',
  },
  insightsList: {
    gap: 8,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: corpAstroDarkTheme.colors.cosmos.deep,
  },
  insightIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  insightDetails: {
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.8,
  },
  expandIcon: {
    fontSize: 12,
    marginLeft: 8,
  },
});
