/**
 * Corporate Professional Header - Corp Astro
 *
 * Title + Subtitle aligned to the left,
 * Avatar/Profile on the right,
 * Back button optional.
 *
 * @format
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Import design tokens
import { corpAstroDarkTheme } from '../DesignSystem/DarkTheme';

type RootStackParamList = {
  ProfileScreen: undefined;
  // Add other screens as needed
};

interface CorporateProfessionalHeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  showNotificationIcon?: boolean;
  onBackPress?: () => void;
  onNotificationPress?: () => void;
  rightComponent?: React.ReactNode;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const CorporateProfessionalHeader = ({
  title = 'CORP ASTRO',
  subtitle = 'Business Intelligence',
  showBackButton = false,
  showNotificationIcon = false,
  onBackPress,
  onNotificationPress,
  rightComponent,
  navigation,
}: CorporateProfessionalHeaderProps) => {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />

      <View style={styles.container}>
        <LinearGradient
          colors={[
            'rgba(30, 39, 114, 0.98)', // Corporate blue
            'rgba(15, 20, 70, 0.99)', // Deep professional blue
            corpAstroDarkTheme.colors.cosmos.void, // Theme background
          ]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <SafeAreaView>
            <View style={styles.header}>
              {/* Left Section with Back + Title/SubTitle */}
              <View style={styles.leftSection}>
                {showBackButton && (
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={onBackPress}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                )}

                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{title}</Text>
                  {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>
              </View>

              {/* Spacer in Center (for balance) */}
              <View style={styles.centerSection} />

              {/* Right Section with Notification and Profile */}
              <View style={styles.rightSection}>
                {rightComponent || (
                  <View style={styles.rightIconsContainer}>
                    {showNotificationIcon && (
                      <TouchableOpacity
                        onPress={onNotificationPress}
                        activeOpacity={0.7}
                        style={[styles.iconButton, styles.notificationButton]}
                      >
                        <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ProfileScreen')}
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
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 76,
    paddingTop: 30,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleContainer: {
    marginLeft: 8,
  },
  centerSection: {
    width: 40, // spacer
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    marginRight: 20,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: corpAstroDarkTheme.colors.brand.primary,
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 34,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    marginTop: 2,
  },
});

// Wrapper for navigation
const CorporateProfessionalHeaderWrapper = (
  props: Omit<CorporateProfessionalHeaderProps, 'navigation'>
) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return <CorporateProfessionalHeader {...props} navigation={navigation} />;
};

export default CorporateProfessionalHeaderWrapper;
