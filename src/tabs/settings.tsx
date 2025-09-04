/**
 * Corp Astro - Settings Tab
 * 
 * Tab view for settings, designed to work within the main tab navigation.
 * For full settings screen with header, see @/screens/Menu/SettingsScreen
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { corpAstroDarkTheme } from '../components/DesignSystem/DarkTheme';
import { spacing } from '../components/DesignSystem/SpacingScale';
import CorporateProfessionalHeader from '../components/professional/CorporateProfessionalHeader'; 
import { typography } from '../components/DesignSystem/designTokens';

const SettingsTab = () => {
  const theme = corpAstroDarkTheme;
  const navigation = useNavigation();

  const settingsItems = [
    { label: 'My Business', icon: { family: 'MaterialIcons', name: 'business' } },
    { label: 'Manage Subscriptions', icon: { family: 'MaterialIcons', name: 'receipt',navigate:'SubscriptionScreen' } },
    { label: 'Notifications', icon: { family: 'Ionicons', name: 'notifications-outline',navigate:'NotificationScreen' } },
    { label: 'Unlock All Features', icon: { family: 'MaterialIcons', name: 'lock' } },
    { label: 'Reports', icon: { family: 'MaterialIcons', name: 'history',navigate:'ReportsScreen' } },
    { label: 'Contact Us', icon: { family: 'MaterialIcons', name: 'headset' } },
    { label: 'Follow Us', icon: { family: 'Ionicons', name: 'heart-outline'  } },
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: String(theme.colors.cosmos.void) }]}
    >
      <CorporateProfessionalHeader
              title="Settings"
              subtitle="Customize Your Experience"
              showBackButton={true}
            />
      {/* Settings List */}
      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: String(theme.colors.neutral.text) }]}>
          General Settings
        </Text>

        {settingsItems.map((item) => (
          <Pressable 
            key={item.label} 
            style={[styles.settingItem, { borderColor: 'rgba(255,255,255,0.04)' }]} 
            onPress={() => {
              if (item.icon.navigate) {
                navigation.navigate(item.icon.navigate as never);
              } else {
                console.log(item.label);
              }
            }}
          >
            <View style={styles.settingRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={styles.iconWrap}>
                  {item.icon.family === 'MaterialIcons' ? (
                    <MaterialIcons 
                      name={item.icon.name as any} 
                      size={20} 
                      color={String(theme.colors.neutral.light)} 
                    />
                  ) : (
                    <Ionicons 
                      name={item.icon.name as any} 
                      size={20} 
                      color={String(theme.colors.neutral.light)} 
                    />
                  )}
                </View>
                <Text style={[styles.settingLabel, { color: String(theme.colors.neutral.text) }]}>
                  {item.label}
                </Text>
              </View>
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={String(theme.colors.neutral.light)} 
              />
            </View>
          </Pressable>
        ))}
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={[styles.appVersion, { color: String(theme.colors.neutral.light) }]}>
          Corp Astro v1.0.0
        </Text>
        <Text style={[styles.appDesc, { color: String(theme.colors.neutral.light) }]}>
          Professional Astrology Application
        </Text>
      </View>
    </ScrollView>
  );
};

export default SettingsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: spacing.lg,
  },
  settingsSection: {
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  settingItem: {
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    marginRight: spacing.sm,
  },
  appInfo: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
  },
  appVersion: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  appDesc: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
