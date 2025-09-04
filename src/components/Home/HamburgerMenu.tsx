/**
 * Corporate Professional Navigation Drawer
 * 
 * A clean, professional navigation drawer designed for Corp Astro's business customers.
 * Follows the corporate design system with professional aesthetics and clean interactions.
 * 
 * PROFESSIONAL FEATURES:
 * - Clean corporate background matching home screen
 * - Professional card-based architecture
 * - Smooth professional animations
 * - Corporate user profile section
 * - Clean menu items with professional styling
 * - Professional badges and status indicators
 * - Full accessibility with screen reader support
 * 
 * DESIGN SYSTEM COMPLIANCE:
 * - Consistent with ModernHomeScreen colors and styling
 * - Professional corporate gradients
 * - Clean typography hierarchy
 * - Proper spacing and border radius from design tokens
 * - Corporate color palette
 * 
 * @module CorporateProfessionalNavigationDrawer
 * @version 3.0.0 - Corporate Professional Edition
 * @since 2024 - Redesigned for corporate customers
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  Modal,
  Dimensions,
  StatusBar,
  Platform,
  ScrollView,
  Pressable,
  AccessibilityInfo,
  BackHandler,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { corpAstroDarkTheme } from '../DesignSystem/DarkTheme';
import { 
  spacing, 
  typography, 
  colors, 
  radius, 
  shadows,
  borderOpacity,
  touchTargets 
} from '../DesignSystem/designTokens';
import { Alert } from 'react-native';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  badge?: number | string;
  premium?: boolean;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
}

export interface UserProfile {
  name: string;
  subscription: 'free' | 'premium' | 'business';
  avatar?: string;
  status?: string;
  phone?: string;
  joinDate?: string;
}

export interface HamburgerMenuProps {
  visible: boolean;
  onClose: () => void;
  userProfile?: UserProfile;
  menuSections: MenuSection[];
  onProfilePress?: () => void;
  onSettingsPress?: () => void;
  onHelpPress?: () => void;
  showDividers?: boolean;
  customStyle?: ViewStyle;
  accessibilityLabel?: string;
  testID?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

// Animation constants
const ANIMATION_CONFIG = {
  DURATION: 280,
  BACKDROP_DURATION: 200,
  EASING: {
    in: Easing.in(Easing.bezier(0.55, 0.06, 0.68, 0.19)),
    out: Easing.out(Easing.bezier(0.25, 0.46, 0.45, 0.94)),
    quadIn: Easing.in(Easing.quad),
    quadOut: Easing.out(Easing.quad)
  }
};

// Layout constants
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(340, SCREEN_WIDTH * 0.85);

// Color constants
const COLORS = {
  primary: '#4A90E2',
  primaryDark: '#357ABD',
  white: '#FFFFFF',
  black: '#000000',
  border: {
    light: 'rgba(255, 255, 255, 0.1)',
    subtle: 'rgba(255, 255, 255, 0.05)'
  },
  background: {
    dark: 'rgba(255, 255, 255, 0.03)',
    pressed: 'rgba(255, 255, 255, 0.08)'
  },
  shadow: {
    color: '#000',
    opacity: 0.1,
    radius: 8,
    elevation: 2
  }
};

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  visible,
  onClose,
  userProfile,
  menuSections,
  onProfilePress,
  onSettingsPress,
  onHelpPress,
  showDividers = true,
  customStyle,
  accessibilityLabel = 'Navigation menu',
  testID = 'hamburger-menu',
}) => {
  const theme = corpAstroDarkTheme;
  const insets = useSafeAreaInsets();
  
  // Animation values
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const contentFadeAnim = useRef(new Animated.Value(0)).current;

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Handle visibility changes with optimized animations
  useEffect(() => {
    const animations = visible 
      ? [
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: ANIMATION_CONFIG.DURATION,
            easing: ANIMATION_CONFIG.EASING.out,
            useNativeDriver: true,
          }),
          Animated.timing(backdropAnim, {
            toValue: 1,
            duration: ANIMATION_CONFIG.BACKDROP_DURATION,
            easing: ANIMATION_CONFIG.EASING.quadOut,
            useNativeDriver: true,
          }),
          Animated.timing(contentFadeAnim, {
            toValue: 1,
            duration: ANIMATION_CONFIG.DURATION,
            delay: 100,
            easing: ANIMATION_CONFIG.EASING.quadOut,
            useNativeDriver: true,
          })
        ]
      : [
          Animated.timing(slideAnim, {
            toValue: -DRAWER_WIDTH,
            duration: ANIMATION_CONFIG.DURATION,
            easing: ANIMATION_CONFIG.EASING.in,
            useNativeDriver: true,
          }),
          Animated.timing(backdropAnim, {
            toValue: 0,
            duration: ANIMATION_CONFIG.BACKDROP_DURATION,
            easing: ANIMATION_CONFIG.EASING.quadIn,
            useNativeDriver: true,
          }),
          Animated.timing(contentFadeAnim, {
            toValue: 0,
            duration: ANIMATION_CONFIG.DURATION - 100,
            easing: ANIMATION_CONFIG.EASING.quadIn,
            useNativeDriver: true,
          })
        ];

    Animated.parallel(animations).start();
  }, [visible, slideAnim, backdropAnim, contentFadeAnim]);

  // Handle Android back button
  useEffect(() => {
    if (Platform.OS === 'android' && visible) {
      const backAction = () => {
        onClose();
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }
  }, [visible, onClose]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleBackdropPress = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleMenuItemPress = useCallback((item: MenuItem) => {
    if (item.disabled) return;
    
    // Announce for accessibility
    AccessibilityInfo.announceForAccessibility(`Selected ${item.label}`);
    
    item.onPress();
    onClose(); // Close menu after selection
  }, [onClose]);

  // ============================================================================
  // STYLES
  // ============================================================================

  // Common shadow styles
  const commonShadow = {
    shadowColor: COLORS.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: COLORS.shadow.opacity,
    shadowRadius: COLORS.shadow.radius,
    elevation: COLORS.shadow.elevation,
  };

  const styles = useMemo(() => StyleSheet.create({
    modal: {
      flex: 1,
      margin: 0,
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    drawer: {
      ...StyleSheet.absoluteFillObject,
      width: DRAWER_WIDTH,
      backgroundColor: colors.cosmos.void,
      borderRightWidth: 1,
      borderRightColor: COLORS.border.light,
      ...commonShadow,
      shadowOffset: { width: 4, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
    drawerContent: {
      flex: 1,
      paddingTop: insets.top || StatusBar.currentHeight || 0,
      position: 'relative',
      zIndex: 10,
    },
    header: {
      paddingHorizontal: spacing.lg, // 24px - proper spacing
      paddingVertical: spacing.lg,   // 24px
      borderBottomWidth: 1,
      borderBottomColor: colors.border.subtle, // Design token border
      marginBottom: spacing.md, // 16px
      backgroundColor: 'transparent', // Blend with drawer background
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md, // 16px consistent gap
    },
    avatar: {
      width: 48, // Proper size - not too large
      height: 48,
      borderRadius: 24,
      backgroundColor: '#4A90E2', // Corporate blue
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border.default,
      ...shadows.subtle, // Design token shadow
    },
    avatarText: {
      fontSize: typography.bodyLarge.fontSize, // 16px
      fontWeight: typography.heading3.fontWeight, // 600
      color: colors.text.primary, // Design token text color
    },
    profileInfo: {
      flex: 1,
      gap: spacing.xs, // 4px - tight spacing for related content
    },
    profileName: {
      fontSize: typography.heading3.fontSize, // 20px
      fontWeight: typography.heading3.fontWeight, // 600
      color: colors.text.primary, // Design token white
      lineHeight: typography.heading3.lineHeight, // 28px
    },
    profileMetaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm, // 8px
      flexWrap: 'wrap' as const,
    },
    profilePhone: {
      fontSize: typography.caption.fontSize, // 12px
      color: colors.text.tertiary, // Design token tertiary text
      fontWeight: '500' as const,
    },
    profileJoinDate: {
      fontSize: typography.caption.fontSize, // 12px
      color: colors.text.tertiary, // Design token tertiary text
      fontWeight: '400' as const,
    },
    subscriptionBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radius.sm,
      backgroundColor: COLORS.primary,
      borderWidth: 1,
      borderColor: colors.border.default,
      ...shadows.subtle,
    },
    subscriptionText: {
      fontSize: typography.caption.fontSize, // 12px
      fontWeight: '700' as const,
      color: colors.text.primary,
      letterSpacing: 0.5,
      textTransform: 'uppercase' as const,
    },
    menuContent: {
      flex: 1,
      paddingTop: spacing.md, // 16px
    },
    sectionContainer: {
      marginBottom: spacing.xl, // 32px
    },
    sectionTitle: {
      fontSize: typography.body.fontSize, // 14px
      fontWeight: '600' as const,
      color: colors.text.secondary, // Design token secondary text
      textTransform: 'uppercase' as const,
      letterSpacing: 1.0,
      paddingHorizontal: spacing.lg, // 24px
      paddingVertical: spacing.md,   // 16px
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.lg,
      minHeight: touchTargets.large,
      borderRadius: radius.lg,
      marginHorizontal: spacing.md,
      marginVertical: spacing.xs,
      borderWidth: 1,
      borderColor: COLORS.border.light,
      backgroundColor: COLORS.background.dark,
      ...commonShadow,
    },
    menuItemPressed: {
      backgroundColor: COLORS.background.pressed,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      transform: [{ scale: 0.98 }],
      ...commonShadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
    menuItemDisabled: {
      opacity: 0.5,
    },
    menuItemIcon: {
      fontSize: 20,
      color: colors.text.primary, // Design token white text
      marginRight: spacing.lg,    // 24px
      width: 28,
      textAlign: 'center' as const,
    },
    menuItemLabel: {
      flex: 1,
      fontSize: typography.bodyLarge.fontSize,   // 16px
      fontWeight: typography.bodyLarge.fontWeight, // 500
      color: colors.text.primary, // Design token white text
      lineHeight: typography.bodyLarge.lineHeight, // 24px
    },
    menuItemBadge: {
      backgroundColor: '#4A90E2', // Corporate blue accent
      borderRadius: radius.sm,    // 8px
      minWidth: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.xs, // 4px
    },
    badgeText: {
      fontSize: typography.caption.fontSize, // 12px
      fontWeight: '700' as const,
      color: colors.text.primary,
    },
    premiumIndicator: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#4A90E2', // Corporate blue
      marginLeft: spacing.sm,     // 8px
      shadowColor: '#4A90E2',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 1,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border.subtle, // Design token divider
      marginHorizontal: spacing.lg,  // 24px
      marginVertical: spacing.sm,    // 8px
    },
    footer: {
      padding: spacing.xl, // 32px
      borderTopWidth: 1,
      borderTopColor: colors.border.subtle, // Design token border
      marginTop: spacing.lg, // 24px
      backgroundColor: 'transparent', // Blend with drawer background
    },
    footerActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.md,
    },
    footerButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg,
      borderRadius: radius.lg,
      minHeight: 52, // Enhanced accessibility touch target
      backgroundColor: 'rgba(255, 255, 255, 0.03)', // Clean subtle background like menu items
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)', // Match menu items
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },
    footerButtonIcon: {
      fontSize: typography.bodyLarge.fontSize,
      marginRight: spacing.sm,
    },
    footerButtonText: {
      fontSize: typography.body.fontSize,
      fontWeight: typography.bodyLarge.fontWeight,
    },
  }), [theme, insets]);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const renderProfile = () => {
    if (!userProfile) return null;

    const getSubscriptionColor = () => ({
      'premium': COLORS.primary,
      'business': COLORS.primaryDark,
      'free': COLORS.primary
    })[userProfile.subscription] || COLORS.primary;

    const getSubscriptionLabel = () => {
      switch (userProfile.subscription) {
        case 'premium': return 'PREMIUM';
        case 'business': return 'BUSINESS';
        case 'free': return 'FREE';
        default: return 'FREE';
      }
    };

    const getAvatarInitials = () => {
      return userProfile.name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <TouchableOpacity
        style={styles.header}
        onPress={onProfilePress}
        accessibilityRole="button"
        accessibilityLabel={`Profile: ${userProfile.name}, ${userProfile.subscription} subscription`}
      >
        <View style={styles.profileSection}>
          <View style={[styles.avatar, { backgroundColor: getSubscriptionColor() }]}>
            <Text style={styles.avatarText}>{getAvatarInitials()}</Text>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            
            {/* Profile metadata row */}
            <View style={styles.profileMetaRow}>
              {userProfile.phone && (
                <Text style={styles.profilePhone}>📱 {userProfile.phone}</Text>
              )}
              {userProfile.joinDate && (
                <Text style={styles.profileJoinDate}>Member since {userProfile.joinDate}</Text>
              )}
            </View>
            
            <View style={[styles.subscriptionBadge, { backgroundColor: getSubscriptionColor() }]}>
              <Text style={styles.subscriptionText}>{getSubscriptionLabel()}</Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="rgba(255, 255, 255, 0.6)"
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderMenuItem = (item: MenuItem) => (
    <Pressable
      key={item.id}
      style={({ pressed }) => [
        styles.menuItem,
        pressed && styles.menuItemPressed,
        item.disabled && styles.menuItemDisabled,
      ]}
      onPress={() => handleMenuItemPress(item)}
      accessibilityRole="button"
      accessibilityLabel={item.accessibilityLabel || item.label}
      accessibilityState={{ disabled: item.disabled }}
    >
      <View style={{ 
        width: 28, 
        alignItems: 'center', 
        marginRight: spacing.lg 
      }}>
        <Ionicons 
          name={item.icon as any} 
          size={20} 
          color={String(theme.colors.neutral.text)} 
        />
      </View>
      <Text style={styles.menuItemLabel}>{item.label}</Text>
      
      {item.premium && <View style={styles.premiumIndicator} />}
      
      {item.badge && (
        <View style={styles.menuItemBadge}>
          <Text style={styles.badgeText}>
            {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
          </Text>
        </View>
      )}
    </Pressable>
  );

  const renderMenuSection = (section: MenuSection, index: number) => (
    <View key={section.id} style={styles.sectionContainer}>
      {section.title && (
        <Text style={styles.sectionTitle}>{section.title}</Text>
      )}
      
      {section.items.map(renderMenuItem)}
      
      {showDividers && index < menuSections.length - 1 && (
        <View style={styles.divider} />
      )}
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <View style={styles.footerActions}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={onSettingsPress}
          accessibilityRole="button"
          accessibilityLabel="Settings"
        >
          <Ionicons 
            name="settings-outline" 
            size={16} 
            color={String(theme.colors.neutral.light)}
            style={{ marginRight: spacing.sm }}
          />
          <Text style={[styles.footerButtonText, { color: String(theme.colors.neutral.light) }]}>
            Settings
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.footerButton}
          onPress={onHelpPress}
          accessibilityRole="button"
          accessibilityLabel="Help & Support"
        >
          <Ionicons 
            name="help-circle-outline" 
            size={16} 
            color={String(theme.colors.neutral.light)}
            style={{ marginRight: spacing.sm }}
          />
          <Text style={[styles.footerButtonText, { color: String(theme.colors.neutral.light) }]}>
            Help
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
      accessibilityViewIsModal
      testID={testID}
    >
      <View style={styles.modal}>
        {/* Backdrop */}
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdropAnim,
            },
          ]}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={handleBackdropPress}
            accessibilityRole="button"
            accessibilityLabel="Close menu"
          />
        </Animated.View>

        {/* Drawer with Professional Background */}
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX: slideAnim }],
            },
            customStyle,
          ]}
        >
          {/* Content */}
          <Animated.View 
            style={[
              styles.drawerContent,
              { opacity: contentFadeAnim }
            ]}
          >
            {renderProfile()}
            
            <ScrollView
              style={styles.menuContent}
              showsVerticalScrollIndicator={false}
              accessibilityLabel={accessibilityLabel}
            >
              {menuSections.map(renderMenuSection)}
            </ScrollView>
            
            {renderFooter()}
          </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

export interface UseHamburgerMenuOptions {
  initialUser?: UserProfile;
  onNavigate?: (route: string) => void;
}

export interface UseHamburgerMenuReturn {
  isVisible: boolean;
  userProfile: UserProfile;
  menuSections: MenuSection[];
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  handleProfilePress: () => void;
  handleSettingsPress: () => void;
  handleHelpPress: () => void;
}

export const useHamburgerMenu = (options: UseHamburgerMenuOptions = {}): UseHamburgerMenuReturn => {
  const { initialUser, onNavigate } = options;
  
  // State
  const [isVisible, setIsVisible] = useState(false);
  
  // Default user profile
  const defaultUser: UserProfile = {
    name: 'Rajesh Kumar',
    subscription: 'premium',
    phone: '+91 98765 43210',
    joinDate: 'Jan 2024',
    status: 'Aries • Business Intelligence',
  };
  
  const userProfile = useMemo(() => initialUser || defaultUser, [initialUser]);
  
  // Handlers
  const openMenu = useCallback(() => {
    setIsVisible(true);
  }, []);
  
  const closeMenu = useCallback(() => {
    setIsVisible(false);
  }, []);
  
  const toggleMenu = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);
  
  // Menu configuration - Simplified to 6 essential items (removed duplicate Settings & Help)
  const menuSections = useMemo((): MenuSection[] => [
    {
      id: 'main',
      title: 'Main Menu',
      items: [
        {
          id: 'subscription',
          label: 'Subscription',
          icon: 'diamond-outline',
          premium: true,
          onPress: () => {
            closeMenu();
            onNavigate?.('SubscriptionScreen');
          },
        },
        {
          id: 'reports',
          label: 'My Reports',
          icon: 'document-text-outline',
          onPress: () => {
            closeMenu();
            onNavigate?.('ReportsScreen');
          },
        },
        {
          id: 'calendar',
          label: 'My Calendar',
          icon: 'calendar-outline',
          onPress: () => {
            closeMenu();
            onNavigate?.('CalendarScreen');
          },
        },
        {
          id: 'refer',
          label: 'Refer Us',
          icon: 'gift-outline',
          onPress: () => {
            closeMenu();
            onNavigate?.('ReferUsScreen');
          },
        },
        {
          id: 'rate',
          label: 'Rate App',
          icon: 'star-outline',
          onPress: () => {
            closeMenu();
            onNavigate?.('RateAppScreen');
          },
        },
      ],
    },
  ], [onNavigate, closeMenu]);
  
  const handleProfilePress = useCallback(() => {
    closeMenu();
    onNavigate?.('ProfileScreen');
  }, [closeMenu, onNavigate]);
  
  const handleSettingsPress = useCallback(() => {
    closeMenu();
    onNavigate?.('SettingsScreen');
  }, [closeMenu, onNavigate]);
  
  const handleHelpPress = useCallback(() => {
    closeMenu();
    onNavigate?.('HelpSupportScreen');
  }, [closeMenu, onNavigate]);
  
  return {
    isVisible,
    userProfile,
    menuSections,
    openMenu,
    closeMenu,
    toggleMenu,
    handleProfilePress,
    handleSettingsPress,
    handleHelpPress,
  };
};

export default HamburgerMenu;
