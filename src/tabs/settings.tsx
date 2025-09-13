/**
 * Corp Astro - Settings Tab
 * 
 * Tab view for settings, designed to work within the main tab navigation.
 * Follows the design system tokens for consistent styling.
 */

import React from 'react';
import { corpAstroDarkTheme } from '../components/DesignSystem/DarkTheme';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { spacing, typography, colors, radius } from '../components/DesignSystem/designTokens';
import CorporateHeader from '../components/professional/CorporateProfessionalHeader';

const SettingsTab = () => {
  const theme = corpAstroDarkTheme;
  const navigation = useNavigation();

  const settingsItems = [
    { label: 'My Business', icon: { family: 'MaterialIcons', name: 'business' ,navigate:'BusinessScreen' } },
    { label: 'Manage Subscriptions', icon: { family: 'MaterialIcons', name: 'receipt',navigate:'SubscriptionScreen' } },
    { label:  'Calendar',icon:{family:'MaterialIcons',name:'calendar-today',navigate:'CalendarScreen'}},
    { label: 'App Settings', icon: { family: 'Ionicons', name: 'settings-outline',navigate:'SettingsScreen' } },
    { label: 'Rate App', icon: { family: 'MaterialIcons', name: 'star-outline',navigate:'RateAppScreen' } },
    { label: 'Reports', icon: { family: 'MaterialIcons', name: 'history',navigate:'ReportsScreen' } },
    { label: 'Refer Us', icon: { family: 'Ionicons', name: 'heart-outline',navigate:'ReferUsScreen' } },
    { label: 'Contact Us', icon: { family: 'MaterialIcons', name: 'headset',navigate:'HelpSupportScreen' } },
    { label : 'all colors', icon: { family: '', name: 'all colors',navigate:'AllColorsScreen'}}
  ];

  return (
    <View style={styles.container}>
      <CorporateHeader variant="centered" title="Settings" />
      
      <ScrollView style={styles.scrollView}>
        {/* Settings List */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>
            General Settings
          </Text>

          <View style={styles.settingsList}>
            {settingsItems.map((item) => (
              <Pressable 
                key={item.label} 
                style={({ pressed }) => [
                  styles.settingItem,
                  pressed && styles.pressedItem
                ]}
                onPress={() => {
                  if (item.icon.navigate) {
                    navigation.navigate(item.icon.navigate as never);
                  }
                }}
              >
                <View style={styles.settingContent}>
                  <View style={styles.settingIcon}>
                    {item.icon.family === 'MaterialIcons' ? (
                      <MaterialIcons 
                        name={item.icon.name as any} 
                        size={24}
                        color={colors.text.primary}
                      />
                    ) : (
                      <Ionicons 
                        name={item.icon.name as any} 
                        size={24}
                        color={colors.text.primary}
                      />
                    )}
                  </View>
                  <Text style={styles.settingLabel}>
                    {item.label}
                  </Text>
                  <Ionicons 
                    name="chevron-forward" 
                    size={20} 
                    color={colors.text.secondary}
                    style={styles.chevron}
                  />
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>
            Corp Astro v1.0.0
          </Text>
          <Text style={styles.appDesc}>
            Professional Astrology Application
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"black"
  },
  scrollView: {
    flex: 1,
  },
  settingsSection: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  settingsList: {
    backgroundColor: colors.surface.primary,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  settingItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border.default,
  },
  pressedItem: {
    backgroundColor: colors.surface.secondary,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,
    backgroundColor: colors.surface.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  settingLabel: {
    ...typography.bodyLarge,
    color: colors.text.primary,
    flex: 1,
  },
  chevron: {
    marginLeft: spacing.xs,
  },
  appInfo: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xxl,
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  appVersion: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  appDesc: {
    ...typography.caption,
    color: colors.text.secondary,
    opacity: 0.7,
  },
});
