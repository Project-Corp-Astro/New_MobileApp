/**
 * Corp Astro - Profile Screen
 * 
 * Dedicated screen for user profile management.
 * Following industry-standard component architecture.
 * 
 * @module ProfileScreen
 * @version 1.0.0
 * @since 2025
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  // Add other screens as needed
};

// Design System
import { corpAstroDarkTheme } from '../../components/DesignSystem/DarkTheme';
import { designTokens, typography } from '../../components/DesignSystem/designTokens';

// Components
import { BaseScreen } from '../../components/menusection/BaseScreen';
import CorporateProfessionalHeader from '../../components/professional/CorporateProfessionalHeader';
import { ProfileHeader, ProfileSection } from '../../components/menusection/ProfileSection';

/**
 * Profile Screen Component
 * 
 * Handles user profile display and management.
 * Follows design system guidelines and accessibility standards.
 */
type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleBack = () => {
    navigation.goBack();
  };

  // Set navigation options
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <BaseScreen>
      <SafeAreaView style={styles.container}>
        <CorporateProfessionalHeader
          title="My Profile"
          showBackButton
          onBackPress={handleBack}
        />
        
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ProfileHeader />
          
          <ProfileSection 
            title="Personal Information"
            items={[
              { label: 'Name', value: 'Rajesh Kumar' },
              { label: 'Email', value: 'rajesh@example.com' },
              { label: 'Phone', value: '+91 98765 43210' },
              { label: 'Date of Birth', value: '15 March 1985' },
            ]}
          />
          
          <ProfileSection 
            title="Astrological Details"
            items={[
              { label: 'Zodiac Sign', value: 'Aries' },
              { label: 'Birth Time', value: '06:30 AM' },
              { label: 'Birth Place', value: 'Mumbai, India' },
              { label: 'Moon Sign', value: 'Leo' },
            ]}
          />
          
          <ProfileSection 
            title="Preferences"
            items={[
              { label: 'Language', value: 'English' },
              { label: 'Notifications', value: 'Enabled' },
              { label: 'Theme', value: 'Dark' },
            ]}
          />
        </ScrollView>
      </SafeAreaView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corpAstroDarkTheme.colors.cosmos.void,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: designTokens.spacing.xl,
  },
});

export default ProfileScreen;
