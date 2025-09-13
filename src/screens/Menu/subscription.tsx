/**
 * Corp Astro - Subscription Screen (Professional)
 *
 * Features:
 * - Hero section
 * - Monthly/Yearly toggle
 * - Gradient tier cards with glow
 * - Badges (Popular, Best Value, Save %)
 * - Expandable features
 * - Enterprise tier
 * - Professional styling
 *
 * @format
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import CorporateHeader from '../../components/professional/CorporateProfessionalHeader';

import { corpAstroDarkTheme } from "../../components/DesignSystem/DarkTheme";

const tiers = {
  FREE: {
    name: "Free",
    tagline: "Get started with basics",
    color: String(corpAstroDarkTheme.colors.neutral.medium),
    gradient: [
      String(corpAstroDarkTheme.colors.cosmos.deep),
      String(corpAstroDarkTheme.colors.cosmos.dark)
    ],
    pricing: {
      monthly: { price: 0, original: 0 },
      yearly: { price: 0, original: 0 },
    },
    features: ["Basic horoscope", "Limited charts", "Community access"],
    badge: null,
  },
  PRO: {
    name: "Pro",
    tagline: "For growing businesses",
    color: String(corpAstroDarkTheme.colors.brand.primary),
    gradient: [
      String(corpAstroDarkTheme.colors.brand.primary),
      String(corpAstroDarkTheme.colors.mystical.royal)
    ],
    pricing: {
      monthly: { price: 499, original: 699 },
      yearly: { price: 4999, original: 6999 },
    },
    features: [
      "All Free features",
      "Unlimited charts",
      "Advanced predictions",
      "Email support",
    ],
    badge: "Most Popular",
  },
 
  ENTERPRISE: {
    name: "Enterprise",
    tagline: "Custom solutions for corporates",
    color: String(corpAstroDarkTheme.colors.mystical.deep),
    gradient: [
      String(corpAstroDarkTheme.colors.mystical.deep),
      String(corpAstroDarkTheme.colors.mystical.royal)
    ],
    pricing: {
      monthly: { price: 1999, original: 2499 },
      yearly: { price: 19999, original: 24999 },
    },
    features: [
      "All Premium features",
      "White-label branding",
      "API access",
      "Dedicated account manager",
      "24/7 priority support",
    ],
    badge: "Enterprise Grade",
  },
};

const formatPrice = (price: number) => `₹${price}`;

const SubscriptionScreen = () => {
  const [selectedTier, setSelectedTier] = useState<keyof typeof tiers>("PRO");
  const [expandedTier, setExpandedTier] = useState<keyof typeof tiers | null>(
    "PRO"
  );
  const [isYearly, setIsYearly] = useState(false);

  const handleSubscribe = (tierId: keyof typeof tiers) => {
    console.log("Subscribing to:", tierId, isYearly ? "Yearly" : "Monthly");
  };

  const handleBackPress = () => {
    // Navigation logic will be handled by the header's default behavior
  };

  const renderHeroSection = () => (
 <View style={styles.heroSection}>
      <Text style={styles.heroTitle}>Choose Your Cosmic Plan</Text>
      <Text style={styles.heroSubtitle}>
        Unlock business intelligence powered by astrology
      </Text>

      {/* Monthly/Yearly toggle */}
      <View style={styles.toggleRow}>
        <Text style={[styles.toggleLabel, !isYearly && styles.activeToggle]}>
          Monthly
        </Text>
        <Switch
          value={isYearly}
          onValueChange={setIsYearly}
          thumbColor={isYearly ? "#FFD700" : "#3B82F6"}
          trackColor={{ false: "#475569", true: "#EAB308" }}
        />
        <Text style={[styles.toggleLabel, isYearly && styles.activeToggle]}>
          Yearly
        </Text>
      </View>

      {isYearly && (
        <Text style={styles.saveText}>Save up to 30% with yearly plans!</Text>
      )}
    </View>
  );

  const renderTierCard = (tierId: keyof typeof tiers) => {
    const tier = tiers[tierId];
    const isExpanded = expandedTier === tierId;
    const isSelected = selectedTier === tierId;
    const pricing = isYearly ? tier.pricing.yearly : tier.pricing.monthly;

    return (
      <Pressable
        key={tierId}
        style={[
          styles.tierCard,
          isSelected && { borderColor: tier.color, shadowColor: tier.color },
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
            <View style={[styles.badge, { backgroundColor: tier.color }]}>
              <Text
                style={[
                  styles.badgeText,
                  { 
                    color: tier.color === String(corpAstroDarkTheme.colors.luxury.pure) 
                      ? String(corpAstroDarkTheme.colors.cosmos.void) 
                      : String(corpAstroDarkTheme.colors.neutral.text) 
                  },
                ]}
              >
                {tier.badge}
              </Text>
            </View>
          )}

          {/* Plan Name + Tagline */}
          <View style={styles.planHeader}>
            <Text style={[styles.planName, { color: String(corpAstroDarkTheme.colors.neutral.text) }]}>
              {tier.name}
            </Text>
            <Text style={styles.planTagline}>{tier.tagline}</Text>
          </View>

          {/* Pricing */}
          <View style={styles.pricingSection}>
            {pricing.price > 0 ? (
              <>
                <Text style={[styles.currentPrice, { color: String(corpAstroDarkTheme.colors.neutral.text) }]}>
                  {formatPrice(pricing.price)}
                </Text>
                <Text style={styles.perMonth}>
                  {isYearly
                    ? `Billed yearly (${formatPrice(pricing.price / 12)}/mo)`
                    : `₹${pricing.price}/month`}
                </Text>
                {pricing.original > pricing.price && (
                  <Text style={styles.originalPrice}>
                    {formatPrice(pricing.original)}
                  </Text>
                )}
              </>
            ) : (
              <Text style={[styles.freePrice, { color: String(corpAstroDarkTheme.colors.neutral.text) }]}>
                Free Forever
              </Text>
            )}
          </View>

          {/* Expand Features */}
          {isExpanded && (
            <View style={styles.featuresSection}>
              {tier.features.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={String(corpAstroDarkTheme.colors.brand.primary)}
                  />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
              {/* CTA */}
              <Pressable
                style={[styles.ctaButton, { backgroundColor: tier.color }]}
                onPress={() => handleSubscribe(tierId)}
              >
                <Text
                  style={[
                    styles.ctaButtonText,
                    { 
                      color: tier.color === String(corpAstroDarkTheme.colors.luxury.pure)
                        ? String(corpAstroDarkTheme.colors.cosmos.void)
                        : String(corpAstroDarkTheme.colors.neutral.text)
                    },
                  ]}
                >
                  {tierId === "FREE"
                    ? "continue free"
                    : `subscribe to ${tier.name.toLowerCase()}`}
                </Text>
              </Pressable>
            </View>
          )}
        </LinearGradient>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <CorporateHeader variant="centered" title="Subscription" showBackButton />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderHeroSection()}
        <View style={styles.tiersContainer}>
          {(Object.keys(tiers) as Array<keyof typeof tiers>).map(
            renderTierCard
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: String(corpAstroDarkTheme.colors.cosmos.void) 
  },
  scrollContent: { 
    paddingTop: 16,
    paddingBottom: 40,
    paddingHorizontal: 16 
  },
  heroSection: {
    paddingVertical: 
    0,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    color: String(corpAstroDarkTheme.colors.neutral.text),
  },
  heroSubtitle: {
    fontSize: 16,
    color: String(corpAstroDarkTheme.colors.neutral.muted),
    marginBottom: 16,
    lineHeight: 24,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    gap: 8,
    padding: 8,
    borderRadius: 12,
  },
  toggleLabel: { 
    fontSize: 14, 
    color: String(corpAstroDarkTheme.colors.neutral.muted) 
  },
  activeToggle: { 
    fontWeight: "700", 
    color: String(corpAstroDarkTheme.colors.neutral.text) 
  },
  saveText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
    color: String(corpAstroDarkTheme.colors.luxury.pure),
  },
  tiersContainer: { padding: 16, gap: 16 },
  tierCard: {
    borderWidth: 1,
    borderColor: String(corpAstroDarkTheme.colors.cosmos.dark),
    borderRadius: 16,
    overflow: "hidden",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  tierCardContent: { padding: 20, borderRadius: 16 },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    backgroundColor: String(corpAstroDarkTheme.colors.brand.primary),
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: String(corpAstroDarkTheme.colors.neutral.text),
  },
  planHeader: { marginBottom: 12 },
  planName: { 
    fontSize: 20, 
    fontWeight: "800",
    color: String(corpAstroDarkTheme.colors.neutral.text),
  },
  planTagline: { 
    fontSize: 13, 
    color: String(corpAstroDarkTheme.colors.neutral.text), 
    marginTop: 2 
  },
  pricingSection: { marginBottom: 12 },
  currentPrice: { 
    fontSize: 22, 
    fontWeight: "800",
    color: String(corpAstroDarkTheme.colors.neutral.text),
  },
  perMonth: { 
    fontSize: 14, 
    color: String(corpAstroDarkTheme.colors.neutral.text), 
    marginTop: 2 
  },
  originalPrice: {
    fontSize: 13,
    textDecorationLine: "line-through",
    color: String(corpAstroDarkTheme.colors.neutral.text),
    marginTop: 4,
  },
  freePrice: { 
    fontSize: 18, 
    fontWeight: "700",
    color: String(corpAstroDarkTheme.colors.neutral.text),
  },
  featuresSection: { 
    marginTop: 12, 
    gap: 8 
  },
  featureRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 8 
  },
  featureText: {
    fontSize: 14,
    color: String(corpAstroDarkTheme.colors.neutral.text),
    flex: 1,
  },
  ctaButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: String(corpAstroDarkTheme.colors.brand.primary),
  },
  ctaButtonText: { 
    fontSize: 16, 
    fontWeight: "700",
    color: String(corpAstroDarkTheme.colors.neutral.text),
  },
});

export default SubscriptionScreen;
