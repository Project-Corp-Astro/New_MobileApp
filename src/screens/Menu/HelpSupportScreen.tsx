/**
 * Corp Astro - Help & Support Screen
 * 
 * Dedicated screen for user help and support.
 * Provides various support options and resources.
 * 
 * @module HelpSupportScreen
 * @version 1.0.0
 * @since 2025
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Types
type RootStackParamList = {
  // Add other screens as needed
  HelpSupport: undefined;
};

type HelpSupportScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HelpSupport'>;

// Design System
import { corpAstroDarkTheme } from '../../components/DesignSystem/DarkTheme';
import { designTokens, typography } from '../../components/DesignSystem/designTokens';
import HelpComponents from '../../components/menusection/HelpComponents';
import CorporateProfessionalHeader from '../../components/professional/CorporateProfessionalHeader';
const { ContactCard, HelpButton, HelpSection } = HelpComponents;

// Components
import { BaseScreen } from '../../components/menusection/BaseScreen';

/**
 * Help & Support Screen Component
 * 
 * Provides comprehensive help and support options.
 * Organized into logical sections for easy navigation.
 */
const HelpSupportScreen = () => {
  const navigation = useNavigation<HelpSupportScreenNavigationProp>();

  const handleBack = () => {
    navigation.goBack();
  };

  const navigateToHelpTopic = (topic: string) => {
    // Navigate to specific help topic
    console.log(`Navigate to ${topic}`);
    // Example navigation:
    // navigation.navigate('HelpTopic', { topic });
  };

  const handleContactPress = (type: string) => {
    // Handle contact button press
    console.log(`Contact via ${type}`);
    // Example navigation:
    // navigation.navigate('ContactDetails', { contactType: type });
  };

  return (
    <BaseScreen>
      <SafeAreaView style={styles.container}>
        <CorporateProfessionalHeader
          title="Help & Support"
          subtitle="Get help and app resources"
          showBackButton={true}
          onBackPress={handleBack}
        />
        
        <ScrollView style={styles.scrollView}>
          <HelpSection title="Quick Help">
            <HelpButton 
              icon="❓"
              title="Frequently Asked Questions"
              description="Find answers to common questions"
              onPress={() => navigateToHelpTopic('FAQs')}
            />
            <HelpButton 
              icon="📖"
              title="User Guide"
              description="Complete guide to using Corp Astro"
              onPress={() => navigateToHelpTopic('User Guide')}
            />
            <HelpButton 
              icon="🎬"
              title="Video Tutorials"
              description="Watch step-by-step tutorials"
              onPress={() => navigateToHelpTopic('Video Tutorials')}
            />
          </HelpSection>
          
          <HelpSection title="Astrology Help">
            <HelpButton 
              icon="⭐"
              title="Understanding Your Chart"
              description="Learn to read your birth chart"
              onPress={() => navigateToHelpTopic('Chart Help')}
            />
            <HelpButton 
              icon="🌙"
              title="Horoscope Guide"
              description="How to interpret daily predictions"
              onPress={() => navigateToHelpTopic('Horoscope Help')}
            />
            <HelpButton 
              icon="💝"
              title="Compatibility Analysis"
              description="Understanding relationship compatibility"
              onPress={() => navigateToHelpTopic('Compatibility Help')}
            />
          </HelpSection>
          
          <HelpSection title="Contact Support">
            <ContactCard 
              icon="💬"
              title="Live Chat"
              description="Chat with our support team"
              availability="Available 24/7"
              onPress={() => handleContactPress('chat')}
            />
            <ContactCard 
              icon="📧"
              title="Email Support"
              description="Send us your questions"
              availability="Response within 24 hours"
              onPress={() => handleContactPress('email')}
            />
            <ContactCard 
              icon="📞"
              title="Phone Support"
              description="Speak with an expert"
              availability="Mon-Fri, 9 AM - 6 PM"
              onPress={() => handleContactPress('call')}
            />
          </HelpSection>
          
          <HelpSection title="Feedback">
            <HelpButton 
              icon="⭐"
              title="Rate Our App"
              description="Share your experience with others"
              onPress={() => navigateToHelpTopic('Rate App')}
            />
            <HelpButton 
              icon="💡"
              title="Suggest Features"
              description="Help us improve Corp Astro"
              onPress={() => navigateToHelpTopic('Feature Request')}
            />
            <HelpButton 
              icon="🐛"
              title="Report a Bug"
              description="Let us know about any issues"
              onPress={() => navigateToHelpTopic('Bug Report')}
            />
          </HelpSection>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: designTokens.spacing.lg,
    paddingTop: designTokens.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: corpAstroDarkTheme.colors.cosmos.medium,
  },
  backButton: {
    marginRight: designTokens.spacing.md,
    padding: designTokens.spacing.xs,
  },
  backButtonText: {
  ...typography.heading3,
  color: corpAstroDarkTheme.colors.neutral.text,
  },
  title: {
  ...typography.heading2,
  color: corpAstroDarkTheme.colors.neutral.text,
  },
  scrollView: {
    flex: 1,
  },
});

export default HelpSupportScreen;
