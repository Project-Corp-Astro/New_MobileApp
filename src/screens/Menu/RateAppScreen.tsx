/**
 * Corp Astro - Rate App Screen
 * 
 * Screen for rating the app and providing feedback.
 * Using the BaseScreen layout and reusable components.
 * 
 * @module RateAppScreen
 * @version 1.0.0
 * @since 2025
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  RateApp: undefined;
  // Add other screens as needed
};
import { BaseScreen } from '../../components/menusection/BaseScreen';
import { HeaderWithBack } from '../../navigation/HeaderWithBack';
import { corpAstroDarkTheme } from '../../components/DesignSystem/DarkTheme';
import { designTokens, typography } from '../../components/DesignSystem/designTokens';
import { spacing } from '../../components/DesignSystem/SpacingScale';
import CorporateHeader from '../../components/professional/CorporateProfessionalHeader';

type RateAppScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RateApp'>;

const RateAppScreen: React.FC = () => {
  const theme = corpAstroDarkTheme;
  const navigation = useNavigation<RateAppScreenNavigationProp>();
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  // Set navigation options
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleStarPress = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleRateOnStore = async () => {
    try {
      // In a real app, these would be the actual store URLs
      const appStoreUrl = 'https://apps.apple.com/app/corpastro';
      const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.corpastro.app';
      
      Alert.alert(
        'Rate Corp Astro',
        'Thank you for your feedback! We\'ll redirect you to the app store to leave a review.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Open App Store', 
            onPress: () => {
              // For demo purposes, we'll just show an alert
              Alert.alert('Thank You!', 'In a real app, this would open the app store for rating.');
              // Linking.openURL(Platform.OS === 'ios' ? appStoreUrl : playStoreUrl);
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error opening store:', error);
      Alert.alert('Error', 'Failed to open app store');
    }
  };

  const handleSubmitFeedback = () => {
    if (selectedRating === 0) {
      Alert.alert('Rating Required', 'Please select a star rating before submitting feedback.');
      return;
    }

    Alert.alert(
      'Thank You!',
      `Your ${selectedRating}-star rating and feedback have been submitted. We appreciate your input!`,
      [
        { 
          text: 'OK', 
          onPress: () => {
            // Reset form
            setSelectedRating(0);
            setFeedback('');
          }
        }
      ]
    );
  };

  const handleSendEmail = () => {
    Alert.alert(
      'Contact Support',
      'We\'ll open your email app to send feedback directly to our team.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Open Email', 
          onPress: () => {
            // In a real app: Linking.openURL('mailto:support@corpastro.com?subject=App Feedback');
            Alert.alert('Email', 'In a real app, this would open your email client.');
          }
        }
      ]
    );
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Select Rating';
    }
  };

  const getFeedbackPlaceholder = (rating: number) => {
    if (rating === 0) return 'Please select a rating first...';
    if (rating <= 2) return 'We\'re sorry to hear about your experience. Please tell us how we can improve...';
    if (rating === 3) return 'Thank you for your feedback. What features would you like to see improved?';
    return 'We\'re thrilled you love Corp Astro! What features do you enjoy most?';
  };

  return (
    <BaseScreen backgroundColor={String(theme.colors.cosmos.void)}>
               <CorporateHeader variant="centered" title="Rate App" showBackButton />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: spacing.xl,
        }}
      >
        {/* Header Section */}
        <View style={{
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.xl,
          alignItems: 'center',
        }}>
            <Text style={{ fontSize: 48, marginBottom: spacing.md }}>🌟</Text>
            <Text style={{
              ...typography.heading2,
              fontWeight: '600',
              color: String(theme.colors.neutral.text),
              textAlign: 'center',
              marginBottom: spacing.sm,
            }}>
              How would you rate Corp Astro?
            </Text>
            <Text style={{
              ...typography.body,
              color: String(theme.colors.neutral.light),
              textAlign: 'center',
              lineHeight: 22,
            }}>
              Your feedback helps us improve the cosmic experience for everyone
            </Text>
        </View>

        {/* Star Rating */}
        <View style={{
          paddingHorizontal: spacing.lg,
          marginBottom: spacing.xl,
        }}>
          <View style={{
            backgroundColor: String(theme.colors.cosmos.deep),
            borderRadius: 16,
            padding: spacing.xl,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            alignItems: 'center',
          }}>
            <View style={{
              flexDirection: 'row',
              gap: spacing.sm,
              marginBottom: spacing.md,
            }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Pressable
                  key={star}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                    transform: [{ scale: pressed ? 0.9 : 1 }],
                  })}
                  onPress={() => handleStarPress(star)}
                >
                  <Text style={{
                    fontSize: 40,
                    color: star <= selectedRating ? '#FFD700' : '#666',
                  }}>
                    ⭐
                  </Text>
                </Pressable>
              ))}
            </View>
            
            <Text style={{
              ...typography.heading3,
              fontWeight: '600',
              color: selectedRating > 0 ? String(theme.colors.brand.primary) : String(theme.colors.neutral.light),
            }}>
              {getRatingText(selectedRating)}
            </Text>
          </View>
        </View>

        {/* Feedback Section */}
        {selectedRating > 0 && (
          <View style={{
            paddingHorizontal: spacing.lg,
            marginBottom: spacing.xl,
          }}>
            <Text style={{
              ...typography.heading3,
              fontWeight: '600',
              color: String(theme.colors.neutral.text),
              marginBottom: spacing.md,
            }}>
              Tell us more about your experience
            </Text>
            
            <View style={{
              backgroundColor: String(theme.colors.cosmos.deep),
              borderRadius: 16,
              padding: spacing.lg,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.1)',
              minHeight: 120,
            }}>
              <Text style={{
                ...typography.body,
                color: String(theme.colors.neutral.light),
                lineHeight: 22,
              }}>
                {getFeedbackPlaceholder(selectedRating)}
              </Text>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={{
          paddingHorizontal: spacing.lg,
          gap: spacing.md,
        }}>
          {selectedRating >= 4 && (
            <Pressable
              style={({ pressed }) => ({
                backgroundColor: String(theme.colors.luxury.pure),
                paddingVertical: spacing.lg,
                borderRadius: 16,
                alignItems: 'center',
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
              onPress={handleRateOnStore}
            >
              <Text style={{
                color: String(theme.colors.cosmos.void),
                ...typography.heading3,
                fontWeight: '600',
              }}>
                ⭐ Rate on App Store
              </Text>
            </Pressable>
          )}
          
          {selectedRating > 0 && (
            <Pressable
              style={({ pressed }) => ({
                backgroundColor: String(theme.colors.brand.primary),
                paddingVertical: spacing.lg,
                borderRadius: 16,
                alignItems: 'center',
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
              onPress={handleSubmitFeedback}
            >
              <Text style={{
                color: String(theme.colors.cosmos.void),
                ...typography.heading3,
                fontWeight: '600',
              }}>
                📝 Submit Feedback
              </Text>
            </Pressable>
          )}
          
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: String(theme.colors.cosmos.deep),
              paddingVertical: spacing.lg,
              borderRadius: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.2)',
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
            onPress={handleSendEmail}
          >
            <Text style={{
              color: String(theme.colors.neutral.text),
              ...typography.heading3,
              fontWeight: '600',
            }}>
              ✉️ Email Support
            </Text>
          </Pressable>
        </View>

        {/* App Info */}
        <View style={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.xl,
        }}>
          <View style={{
            backgroundColor: String(theme.colors.cosmos.deep),
            borderRadius: 16,
            padding: spacing.lg,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.sm,
              marginBottom: spacing.md,
            }}>
              <Text style={{ fontSize: 20 }}>ℹ️</Text>
              <Text style={{
                ...typography.heading3,
                fontWeight: '600',
                color: String(theme.colors.neutral.text),
              }}>
                App Information
              </Text>
            </View>
            
            <View style={{ gap: spacing.sm }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <Text style={{
                  ...typography.body,
                  color: String(theme.colors.neutral.light),
                }}>
                  Version
                </Text>
                <Text style={{
                  ...typography.body,
                  color: String(theme.colors.neutral.text),
                }}>
                  1.0.0
                </Text>
              </View>
              
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <Text style={{
                  ...typography.body,
                  color: String(theme.colors.neutral.light),
                }}>
                  Build
                </Text>
                <Text style={{
                  ...typography.body,
                  color: String(theme.colors.neutral.text),
                }}>
                  2025.01.18
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </BaseScreen>
  );
};

export default RateAppScreen;
