/**
 * Corp Astro - Base Screen Component
 * 
 * Reusable base screen component that provides consistent
 * layout, styling, and behavior across all screens.
 * 
 * @module BaseScreen
 * @version 1.0.0
 * @since 2025
 */

import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { corpAstroDarkTheme } from '../DesignSystem/DarkTheme';

interface BaseScreenProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarStyle?: 'light-content' | 'dark-content';
}

/**
 * Base Screen Component
 * 
 * Provides consistent screen layout and styling.
 * Handles status bar, background, and safe areas.
 */
export const BaseScreen: React.FC<BaseScreenProps> = ({
  children,
  backgroundColor = corpAstroDarkTheme.colors.cosmos.void,
  statusBarStyle = 'light-content',
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BaseScreen;
