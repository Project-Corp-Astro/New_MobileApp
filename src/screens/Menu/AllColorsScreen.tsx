/**
 * AllColorsScreen.tsx
 *
 * Diagnostic screen showing all theme colors, gradients,
 * typography, spacing, shadows, and design tokens in one place.
 * Helps designers & devs validate the Corp Astro Design System.
 */

import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { corpAstroDarkTheme } from "../../components/DesignSystem/DarkTheme";
import { designTokens } from "../../components/DesignSystem/designTokens";

// Utility: render color box
const ColorBox = ({ name, value }: { name: string; value: string }) => (
  <View style={styles.colorItem}>
    <View style={[styles.colorBox, { backgroundColor: value }]} />
    <Text style={styles.colorLabel}>{name}</Text>
    <Text style={styles.colorValue}>{value}</Text>
  </View>
);

// Utility: render typography sample
const TypographySample = ({ name, style }: { name: string; style: any }) => (
  <View style={styles.typographyItem}>
    <Text style={[styles.typographyText, style]}>{name} Sample Text</Text>
  </View>
);

const AllColorsScreen = () => {
  const themeColors = corpAstroDarkTheme.colors;
  const tokenColors = designTokens.colors;

  return (
    <ScrollView style={styles.container}>
      {/* THEME COLORS */}
      <Text style={styles.sectionTitle}>🌌 Corp Astro Theme Colors</Text>
      {Object.entries(themeColors).map(([system, values]) =>
        Object.entries(values).map(([key, value]) => (
          <ColorBox key={`${system}.${key}`} name={`${system}.${key}`} value={String(value)} />
        ))
      )}

      {/* TOKEN COLORS */}
      <Text style={styles.sectionTitle}>🎨 Design Token Colors</Text>
      {Object.entries(tokenColors.surface).map(([key, value]) => (
        <ColorBox key={`surface.${key}`} name={`surface.${key}`} value={value} />
      ))}
      {Object.entries(tokenColors.border).map(([key, value]) => (
        <ColorBox key={`border.${key}`} name={`border.${key}`} value={value} />
      ))}
      {Object.entries(tokenColors.text).map(([key, value]) => (
        <ColorBox key={`text.${key}`} name={`text.${key}`} value={value} />
      ))}

      {/* TYPOGRAPHY */}
      <Text style={styles.sectionTitle}>🔤 Typography Tokens</Text>
      {Object.entries(designTokens.typography).map(([key, style]) => (
        <TypographySample key={key} name={key} style={style} />
      ))}

      {/* SPACING */}
      <Text style={styles.sectionTitle}>📏 Spacing Tokens</Text>
      <View style={styles.row}>
        {Object.entries(designTokens.spacing).map(([key, value]) => (
          <View key={key} style={[styles.spacingBox, { width: value, height: value }]}>
            <Text style={styles.spacingLabel}>{key}</Text>
          </View>
        ))}
      </View>

      {/* RADIUS */}
      <Text style={styles.sectionTitle}>⭕ Radius Tokens</Text>
      <View style={styles.row}>
        {Object.entries(designTokens.radius).map(([key, value]) => (
          <View key={key} style={[styles.radiusBox, { borderRadius: value }]}>
            <Text style={styles.spacingLabel}>{key}</Text>
          </View>
        ))}
      </View>

      {/* BADGES */}
      <Text style={styles.sectionTitle}>🏷️ Badge Tokens</Text>
      {Object.entries(designTokens.badges).map(([key, style]) => (
        <TouchableOpacity key={key} style={[styles.badge, style]}>
          <Text style={{ color: "white" }}>{key}</Text>
        </TouchableOpacity>
      ))}

      {/* CARDS */}
      <Text style={styles.sectionTitle}>🃏 Card Tokens</Text>
      {Object.entries(designTokens.cards).map(([key, style]) => (
        <View key={key} style={[styles.card, style]}>
          <Text style={{ color: "white" }}>{key} card</Text>
        </View>
      ))}

      {/* SHADOWS */}
      <Text style={styles.sectionTitle}>🌑 Shadow Tokens</Text>
      {Object.entries(designTokens.shadows).map(([key, style]) => (
        <View key={key} style={[styles.shadowBox, style]}>
          <Text style={{ color: "white" }}>{key}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default AllColorsScreen;

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corpAstroDarkTheme.colors.cosmos.void,
    padding: 16,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 12,
  },
  colorItem: {
    marginBottom: 8,
  },
  colorBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginBottom: 4,
  },
  colorLabel: {
    color: "white",
    fontSize: 14,
  },
  colorValue: {
    color: "gray",
    fontSize: 12,
  },
  typographyItem: {
    marginBottom: 12,
  },
  typographyText: {
    color: "white",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  spacingBox: {
    backgroundColor: "rgba(255,255,255,0.2)",
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  spacingLabel: {
    color: "white",
    fontSize: 12,
  },
  radiusBox: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255,255,255,0.2)",
    margin: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    margin: 6,
    padding: 6,
  },
  card: {
    margin: 8,
    padding: 16,
  },
  shadowBox: {
    width: 80,
    height: 80,
    backgroundColor: "#222",
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
