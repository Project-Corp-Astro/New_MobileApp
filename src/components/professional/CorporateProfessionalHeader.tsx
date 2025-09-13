/**
 * Corporate Header - Corp Astro
 *
 * Supports two variants:
 * 1. professional → Title + Subtitle on left, right icons
 * 2. centered     → Title centered, back button on left
 *
 * @format
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Design system
import { corpAstroDarkTheme } from "../DesignSystem/DarkTheme";
import { spacing, typography, colors, radius } from "../DesignSystem/designTokens";

type RootStackParamList = {
  Home: undefined;
  ProfileScreen: undefined;
  NotificationScreen: undefined;
};

interface CorporateHeaderProps {
  title?: string;
  subtitle?: string;
  variant?: "professional" | "centered";
  showBackButton?: boolean;
  showNotificationIcon?: boolean;
  onBackPress?: () => void;
  onNotificationPress?: () => void;
  rightComponent?: React.ReactNode;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const CorporateHeader = ({
  title="CORP ASTRO",
  subtitle="Business Intelligence",
  variant = "professional",
  showBackButton = false,
  showNotificationIcon = false,
  onBackPress,
  onNotificationPress,
  rightComponent,
  navigation,
}: CorporateHeaderProps) => {
  const route = useRoute();

  // Default title fallback = screen name
  const resolvedTitle = title || (route.name as string);

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />

      <View style={styles.container}>
        <LinearGradient
          colors={[
            "rgba(30, 39, 114, 0.98)", // corporate blue
            "rgba(15, 20, 70, 0.99)", // deep professional blue
            corpAstroDarkTheme.colors.cosmos.void, // theme background
          ]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <SafeAreaView>
            <View style={styles.header}>
              {/* Variant: professional */}
              {variant === "professional" && (
                <>
                  {/* Left - Back + Title/SubTitle */}
                  <View style={styles.leftSection}>
                    {showBackButton && (
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={onBackPress || (() => navigation.goBack())}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                      </TouchableOpacity>
                    )}

                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>{resolvedTitle}</Text>
                      {subtitle && (
                        <Text style={styles.subtitle}>{subtitle}</Text>
                      )}
                    </View>
                  </View>

                  {/* Spacer for balance */}
                  <View style={styles.centerSection} />

                  {/* Right Section */}
                  <View style={styles.rightSection}>
                    {rightComponent || (
                      <View style={styles.rightIconsContainer}>
                        {showNotificationIcon && (
                          <TouchableOpacity
                            onPress={() => navigation.navigate("NotificationScreen")}
                            activeOpacity={0.7}
                            style={[styles.iconButton, styles.notificationButton]}
                          >
                            <Ionicons
                              name="notifications-outline"
                              size={22}
                              color="#FFFFFF"
                            />
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          onPress={() => navigation.navigate("ProfileScreen")}
                          activeOpacity={0.7}
                          style={styles.avatarContainer}
                        >
                          <View style={styles.avatar}>
                            <Text style={styles.avatarText}>RK</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </>
              )}

              {/* Variant: centered */}
              {variant === "centered" && (
                <>
                  {/* Left - Back */}
                  {showBackButton && (
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={onBackPress || (() => navigation.goBack())}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  )}

                  {/* Center - Title */}
                  <Text style={styles.centeredTitle}>{resolvedTitle}</Text>
                  

                  {/* Right - placeholder for symmetry */}
                  <View style={{ width: 34 }} />
                </>
              )}
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  gradient: {
    paddingHorizontal: spacing.md, // 16
    paddingBottom: spacing.sm,     // 8
    paddingTop: spacing.xs,        // 4
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 90,
    paddingTop: spacing.sm, // 8
  },
  // Professional
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.xs, // 4
  },
  titleContainer: {
    marginLeft: spacing.xs, // 4
  },
  title: {
    ...typography.heading3,
    color: colors.text.primary,
    letterSpacing: 0.5,
  },
  subtitle: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
  centerSection: {
    width: 40,
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8
  },
  notificationButton: {
    marginRight: spacing.xs, // 4
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: radius.xl, // 16
    backgroundColor: colors.surface.primary, // Using primary surface color
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.default, // Using default border color
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: radius.xl, // 16
    backgroundColor: colors.surface.secondary, // Using secondary surface for contrast
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.text.primary, // Using primary text color
    ...typography.bodyLarge,
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 36,
  },
  // Centered
  centeredTitle: {
    ...typography.heading3,
    color: colors.text.primary,
    textAlign: 'center',
    flex: 1,
    marginLeft: spacing.md,
  },
  // Common
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: radius.xl, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

// Wrapper
const CorporateHeaderWrapper = (
  props: Omit<CorporateHeaderProps, "navigation">
) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return <CorporateHeader {...props} navigation={navigation} />;
};

export default CorporateHeaderWrapper;
