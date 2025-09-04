/**
 * Cosmic Welcome Section Component
 * 
 * Handles the hero section with user greeting, ascendant badge,
 * and business intelligence dashboard metrics.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { corpAstroDarkTheme } from '../DesignSystem/DarkTheme';
import { typography, borderOpacity } from '../DesignSystem/designTokens';

interface CosmicWelcomeSectionProps {
  greeting: string;
  userName: string;
}

export const CosmicWelcomeSection: React.FC<CosmicWelcomeSectionProps> = ({
  greeting,
  userName,
}) => {
  const theme = corpAstroDarkTheme;

  return (
    <View style={styles.modernWelcomeSection}>
      {/* Hero Section */}
      <View style={[styles.professionalHeroCard, { 
        backgroundColor: theme.colors.cosmos.deep,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
      }]}>
        {/* Greeting Section */}
        <View style={styles.heroMainSection}>
          <View style={styles.greetingSection}>
            <Text style={[styles.greetingTime, { 
              color: theme.colors.neutral.light,
              ...typography.caption, // 12px for accessibility compliance  
              fontWeight: '400',
              marginBottom: 4,
              opacity: 0.95, // Improved contrast for accessibility compliance
            }]}>
              {greeting}
            </Text>
            <Text style={[styles.userName, { 
              color: theme.colors.neutral.text,
              ...typography.heading3, // 20px - proper hierarchy with 1.67x ratio from greeting
              fontWeight: '600',
              marginBottom: 2,
            }]}>
              {userName}
            </Text>
          </View>
          
          {/* Ascendant Badge */}
          <View style={[styles.ascendantBadge, { 
            backgroundColor: theme.colors.brand.primary,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 6,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }]}>
            <Text style={[styles.ascendantSymbol, { 
              color: '#000000',
              ...typography.body, // 14px for proper icon size
              fontWeight: '600',
            }]}>♈</Text>
            <View style={styles.ascendantInfo}>
              <Text style={[styles.ascendantLabel, { 
                color: '#000000',
                ...typography.caption, // Updated to meet 12px minimum accessibility requirement
                fontWeight: '500',
                opacity: 0.9, // Improved contrast for accessibility compliance
              }]}>ASC</Text>
              <Text style={[styles.ascendantSign, { 
                color: '#000000',
                ...typography.caption, // 12px for accessibility compliance
                fontWeight: '600',
              }]}>Aries</Text>
            </View>
          </View>
        </View>

        {/* Value Proposition */}
        <View style={[styles.introSection, { 
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: `rgba(255, 255, 255, ${borderOpacity.subtle})`, // Standardized using design tokens
          marginTop: 12,
        }]}>
          <Text style={[styles.introTagline, { 
            color: theme.colors.brand.primary,
            ...typography.body, // 14px - clear hierarchy step from description
            fontWeight: '500',
            textAlign: 'center',
            marginBottom: 6,
          }]}>
            Align Your Success with the Stars
          </Text>
          <Text style={[styles.introDescription, { 
            color: theme.colors.neutral.light,
            ...typography.caption, // 12px for accessibility compliance
            fontWeight: '400',
            lineHeight: 16,
            textAlign: 'center',
            opacity: 0.9, // Improved contrast for accessibility compliance
          }]}>
            Transform astrological wisdom into actionable business intelligence
          </Text>
        </View>
      </View>

      {/* Business Intelligence Dashboard */}
      <View style={[styles.businessDashboard, { 
        backgroundColor: theme.colors.cosmos.deep,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: `rgba(255, 255, 255, ${borderOpacity.subtle})`, // Standardized using design tokens
      }]}>
        <View style={styles.dashboardHeader}>
          <View style={styles.dashboardTitleSection}>
            <Text style={[styles.dashboardTitle, { 
              color: theme.colors.neutral.text,
              ...typography.bodyLarge, // 16px for improved hierarchy
              fontWeight: '600',
              marginBottom: 2,
            }]}>
              Business Intelligence
            </Text>
            <Text style={[styles.dashboardSubtitle, { 
              color: theme.colors.neutral.light,
              ...typography.caption, // 12px for accessibility compliance
              fontWeight: '400',
              opacity: 0.9, // Improved contrast for accessibility compliance
            }]}>
              Today's insights and recommendations
            </Text>
          </View>
          <View style={[styles.liveIndicator, { 
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderRadius: 8,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderWidth: 1,
            borderColor: 'rgba(76, 175, 80, 0.3)',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }]}>
            <View style={[styles.pulseIndicator, { 
              backgroundColor: '#4CAF50',
              width: 4,
              height: 4,
              borderRadius: 2,
            }]} />
            <Text style={[styles.liveText, { 
              color: '#4CAF50',
              ...typography.caption, // Updated to meet 12px minimum accessibility requirement
              fontWeight: '500',
            }]}>LIVE</Text>
          </View>
        </View>
        
        <View style={[styles.metricsGrid, { marginTop: 12, gap: 10 }]}>
          <View style={[styles.metricCard, { 
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderRadius: 8,
            padding: 12,
            borderWidth: 1,
            borderColor: 'rgba(76, 175, 80, 0.2)',
            alignItems: 'center',
          }]}>
            <View style={[styles.metricIcon, { 
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              borderRadius: 12,
              width: 24,
              height: 24,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 6,
            }]}>
              <Text style={[styles.metricIconText, { ...typography.caption }]}>📈</Text>
            </View>
            <Text style={[styles.metricLabel, { 
              color: theme.colors.neutral.light,
              ...typography.caption, // Updated to meet 12px minimum accessibility requirement
              fontWeight: '400',
              marginBottom: 2,
            }]}>Markets</Text>
            <Text style={[styles.metricValue, { 
              color: '#4CAF50',
              ...typography.caption, // 12px for accessibility compliance
              fontWeight: '600',
            }]}>+2.4%</Text>
          </View>
          
          <View style={[styles.metricCard, { 
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderRadius: 8,
            padding: 12,
            borderWidth: 1,
            borderColor: 'rgba(255, 193, 7, 0.2)',
            alignItems: 'center',
          }]}>
            <View style={[styles.metricIcon, { 
              backgroundColor: 'rgba(255, 193, 7, 0.1)',
              borderRadius: 12,
              width: 24,
              height: 24,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 6,
            }]}>
              <Text style={[styles.metricIconText, { ...typography.caption }]}>⚡</Text>
            </View>
            <Text style={[styles.metricLabel, { 
              color: theme.colors.neutral.light,
              ...typography.caption, // Updated to meet 12px minimum accessibility requirement
              fontWeight: '400',
              marginBottom: 2,
            }]}>Energy</Text>
            <Text style={[styles.metricValue, { 
              color: '#FFC107',
              ...typography.caption, // 12px for accessibility compliance
              fontWeight: '600',
            }]}>High</Text>
          </View>
          
          <View style={[styles.metricCard, { 
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderRadius: 8,
            padding: 12,
            borderWidth: 1,
            borderColor: 'rgba(156, 39, 176, 0.2)',
            alignItems: 'center',
          }]}>
            <View style={[styles.metricIcon, { 
              backgroundColor: 'rgba(156, 39, 176, 0.1)',
              borderRadius: 12,
              width: 24,
              height: 24,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 6,
            }]}>
              <Text style={[styles.metricIconText, { ...typography.caption }]}>🌟</Text>
            </View>
            <Text style={[styles.metricLabel, { 
              color: theme.colors.neutral.light,
              ...typography.caption, // Updated to meet 12px minimum accessibility requirement
              fontWeight: '400',
              marginBottom: 2,
            }]}>Fortune</Text>
            <Text style={[styles.metricValue, { 
              color: '#9C27B0',
              ...typography.caption, // 12px for accessibility compliance
              fontWeight: '600',
            }]}>87%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modernWelcomeSection: {
    // Container styles
  },
  professionalHeroCard: {
    // Hero card styles
  },
  heroMainSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greetingSection: {
    flex: 1,
  },
  greetingTime: {
    // Text styles handled by props
  },
  userName: {
    // Text styles handled by props
  },
  ascendantBadge: {
    // Badge styles handled by inline styles
  },
  ascendantSymbol: {
    // Text styles handled by props
  },
  ascendantInfo: {
    alignItems: 'center',
  },
  ascendantLabel: {
    // Text styles handled by props
  },
  ascendantSign: {
    // Text styles handled by props
  },
  introSection: {
    // Section styles handled by inline styles
  },
  introTagline: {
    // Text styles handled by props
  },
  introDescription: {
    // Text styles handled by props
  },
  businessDashboard: {
    // Dashboard styles handled by inline styles
  },
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dashboardTitleSection: {
    flex: 1,
  },
  dashboardTitle: {
    // Text styles handled by props
  },
  dashboardSubtitle: {
    // Text styles handled by props
  },
  liveIndicator: {
    // Indicator styles handled by inline styles
  },
  pulseIndicator: {
    // Pulse styles handled by inline styles
  },
  liveText: {
    // Text styles handled by props
  },
  metricsGrid: {
    flexDirection: 'row',
  },
  metricCard: {
    // Card styles handled by inline styles
  },
  metricIcon: {
    // Icon styles handled by inline styles
  },
  metricIconText: {
    // Text styles handled by props
  },
  metricLabel: {
    // Text styles handled by props
  },
  metricValue: {
    // Text styles handled by props
  },
});
