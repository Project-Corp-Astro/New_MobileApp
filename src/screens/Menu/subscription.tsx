import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  Platform,
  StatusBar,
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Subscription: undefined;
  // Add other screens as needed
};
import { LinearGradient } from 'expo-linear-gradient';
import { corpAstroDarkTheme } from '../../components/DesignSystem/DarkTheme';
import { designTokens, typography } from '../../components/DesignSystem/designTokens';
import { spacing } from '../../components/DesignSystem/SpacingScale';
import CorporateProfessionalHeader from '../../components/professional/CorporateProfessionalHeader';

const { width } = Dimensions.get('window');

interface TierPricing {
  price: number;
  original: number;
  discount?: number;
}

interface Tier {
  name: string;
  tagline: string;
  icon: string;
  color: string;
  gradient: string[];
  popular?: boolean;
  badge?: string;
  features: string[];
  pricing: {
    '1': TierPricing;
    '3': TierPricing;
    '6': TierPricing;
  };
}

type SubscriptionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Subscription'>;

const SubscriptionScreen: React.FC = () => {
  const theme = corpAstroDarkTheme;
  const navigation = useNavigation<SubscriptionScreenNavigationProp>();
  const [selectedTier, setSelectedTier] = useState<'FREE' | 'PRO' | 'PREMIUM'>('PRO');

  // Set navigation options
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const [selectedDuration, setSelectedDuration] = useState<'1' | '3' | '6'>('3');
  const [expandedTier, setExpandedTier] = useState<string | null>('PRO');

  const tiers: Record<'FREE' | 'PRO' | 'PREMIUM', Tier> = {
    FREE: {
      name: 'FREE',
      tagline: 'Essential Cosmic Insights',
      icon: '�',
      color: '#4A90E2',
      gradient: ['rgba(74, 144, 226, 0.2)', 'rgba(74, 144, 226, 0.05)'],
      features: [
        'Basic Business Strategy Reports',
        'Career Progression Analysis', 
        'Partnership Compatibility',
        'Monthly Report Limit: 3',
        'Email Support',
        'Basic Chart Access'
      ],
      pricing: {
        '1': { price: 0, original: 0 },
        '3': { price: 0, original: 0 },
        '6': { price: 0, original: 0 }
      }
    },
    PRO: {
      name: 'PRO',
      tagline: 'Advanced Cosmic Intelligence',
      icon: '⭐',
      color: '#FFD700',
      gradient: ['rgba(255, 215, 0, 0.3)', 'rgba(255, 215, 0, 0.08)'],
      popular: true,
      badge: 'MOST POPULAR',
      features: [
        'All FREE Features',
        'Executive Leadership Profiles',
        'Advanced Financial Planning',
        'Wealth Building Strategies', 
        'Priority Support',
        'Unlimited Report Generation',
        'All Vedic Charts Access',
        'Export to PDF/Excel',
        'Advanced Analytics',
        'Custom Insights'
      ],
      pricing: {
        '1': { price: 1999, original: 2999, discount: 33 },
        '3': { price: 4999, original: 8997, discount: 44 },
        '6': { price: 8999, original: 17994, discount: 50 }
      }
    },
    PREMIUM: {
      name: 'PREMIUM',
      tagline: 'Complete Cosmic Mastery',
      icon: '�',
      color: '#E91E63',
      gradient: ['rgba(233, 30, 99, 0.3)', 'rgba(233, 30, 99, 0.08)'],
      badge: 'BEST VALUE',
      features: [
        'All PRO Features',
        'Global Market Expansion',
        'Real-time Cosmic Intelligence',
        'Dedicated Account Manager',
        'White-label Reports',
        'API Access & Integrations',
        'Team Collaboration Tools',
        'Video Consultation',
        'Custom Business Solutions',
        '24/7 Priority Support',
        'Exclusive Content Access'
      ],
      pricing: {
        '1': { price: 4999, original: 7999, discount: 37 },
        '3': { price: 12999, original: 23997, discount: 46 },
        '6': { price: 22999, original: 47994, discount: 52 }
      }
    }
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleSubscribe = (tier: string, duration: string) => {
    console.log(`Subscribing to ${tier} plan for ${duration} month(s)`);
    // Integration with payment processor
    navigation.goBack();
  };

  const renderHeroSection = () => (
    <View style={styles.heroSection}>
      <LinearGradient
        colors={[
          'rgba(255, 215, 0, 0.1)', 
          'rgba(233, 30, 99, 0.05)', 
          'rgba(74, 144, 226, 0.03)',
          'transparent'
        ]}
        style={styles.heroGradient}
      >
        <View style={styles.cosmicBackground}>
          {/* Cosmic elements matching your design system */}
          <View style={[styles.cosmicElement, styles.star1]} />
          <View style={[styles.cosmicElement, styles.star2]} />
          <View style={[styles.cosmicElement, styles.planet]} />
          <View style={[styles.cosmicElement, styles.constellation]} />
          <View style={[styles.cosmicElement, styles.nebula]} />
        </View>
        
        <View style={styles.heroContent}>
          <Text style={[styles.heroTitle, { color: theme.colors.brand.primary }]}>
            🌟 Unlock Your Cosmic Potential
          </Text>
          <Text style={[styles.heroSubtitle, { color: theme.colors.neutral.light }]}>
            Choose your path to cosmic business intelligence with Corp Astro's advanced insights
          </Text>
          
          {/* Trust badges matching your design */}
          <View style={styles.trustBadges}>
            <View style={styles.trustBadge}>
              <Text style={styles.trustIcon}>🔒</Text>
              <Text style={styles.trustText}>Secure</Text>
            </View>
            <View style={styles.trustBadge}>
              <Text style={styles.trustIcon}>⚡</Text>
              <Text style={styles.trustText}>Instant</Text>
            </View>
            <View style={styles.trustBadge}>
              <Text style={styles.trustIcon}>🌙</Text>
              <Text style={styles.trustText}>Cosmic</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const renderDurationSelector = () => (
    <View style={styles.durationSection}>
      <Text style={[styles.sectionTitle, { color: theme.colors.neutral.text }]}>
        Choose Your Duration
      </Text>
      <View style={styles.durationButtons}>
        {[
          { id: '1', label: '1 Month', badge: null },
          { id: '3', label: '3 Months', badge: 'SAVE 44%' },
          { id: '6', label: '6 Months', badge: 'SAVE 50%' }
        ].map((duration) => (
          <Pressable
            key={duration.id}
            style={[
              styles.durationButton,
              {
                backgroundColor: selectedDuration === duration.id 
                  ? 'rgba(255, 215, 0, 0.2)' 
                  : 'rgba(255, 255, 255, 0.05)',
                borderColor: selectedDuration === duration.id 
                  ? theme.colors.brand.primary 
                  : 'rgba(255, 255, 255, 0.1)',
              }
            ]}
            onPress={() => setSelectedDuration(duration.id as any)}
          >
            {duration.badge && (
              <View style={[styles.saveBadge, { backgroundColor: '#4CAF50' }]}>
                <Text style={styles.saveBadgeText}>{duration.badge}</Text>
              </View>
            )}
            <Text style={[
              styles.durationLabel,
              { 
                color: selectedDuration === duration.id 
                  ? theme.colors.brand.primary 
                  : theme.colors.neutral.light 
              }
            ]}>
              {duration.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const renderTierCard = (tierId: keyof typeof tiers) => {
    const tier = tiers[tierId];
    const isExpanded = expandedTier === tierId;
    const isSelected = selectedTier === tierId;
    const pricing = tier.pricing[selectedDuration];

    return (
      <Pressable
        key={tierId}
        style={[
          styles.tierCard,
          {
            backgroundColor: isSelected 
              ? `${tier.color}08` 
              : 'rgba(255, 255, 255, 0.02)',
            borderColor: isSelected ? tier.color : 'rgba(255, 255, 255, 0.08)',
            borderWidth: isSelected ? 2 : 1,
            shadowColor: isSelected ? tier.color : '#000',
            shadowOpacity: isSelected ? 0.3 : 0.1,
          }
        ]}
        onPress={() => {
          setSelectedTier(tierId);
          setExpandedTier(isExpanded ? null : tierId);
        }}
      >
        <LinearGradient
          colors={tier.gradient as any}
          style={styles.tierCardContent}
        >
          {/* Badge */}
          {tier.badge && (
            <View style={[styles.popularBadge, { backgroundColor: tier.color }]}>
              <Text style={[styles.popularBadgeText, { 
                color: tier.color === '#FFD700' ? '#000' : '#FFF' 
              }]}>
                {tier.badge}
              </Text>
            </View>
          )}

          {/* Header */}
          <View style={styles.tierHeader}>
            <View style={styles.tierTitleSection}>
              <Text style={[styles.tierIcon, { fontSize: 28 }]}>{tier.icon}</Text>
              <View style={styles.tierTitleContent}>
                <Text style={[styles.tierName, { 
                  color: tier.color,
                  fontSize: 20,
                  fontWeight: '800'
                }]}>
                  {tier.name}
                </Text>
                <Text style={[styles.tierTagline, { 
                  color: theme.colors.neutral.light,
                  fontSize: 13,
                  opacity: 0.8
                }]}>
                  {tier.tagline}
                </Text>
              </View>
            </View>

            {/* Pricing */}
            <View style={styles.pricingSection}>
              {pricing.price > 0 ? (
                <>
                  <View style={styles.priceRow}>
                    <Text style={[styles.currentPrice, { 
                      color: tier.color,
                      fontSize: 28,
                      fontWeight: '900'
                    }]}>
                      {formatPrice(pricing.price)}
                    </Text>
                    {pricing.original > pricing.price && (
                      <Text style={[styles.originalPrice, { 
                        color: theme.colors.neutral.light,
                        fontSize: 16
                      }]}>
                        {formatPrice(pricing.original)}
                      </Text>
                    )}
                  </View>
                  <Text style={[styles.priceLabel, { 
                    color: theme.colors.neutral.light,
                    fontSize: 12
                  }]}>
                    ₹{Math.round(pricing.price / parseInt(selectedDuration))}/month
                  </Text>
                  {pricing.discount && (
                    <View style={[styles.discountBadge, { backgroundColor: '#4CAF50' }]}>
                      <Text style={styles.discountText}>Save {pricing.discount}%</Text>
                    </View>
                  )}
                </>
              ) : (
                <Text style={[styles.freePrice, { 
                  color: tier.color,
                  fontSize: 20,
                  fontWeight: '700'
                }]}>
                  Free Forever
                </Text>
              )}
            </View>

            <Text style={[
              styles.expandIcon,
              { 
                color: tier.color,
                transform: [{ rotate: isExpanded ? '180deg' : '0deg' }]
              }
            ]}>
              ▼
            </Text>
          </View>

          {/* Features (Expandable) */}
          {isExpanded && (
            <View style={styles.featuresSection}>
              {tier.features.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <Text style={[styles.featureIcon, { color: tier.color }]}>✓</Text>
                  <Text style={[styles.featureText, { 
                    color: theme.colors.neutral.light,
                    fontSize: 14
                  }]}>
                    {feature}
                  </Text>
                </View>
              ))}
              
              {/* CTA Button */}
              <Pressable
                style={[styles.ctaButton, { 
                  backgroundColor: tier.color,
                  marginTop: 20,
                  shadowColor: tier.color,
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: 8,
                }]}
                onPress={() => handleSubscribe(tierId, selectedDuration)}
              >
                <Text style={[styles.ctaButtonText, { 
                  color: tier.color === '#FFD700' ? '#000' : '#FFF',
                  fontSize: 16,
                  fontWeight: '700'
                }]}>
                  {tierId === 'FREE' ? 'Continue Free' : `Subscribe to ${tier.name}`}
                </Text>
              </Pressable>
            </View>
          )}
        </LinearGradient>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { flex: 1, backgroundColor: theme.colors.cosmos.void }]}>
      <CorporateProfessionalHeader
        title="Choose Your Plan"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderHeroSection()}
        {renderDurationSelector()}
        
        <View style={styles.tiersContainer}>
          {(Object.keys(tiers) as Array<keyof typeof tiers>).map(tierId => renderTierCard(tierId))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.securitySection}>
            <Text style={[styles.securityTitle, { color: theme.colors.neutral.text }]}>
              🔐 Your Payment is Secure
            </Text>
            <Text style={[styles.securityText, { color: theme.colors.neutral.light }]}>
              Powered by Razorpay • 256-bit SSL encryption • PCI DSS compliant
            </Text>
          </View>
          
          <View style={styles.guaranteeSection}>
            <Text style={[styles.guaranteeText, { color: theme.colors.neutral.light }]}>
              💯 30-day money-back guarantee • Cancel anytime • No hidden fees
            </Text>
          </View>

          <View style={styles.legalLinks}>
            <Pressable onPress={() => console.log('Terms of Service')}>
              <Text style={[styles.legalLink, { color: theme.colors.neutral.light }]}>Terms of Service</Text>
            </Pressable>
            <Text style={[styles.legalSeparator, { color: theme.colors.neutral.light }]}> • </Text>
            <Pressable onPress={() => console.log('Privacy Policy')}>
              <Text style={[styles.legalLink, { color: theme.colors.neutral.light }]}>Privacy Policy</Text>
            </Pressable>
            <Text style={[styles.legalSeparator, { color: theme.colors.neutral.light }]}> • </Text>
            <Pressable onPress={() => console.log('Refund Policy')}>
              <Text style={[styles.legalLink, { color: theme.colors.neutral.light }]}>Refund Policy</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 215, 0, 0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginRight: 16,
  },
  backButtonText: {
  ...typography.heading3,
  fontWeight: '600',
  },
  headerTitle: {
  ...typography.heading3,
  fontWeight: '700',
  letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  
  // Hero Section - Matching your design system
  heroSection: {
    position: 'relative',
    overflow: 'hidden',
  },
  heroGradient: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  cosmicBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cosmicElement: {
    position: 'absolute',
    borderRadius: 50,
  },
  star1: {
    width: 3,
    height: 3,
    backgroundColor: '#FFD700',
    top: '15%',
    right: '20%',
    shadowColor: '#FFD700',
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  star2: {
    width: 2,
    height: 2,
    backgroundColor: '#E91E63',
    top: '65%',
    left: '15%',
    shadowColor: '#E91E63',
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  planet: {
    width: 16,
    height: 16,
    backgroundColor: 'rgba(74, 144, 226, 0.3)',
    top: '25%',
    right: '30%',
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.5)',
  },
  constellation: {
    width: 2,
    height: 2,
    backgroundColor: '#FFFFFF',
    top: '75%',
    right: '40%',
    opacity: 0.6,
  },
  nebula: {
    width: 4,
    height: 4,
    backgroundColor: 'rgba(255, 215, 0, 0.4)',
    top: '40%',
    left: '25%',
    opacity: 0.7,
  },
  heroContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  heroTitle: {
  ...typography.heading2,
  fontWeight: '800',
  textAlign: 'center',
  marginBottom: 10,
  letterSpacing: 0.5,
  },
  heroSubtitle: {
  ...typography.body,
  textAlign: 'center',
  lineHeight: 20,
  marginBottom: 24,
  opacity: 0.9,
  },
  trustBadges: {
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
  },
  trustBadge: {
    alignItems: 'center',
    gap: 4,
  },
  trustIcon: {
  ...typography.body,
  },
  trustText: {
  ...typography.caption,
  fontWeight: '600',
  color: '#FFFFFF',
  opacity: 0.8,
  },

  // Duration Selector - Matching your card style
  durationSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
  ...typography.heading3,
  fontWeight: '700',
  marginBottom: 14,
  textAlign: 'center',
  },
  durationButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  durationButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    position: 'relative',
    minHeight: 56,
    justifyContent: 'center',
  },
  saveBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  saveBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  durationLabel: {
  ...typography.body,
  fontWeight: '600',
  textAlign: 'center',
  },

  // Tier Cards - Matching your report cards
  tiersContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  tierCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
  },
  tierCardContent: {
    padding: 20,
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: 6,
    alignItems: 'center',
    zIndex: 1,
  },
  popularBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  tierHeader: {
    marginTop: 12,
    marginBottom: 12,
  },
  tierTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tierIcon: {
  marginRight: 10,
  ...typography.heading1,
  },
  tierTitleContent: {
    flex: 1,
  },
  tierName: {
  marginBottom: 2,
  ...typography.heading3,
  fontWeight: '800',
  },
  tierTagline: {
  opacity: 0.9,
  ...typography.caption,
  },
  pricingSection: {
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentPrice: {
  ...typography.heading1,
  fontWeight: '900',
  },
  originalPrice: {
  ...typography.body,
  textDecorationLine: 'line-through',
  opacity: 0.6,
  },
  priceLabel: {
  marginTop: 2,
  opacity: 0.8,
  ...typography.caption,
  },
  freePrice: {
  ...typography.heading3,
  fontWeight: '700',
  },
  discountBadge: {
    position: 'absolute',
    top: -6,
    right: -16,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  expandIcon: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },

  // Features - Clean list style
  featuresSection: {
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureIcon: {
  ...typography.body,
  fontWeight: '700',
  width: 16,
  },
  featureText: {
  flex: 1,
  ...typography.body,
  },

  // CTA Button - Matching your button style
  ctaButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaButtonText: {
  letterSpacing: 0.5,
  ...typography.body,
  fontWeight: '700',
  },

  // Footer - Minimal and clean
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
    gap: 16,
  },
  securitySection: {
    alignItems: 'center',
    gap: 6,
  },
  securityTitle: {
  ...typography.body,
  fontWeight: '600',
  },
  securityText: {
  ...typography.caption,
  textAlign: 'center',
  opacity: 0.8,
  },
  guaranteeSection: {
    alignItems: 'center',
  },
  guaranteeText: {
  ...typography.caption,
  textAlign: 'center',
  opacity: 0.8,
  lineHeight: 16,
  },
  legalLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legalLink: {
  ...typography.caption,
  opacity: 0.7,
  },
  legalSeparator: {
  ...typography.caption,
  opacity: 0.7,
  },
});

export default SubscriptionScreen;
