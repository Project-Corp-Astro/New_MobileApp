/**
 * Corp Astro - Refer Us Screen
 * 
 * Screen for referring friends and earning rewards.
 * Using the BaseScreen layout and reusable components.
 * 
 * @module ReferUsScreen
 * @version 1.0.0
 * @since 2025
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  ReferUs: undefined;
  // Add other screens as needed
};
import { BaseScreen } from '../../components/menusection/BaseScreen';
import CorporateProfessionalHeader from '../../components/professional/CorporateProfessionalHeader';
import { corpAstroDarkTheme } from '../../components/DesignSystem/DarkTheme';
import { designTokens, typography } from '../../components/DesignSystem/designTokens';
import { spacing } from '../../components/DesignSystem/SpacingScale';

interface Reward {
  id: string;
  title: string;
  description: string;
  requirement: string;
  value: string;
  icon: string;
  unlocked: boolean;
}

type ReferUsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ReferUs'>;

const ReferUsScreen: React.FC = () => {
  const theme = corpAstroDarkTheme;
  const navigation = useNavigation<ReferUsScreenNavigationProp>();
  const [referralCode] = useState('COSMIC2025');
  const [totalReferred] = useState(3);

  // Set navigation options
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const rewards: Reward[] = [
    {
      id: '1',
      title: 'First Referral Bonus',
      description: 'Get a free birth chart analysis when your first friend joins',
      requirement: '1 successful referral',
      value: '$50 value',
      icon: '🎯',
      unlocked: totalReferred >= 1
    },
    {
      id: '2',
      title: 'Triple Bonus',
      description: 'Unlock premium features for 1 month free',
      requirement: '3 successful referrals',
      value: '$30 value',
      icon: '🔥',
      unlocked: totalReferred >= 3
    },
    {
      id: '3',
      title: 'Cosmic Ambassador',
      description: 'Get 6 months premium access and exclusive content',
      requirement: '5 successful referrals',
      value: '$150 value',
      icon: '👑',
      unlocked: totalReferred >= 5
    },
    {
      id: '4',
      title: 'Astro Legend',
      description: 'Lifetime premium access and personal consultation',
      requirement: '10 successful referrals',
      value: '$500 value',
      icon: '🌟',
      unlocked: totalReferred >= 10
    }
  ];

  const handleShare = async () => {
    try {
      const message = `Join me on Corp Astro - Professional Business Astrology! Get personalized insights for career success. Use my code ${referralCode} for exclusive benefits. Download: https://corpastro.app/join`;
      
      await Share.share({
        message,
        title: 'Join Corp Astro with my referral code!',
      });
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share referral link');
    }
  };

  const handleCopyCode = () => {
    // In a real app, this would copy to clipboard
    Alert.alert(
      'Referral Code Copied!',
      `Your referral code "${referralCode}" has been copied to clipboard.`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleClaimReward = (reward: Reward) => {
    if (reward.unlocked) {
      Alert.alert(
        'Claim Reward',
        `Claim your ${reward.title}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Claim', onPress: () => console.log(`Claiming reward ${reward.id}`) }
        ]
      );
    } else {
      Alert.alert(
        'Reward Locked',
        `You need ${reward.requirement} to unlock this reward. Keep referring friends!`
      );
    }
  };

  return (
    <BaseScreen backgroundColor={String(theme.colors.cosmos.void)}>
      <CorporateProfessionalHeader
        title="Refer & Earn"
        showBackButton
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <Pressable
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: 'rgba(46, 134, 222, 0.2)',
            }}
            onPress={handleShare}
          >
            <Text style={{ fontSize: 16 }}>📤</Text>
          </Pressable>
        }
      />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: spacing.xl,
        }}
      >
        {/* Referral Stats */}
        <View style={{
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
        }}>
          <View style={{
            backgroundColor: String(theme.colors.cosmos.deep),
            borderRadius: 16,
            padding: spacing.lg,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            marginBottom: spacing.lg,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.sm,
              marginBottom: spacing.md,
            }}>
              <Text style={{ fontSize: 24 }}>🎁</Text>
              <Text style={{
                ...typography.heading3,
                fontWeight: '600',
                color: String(theme.colors.neutral.text),
              }}>
                Your Referral Progress
              </Text>
            </View>
            
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: spacing.lg,
            }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  ...typography.heading2,
                  fontWeight: '700',
                  color: String(theme.colors.brand.primary),
                }}>
                  {totalReferred}
                </Text>
                <Text style={{
                  ...typography.body,
                  color: String(theme.colors.neutral.light),
                }}>
                  Friends Referred
                </Text>
              </View>
              
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  ...typography.heading2,
                  fontWeight: '700',
                  color: String(theme.colors.luxury.pure),
                }}>
                  $80
                </Text>
                <Text style={{
                  ...typography.body,
                  color: String(theme.colors.neutral.light),
                }}>
                  Rewards Earned
                </Text>
              </View>
            </View>

            {/* Referral Code */}
            <View style={{
              backgroundColor: 'rgba(46, 134, 222, 0.1)',
              borderRadius: 12,
              padding: spacing.md,
              borderWidth: 1,
              borderColor: String(theme.colors.brand.primary),
            }}>
              <Text style={{
                ...typography.body,
                color: String(theme.colors.neutral.light),
                marginBottom: spacing.xs,
              }}>
                Your Referral Code
              </Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <Text style={{
                  ...typography.heading2,
                  fontWeight: '700',
                  color: String(theme.colors.brand.primary),
                  letterSpacing: 2,
                }}>
                  {referralCode}
                </Text>
                <Pressable
                  style={({ pressed }) => ({
                    backgroundColor: String(theme.colors.brand.primary),
                    paddingHorizontal: spacing.md,
                    paddingVertical: spacing.sm,
                    borderRadius: 8,
                    opacity: pressed ? 0.8 : 1,
                  })}
                  onPress={handleCopyCode}
                >
                  <Text style={{
                    color: String(theme.colors.cosmos.void),
                    ...typography.body,
                    fontWeight: '600',
                  }}>
                    Copy
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* How It Works */}
        <View style={{
          paddingHorizontal: spacing.lg,
          marginBottom: spacing.lg,
        }}>
          <Text style={{
            ...typography.heading3,
            fontWeight: '600',
            color: String(theme.colors.neutral.text),
            marginBottom: spacing.md,
          }}>
            How It Works
          </Text>
          
          <View style={{ gap: spacing.md }}>
            {[
              { step: 1, icon: '📤', title: 'Share Your Code', description: 'Send your referral code to friends via social media, email, or text' },
              { step: 2, icon: '💫', title: 'Friend Joins', description: 'Your friend downloads Corp Astro and creates an account with your code' },
              { step: 3, icon: '🎁', title: 'Earn Rewards', description: 'Both you and your friend receive exclusive benefits and rewards' }
            ].map((item) => (
              <View
                key={item.step}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: spacing.md,
                  backgroundColor: String(theme.colors.cosmos.deep),
                  borderRadius: 12,
                  padding: spacing.md,
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <View style={{
                  backgroundColor: String(theme.colors.brand.primary),
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Text style={{
                    color: String(theme.colors.cosmos.void),
                    ...typography.caption,
                    fontWeight: '600',
                  }}>
                    {item.step}
                  </Text>
                </View>
                
                <View style={{ flex: 1 }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                    marginBottom: spacing.xs,
                  }}>
                    <Text style={{ ...typography.body }}>{item.icon}</Text>
                    <Text style={{
                      ...typography.body,
                      fontWeight: '600',
                      color: String(theme.colors.neutral.text),
                    }}>
                      {item.title}
                    </Text>
                  </View>
                  <Text style={{
                    ...typography.body,
                    color: String(theme.colors.neutral.light),
                    lineHeight: 18,
                  }}>
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Rewards */}
        <View style={{
          paddingHorizontal: spacing.lg,
        }}>
          <Text style={{
            ...typography.heading3,
            fontWeight: '600',
            color: String(theme.colors.neutral.text),
            marginBottom: spacing.md,
          }}>
            Referral Rewards
          </Text>
          
          <View style={{ gap: spacing.md }}>
            {rewards.map((reward) => (
              <Pressable
                key={reward.id}
                style={({ pressed }) => ({
                  backgroundColor: String(theme.colors.cosmos.deep),
                  borderRadius: 16,
                  padding: spacing.lg,
                  borderWidth: 1,
                  borderColor: reward.unlocked 
                    ? String(theme.colors.brand.primary)
                    : 'rgba(255, 255, 255, 0.1)',
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
                onPress={() => handleClaimReward(reward)}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: spacing.sm,
                }}>
                  <View style={{ flex: 1 }}>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: spacing.sm,
                      marginBottom: spacing.xs,
                    }}>
                      <Text style={{ ...typography.body }}>{reward.icon}</Text>
                      <Text style={{
                        ...typography.body,
                        fontWeight: '600',
                        color: String(theme.colors.neutral.text),
                      }}>
                        {reward.title}
                      </Text>
                      {reward.unlocked && (
                        <View style={{
                          backgroundColor: '#4CAF50',
                          paddingHorizontal: spacing.xs,
                          paddingVertical: 2,
                          borderRadius: 8,
                        }}>
                          <Text style={{
                            color: 'white',
                            fontSize: 10,
                            fontWeight: '600',
                          }}>
                            UNLOCKED
                          </Text>
                        </View>
                      )}
                    </View>
                    
                    <Text style={{
                      ...typography.body,
                      color: String(theme.colors.neutral.light),
                      marginBottom: spacing.xs,
                    }}>
                      {reward.description}
                    </Text>
                    
                    <Text style={{
                      ...typography.caption,
                      color: String(theme.colors.brand.primary),
                      fontWeight: '500',
                    }}>
                      {reward.requirement} • {reward.value}
                    </Text>
                  </View>
                </View>
                
                {reward.unlocked && (
                  <View style={{
                    backgroundColor: String(theme.colors.brand.primary),
                    paddingVertical: spacing.sm,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginTop: spacing.sm,
                  }}>
                    <Text style={{
                      color: String(theme.colors.cosmos.void),
                      ...typography.body,
                      fontWeight: '600',
                    }}>
                      Claim Reward
                    </Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Share Button */}
        <View style={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.xl,
        }}>
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: String(theme.colors.luxury.pure),
              paddingVertical: spacing.lg,
              borderRadius: 16,
              alignItems: 'center',
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
            onPress={handleShare}
          >
            <Text style={{
              color: String(theme.colors.cosmos.void),
              ...typography.heading3,
              fontWeight: '600',
            }}>
              📤 Share Corp Astro Now
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </BaseScreen>
  );
};

export default ReferUsScreen;
