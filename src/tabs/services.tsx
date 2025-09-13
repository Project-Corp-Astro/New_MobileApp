/**
 * Corp Astro - Premium Services Experience
 * 
 * Redesigned to match home screen standards with:
 * - Consistent sizing, padding, and whitespace
 * - Balanced left-to-right distribution
 * - Proper visual hierarchy and spacing
 * - Premium mystical aesthetics with professional layout
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  RefreshControl,
  Dimensions,
  ImageBackground,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Services: undefined;
  AstroRatan: undefined;
  MyBusiness: undefined;
  RatanStudio: undefined;
  ChartDetailScreen: {
    chartId: string;
    chartType: string;
    title: string;
    energyType: string;
    description: string;
    isPremium: string;
    powerLevel: number;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Services'>;
import { LinearGradient } from 'expo-linear-gradient';

// Import theme and design tokens
import { corpAstroDarkTheme } from '../components/DesignSystem/DarkTheme';
import { designTokens, typography, spacing, colors, borderOpacity, radius, shadows, cards, badges, animations, pagination } from '../components/DesignSystem/designTokens';

// Import premium components
import { HamburgerMenu, useHamburgerMenu } from '../components/Home/HamburgerMenu';
import CorporateHeader from '../components/professional/CorporateProfessionalHeader';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ServicesScreen() {
  const theme = corpAstroDarkTheme;
  const navigation = useNavigation<NavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [animatedValue] = useState(new Animated.Value(0));
  
  // Hamburger menu hook
  const hamburgerMenu = useHamburgerMenu({
    onNavigate: (route: keyof RootStackParamList) => {
      // Type assertion to handle navigation with proper type safety
      (navigation as any).navigate(route);
    },
  });

  // Set navigation options
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    // Continuous star field animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 4000, // Slower, more mystical pace
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 4000, // Symmetrical timing
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  // Clean service categories - simplified for readability
  const mysticTabs = useMemo(() => [
    { 
      title: 'Charts', 
      symbol: '🔯'
    },
    { 
      title: 'Insights', 
      symbol: '�'
    },
    { 
      title: 'Numbers', 
      symbol: '�'
    },
    { 
      title: 'Calendar', 
      symbol: '🌙'
    },
  ], []);

  // Comprehensive Vedic Charts - Better organized, compact layout
  const mysticalServices = useMemo(() => ({
    0: { // Charts
      title: 'Sacred Vedic Charts',
      subtitle: 'Ancient wisdom mapped through celestial geometry',
      description: 'Unlock the cosmic blueprint of your soul through traditional Vedic chart analysis, revealing the divine patterns written in the stars at your birth.',
      sections: [
        {
          title: 'Primary Charts',
          subtitle: 'Essential foundations',
          description: 'Core charts for life analysis',
          energy: 'Foundation',
          charts: [
            { 
              id: 'rashi-d1', title: 'Birth (D1)', chartType: 'rashi',
              description: 'Complete cosmic blueprint',
              mysticalFeatures: ['Soul blueprint', 'Life path'],
              energyType: 'Foundation', free: true, popular: true, sacred: true, powerLevel: 95
            },
            { 
              id: 'navamsa-d9', title: 'Navamsa (D9)', chartType: 'navamsa',
              description: 'Marriage & spiritual strength',
              mysticalFeatures: ['Marriage destiny', 'Soul evolution'],
              energyType: 'Spiritual', free: true, popular: true, sacred: true, powerLevel: 92
            },
            { 
              id: 'moon-chart', title: 'Moon Chart', chartType: 'moon',
              description: 'Emotional depths & mental patterns',
              mysticalFeatures: ['Emotional wisdom', 'Mental clarity'],
              energyType: 'Emotional', free: true, popular: true, sacred: false, powerLevel: 88
            },
            { 
              id: 'sun-chart', title: 'Sun Chart', chartType: 'sun',
              description: 'Solar consciousness & leadership',
              mysticalFeatures: ['Leadership power', 'Authority patterns'],
              energyType: 'Solar', free: true, popular: false, sacred: false, powerLevel: 85
            },
          ]
        },
        {
          title: 'All Divisional Charts (D1-D60)',
          subtitle: 'Complete Varga system',
          description: 'All traditional divisional charts',
          energy: 'Comprehensive',
          charts: [
            { 
              id: 'hora-d2', title: 'Hora (D2)', chartType: 'hora',
              description: 'Wealth & prosperity patterns',
              mysticalFeatures: ['Financial destiny', 'Wealth timing'],
              energyType: 'Material', free: true, popular: true, sacred: false, powerLevel: 78
            },
            { 
              id: 'drekkana-d3', title: 'Drekkana (D3)', chartType: 'drekkana',
              description: 'Siblings & courage',
              mysticalFeatures: ['Sibling bonds', 'Communication power'],
              energyType: 'Social', free: true, popular: false, sacred: false, powerLevel: 72
            },
            { 
              id: 'chaturthamsa-d4', title: 'Chaturthamsa (D4)', chartType: 'chaturthamsa',
              description: 'Property & home',
              mysticalFeatures: ['Property timing', 'Home harmony'],
              energyType: 'Property', free: true, popular: true, sacred: false, powerLevel: 76
            },
            { 
              id: 'panchamsa-d5', title: 'Panchamsa (D5)', chartType: 'panchamsa',
              description: 'Fame & recognition',
              mysticalFeatures: ['Fame potential', 'Divine blessings'],
              energyType: 'Recognition', free: false, popular: true, sacred: true, powerLevel: 81
            },
            { 
              id: 'shashthamsa-d6', title: 'Shashthamsa (D6)', chartType: 'shashthamsa',
              description: 'Health & obstacles',
              mysticalFeatures: ['Health optimization', 'Obstacle removal'],
              energyType: 'Health', free: false, popular: false, sacred: false, powerLevel: 74
            },
            { 
              id: 'saptamsa-d7', title: 'Saptamsa (D7)', chartType: 'saptamsa',
              description: 'Children & creativity',
              mysticalFeatures: ['Children insights', 'Creative power'],
              energyType: 'Creative', free: false, popular: true, sacred: true, powerLevel: 79
            },
            { 
              id: 'ashtamsa-d8', title: 'Ashtamsa (D8)', chartType: 'ashtamsa',
              description: 'Longevity & transformation',
              mysticalFeatures: ['Longevity secrets', 'Hidden wisdom'],
              energyType: 'Occult', free: false, popular: false, sacred: true, powerLevel: 86
            },
            { 
              id: 'dasamsa-d10', title: 'Dasamsa (D10)', chartType: 'dasamsa',
              description: 'Career & profession',
              mysticalFeatures: ['Career destiny', 'Professional success'],
              energyType: 'Career', free: true, popular: true, sacred: false, powerLevel: 84
            },
            { 
              id: 'ekadasamsa-d11', title: 'Ekadasamsa (D11)', chartType: 'ekadasamsa',
              description: 'Gains & profits',
              mysticalFeatures: ['Income sources', 'Desire fulfillment'],
              energyType: 'Gains', free: false, popular: true, sacred: false, powerLevel: 77
            },
            { 
              id: 'dvadasamsa-d12', title: 'Dvadasamsa (D12)', chartType: 'dvadasamsa',
              description: 'Parents & ancestors',
              mysticalFeatures: ['Ancestral blessings', 'Inherited karma'],
              energyType: 'Ancestral', free: false, popular: false, sacred: true, powerLevel: 75
            },
            { 
              id: 'shodasamsa-d16', title: 'Shodasamsa (D16)', chartType: 'shodasamsa',
              description: 'Vehicles & luxury',
              mysticalFeatures: ['Vehicle timing', 'Luxury manifestation'],
              energyType: 'Luxury', free: false, popular: false, sacred: false, powerLevel: 71
            },
            { 
              id: 'vimsamsa-d20', title: 'Vimsamsa (D20)', chartType: 'vimsamsa',
              description: 'Spirituality & devotion',
              mysticalFeatures: ['Spiritual path', 'Divine connection'],
              energyType: 'Spiritual', free: false, popular: true, sacred: true, powerLevel: 88
            },
            { 
              id: 'chaturvimsamsa-d24', title: 'Chaturvimsamsa (D24)', chartType: 'chaturvimsamsa',
              description: 'Education & learning',
              mysticalFeatures: ['Academic success', 'Knowledge mastery'],
              energyType: 'Education', free: false, popular: false, sacred: false, powerLevel: 73
            },
            { 
              id: 'saptavimsamsa-d27', title: 'Saptavimsamsa (D27)', chartType: 'saptavimsamsa',
              description: 'Strength & vitality',
              mysticalFeatures: ['Physical power', 'Mental endurance'],
              energyType: 'Strength', free: false, popular: false, sacred: false, powerLevel: 76
            },
            { 
              id: 'trimsamsa-d30', title: 'Trimsamsa (D30)', chartType: 'trimsamsa',
              description: 'Challenges & protection',
              mysticalFeatures: ['Challenge transformation', 'Protection strategies'],
              energyType: 'Protection', free: false, popular: true, sacred: true, powerLevel: 82
            },
            { 
              id: 'khavedamsa-d40', title: 'Khavedamsa (D40)', chartType: 'khavedamsa',
              description: 'Maternal lineage',
              mysticalFeatures: ['Maternal blessings', 'Auspicious events'],
              energyType: 'Maternal', free: false, popular: false, sacred: true, powerLevel: 78
            },
            { 
              id: 'akshavedamsa-d45', title: 'Akshavedamsa (D45)', chartType: 'akshavedamsa',
              description: 'Character & morality',
              mysticalFeatures: ['Character strength', 'Moral development'],
              energyType: 'Character', free: false, popular: false, sacred: true, powerLevel: 85
            },
            { 
              id: 'shashtiamsa-d60', title: 'Shashtiamsa (D60)', chartType: 'shashtiamsa',
              description: 'Past life karma',
              mysticalFeatures: ['Karmic patterns', 'Past life insights'],
              energyType: 'Karmic', free: false, popular: true, sacred: true, powerLevel: 95
            },
          ]
        },
        {
          title: 'Advanced Systems',
          subtitle: 'Special analysis tools',
          description: 'Specialized charts for deeper insights',
          energy: 'Advanced',
          charts: [
            { 
              id: 'bhava-chalit', title: 'Bhava Chalit', chartType: 'bhava_chalit',
              description: 'True house cusps',
              mysticalFeatures: ['Accurate positions', 'True influences'],
              energyType: 'Precision', free: false, popular: false, sacred: false, powerLevel: 87
            },
            { 
              id: 'ashtakavarga', title: 'Ashtakavarga', chartType: 'ashtakavarga',
              description: 'Planetary strength mapping',
              mysticalFeatures: ['Power analysis', 'Timing optimization'],
              energyType: 'Power', free: false, popular: true, sacred: true, powerLevel: 90
            },
            { 
              id: 'sudharshan-chakra', title: 'Sudharshan Chakra', chartType: 'sudharshan',
              description: 'Dynamic timing analysis',
              mysticalFeatures: ['Precise timing', 'Event prediction'],
              energyType: 'Timing', free: false, popular: false, sacred: true, powerLevel: 93
            },
            { 
              id: 'kp-system', title: 'KP System', chartType: 'kp',
              description: 'Krishnamurti Paddhati',
              mysticalFeatures: ['Stellar precision', 'Event timing'],
              energyType: 'Scientific', free: false, popular: false, sacred: true, powerLevel: 89
            },
          ]
        },
        {
          title: 'Dasha & Transits',
          subtitle: 'Planetary periods & timing',
          description: 'Time-based analysis systems',
          energy: 'Temporal',
          charts: [
            { 
              id: 'vimshottari-dasha', title: 'Vimshottari Dasha', chartType: 'vimshottari',
              description: '120-year planetary cycle',
              mysticalFeatures: ['Life phases', 'Planetary periods'],
              energyType: 'Timing', free: true, popular: true, sacred: true, powerLevel: 92
            },
            { 
              id: 'ashtottari-dasha', title: 'Ashtottari Dasha', chartType: 'ashtottari',
              description: '108-year alternative cycle',
              mysticalFeatures: ['Alternative timing', 'Specialized periods'],
              energyType: 'Alternative', free: false, popular: false, sacred: true, powerLevel: 86
            },
            { 
              id: 'current-transits', title: 'Current Transits', chartType: 'transits',
              description: 'Live planetary movements',
              mysticalFeatures: ['Current influences', 'Present guidance'],
              energyType: 'Current', free: true, popular: true, sacred: false, powerLevel: 84
            },
            { 
              id: 'sade-sati', title: 'Sade Sati', chartType: 'sade_sati',
              description: 'Saturn\'s 7.5-year cycle',
              mysticalFeatures: ['Transformation periods', 'Challenge guidance'],
              energyType: 'Transformation', free: false, popular: true, sacred: true, powerLevel: 89
            },
          ]
        }
      ]
    },
    
    1: { // Insights
      title: 'Soul Reports & Divine Insights',
      subtitle: 'Comprehensive spiritual guidance from the cosmos',
      description: 'Detailed mystical reports that illuminate your souls journey, relationships, and destiny through ancient Vedic wisdom.',
      sections: [
        {
          title: 'Life Essence Reports',
          subtitle: 'Deep soul analysis and guidance',
          description: 'Comprehensive reports revealing your souls blueprint',
          energy: 'Transformational',
          charts: [
            { 
              title: 'Complete Soul Blueprint', 
              description: 'Your ultimate life guide - comprehensive 50+ page report covering personality, relationships, career, health, spirituality, and timing.',
              mysticalFeatures: ['Complete life mapping', 'Soul purpose revelation', 'Karmic healing guidance'],
              energyType: 'Comprehensive',
              free: false, 
              popular: true,
              sacred: true,
              powerLevel: 98
            },
            { 
              title: 'Sacred Personality Alchemy', 
              description: 'Deep character transformation guide - understand your core traits, hidden talents, psychological patterns, and growth opportunities.',
              mysticalFeatures: ['Shadow work guidance', 'Talent activation', 'Personality optimization'],
              energyType: 'Psychological',
              free: false, 
              popular: true,
              sacred: false,
              powerLevel: 86
            },
            { 
              title: 'Strength & Weakness Illumination', 
              description: 'Personal power assessment - detailed analysis of your natural gifts, challenges to overcome, and optimal strategies for success.',
              mysticalFeatures: ['Power center identification', 'Weakness transformation', 'Strategic life planning'],
              energyType: 'Strategic',
              free: false, 
              popular: false,
              sacred: false,
              powerLevel: 79
            },
            { 
              title: 'Life Purpose Awakening', 
              description: 'Dharmic path revelation - discover your souls mission, spiritual purpose, and how to align your life with cosmic will.',
              mysticalFeatures: ['Dharma discovery', 'Purpose alignment', 'Cosmic will connection'],
              energyType: 'Purpose',
              free: false, 
              popular: false,
              sacred: true,
              powerLevel: 93
            },
          ]
        },
        {
          title: 'Relationship Alchemy',
          subtitle: 'Love, partnership & family harmony',
          description: 'Sacred relationship wisdom and compatibility insights',
          energy: 'Relational',
          charts: [
            { 
              title: 'Sacred Marriage Analysis', 
              description: 'Divine partnership blueprint - comprehensive compatibility analysis, timing for marriage, and relationship success strategies.',
              mysticalFeatures: ['Soul mate recognition', 'Marriage timing secrets', 'Relationship harmony rituals'],
              energyType: 'Partnership',
              free: false, 
              popular: true,
              sacred: true,
              powerLevel: 91
            },
            { 
              title: 'Love Compatibility Magic', 
              description: 'Romantic harmony assessment - deep compatibility analysis covering emotional, mental, physical, and spiritual connection levels.',
              mysticalFeatures: ['Love chemistry analysis', 'Compatibility enhancement', 'Romantic timing guidance'],
              energyType: 'Romantic',
              free: false, 
              popular: true,
              sacred: false,
              powerLevel: 84
            },
            { 
              title: 'Family Harmony Secrets', 
              description: 'Household peace and family dynamics - understand family relationships, resolve conflicts, and create lasting harmony.',
              mysticalFeatures: ['Family healing guidance', 'Conflict resolution', 'Harmony manifestation'],
              energyType: 'Familial',
              free: false, 
              popular: false,
              sacred: false,
              powerLevel: 76
            },
            { 
              title: 'Children Blessing Report', 
              description: 'Progeny wisdom and child guidance - timing for children, their potential, and optimal parenting approaches for their chart.',
              mysticalFeatures: ['Children timing insights', 'Child potential reading', 'Parenting optimization'],
              energyType: 'Parental',
              free: false, 
              popular: false,
              sacred: true,
              powerLevel: 82
            },
          ]
        },
        {
          title: 'Prosperity & Career Mastery',
          subtitle: 'Professional success & wealth manifestation',
          description: 'Material and professional guidance from cosmic wisdom',
          energy: 'Material',
          charts: [
            { 
              title: 'Career Destiny Activation', 
              description: 'Professional path optimization - discover your ideal career, best timing for job changes, and professional success strategies.',
              mysticalFeatures: ['Career calling discovery', 'Professional timing mastery', 'Success strategy activation'],
              energyType: 'Professional',
              free: false, 
              popular: true,
              sacred: false,
              powerLevel: 88
            },
            { 
              title: 'Business Success Alchemy', 
              description: 'Entrepreneurial wisdom and business timing - optimal business types, partnership analysis, and growth timing for ventures.',
              mysticalFeatures: ['Business timing secrets', 'Entrepreneurial guidance', 'Venture success optimization'],
              energyType: 'Entrepreneurial',
              free: false, 
              popular: false,
              sacred: false,
              powerLevel: 81
            },
            { 
              title: 'Wealth Manifestation Guide', 
              description: 'Financial abundance blueprint - wealth patterns, investment timing, and money manifestation strategies from your chart.',
              mysticalFeatures: ['Wealth pattern analysis', 'Money manifestation rituals', 'Financial timing mastery'],
              energyType: 'Financial',
              free: false, 
              popular: true,
              sacred: false,
              powerLevel: 85
            },
            { 
              title: 'Investment Timing Wisdom', 
              description: 'Strategic financial decisions - optimal timing for investments, property purchases, and major financial moves.',
              mysticalFeatures: ['Investment timing precision', 'Financial decision optimization', 'Wealth timing secrets'],
              energyType: 'Investment',
              free: false, 
              popular: false,
              sacred: false,
              powerLevel: 77
            },
          ]
        }
      ]
    },
    
    2: { // Numbers
      title: 'Mystic Numbers & Sacred Vibrations',
      subtitle: 'Numerical consciousness and vibrational alignment',
      description: 'Unlock the hidden power of numbers in your life through ancient numerological wisdom and modern vibrational science.',
      sections: [
        {
          title: 'Core Number Mysteries',
          subtitle: 'Personal numerology foundations',
          description: 'Discover your essential numerical vibrations',
          energy: 'Core',
          charts: [
            { 
              title: 'Life Path Illumination', 
              description: 'Your souls numerical blueprint - discover your core life purpose, natural talents, and evolutionary path through your birth date.',
              mysticalFeatures: ['Life purpose activation', 'Talent amplification', 'Path clarity enhancement'],
              energyType: 'Purpose',
              free: true, 
              popular: true,
              sacred: true,
              powerLevel: 92
            },
            { 
              title: 'Destiny Number Activation', 
              description: 'Ultimate life goal revelation - your full birth name reveals your highest potential and what you are meant to achieve in this lifetime.',
              mysticalFeatures: ['Destiny alignment', 'Goal manifestation', 'Achievement optimization'],
              energyType: 'Achievement',
              free: true, 
              popular: true,
              sacred: true,
              powerLevel: 89
            },
            { 
              title: 'Soul Number Awakening', 
              description: 'Inner desire and motivation mapping - discover your deepest drives, what truly motivates you, and how to honor your souls desires.',
              mysticalFeatures: ['Soul desire clarity', 'Motivation optimization', 'Inner drive activation'],
              energyType: 'Motivational',
              free: false, 
              popular: false,
              sacred: true,
              powerLevel: 87
            },
            { 
              title: 'Personality Number Magic', 
              description: 'External image and first impression mastery - how others perceive you and how to optimize your personal presentation.',
              mysticalFeatures: ['Image optimization', 'Perception mastery', 'Charisma enhancement'],
              energyType: 'Social',
              free: false, 
              popular: false,
              sacred: false,
              powerLevel: 78
            },
          ]
        },
        {
          title: 'Name Vibration Alchemy',
          subtitle: 'Linguistic power and correction',
          description: 'Transform your reality through name optimization',
          energy: 'Transformational',
          charts: [
            { 
              title: 'Current Name Analysis', 
              description: 'Vibrational assessment of your existing name - understand how your current name affects your energy, opportunities, and life experiences.',
              mysticalFeatures: ['Name energy reading', 'Vibrational assessment', 'Energy optimization'],
              energyType: 'Assessment',
              free: true, 
              popular: true,
              sacred: false,
              powerLevel: 81
            },
            { 
              title: 'Business Name Optimization', 
              description: 'Company and brand name power analysis - ensure your business name attracts success, customers, and positive energy.',
              mysticalFeatures: ['Business energy enhancement', 'Brand vibration optimization', 'Success magnetism'],
              energyType: 'Business',
              free: false, 
              popular: false,
              sacred: false,
              powerLevel: 83
            },
            { 
              title: 'Name Correction Mastery', 
              description: 'Personalized name optimization - receive multiple optimal name variations that enhance your energy and life opportunities.',
              mysticalFeatures: ['Name transformation', 'Energy enhancement', 'Life optimization'],
              energyType: 'Corrective',
              free: false, 
              popular: true,
              sacred: true,
              powerLevel: 94
            },
            { 
              title: 'Sacred Baby Names', 
              description: 'Optimal names for newborns - select the perfect name for your child based on birth chart and numerological harmony.',
              mysticalFeatures: ['Child destiny optimization', 'Name harmony creation', 'Future success programming'],
              energyType: 'Generational',
              free: false, 
              popular: false,
              sacred: true,
              powerLevel: 91
            },
          ]
        }
      ]
    },
    
    3: { // Calendar
      title: 'Cosmic Calendar & Sacred Timing',
      subtitle: 'Divine timing and celestial rhythms',
      description: 'Align with cosmic rhythms and discover the perfect timing for all your important decisions and actions.',
      sections: [
        {
          title: 'Daily Cosmic Elements',
          subtitle: 'Todays celestial guidance',
          description: 'Current cosmic energies and divine timing',
          energy: 'Daily',
          charts: [
            { 
              title: 'Sacred Daily Panchang', 
              description: 'Complete cosmic calendar for today - tithi, nakshatra, yoga, karana, and planetary positions for optimal daily planning.',
              mysticalFeatures: ['Daily energy optimization', 'Cosmic rhythm alignment', 'Sacred timing mastery'],
              energyType: 'Daily',
              free: true, 
              popular: true,
              sacred: true,
              powerLevel: 85
            },
            { 
              title: 'Divine Muhurta Timing', 
              description: 'Auspicious periods for important activities - perfect timing for meetings, launches, ceremonies, and significant decisions.',
              mysticalFeatures: ['Perfect timing discovery', 'Auspicious moment identification', 'Success timing optimization'],
              energyType: 'Timing',
              free: true, 
              popular: true,
              sacred: true,
              powerLevel: 88
            },
            { 
              title: 'Lunar Consciousness Guide', 
              description: 'Moon phase wisdom and nakshatra power - harness lunar energy for manifestation, healing, and spiritual practices.',
              mysticalFeatures: ['Lunar power harnessing', 'Moon phase optimization', 'Celestial energy channeling'],
              energyType: 'Lunar',
              free: true, 
              popular: false,
              sacred: true,
              powerLevel: 82
            },
            { 
              title: 'Planetary Position Power', 
              description: 'Current cosmic influences and planetary weather - understand todays planetary energies and how they affect you.',
              mysticalFeatures: ['Planetary influence reading', 'Cosmic weather forecast', 'Energy adaptation guidance'],
              energyType: 'Planetary',
              free: true, 
              popular: false,
              sacred: false,
              powerLevel: 79
            },
          ]
        },
        {
          title: 'Sacred Timing Mastery',
          subtitle: 'Advanced celestial periods',
          description: 'Master-level timing wisdom for important decisions',
          energy: 'Advanced',
          charts: [
            { 
              title: 'Rahu Kaal Protection', 
              description: 'Inauspicious period guidance and protection - avoid negative timing and transform challenging periods into opportunities.',
              mysticalFeatures: ['Negative timing avoidance', 'Period transformation', 'Protection activation'],
              energyType: 'Protective',
              free: true, 
              popular: true,
              sacred: true,
              powerLevel: 86
            },
            { 
              title: 'Abhijit Muhurta Mastery', 
              description: 'Most powerful daily timing - harness the most auspicious 48-minute period each day for maximum success in any activity.',
              mysticalFeatures: ['Maximum power timing', 'Success amplification', 'Victory timing mastery'],
              energyType: 'Power',
              free: false, 
              popular: false,
              sacred: true,
              powerLevel: 95
            },
            { 
              title: 'Choghadiya Wisdom', 
              description: 'Day-night period optimization - master the 8-period system for timing different types of activities throughout the day.',
              mysticalFeatures: ['Period mastery', 'Activity optimization', 'Time consciousness'],
              energyType: 'Systematic',
              free: false, 
              popular: false,
              sacred: false,
              powerLevel: 81
            },
            { 
              title: 'Planetary Hora Secrets', 
              description: 'Hourly planetary rulership wisdom - use planetary hours for specific intentions, rituals, and important actions.',
              mysticalFeatures: ['Hourly optimization', 'Planetary hour mastery', 'Intention timing precision'],
              energyType: 'Hourly',
              free: false, 
              popular: false,
              sacred: true,
              powerLevel: 84
            },
          ]
        }
      ]
    }
  }), []);

  // Clean and compact tab navigation
  const renderMysticalTabs = () => (
    <View style={styles.tabSanctuary}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabScrollContent}
        snapToInterval={120} // Smaller width for compact tabs
        decelerationRate="fast"
      >
        {mysticTabs.map((tab, index) => (
          <Pressable
            key={index}
            style={[
              styles.mysticalTab,
              activeTab === index && styles.activeTab,
            ]}
            onPress={() => {
              setActiveTab(index);
            }}
            accessibilityLabel={`${tab.title} services tab`}
            accessibilityHint={`Double tap to view ${tab.title.toLowerCase()} services`}
            accessibilityRole="button"
            accessibilityState={{ selected: activeTab === index }}
          >
            <View style={[
              styles.tabContent,
              {
                backgroundColor: activeTab === index ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                borderColor: activeTab === index ? '#7C3AED' : 'rgba(255, 255, 255, 0.1)',
              }
            ]}>
              <Text style={styles.tabSymbol}>{tab.symbol}</Text>
              <Text style={[
                styles.tabTitle,
                { 
                  color: activeTab === index ? '#FFFFFF' : colors.text.secondary,
                  fontWeight: activeTab === index ? '600' : '500'
                }
              ]}>
                {tab.title}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );

  // Professional service card with home screen sizing standards
  const renderMysticalServiceCard = (service: any, sectionIndex: number) => {
    const sectionGradients = [
      ['#3F51B5', '#5C6BC0'], // Softer blue mystical
      ['#7B1FA2', '#9C27B0'], // Softer purple divine
      ['#00695C', '#26A69A'], // Softer teal vibrational
      ['#E64A19', '#FF7043'], // Softer orange cosmic
    ];
    const gradient = sectionGradients[sectionIndex % sectionGradients.length];
    
    return (
      <Pressable
        style={({ pressed }) => [
          styles.mysticalCard,
          { 
            transform: [{ scale: pressed ? animations.pressedScale : 1 }],
            opacity: pressed ? 0.9 : 1,
          }
        ]}
        onPress={() => handleServicePress(service)}
        accessibilityLabel={`${service.title} service`}
        accessibilityHint={`Double tap to access ${service.title} service`}
        accessibilityRole="button"
      >
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.06)', 'rgba(255, 255, 255, 0.02)']}
          style={styles.cardGradient}
        >
          {/* Streamlined badge system - max 2 badges for clarity */}
          <View style={styles.cardBadgeRow}>
            {service.sacred && (
              <View style={[styles.standardBadge, styles.sacredBadge]}>
                <Text style={styles.sacredBadgeText}>✨ SACRED</Text>
              </View>
            )}
            {service.popular && !service.sacred && (
              <View style={[styles.standardBadge, styles.popularBadge]}>
                <Text style={styles.popularBadgeText}>🔥 POPULAR</Text>
              </View>
            )}
            {!service.free && (
              <View style={[styles.standardBadge, styles.proBadge]}>
                <Text style={styles.proBadgeText}>💎 PRO</Text>
              </View>
            )}
          </View>
          
          {/* Card Content with proper hierarchy */}
          <View style={styles.mysticalCardContent}>
            <Text style={styles.mysticalCardTitle}>{service.title}</Text>
            <Text style={styles.energyType}>{service.energyType}</Text>
            <Text style={styles.mysticalDescription} numberOfLines={3}>{service.description}</Text>
            
            {/* Key features - max 2 for mobile UX */}
            <View style={styles.featuresContainer}>
              {service.mysticalFeatures?.slice(0, 2).map((feature: string, index: number) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.featureBullet}>•</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Action Section */}
          <LinearGradient
            colors={[gradient[0], gradient[1]]}
            style={styles.mysticalActionButton}
          >
            <Text style={styles.actionButtonText}>
              {service.free ? '🔓 Access Now' : '✨ Unlock Premium'}
            </Text>
          </LinearGradient>
        </LinearGradient>
      </Pressable>
    );
  };

  // Professional section rendering with horizontal scroll like home screen
  const renderMysticalSection = (section: any, index: number) => {
    const sectionGradients = [
      ['#4A148C', '#7B1FA2'], // Purple mystical
      ['#1A237E', '#3F51B5'], // Blue divine
      ['#004D40', '#00695C'], // Teal vibrational
      ['#BF360C', '#E64A19'], // Orange cosmic
    ];
    const gradient = sectionGradients[index % sectionGradients.length];
    
    return (
      <View key={index} style={styles.mysticalSection}>
        {/* Section Header with proper spacing */}
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.mysticalSectionTitle}>{section.title}</Text>
          <Text style={styles.mysticalSectionSubtitle}>{section.subtitle}</Text>
          <Text style={styles.sectionDescription}>{section.description}</Text>
          
          <View style={styles.sectionMeta}>
            <View style={[styles.energyBadge, { backgroundColor: gradient[0] }]}>
              <Text style={styles.energyBadgeText}>{section.energy}</Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{section.charts.length} Services</Text>
            </View>
          </View>
        </View>
        
        {/* Horizontal scrolling cards matching home screen pattern */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsScrollContent}
          style={styles.cardsScrollView}
          snapToInterval={cards.horizontalScroll.width + spacing.md} // 280 + 16 = 296px for proper snapping
          snapToAlignment="start"
          decelerationRate="fast"
        >
          {section.charts.map((service: any, serviceIndex: number) => 
            <View key={`${index}-${serviceIndex}-${service.title}`}>
              {renderMysticalServiceCard(service, index)}
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  // Main content with professional layout matching home screen
  const renderMysticalContent = () => {
    const currentData = mysticalServices[activeTab];
    if (!currentData) return null;

    return (
      <View style={styles.mysticalContent}>
        {/* Content Header with consistent spacing */}
        <View style={styles.contentHeaderContainer}>
          <Text style={styles.mysticalContentTitle}>{currentData.title}</Text>
          <Text style={styles.mysticalContentSubtitle}>{currentData.subtitle}</Text>
          <Text style={styles.mysticalContentDescription}>{currentData.description}</Text>
        </View>
        
        {/* Render Sections with proper spacing */}
        {currentData.sections.map((section: any, index: number) => 
          <View key={`section-${index}-${section.title}`}>
            {renderMysticalSection(section, index)}
          </View>
        )}
      </View>
    );
  };

  const handleServicePress = (service: {
    id: string;
    title: string;
    energyType: string;
    chartType?: string;
    description: string;
    free?: boolean;
    powerLevel?: number;
  }) => {
    console.log(`✨ Accessing ${service.title} - ${service.energyType}`);
    
    // Navigate to dynamic chart detail page
    if (service.chartType && service.id) {
      // Use type assertion for navigation to bypass TypeScript's strict type checking
      (navigation as any).navigate('ChartDetailScreen', {
        chartId: service.id,
        chartType: service.chartType,
        title: service.title,
        energyType: service.energyType,
        description: service.description,
        isPremium: !service.free ? 'true' : 'false',
        powerLevel: service.powerLevel || 75
      });
    } else {
      // For general services or reports, log for now
      console.log(`Service accessed: ${service.title}`);
      // In real app, this would navigate to a reports detail page
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.cosmos.void }]}>
     <CorporateHeader variant="centered" title="Services" />

      {renderMysticalTabs()}
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={colors.mystical.deep}
            colors={[colors.mystical.deep, colors.brand.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderMysticalContent()}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      <HamburgerMenu
        visible={hamburgerMenu.isVisible}
        onClose={hamburgerMenu.closeMenu}
        userProfile={hamburgerMenu.userProfile}
        menuSections={hamburgerMenu.menuSections}
        onProfilePress={hamburgerMenu.handleProfilePress}
        onSettingsPress={hamburgerMenu.handleSettingsPress}
        onHelpPress={hamburgerMenu.handleHelpPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ============================================================================
  // MAIN LAYOUT - MATCHING HOME SCREEN STANDARDS
  // ============================================================================
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // Reduced from 120 for better proportion
  },
  bottomSpacing: {
    height: spacing.xl, // 32px instead of xxl for consistent spacing
  },

  // ============================================================================
  // CLEAN TAB STYLES - COMPACT AND READABLE
  // ============================================================================
  
  tabSanctuary: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: spacing.xs, // Very compact - 4px
  },
  tabScrollContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs, // Tighter spacing
  },
  mysticalTab: {
    width: 110, // More compact width
  },
  activeTab: {
    // Clean active state
  },
  tabContent: {
    borderRadius: radius.sm, // Smaller radius for compactness
    borderWidth: 1,
    paddingVertical: spacing.xs, // 4px - very compact
    paddingHorizontal: spacing.sm, // 8px
    alignItems: 'center',
    minHeight: 44, // Maintain touch target
  },
  tabSymbol: {
    fontSize: 16, // Smaller symbol
    marginBottom: 2,
  },
  tabTitle: {
    ...typography.caption, // 12px - compact text
    textAlign: 'center',
    fontWeight: '500',
  },

  // ============================================================================
  // CONTENT STYLES - MATCHING HOME SCREEN SPACING
  // ============================================================================
  
  mysticalContent: {
    flex: 1,
  },
  contentHeaderContainer: {
    marginHorizontal: spacing.lg, // 20px consistent with home screen
    marginVertical: spacing.md, // 16px vertical spacing
    padding: spacing.lg, // 20px padding
    backgroundColor: colors.surface.primary,
    borderRadius: radius.lg, // 16px radius consistent with home screen
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  mysticalContentTitle: {
    ...typography.heading2, // 24px for proper hierarchy (reduced from heading1)
    fontWeight: '700', // Consistent with home screen
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xs, // 4px tight spacing
  },
  mysticalContentSubtitle: {
    ...typography.body, // 14px for subtitle
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.sm, // 8px spacing
    fontWeight: '500',
  },
  mysticalContentDescription: {
    ...typography.body, // 14px consistent
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.9,
  },

  // ============================================================================
  // SECTION STYLES - MATCHING HOME SCREEN LAYOUT
  // ============================================================================
  
  mysticalSection: {
    marginBottom: spacing.lg, // 20px consistent with home screen sections
  },
  sectionHeaderContainer: {
    marginHorizontal: spacing.lg, // 20px horizontal margin
    marginBottom: spacing.md, // 16px bottom margin
    padding: spacing.md, // 16px padding
    backgroundColor: colors.surface.primary,
    borderRadius: radius.md, // 12px radius
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  mysticalSectionTitle: {
    ...typography.heading3, // 20px for section titles (consistent with home screen)
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.xs, // 4px
  },
  mysticalSectionSubtitle: {
    ...typography.body, // 14px for subtitles
    color: colors.text.secondary,
    marginBottom: spacing.xs, // 4px
    fontWeight: '500',
  },
  sectionDescription: {
    ...typography.body, // 14px consistent
    color: colors.text.tertiary,
    lineHeight: 18,
    marginBottom: spacing.sm, // 8px
    opacity: 0.9,
  },
  sectionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px gap
  },
  energyBadge: {
    paddingHorizontal: spacing.sm, // 8px
    paddingVertical: spacing.xs, // 4px
    borderRadius: radius.sm, // 8px
    alignItems: 'center',
    justifyContent: 'center',
  },
  energyBadgeText: {
    ...typography.caption, // 12px
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  countBadge: {
    backgroundColor: colors.surface.secondary,
    paddingHorizontal: spacing.sm, // 8px
    paddingVertical: spacing.xs, // 4px
    borderRadius: radius.sm, // 8px
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  countBadgeText: {
    ...typography.caption, // 12px
    color: colors.text.secondary,
    fontWeight: '500',
  },

  // ============================================================================
  // CARD STYLES - COMPACT HORIZONTAL LAYOUT FOR BETTER MOBILE UX
  // ============================================================================
  
  cardsScrollContent: {
    paddingHorizontal: spacing.sm, // 8px padding
    gap: spacing.sm, // 8px smaller gap for more compact layout
  },
  cardsScrollView: {
    marginHorizontal: spacing.md, // 16px margin
  },
  mysticalCard: {
    width: 200, // Much more compact card width (was 280px)
    borderRadius: radius.lg, // 16px radius
    overflow: 'hidden',
    ...shadows.default,
  },
  cardGradient: {
    borderRadius: radius.lg, // 16px
    borderWidth: 1,
    borderColor: colors.border.subtle,
    minHeight: 180, // Much more compact height (was 320px)
    padding: spacing.md, // 16px padding (reduced from 20px)
  },
  
  // STREAMLINED BADGE SYSTEM - MORE COMPACT
  cardBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm, // 8px spacing (reduced)
    minHeight: 24, // More compact height
  },
  
  // STANDARDIZED BADGE STYLES - SMALLER
  standardBadge: {
    paddingHorizontal: spacing.xs, // 4px (reduced)
    paddingVertical: 2, // Very compact vertical padding
    borderRadius: 6, // Smaller radius for compact badges
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sacredBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.9)',
    borderColor: 'rgba(255, 215, 0, 0.4)',
  },
  sacredBadgeText: {
    ...typography.caption, // 12px
    color: '#000000',
    fontWeight: '700',
    letterSpacing: 0.3,
    fontSize: 10, // Even smaller text
  },
  popularBadge: {
    backgroundColor: 'rgba(255, 87, 34, 0.9)',
    borderColor: 'rgba(255, 87, 34, 0.4)',
  },
  popularBadgeText: {
    ...typography.caption, // 12px
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
    fontSize: 10, // Even smaller text
  },
  proBadge: {
    backgroundColor: 'rgba(156, 39, 176, 0.9)',
    borderColor: 'rgba(156, 39, 176, 0.4)',
  },
  proBadgeText: {
    ...typography.caption, // 12px
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
    fontSize: 10, // Even smaller text
  },

  // CARD CONTENT LAYOUT - COMPACT
  mysticalCardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  mysticalCardTitle: {
    ...typography.body, // 14px for compact card titles (reduced from bodyLarge)
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 2, // Very tight spacing
    lineHeight: 16,
    fontSize: 13, // Slightly smaller for compactness
  },
  energyType: {
    ...typography.caption, // 12px (reduced from body)
    color: colors.text.secondary,
    fontWeight: '500',
    marginBottom: spacing.xs, // 4px (reduced)
    opacity: 0.8,
    fontSize: 11, // Smaller text
  },
  mysticalDescription: {
    ...typography.caption, // 12px (reduced from body)
    color: colors.text.tertiary,
    lineHeight: 14, // Tighter line height
    marginBottom: spacing.xs, // 4px (reduced)
    opacity: 0.9,
    fontSize: 11, // Smaller for compactness
  },
  featuresContainer: {
    gap: 2, // Very tight gap
    marginBottom: spacing.xs, // 4px (reduced)
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 2, // Very tight gap
  },
  featureBullet: {
    ...typography.caption, // 12px
    color: colors.brand.primary,
    marginTop: 1,
    fontSize: 10, // Smaller bullet
  },
  featureText: {
    ...typography.caption, // 12px for features
    color: colors.text.tertiary,
    flex: 1,
    lineHeight: 13, // Tighter line height
    fontSize: 10, // Smaller feature text
  },
  mysticalActionButton: {
    paddingVertical: spacing.xs, // 4px (much more compact)
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 32, // Smaller touch target for compact cards
    borderRadius: radius.sm, // 8px (smaller)
    marginTop: spacing.xs, // 4px (reduced)
  },
  actionButtonText: {
    ...typography.caption, // 12px (reduced)
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
    fontSize: 11, // Smaller button text
  },
});