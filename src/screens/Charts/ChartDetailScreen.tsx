/**
 * Corp Astro - Chart Detail Screen
 *
 * Dynamic chart detail page showing:
 * - North Indian square grid chart layout (traditional format)
 * - Chart data from in-house astro engine
 * - Readings and predictions
 * - Premium mystical design matching app theme
 *
 * @module ChartDetailScreen
 * @version 1.0.0
 * @since 2025
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Design System
import { corpAstroDarkTheme } from '../../components/DesignSystem/DarkTheme';
import { spacing, typography, radius, colors, shadows } from '../../components/DesignSystem/designTokens';

// Layout
import CorporateProfessionalHeader from '../../components/professional/CorporateProfessionalHeader';

const { width: screenWidth } = Dimensions.get('window');

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
  'ChartDetail'
>;

type ChartDetailScreenRouteProp = RouteProp<RootStackParamList, 'ChartDetail'>;

/**
 * Chart Detail Screen Component
 */
const ChartDetailScreen: React.FC = () => {
  const navigation = useNavigation<ChartDetailScreenNavigationProp>();
  const route = useRoute<ChartDetailScreenRouteProp>();
  const theme = corpAstroDarkTheme;

  const {
    chartId,
    chartType,
    title: chartTitle,
    energyType,
    description,
    isPremium,
    powerLevel,
  } = route.params;

  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); // simulate API
        const mockChartData = generateMockChartData(chartType);
        setChartData(mockChartData);
      } catch (error) {
        console.error('Error loading chart data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadChartData();
  }, [chartId, chartType]);

  // --- Mock Data Generators ---
  const generateMockChartData = (type: string) => {
    const planets = ['Su', 'Mo', 'Ma', 'Me', 'Ju', 'Ve', 'Sa', 'Ra', 'Ke'];
    const houses = Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      planets: [],
      sign: getSignForHouse(i + 1),
      degrees: Math.floor(Math.random() * 30),
    }));

    planets.forEach(planet => {
      const randomHouse = Math.floor(Math.random() * 12);
      houses[randomHouse].planets.push(planet);
    });

    return {
      type,
      houses,
      strengths: ['Strong Jupiter in 9th house', 'Venus in own sign', 'Mars in exaltation'],
      weaknesses: ['Afflicted Moon', 'Saturn in 6th house'],
      predictions: [
        'Career advancement in coming months',
        'Favorable time for relationships',
        'Financial growth indicated',
      ],
      remedies: [
        'Chant Jupiter mantras on Thursdays',
        'Wear yellow sapphire',
        'Donate to educational institutions',
      ],
    };
  };

  const getSignForHouse = (house: number): string => {
    const signs = ['Ari', 'Tau', 'Gem', 'Can', 'Leo', 'Vir', 'Lib', 'Sco', 'Sag', 'Cap', 'Aqu', 'Pis'];
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

    const chartSize = screenWidth - 40;
    const houseSize = chartSize / 4;

    return (
      <View style={styles.chartSection}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          North Indian Chart
        </Text>

        <View style={[styles.chartContainer, { backgroundColor: colors.cosmos.deep }]}>
          <View style={[styles.northIndianChart, { width: chartSize, height: chartSize }]}>
            {renderChartHouses(houseSize)}
          </View>
        </View>
      </View>
    );
  };

  const renderChartHouses = (houseSize: number) => {
    if (!chartData) return null;

    const positions = [
      { top: 0, left: houseSize, house: 1 },
      { top: 0, left: houseSize * 2, house: 2 },
      { top: 0, left: houseSize * 3, house: 3 },
      { top: houseSize, left: houseSize * 3, house: 4 },
      { top: houseSize * 2, left: houseSize * 3, house: 5 },
      { top: houseSize * 3, left: houseSize * 2, house: 6 },
      { top: houseSize * 3, left: houseSize, house: 7 },
      { top: houseSize * 3, left: 0, house: 8 },
      { top: houseSize * 2, left: 0, house: 9 },
      { top: houseSize, left: 0, house: 10 },
      { top: 0, left: 0, house: 11 },
      { top: houseSize, left: houseSize, house: 12 },
    ];

    return positions.map(pos => {
      const houseData = chartData.houses[pos.house - 1];
      return (
        <View
          key={pos.house}
          style={[
            styles.chartHouse,
            {
              position: 'absolute',
              top: pos.top,
              left: pos.left,
              width: houseSize,
              height: houseSize,
              backgroundColor: pos.house === 12 ? colors.cosmos.deep : 'transparent',
            },
          ]}
        >
          <Text style={[styles.houseNumber, { color: colors.brand.primary }]}>{pos.house}</Text>
          <Text style={[styles.houseSign, { color: colors.text.tertiary }]}>{houseData.sign}</Text>
          <View style={styles.planetsContainer}>
            {houseData.planets.map((planet: string, idx: number) => (
              <Text key={idx} style={[styles.planetText, { color: colors.brand.light }]}>
                {planet}
              </Text>
            ))}
          </View>
        </View>
      );
    });
  };

  const renderPredictionsSection = () =>
    chartData?.predictions && (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Predictions</Text>
        {chartData.predictions.map((prediction: string, index: number) => (
          <View key={index} style={[styles.predictionCard, { backgroundColor: colors.cosmos.deep }]}>
            <Text style={[styles.predictionIcon, { color: colors.brand.primary }]}>🌟</Text>
            <Text style={[styles.predictionText, { color: colors.text.secondary }]}>{prediction}</Text>
          </View>
        ))}
      </View>
    );

  const renderStrengthsSection = () =>
    chartData?.strengths && (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Strengths</Text>
        {chartData.strengths.map((strength: string, index: number) => (
          <View key={index} style={[styles.strengthCard, { backgroundColor: colors.cosmos.deep }]}>
            <Text style={[styles.strengthIcon, { color: colors.brand.accent }]}>✨</Text>
            <Text style={[styles.strengthText, { color: colors.text.secondary }]}>{strength}</Text>
          </View>
        ))}
      </View>
    );

  const renderRemediesSection = () =>
    chartData?.remedies && (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Remedies</Text>
        {chartData.remedies.map((remedy: string, index: number) => (
          <View key={index} style={[styles.remedyCard, { backgroundColor: colors.cosmos.deep }]}>
            <Text style={[styles.remedyIcon, { color: colors.brand.primary }]}>🔮</Text>
            <Text style={[styles.remedyText, { color: colors.text.secondary }]}>{remedy}</Text>
          </View>
        ))}
      </View>
    );

  // --- Screen Render ---
  if (loading) {
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.cosmos.void }]}>
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
      <SafeAreaView style={[styles.container, { backgroundColor: colors.cosmos.void }]}>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  loadingText: {
    fontSize: typography.body.fontSize,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  chartSection: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.heading2.fontSize,
    fontWeight: '600',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  chartContainer: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.emphasis,
  },
  northIndianChart: {
    position: 'relative',
    borderWidth: 2,
    borderColor: colors.brand.primary,
  },
  chartHouse: {
    borderWidth: 1,
    borderColor: colors.border.subtle,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  houseNumber: {
    fontSize: 10,
    fontWeight: '600',
    position: 'absolute',
    top: 2,
    left: 2,
  },
  houseSign: {
    fontSize: 8,
    position: 'absolute',
    top: 2,
    right: 2,
  },
  planetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  planetText: {
    fontSize: 10,
    fontWeight: '500',
    marginHorizontal: 1,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  predictionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.subtle,
  },
  predictionIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  predictionText: {
    fontSize: typography.body.fontSize,
    flex: 1,
    lineHeight: 20,
  },
  strengthCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.subtle,
  },
  strengthIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  strengthText: {
    fontSize: typography.body.fontSize,
    flex: 1,
    lineHeight: 20,
  },
  remedyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.subtle,
  },
  remedyIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  remedyText: {
    fontSize: typography.body.fontSize,
    flex: 1,
    lineHeight: 20,
  },
});
