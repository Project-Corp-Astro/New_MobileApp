/**
 * Business Dashboard Section Component
 * 
 * Displays the focus and mood dashboard with metrics
 * for career, love, health, and family.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { corpAstroDarkTheme } from '../DesignSystem/DarkTheme';
import { typography } from '../DesignSystem/designTokens';

interface MetricData {
  label: string;
  value: number;
  color: string;
}

interface BusinessDashboardSectionProps {
  metrics?: MetricData[];
}

export const BusinessDashboardSection: React.FC<BusinessDashboardSectionProps> = ({
  metrics = [
    { label: 'Career', value: 85, color: '#4CAF50' },
    { label: 'Love', value: 72, color: '#E91E63' },
    { label: 'Health', value: 91, color: '#2196F3' },
    { label: 'Family', value: 78, color: '#FF9800' },
  ]
}) => {
  const theme = corpAstroDarkTheme;

  return (
    <View style={[styles.dashboardSection, { backgroundColor: theme.colors.cosmos.deep }]}>
      <Text style={[styles.dashboardTitle, { color: theme.colors.brand.primary }]}>
        🎯 FOCUS & MOOD DASHBOARD
      </Text>
      <View style={styles.dashboardMetrics}>
        {metrics.map((metric) => (
          <View key={metric.label} style={styles.metricItem}>
            <View style={styles.metricHeader}>
              <Text style={[styles.metricLabel, { color: theme.colors.neutral.light }]}>
                {metric.label}
              </Text>
              <Text style={[styles.metricValue, { color: metric.color }]}>
                {metric.value}%
              </Text>
            </View>
            <View style={[styles.progressBar, { backgroundColor: theme.colors.cosmos.dark }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${metric.value}%`, backgroundColor: metric.color }
                ]} 
              />
            </View>
          </View>
        ))}
      </View>
      <View style={styles.additionalInfo}>
        <Text style={[styles.timingInfo, { color: theme.colors.neutral.text }]}>
          🕐 Best meeting time: 2-4 PM
        </Text>
        <Text style={[styles.compatibilityInfo, { color: theme.colors.neutral.text }]}>
          👥 Team compatibility: 88%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboardSection: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  dashboardTitle: {
  ...typography.bodyLarge,
  fontWeight: '600',
    marginBottom: 16,
  },
  dashboardMetrics: {
    gap: 12,
  },
  metricItem: {
    marginBottom: 8,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  metricLabel: {
  ...typography.body,
  fontWeight: '500',
  },
  metricValue: {
  ...typography.body,
  fontWeight: '600',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  additionalInfo: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    gap: 8,
  },
  timingInfo: {
  ...typography.body,
  fontWeight: '500',
  },
  compatibilityInfo: {
  ...typography.body,
  fontWeight: '500',
  },
});
