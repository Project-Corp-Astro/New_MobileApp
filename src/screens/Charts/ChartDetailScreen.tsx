/**
 * Corp Astro - Chart Detail Screen
 *
 * Dynamic chart detail page showing:
 * - North Indian diamond chart layout (with correct lines)
 * - Chart data from in-house astro engine (mocked here)
 * - Readings and predictions
 * - Premium mystical design matching app theme
 *
 * @module ChartDetailScreen
 * @version 1.0.0
 * @since 2025
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  ViewStyle,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Design System
import {
  spacing,
  typography,
  radius,
  colors,
  shadows,
} from "../../components/DesignSystem/designTokens";

// Layout
import CorporateProfessionalHeader from "../../components/professional/CorporateProfessionalHeader";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

/**
 * Stack params for navigation
 */
type RootStackParamList = {
  Home: undefined;
  ChartDetail: {
    chartId: string;
    chartType: string;
    title: string;
    energyType?: string;
    description?: string;
    isPremium?: string;
    powerLevel?: string;
  };
};

type ChartDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ChartDetail"
>;

type ChartDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ChartDetail"
>;

type HousePosition = {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  transform?: Array<{ [key: string]: number | string }>;
};

const ChartDetailScreen: React.FC = () => {
  const navigation = useNavigation<ChartDetailScreenNavigationProp>();
  const route = useRoute<ChartDetailScreenRouteProp>();

  const { chartId, chartType, title: chartTitle } = route.params;

  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800)); // simulate API
        const mockChartData = generateMockChartData(chartType);
        setChartData(mockChartData);
      } catch (error) {
        console.error("Error loading chart data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadChartData();
  }, [chartId, chartType]);

  // --- Mock Data Generators ---
  const generateMockChartData = (type: string) => {
    const planets = ["Su", "Mo", "Ma", "Me", "Ju", "Ve", "Sa", "Ra", "Ke"];
    const houses = Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      planets: [] as string[],
      sign: getSignForHouse(i + 1),
      degrees: Math.floor(Math.random() * 30),
    }));

    planets.forEach((planet) => {
      const randomHouse = Math.floor(Math.random() * 12);
      houses[randomHouse].planets.push(planet);
    });

    return {
      type,
      ascSign: houses[0].sign, // using house 1 sign as asc mock
      houses,
      strengths: [
        "Strong Jupiter in 9th house",
        "Venus in own sign",
        "Mars in exaltation",
      ],
      weaknesses: ["Afflicted Moon", "Saturn in 6th house"],
      predictions: [
        "Career advancement in coming months",
        "Favorable time for relationships",
        "Financial growth indicated",
      ],
      remedies: [
        "Chant Jupiter mantras on Thursdays",
        "Wear yellow sapphire",
        "Donate to educational institutions",
      ],
    };
  };

  const getSignForHouse = (house: number): string => {
    const signs = [
      "Ari",
      "Tau",
      "Gem",
      "Can",
      "Leo",
      "Vir",
      "Lib",
      "Sco",
      "Sag",
      "Cap",
      "Aqu",
      "Pis",
    ];
    return signs[(house - 1) % 12];
  };

  // --- UI Sections ---
  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.brand.primary} />
      <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
        Loading chart data...
      </Text>
    </View>
  );

  const renderNorthIndianChart = () => {
    if (!chartData) return null;

    // Responsive square size
    const chartSize = Math.min(screenWidth - 40, 520);

    // House label positions (percent-based so they scale cleanly)
    const housePositions: HousePosition[] = [
      { top: "10%", left: "50%", transform: [{ translateX: -12 }] }, // 1
      { top: "3%", left: "20%" }, // 2
      { top: "20%", left: "5%", transform: [{ translateY: -12 }] }, // 3
      { bottom: "50%", left: "20%" }, // 4
      { bottom: "15%", left: "7%", transform: [{ translateX: -12 }] }, // 5
      { bottom: "5%", right: "73%" }, // 6
      { bottom: "10%", left: "45%", transform: [{ translateY: -12 }] }, // 7
      { bottom: 0, right: "20%" }, // 8
      { top: "70%", right: "2%" }, // 9
      { top: "40%", right: "25%" }, // 10
      { bottom: "70%", right: "3%" }, // 11
      { top: 0, right: "20%" }, // 12
    ];

    return (
      <View style={styles.chartSection}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          North Indian Chart
        </Text>

        <View
          style={[
            styles.chartContainer,
            { backgroundColor: colors.cosmos.deep },
          ]}
        >
          <View
            style={[
              styles.northIndianChart,
              { width: chartSize, height: chartSize },
            ]}
          >
            {/* Correct grid lines */}
            <View style={styles.diagonalLine1} />
            <View style={styles.diagonalLine2} />
            <View style={styles.centerSquare}>
              <Text style={styles.ascendantText}>
                Asc: {chartData.ascSign}
              </Text>
            </View>

            {/* House labels + planets */}
            {chartData.houses.map((house: any, index: number) => (
              <View
                key={`house-${index + 1}`}
                style={[
                  styles.houseContainer,
                  {
                    position: "absolute",
                    ...(housePositions[index] as ViewStyle),
                  },
                ]}
              >
                <Text style={styles.houseNumberText}>{index + 1}</Text>
                <Text style={styles.houseSignText}>{house.sign}</Text>
                <View style={styles.planetsRow}>
                  {house.planets.map((p: string, i: number) => (
                    <Text key={`${p}-${i}`} style={styles.planetChip}>
                      {p}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderPredictionsSection = () =>
    chartData?.predictions && (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Predictions
        </Text>
        {chartData.predictions.map((prediction: string, index: number) => (
          <View
            key={index}
            style={[
              styles.predictionCard,
              { backgroundColor: colors.cosmos.deep },
            ]}
          >
            <Text
              style={[styles.emoj, { color: colors.brand.primary }]}
              accessibilityLabel="prediction"
            >
              🌟
            </Text>
            <Text
              style={[styles.predictionText, { color: colors.text.secondary }]}
            >
              {prediction}
            </Text>
          </View>
        ))}
      </View>
    );

  const renderStrengthsSection = () =>
    chartData?.strengths && (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Strengths
        </Text>
        {chartData.strengths.map((strength: string, index: number) => (
          <View
            key={index}
            style={[
              styles.strengthCard,
              { backgroundColor: colors.cosmos.deep },
            ]}
          >
            <Text
              style={[styles.emoj, { color: colors.brand.accent }]}
              accessibilityLabel="strength"
            >
              ✨
            </Text>
            <Text
              style={[styles.strengthText, { color: colors.text.secondary }]}
            >
              {strength}
            </Text>
          </View>
        ))}
      </View>
    );

  const renderRemediesSection = () =>
    chartData?.remedies && (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Remedies
        </Text>
        {chartData.remedies.map((remedy: string, index: number) => (
          <View
            key={index}
            style={[
              styles.remedyCard,
              { backgroundColor: colors.cosmos.deep },
            ]}
          >
            <Text
              style={[styles.emoj, { color: colors.brand.primary }]}
              accessibilityLabel="remedy"
            >
              🔮
            </Text>
            <Text
              style={[styles.remedyText, { color: colors.text.secondary }]}
            >
              {remedy}
            </Text>
          </View>
        ))}
      </View>
    );

  // --- Screen Render ---
  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.cosmos.void }]}
      >
        <CorporateProfessionalHeader
          title={chartTitle}
          showBackButton
          onBackPress={() => navigation.goBack()}
        />
        {renderLoadingState()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.cosmos.void }]}
    >
      <CorporateProfessionalHeader
        title={chartTitle}
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderNorthIndianChart()}
        {renderPredictionsSection()}
        {renderStrengthsSection()}
        {renderRemediesSection()}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChartDetailScreen;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  bottomSpacing: {
    height: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
  loadingText: {
    fontSize: typography.body.fontSize,
    marginTop: spacing.md,
    textAlign: "center",
  },
  chartSection: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.heading2.fontSize,
    fontWeight: "600",
    marginBottom: spacing.md,
    textAlign: "center",
  },
  chartContainer: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: "center",
    ...shadows.emphasis,
  },
  northIndianChart: {
    position: "relative",
    borderWidth: 2,
    borderColor: colors.brand.primary,
    backgroundColor: "transparent",
    overflow: "hidden",
  },

  // --- Correct North Indian grid lines ---
  diagonalLine1: {
    position: "absolute",
    width: "141.4%", // sqrt(2) * 100%
    height: 2,
    backgroundColor: colors.brand.primary,
    top: "50%",
    left: "-20.7%",
    transform: [{ rotate: "45deg" }],
  },
  diagonalLine2: {
    position: "absolute",
    width: "141.4%",
    height: 2,
    backgroundColor: colors.brand.primary,
    top: "50%",
    left: "-20.7%",
    transform: [{ rotate: "-45deg" }],
  },
  centerSquare: {
    position: "absolute",
    top: "14.4%",
    left: "14.4%",
    width: "71.2%", // fits exactly between midpoints
    height: "71.2%",
    borderWidth: 2,
    borderColor: colors.brand.primary,
    transform: [{ rotate: "45deg" }],
    alignItems: "center",
    justifyContent: "center",
  },
  ascendantText: {
    transform: [{ rotate: "-45deg" }],
    fontSize: Math.min(screenWidth * 0.04, 18),
    fontWeight: "700",
    color: colors.brand.primary,
    position: "absolute",
    top: "40%",
    right: "50%",
  },

  // House labels
  houseContainer: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  houseNumberText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.brand.primary,
    marginBottom: 2,
  },
  houseSignText: {
    fontSize: 10,
    color: colors.text.tertiary,
    marginBottom: 2,
  },
  planetsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  planetChip: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.brand.light,
    marginHorizontal: 2,
  },

  // Sections
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  predictionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.subtle,
  },
  strengthCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.subtle,
  },
  remedyCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.subtle,
  },
  emoj: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  predictionText: {
    fontSize: typography.body.fontSize,
    flex: 1,
    lineHeight: 20,
  },
  strengthText: {
    fontSize: typography.body.fontSize,
    flex: 1,
    lineHeight: 20,
  },
  remedyText: {
    fontSize: typography.body.fontSize,
    flex: 1,
    lineHeight: 20,
  },
});
