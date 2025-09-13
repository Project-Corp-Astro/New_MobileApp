/**
 * Professional Auspicious Timings Card - Clean Version
 * 
 * A sophisticated, business-grade component for displaying astrological timing information.
 * Features glassmorphism design, smooth animations, and professional visual feedback.
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  ViewStyle,
} from 'react-native';
import { corpAstroDarkTheme } from '../DesignSystem/DarkTheme';

interface TimingData {
  name: string;
  time: string;
  type: 'auspicious' | 'avoid' | 'neutral';
  description?: string;
  intensity?: 'low' | 'medium' | 'high';
  category?: 'business' | 'financial' | 'personal' | 'health' | 'general';
  panchang?: {
    nakshatra?: string;
    nature?: string;
    deity?: string;
    type?: string;
    duration?: string;
    meaning?: string;
    ruler?: string;
    energy?: string;
    vara?: string;
    speciality?: string;
    paksha?: string;
    tithis?: string;
    advice?: string;
    tithi?: string;
    impact?: string;
    caution?: string;
  };
}

interface ProfessionalTimingsCardProps {
  timing: TimingData;
  index: number;
  onPress?: (timing: TimingData) => void;
  style?: ViewStyle;
}

const ProfessionalTimingsCard: React.FC<ProfessionalTimingsCardProps> = ({
  timing,
  index,
  onPress,
  style,
}) => {
  const theme = corpAstroDarkTheme;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const delay = index * 150;
    
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        delay: delay + 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (timing.type === 'auspicious') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [index, timing.type]);

  const getCardColors = () => {
    const { colors } = theme;
    switch (timing.type) {
      case 'auspicious':
        return {
          // Using brand colors for auspicious items
          borderColor: String(colors.brand.primary),
          gradientStart: `${String(colors.brand.primary)}2E`,
          gradientEnd: `${String(colors.brand.primary)}14`,
          accentColor: String(colors.brand.light),
          glowColor: `${String(colors.brand.glow)}40`,
          shadowColor: `${String(colors.brand.primary)}66`,
        };
      case 'avoid':
        return {
          // Using mystical colors for avoid items
          borderColor: String(colors.mystical.deep),
          gradientStart: `${String(colors.mystical.royal)}2E`,
          gradientEnd: `${String(colors.mystical.deep)}14`,
          accentColor: String(colors.mystical.light),
          glowColor: `${String(colors.mystical.glow)}40`,
          shadowColor: `${String(colors.mystical.royal)}66`,
        };
      default:
        return {
          // Using cosmos colors for neutral items
          borderColor: String(colors.cosmos.medium),
          gradientStart: `${String(colors.cosmos.dark)}2E`,
          gradientEnd: `${String(colors.cosmos.void)}14`,
          accentColor: String(colors.neutral.light),
          glowColor: `${String(colors.neutral.medium)}20`,
          shadowColor: `${String(colors.cosmos.medium)}33`,
        };
    }
  };

  const getIntensityIcon = () => {
    switch (timing.intensity) {
      case 'high': return '●●●';
      case 'medium': return '●●○';
      case 'low': return '●○○';
      default: return '●●';
    }
  };

  const getCategoryIcon = () => {
    switch (timing.category) {
      case 'business': return '💼';
      case 'financial': return '💰';
      case 'personal': return '👤';
      case 'health': return '⚡';
      default: return '🎯';
    }
  };

  const colors = getCardColors();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
        style,
      ]}
    >
      <Pressable
        onPress={() => onPress?.(timing)}
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: theme.colors.cosmos.deep,
            borderColor: colors.borderColor,
            shadowColor: colors.shadowColor,
            shadowOffset: {
              width: 0,
              height: pressed ? 2 : 4,
            },
            shadowOpacity: pressed ? 0.15 : 0.25,
            shadowRadius: pressed ? 3 : 6,
            elevation: pressed ? 2 : 6,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}
      >
        <View
          style={[
            styles.glassmorphismBackground,
            {
              backgroundColor: colors.gradientStart,
            },
          ]}
        />

        {timing.type === 'auspicious' && (
          <Animated.View
            style={[
              styles.glowEffect,
              {
                backgroundColor: theme.colors.cosmos.deep,
                opacity: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.25],
                }),
              },
            ]}
          />
        )}

        <View style={styles.cardHeader}>
          <View style={styles.titleSection}>
            <View style={styles.titleRow}>
              <Text style={[styles.categoryIcon, { color: colors.accentColor }]}>
                {getCategoryIcon()}
              </Text>
              <Text style={[styles.timingName, { color: theme.colors.neutral.text }]}>
                {timing.name}
              </Text>
            </View>
            {timing.intensity && (
              <Text style={[styles.intensityIndicator, { color: colors.accentColor }]}>
                {getIntensityIcon()}
              </Text>
            )}
          </View>
          
          <View style={[styles.statusIndicator, { backgroundColor: colors.accentColor }]}>
            <View style={styles.statusDot} />
          </View>
        </View>

        <View style={styles.timeSection}>
          <Text style={[styles.timeLabel, { color: theme.colors.neutral.light }]}>
            Timing
          </Text>
          <Text style={[styles.timeValue, { color: theme.colors.neutral.text }]}>
            {timing.time}
          </Text>
        </View>

        {timing.description && (
          <View style={styles.descriptionSection}>
            <Text style={[styles.description, { color: theme.colors.neutral.light }]}>
              {timing.description}
            </Text>
          </View>
        )}

        {timing.panchang && (
          <View style={styles.panchangSection}>
            <Text style={[styles.panchangTitle, { color: theme.colors.brand.primary }]}>
              Vedic Context
            </Text>
            <View style={styles.panchangDetails}>
              {timing.panchang.nakshatra && (
                <View style={styles.panchangItem}>
                  <Text style={[styles.panchangLabel, { color: theme.colors.neutral.light }]}>
                    {timing.panchang.nakshatra}
                  </Text>
                </View>
              )}
              {timing.panchang.nature && (
                <View style={styles.panchangItem}>
                  <Text style={[styles.panchangValue, { color: theme.colors.neutral.text }]}>
                    {timing.panchang.nature}
                  </Text>
                </View>
              )}
              {timing.panchang.deity && (
                <View style={styles.panchangItem}>
                  <Text style={[styles.panchangDeity, { color: colors.accentColor }]}>
                    Deity: {timing.panchang.deity}
                  </Text>
                </View>
              )}
              {timing.panchang.meaning && (
                <View style={styles.panchangItem}>
                  <Text style={[styles.panchangMeaning, { color: theme.colors.neutral.light }]}>
                    {timing.panchang.meaning}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        <View style={styles.cardFooter}>
          <View style={[styles.typeTag, { backgroundColor: colors.accentColor + '20' }]}>
            <Text style={[styles.typeTagText, { color: colors.accentColor }]}>
              {timing.type.toUpperCase()}
            </Text>
          </View>
          
          <View style={styles.actionHint}>
            <Text style={[styles.actionHintText, { color: theme.colors.neutral.light }]}>
              Tap for details
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    marginBottom: 16,
    minHeight: 160,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    minHeight: 140,
    flex: 1,
  },
  glassmorphismBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  glowEffect: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 18,
    zIndex: -1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 14,
    paddingBottom: 10,
  },
  titleSection: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  timingName: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    lineHeight: 20,
  },
  intensityIndicator: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 3,
  },
  timeSection: {
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timeValue: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  descriptionSection: {
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
    fontStyle: 'italic',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeTagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  actionHint: {
    opacity: 0.7,
  },
  actionHintText: {
    fontSize: 11,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  panchangSection: {
    paddingHorizontal: 14,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    marginTop: 4,
  },
  panchangTitle: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  panchangDetails: {
    gap: 3,
  },
  panchangItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  panchangLabel: {
    fontSize: 11,
    fontWeight: '500',
    flex: 1,
  },
  panchangValue: {
    fontSize: 11,
    fontWeight: '400',
  },
  panchangDeity: {
    fontSize: 10,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  panchangMeaning: {
    fontSize: 10,
    fontWeight: '400',
    fontStyle: 'italic',
    opacity: 0.8,
  },
});

export default ProfessionalTimingsCard;
export type { TimingData, ProfessionalTimingsCardProps };
