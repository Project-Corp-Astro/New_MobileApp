/**
 * Cosmic Welcome Section Component
 *
 * Handles the hero section with user greeting, ascendant badge,
 * and business intelligence dashboard metrics.
 *
 * Updated: uses corpAstroDarkTheme.mystical.light for hero background and
 * corpAstroDarkTheme.mystical.glow for the business dashboard background.
 */

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Platform,
  AccessibilityInfo,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { corpAstroDarkTheme } from "../DesignSystem/DarkTheme";
import { typography, borderOpacity, spacing } from "../DesignSystem/designTokens";

interface CosmicWelcomeSectionProps {
  greeting?: string;
  userName: string;
}

export const CosmicWelcomeSection: React.FC<CosmicWelcomeSectionProps> = ({
  greeting,
  userName,
}) => {
  const theme = corpAstroDarkTheme;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(18)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Accessibility: reduce motion respect
  useEffect(() => {
    let shouldAnimate = true;

    const checkReduceMotion = async () => {
      if (Platform.OS === "web") {
        // web fallback: assume animations ok
        shouldAnimate = true;
      } else {
        const reduceMotion = await AccessibilityInfo.isReduceMotionEnabled();
        shouldAnimate = !reduceMotion;
      }

      // Entrance animation
      if (shouldAnimate) {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(slideUpAnim, {
            toValue: 0,
            duration: 700,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();

        // pulse loop
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.06,
              duration: 900,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 900,
              useNativeDriver: true,
            }),
          ])
        ).start();
      } else {
        fadeAnim.setValue(1);
        slideUpAnim.setValue(0);
        pulseAnim.setValue(1);
      }
    };

    checkReduceMotion();
  }, [fadeAnim, slideUpAnim, pulseAnim]);

  const getGreeting = () => {
    if (greeting) return greeting;
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const currentTime = new Date();

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] },
      ]}
    >
      {/* HERO: uses mystical.light as overall background and theme-based gradient */}
      <View
        style={[
          styles.heroOuter,
          { backgroundColor: String(theme.colors.mystical.light) },
        ]}
      >
       <View style={styles.heroCard}  >
          <View style={styles.heroContent}>
            <View style={styles.heroLeft}>
              <Text
                accessibilityRole="header"
                accessibilityLabel={`${getGreeting()} ${userName}`}
                style={[styles.greeting, typography.heading3]}
              >
                {getGreeting()}, {userName}
              </Text>

              <Text style={[styles.subtitle, typography.body]}>
                Your cosmic journey begins here
              </Text>

              <Text style={[styles.time, typography.body]}>
                {formatTime(currentTime)}
              </Text>

              <View style={styles.zodiacInfo}>
                <View style={styles.zodiacItem}>
                  <Text style={[styles.zodiacLabel, typography.caption]}>Sun Sign</Text>
                  <Text style={[styles.zodiacValue, typography.bodyLarge]}>Leo</Text>
                </View>

                <View style={styles.zodiacItem}>
                  <Text style={[styles.zodiacLabel, typography.caption]}>Moon Sign</Text>
                  <Text style={[styles.zodiacValue, typography.bodyLarge]}>Taurus</Text>
                </View>
              </View>
            </View>

            <View style={styles.heroRight}>
              <Animated.View style={[styles.zodiacIcon, { transform: [{ scale: pulseAnim }] }]}>
                <LinearGradient
                  colors={[String(theme.colors.brand.primary), String(theme.colors.mystical.royal)]}
                  style={styles.zodiacGradient}
                >
                  <Text accessible accessibilityLabel="Ascendant symbol" style={styles.zodiacSymbol}>
                    ♌
                  </Text>
                </LinearGradient>
              </Animated.View>
            </View>
          </View>
          </View>
      </View>

      {/* BUSINESS DASHBOARD: mystical.glow background */}
      <View
        style={[
          styles.dashboard,
          {
            backgroundColor: String(theme.colors.mystical.glow),
            borderColor: `rgba(255,255,255,${borderOpacity.subtle})`,
          },
        ]}
        accessibilityLabel="Business intelligence dashboard"
      >
        <View style={styles.dashboardHeader}>
          <View style={styles.dashboardTitleSection}>
            <Text style={[styles.dashboardTitle, typography.bodyLarge, { color: String(theme.colors.neutral.light) }]}>
              Business Intelligence
            </Text>
            <Text style={[styles.dashboardSubtitle, typography.caption, { color: String(theme.colors.neutral.light) }]}>
              Today's insights and recommendations
            </Text>
          </View>

          <View style={styles.liveIndicator}>
            <View style={styles.pulseIndicator} />
            <Text style={[styles.liveText, typography.caption]}>LIVE</Text>
          </View>
        </View>

        <View style={styles.metricsGrid}>
          <View
            style={[
              styles.metricCard,
              { borderColor: theme.colors.cosmos.medium },
            ]}
          >
            <View style={[styles.metricIcon, { backgroundColor: "rgba(76,175,80,0.08)" }]}>
              <Text style={[styles.metricIconText, typography.caption]}>📈</Text>
            </View>
            <Text style={[styles.metricLabel, typography.caption, { color: String(theme.colors.neutral.light) }]}>
              Markets
            </Text>
            <Text style={[styles.metricValue, typography.bodyLarge, { color: "#4CAF50" }]}>+2.4%</Text>
          </View>

          <View
            style={[
              styles.metricCard,
              { borderColor: theme.colors.cosmos.medium },
            ]}
          >
            <View style={[styles.metricIcon, { backgroundColor: "rgba(255,193,7,0.08)" }]}>
              <Text style={[styles.metricIconText, typography.caption]}>⚡</Text>
            </View>
            <Text style={[styles.metricLabel, typography.caption, { color: String(theme.colors.neutral.light) }]}>
              Energy
            </Text>
            <Text style={[styles.metricValue, typography.bodyLarge, { color: "#FFC107" }]}>High</Text>
          </View>

          <View
            style={[
              styles.metricCard,
              { borderColor: theme.colors.cosmos.medium },
            ]}
          >
            <View style={[styles.metricIcon, { backgroundColor: "rgba(156,39,176,0.08)" }]}>
              <Text style={[styles.metricIconText, typography.caption]}>🌟</Text>
            </View>
            <Text style={[styles.metricLabel, typography.caption, { color: String(theme.colors.neutral.light) }]}>
              Fortune
            </Text>
            <Text style={[styles.metricValue, typography.bodyLarge, { color: "#9C27B0" }]}>87%</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default CosmicWelcomeSection;

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.lg,
  },

  // Hero
  heroOuter: {
    marginHorizontal: spacing.md,
    borderRadius: 14,
    overflow: "hidden",
  },
  heroCard: {
    borderRadius: 14,
    padding: spacing.sm,

  },
  heroContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  heroLeft: {
    flex: 1,
    paddingRight: spacing.md,
  },
  heroRight: {
    width: 72,
    alignItems: "center",
    justifyContent: "center",
  },

  greeting: {
    color: "#FFFFFF",
    fontWeight: "700",
    marginBottom: 4,
    fontSize: 18,
  },
  subtitle: {
    color: "rgba(255,255,255,0.78)",
    marginBottom: 6,
    fontSize: 12,
  },
  time: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 14,
  },

  zodiacInfo: {
    flexDirection: "row",
    gap: spacing.sm as any,
  },
  zodiacItem: {
    alignItems: "center",
    marginRight: spacing.md,
  },
  zodiacLabel: {
    fontSize: 9,
    color: "rgba(255,255,255,0.66)",
    marginBottom: 2,
  },
  zodiacValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  zodiacIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
  },
  zodiacGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  zodiacSymbol: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },

  // Dashboard
  dashboard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
  },
  dashboardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dashboardTitleSection: {
    flex: 1,
    paddingRight: spacing.md,
  },
  dashboardTitle: {
    fontWeight: "600",
    marginBottom: 2,
    fontSize: 14,
  },
  dashboardSubtitle: {
    opacity: 0.95,
    marginBottom: 0,
    fontSize: 11,
  },

  // LIVE indicator
  liveIndicator: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderColor: "rgba(76,175,80,0.28)",
    backgroundColor: "rgba(76,175,80,0.06)",
  },
  pulseIndicator: {
    backgroundColor: "#4CAF50",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  liveText: {
    color: "#4CAF50",
    fontWeight: "600",
    fontSize: 11,
  },

  // Metrics
  metricsGrid: {
    flexDirection: "row",
    marginTop: spacing.sm,
    justifyContent: "space-between",
    gap: spacing.sm as any,
  },
  metricCard: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.02)",
    alignItems: "center",
    borderWidth: 1,
    marginHorizontal: 3,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  metricIconText: {
    fontSize: 12,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: "700",
  },
});
