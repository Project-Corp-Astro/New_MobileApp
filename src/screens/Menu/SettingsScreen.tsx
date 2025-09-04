/**
 * Corp Astro - Premium Settings Screen
 * 
 * Professional settings screen following the home screen design system.
 * Matches Services screen patterns with consistent card layouts and spacing.
 * 
 * @module SettingsScreen
 * @version 2.0.0
 * @since 2025
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Switch,
  Alert,
  Dimensions,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  // Add other screens as needed
};

// Design System - Import the same design tokens as Services screen
import { corpAstroDarkTheme } from '../../components/DesignSystem/DarkTheme';
import { designTokens, spacing, typography, radius, colors, shadows, cards, badges, animations } from '../../components/DesignSystem/designTokens';

// Components
import CorporateProfessionalHeader from '../../components/professional/CorporateProfessionalHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  iconType?: 'ionicons' | 'material';
  type: 'toggle' | 'button' | 'info';
  value?: boolean | string;
  action?: () => void;
  premium?: boolean;
  energyType?: string;
}

interface SettingSection {
  title: string;
  subtitle: string;
  description: string;
  energy: string;
  items: SettingItem[];
}

/**
 * Premium Settings Screen Component
 * 
 * Settings management following the Services screen design patterns.
 * Uses the same card layouts, spacing, and visual hierarchy.
 */
type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const [notifications, setNotifications] = useState(true);
  const [dailyHoroscope, setDailyHoroscope] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [emailReports, setEmailReports] = useState(false);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleBack = () => {
    navigation.goBack();
  };

  const showComingSoon = () => {
    Alert.alert(
      "Coming Soon",
      "This feature will be available in a future update.",
      [{ text: "OK", style: "default" }]
    );
  };

  const showPremiumRequired = () => {
    Alert.alert(
      "Premium Feature",
      "This feature requires a premium subscription. Would you like to upgrade?",
      [
        { text: "Not Now", style: "cancel" },
        { text: "Upgrade", style: "default", onPress: () => {
          // Replace with your actual subscription screen navigation
          // navigation.navigate('Subscription');
          Alert.alert('Subscription', 'Subscription screen would open here');
        }}
      ]
    );
  };

  // ============================================================================
  // SETTINGS CONFIGURATION - Following Services Screen Pattern
  // ============================================================================

  const settingSections: SettingSection[] = [
    {
      title: "Notifications & Alerts",
      subtitle: "Stay informed with timely updates",
      description: "Manage your notification preferences and customize how you receive cosmic insights and important updates.",
      energy: "Communication",
      items: [
        {
          id: 'push-notifications',
          title: 'Push Notifications',
          subtitle: 'Essential alerts and updates',
          icon: 'notifications',
          type: 'toggle',
          value: notifications,
          action: () => setNotifications(!notifications),
          energyType: 'Essential',
        },
        {
          id: 'daily-horoscope',
          title: 'Daily Horoscope',
          subtitle: 'Morning cosmic insights',
          icon: 'sunny',
          type: 'toggle',
          value: dailyHoroscope,
          action: () => setDailyHoroscope(!dailyHoroscope),
          energyType: 'Daily',
        },
        {
          id: 'email-reports',
          title: 'Email Reports',
          subtitle: 'Weekly business insights via email',
          icon: 'mail',
          type: 'toggle',
          value: emailReports,
          action: () => setEmailReports(!emailReports),
          energyType: 'Business',
          premium: true,
        },
      ]
    },
    {
      title: "Astrology & Charts",
      subtitle: "Customize your cosmic experience",
      description: "Personalize your astrology settings and chart preferences to align with your spiritual journey and business needs.",
      energy: "Cosmic",
      items: [
        {
          id: 'birth-details',
          title: 'Birth Details',
          subtitle: 'Update your cosmic blueprint',
          icon: 'person-circle',
          type: 'button',
          action: showComingSoon,
          energyType: 'Identity',
        },
        {
          id: 'chart-style',
          title: 'Chart Style',
          subtitle: 'North Indian Traditional',
          icon: 'pie-chart',
          type: 'button',
          action: showComingSoon,
          energyType: 'Traditional',
        },
        {
          id: 'house-system',
          title: 'House System',
          subtitle: 'Placidus (Western)',
          icon: 'home',
          type: 'button',
          action: showPremiumRequired,
          energyType: 'Advanced',
          premium: true,
        },
        {
          id: 'calculation-preferences',
          title: 'Calculation Preferences',
          subtitle: 'Ayanamsa & time settings',
          icon: 'calculator',
          type: 'button',
          action: showPremiumRequired,
          energyType: 'Precision',
          premium: true,
        },
      ]
    },
    {
      title: "Security & Privacy",
      subtitle: "Protect your personal data",
      description: "Secure your cosmic information with advanced privacy settings and authentication methods.",
      energy: "Protection",
      items: [
        {
          id: 'biometric-auth',
          title: 'Biometric Authentication',
          subtitle: 'Secure app access with Face/Touch ID',
          icon: 'finger-print',
          type: 'toggle',
          value: biometricAuth,
          action: () => setBiometricAuth(!biometricAuth),
          energyType: 'Security',
        },
        {
          id: 'auto-sync',
          title: 'Auto Sync',
          subtitle: 'Keep data synchronized across devices',
          icon: 'sync',
          type: 'toggle',
          value: autoSync,
          action: () => setAutoSync(!autoSync),
          energyType: 'Sync',
        },
        {
          id: 'privacy-policy',
          title: 'Privacy Policy',
          subtitle: 'View our privacy practices',
          icon: 'shield-checkmark',
          type: 'button',
          action: showComingSoon,
          energyType: 'Legal',
        },
        {
          id: 'data-export',
          title: 'Export My Data',
          subtitle: 'Download your cosmic information',
          icon: 'download',
          type: 'button',
          action: showComingSoon,
          energyType: 'Data',
        },
      ]
    },
    {
      title: "Support & Information",
      subtitle: "Get help and app details",
      description: "Access support resources, app information, and connect with our team for assistance.",
      energy: "Support",
      items: [
        {
          id: 'help-center',
          title: 'Help Center',
          subtitle: 'Get support and answers',
          icon: 'help-circle',
          type: 'button',
          action: showComingSoon,
          energyType: 'Assistance',
        },
        {
          id: 'contact-us',
          title: 'Contact Us',
          subtitle: 'Reach our support team',
          icon: 'chatbubble',
          type: 'button',
          action: showComingSoon,
          energyType: 'Contact',
        },
        {
          id: 'app-version',
          title: 'App Version',
          subtitle: '2.0.0 (Premium)',
          icon: 'information-circle',
          type: 'info',
          energyType: 'Info',
        },
        {
          id: 'check-updates',
          title: 'Check for Updates',
          subtitle: 'Latest version available',
          icon: 'refresh',
          type: 'button',
          action: showComingSoon,
          energyType: 'Update',
        },
      ]
    },
  ];

  // ============================================================================
  // RENDER HELPERS - Following Services Screen Pattern
  // ============================================================================

  const renderSettingItem = (item: SettingItem, sectionIndex: number) => {
    const IconComponent = item.iconType === 'material' ? MaterialIcons : Ionicons;
    
    return (
      <Pressable
        key={item.id}
        style={({ pressed }) => [
          styles.settingCard,
          {
            transform: [{ scale: pressed ? animations.pressedScale : 1 }],
            opacity: pressed ? 0.9 : 1,
          }
        ]}
        onPress={item.action}
        accessibilityLabel={`${item.title} setting`}
        accessibilityHint={`Double tap to ${item.type === 'toggle' ? 'toggle' : 'access'} ${item.title}`}
        accessibilityRole="button"
        disabled={item.type === 'info'}
      >
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.06)', 'rgba(255, 255, 255, 0.02)']}
          style={styles.cardGradient}
        >
          {/* Premium Badge - Same as Services screen */}
          {item.premium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>💎 PRO</Text>
            </View>
          )}
          
          {/* Card Content */}
          <View style={styles.settingCardContent}>
            {/* Icon Section */}
            <View style={styles.settingIconContainer}>
              <IconComponent
                name={item.icon as any}
                size={24}
                color={colors.text.primary}
              />
            </View>

            {/* Text Content */}
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>{item.title}</Text>
              <Text style={styles.energyType}>{item.energyType}</Text>
              {item.subtitle && (
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              )}
            </View>

            {/* Action Section */}
            <View style={styles.settingActionContainer}>
              {item.type === 'toggle' ? (
                <Switch
                  value={item.value as boolean}
                  onValueChange={() => item.action?.()}
                  trackColor={{ 
                    false: 'rgba(255, 255, 255, 0.2)', 
                    true: colors.brand.primary 
                  }}
                  thumbColor={item.value ? '#FFFFFF' : '#CCCCCC'}
                />
              ) : item.type === 'button' ? (
                <View style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Access</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={colors.text.secondary}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </LinearGradient>
      </Pressable>
    );
  };

  const renderSection = (section: SettingSection, index: number) => {
    const sectionGradients = [
      ['#4A148C', '#7B1FA2'], // Purple
      ['#1A237E', '#3F51B5'], // Blue
      ['#004D40', '#00695C'], // Teal
      ['#BF360C', '#E64A19'], // Orange
    ];
    const gradient = sectionGradients[index % sectionGradients.length];
    
    return (
      <View key={section.title} style={styles.section}>
        {/* Section Header - Same pattern as Services screen */}
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
          <Text style={styles.sectionDescription}>{section.description}</Text>
          
          <View style={styles.sectionMeta}>
            <View style={[styles.energyBadge, { backgroundColor: gradient[0] }]}>
              <Text style={styles.energyBadgeText}>{section.energy}</Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{section.items.length} Settings</Text>
            </View>
          </View>
        </View>
        
        {/* Settings Grid - Following Services card pattern */}
        <View style={styles.settingsGrid}>
          {section.items.map((item) => renderSettingItem(item, index))}
        </View>
      </View>
    );
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <View style={styles.container}>
      <CorporateProfessionalHeader
        title="Settings"
        subtitle="Customize Your Experience"
        showBackButton={true}
        onBackPress={handleBack}
      />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Content Header - Same pattern as Services screen */}
        <View style={styles.contentHeaderContainer}>
          <Text style={styles.contentTitle}>App Settings</Text>
          <Text style={styles.contentSubtitle}>Professional Configuration</Text>
          <Text style={styles.contentDescription}>
            Customize your Corp Astro experience with professional-grade settings for notifications, 
            astrology preferences, security, and support options.
          </Text>
        </View>
        
        {settingSections.map(renderSection)}
        
        {/* Bottom Spacer */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

// ============================================================================
// STYLES - Following Services Screen Design System
// ============================================================================

const styles = StyleSheet.create({
  // ============================================================================
  // MAIN LAYOUT - MATCHING SERVICES SCREEN STANDARDS
  // ============================================================================
  container: {
    flex: 1,
    backgroundColor: colors.cosmos.void,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl + 60, // Extra space for navigation
  },
  bottomSpacing: {
    height: spacing.xl, // 32px consistent with Services screen
  },

  // ============================================================================
  // CONTENT HEADER - SAME AS SERVICES SCREEN
  // ============================================================================
  contentHeaderContainer: {
    marginHorizontal: spacing.lg, // 20px consistent with Services screen
    marginVertical: spacing.md, // 16px vertical spacing
    padding: spacing.lg, // 20px padding
    backgroundColor: colors.surface.primary,
    borderRadius: radius.lg, // 16px radius consistent with Services screen
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  contentTitle: {
    ...typography.heading2, // 24px for proper hierarchy
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xs, // 4px tight spacing
  },
  contentSubtitle: {
    ...typography.body, // 14px for subtitle
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.sm, // 8px spacing
    fontWeight: '500',
  },
  contentDescription: {
    ...typography.body, // 14px consistent
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.9,
  },

  // ============================================================================
  // SECTION STYLES - MATCHING SERVICES SCREEN LAYOUT
  // ============================================================================
  section: {
    marginBottom: spacing.lg, // 20px consistent with Services screen sections
  },
  sectionHeaderContainer: {
    marginHorizontal: spacing.lg, // 20px horizontal margin
    marginBottom: spacing.md, // 16px bottom margin
    padding: spacing.md, // 16px padding
    backgroundColor: colors.surface.primary,
    borderRadius: radius.md, // 12px radius
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  sectionTitle: {
    ...typography.heading3, // 20px for section titles (consistent with Services screen)
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.xs, // 4px
  },
  sectionSubtitle: {
    ...typography.body, // 14px for subtitles
    color: colors.text.secondary,
    marginBottom: spacing.xs, // 4px
    fontWeight: '500',
  },
  sectionDescription: {
    ...typography.body, // 14px consistent
    color: colors.text.tertiary,
    lineHeight: 18,
    marginBottom: spacing.sm, // 8px
    opacity: 0.9,
  },
  sectionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px gap
  },
  energyBadge: {
    paddingHorizontal: spacing.sm, // 8px
    paddingVertical: spacing.xs, // 4px
    borderRadius: radius.sm, // 8px
    alignItems: 'center',
    justifyContent: 'center',
  },
  energyBadgeText: {
    ...typography.caption, // 12px
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  countBadge: {
    backgroundColor: colors.surface.secondary,
    paddingHorizontal: spacing.sm, // 8px
    paddingVertical: spacing.xs, // 4px
    borderRadius: radius.sm, // 8px
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  countBadgeText: {
    ...typography.caption, // 12px
    color: colors.text.secondary,
    fontWeight: '500',
  },

  // ============================================================================
  // SETTINGS GRID - SIMILAR TO SERVICES CARDS
  // ============================================================================
  settingsGrid: {
    paddingHorizontal: spacing.md, // 16px margin like Services cards
    gap: spacing.sm, // 8px gap between cards
  },

  // ============================================================================
  // SETTING CARD STYLES - FOLLOWING SERVICES CARD PATTERN
  // ============================================================================
  settingCard: {
    borderRadius: radius.lg, // 16px radius like Services cards
    overflow: 'hidden',
    ...shadows.default,
    marginBottom: spacing.sm, // 8px spacing between cards
  },
  cardGradient: {
    borderRadius: radius.lg, // 16px
    borderWidth: 1,
    borderColor: colors.border.subtle,
    padding: spacing.md, // 16px padding
  },

  // Premium Badge - Same as Services screen
  premiumBadge: {
    position: 'absolute',
    top: spacing.sm, // 8px from top
    right: spacing.sm, // 8px from right
    backgroundColor: 'rgba(156, 39, 176, 0.9)',
    borderColor: 'rgba(156, 39, 176, 0.4)',
    paddingHorizontal: spacing.xs, // 4px
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumBadgeText: {
    ...typography.caption, // 12px
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
    fontSize: 10,
  },

  // ============================================================================
  // SETTING CARD CONTENT - SIMILAR TO SERVICES CARDS
  // ============================================================================
  settingCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.sm, // Account for premium badge
  },

  // Icon Styles - Consistent with Services cards
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md, // 16px spacing
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },

  // Text Styles - Following Services card pattern
  settingTextContainer: {
    flex: 1,
    marginRight: spacing.sm, // 8px margin
  },
  settingTitle: {
    ...typography.body, // 14px for card titles (matching Services)
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 2, // Very tight spacing
    lineHeight: 16,
  },
  energyType: {
    ...typography.caption, // 12px energy type
    color: colors.text.secondary,
    fontWeight: '500',
    marginBottom: spacing.xs, // 4px
    opacity: 0.8,
    fontSize: 11,
  },
  settingSubtitle: {
    ...typography.caption, // 12px for subtitles
    color: colors.text.tertiary,
    lineHeight: 14,
    opacity: 0.9,
    fontSize: 11,
  },

  // Action Styles - Following Services button pattern
  settingActionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80, // Consistent width for alignment
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface.secondary,
    paddingHorizontal: spacing.sm, // 8px
    paddingVertical: spacing.xs, // 4px
    borderRadius: radius.sm, // 8px
    borderWidth: 1,
    borderColor: colors.border.subtle,
    gap: spacing.xs, // 4px gap between text and icon
  },
  actionButtonText: {
    ...typography.caption, // 12px
    color: colors.text.secondary,
    fontWeight: '500',
    fontSize: 11,
  },
});

export default SettingsScreen;
