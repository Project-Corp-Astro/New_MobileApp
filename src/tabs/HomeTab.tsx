/**
 * Corp Astro - Modern Competitive Home Screen
 * 
 * Redesigned to match competitor standards with:
 * - Rich visual design and cosmic backgrounds
 * - Enhanced user engagement and interactivity
 * - Modern UI patterns and visual hierarchy
 * - Improved accessibility and touch targets
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  RefreshControl,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

// Import theme
import { corpAstroDarkTheme } from '../components/DesignSystem/DarkTheme';

// Import design tokens
import { designTokens, typography, spacing, colors, borderOpacity, radius, shadows, cards, badges, animations, pagination } from '../components/DesignSystem/designTokens';

// Import professional components
import { 
  ProfessionalTimingsCard, 
  ProfessionalGuidanceCard,
  type TimingData,
  type GuidanceItem 
} from '../components/professional';

// Import extracted components
import { CosmicWelcomeSection } from '../components/Home/CosmicWelcomeSection';
import { DailyInsightsSection } from '../components/Home/DailyInsightsSection';
import { BusinessDashboardSection } from '../components/Home/BusinessDashboardSection';
import { HoroscopeCard } from '../components/Home/HoroscopeCard';

// Import premium components
import CorporateProfessionalHeader from '../components/professional/CorporateProfessionalHeader';
import { HamburgerMenu, useHamburgerMenu } from '../components/Home/HamburgerMenu';

const HomeTab: React.FC = () => {
  const theme = corpAstroDarkTheme;
  const navigation = useNavigation();

  // small helper to translate expo-router style paths to react-navigation names
  const navigateTo = (to: string | { pathname?: string } | any) => {
    if (!to) return;
    // accept strings like '/foo' or plain route names, or objects with pathname
    const raw = typeof to === 'string' ? to : (to.pathname ?? to.path ?? '');
    const name = String(raw).replace(/^\//, '');
    if (!name) return;
    (navigation as any).navigate(name, to.params ?? undefined);
  };

  // Hamburger menu hook
  const hamburgerMenu = useHamburgerMenu({
    onNavigate: (route: string) => {
      navigateTo(route as any);
    },
  });
  
  // Helper function to create alpha colors safely
  const createAlphaColor = (color: string, alpha: number): string => {
    if (color.startsWith('#')) {
      // Convert hex to rgba
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    // If it's already rgba, modify the alpha
    if (color.startsWith('rgba')) {
      return color.replace(/[\d\.]+\)$/g, `${alpha})`);
    }
    // Fallback for other formats
    return color;
  };
  
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeTimePeriod, setActiveTimePeriod] = useState<'today' | 'thisWeek' | 'thisMonth'>('today');
  const [liveDataAnimating, setLiveDataAnimating] = useState(true);
  const [insightsExpanded, setInsightsExpanded] = useState<number | null>(null);
  const [horoscopeScrollIndex, setHoroscopeScrollIndex] = useState(0);
  
  // Subscription state - simulate user subscription status
  const [userSubscription, setUserSubscription] = useState<'FREE' | 'PRO' | 'PREMIUM'>('FREE');
  const [generatedReports, setGeneratedReports] = useState<string[]>([]);

  // Add dynamic time and loading state
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loadingStates, setLoadingStates] = useState({
    insights: false,
    horoscope: false,
    dashboard: false,
  });

  // Responsive card width calculation - memoized for performance
  const responsiveCardWidth = useMemo(() => {
    const screenWidth = Dimensions.get('window').width;
    if (screenWidth >= 768) return 320; // iPad - larger cards
    if (screenWidth >= 414) return 300; // iPhone Pro Max - default
    return 280; // Smaller phones - compact cards
  }, []);

  // Premium navigation drawer state - handled by hamburger menu hook

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Haptic feedback helpers - memoized with useCallback for performance
  const triggerLightHaptic = useCallback(() => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, []);

  const triggerMediumHaptic = useCallback(() => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, []);

  const triggerSuccessHaptic = useCallback(() => {
    if (Platform.OS === 'ios') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, []);

  // Dynamic greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Horoscope categories with enriched insights - memoized for performance
  const horoscopeCategories = useMemo(() => [
    {
      title: 'Career',
      icon: '🏆',
      today: {
        insight: 'Mars in 10th house brings leadership opportunities. Schedule important meetings between 2-4 PM for maximum impact.',
        guidance: 'Focus on strategic decisions and team leadership',
        energy: 'High',
        bestTime: '2:00 PM - 4:00 PM',
        background: corpAstroDarkTheme.colors.brand.primary,
      },
      thisWeek: {
        insight: 'Professional recognition and advancement opportunities emerge. Mid-week negotiations favor your position.',
        guidance: 'Network actively and showcase your expertise',
        energy: 'Rising',
        bestTime: 'Wednesday - Friday',
        background: corpAstroDarkTheme.colors.luxury.bronze,
      },
      thisMonth: {
        insight: 'Career transformation phase begins. New projects and responsibilities align with your long-term goals.',
        guidance: 'Plan strategic moves and build key relationships',
        energy: 'Transformative',
        bestTime: 'After 15th',
        background: corpAstroDarkTheme.colors.mystical.royal,
      },
      color: theme.colors.brand.primary,
      gradient: ['#4A90E2', '#357ABD'],
    },
    {
      title: 'Wealth',
      icon: '�',
      today: {
        insight: 'Jupiter in 2nd house enhances financial gains. Ideal time for investments and major financial decisions.',
        guidance: 'Review investment portfolio and consider new opportunities',
        energy: 'Abundant',
        bestTime: '10:00 AM - 12:00 PM',
        background: corpAstroDarkTheme.colors.mystical.glow,
      },
      thisWeek: {
        insight: 'Financial stability strengthens. Unexpected gains possible through professional connections.',
        guidance: 'Focus on long-term wealth building strategies',
        energy: 'Stable',
        bestTime: 'Early week',  
        background: corpAstroDarkTheme.colors.mystical.light,
      },
      thisMonth: {
        insight: 'Major financial opportunities arise. Property investments and business ventures show strong potential.',
        guidance: 'Plan major financial moves with expert consultation',
        energy: 'Expansive',
        bestTime: 'Last week',
        background: corpAstroDarkTheme.colors.luxury.champagne,
      },
      color: '#2E7D32',
      gradient: ['#4CAF50', '#2E7D32'],
    },
    {
      title: 'Health',
      icon: '🌟',
      today: {
        insight: 'Sun-Mercury conjunction boosts mental clarity and vitality. Perfect day for important health decisions.',
        guidance: 'Focus on mental wellness and energy optimization',
        energy: 'Vibrant',
        bestTime: '6:00 AM - 8:00 AM',
        background: corpAstroDarkTheme.colors.brand.light,

      },
      thisWeek: {
        insight: 'Overall vitality improves significantly. Good time for starting new health routines and wellness practices.',
        guidance: 'Establish sustainable health habits',
        energy: 'Improving',
        bestTime: 'Morning hours',
        background: corpAstroDarkTheme.colors.mystical.royal,
      },
      thisMonth: {
        insight: 'Complete health transformation possible. Mind-body alignment reaches optimal levels.',
        guidance: 'Commit to holistic wellness approach',
        energy: 'Regenerative',
        bestTime: 'Full moon period',
        background: corpAstroDarkTheme.colors.brand.glow,
      },
      color: '#F57C00',
      gradient: ['#FF9800', '#F57C00'],
    },
    {
      title: 'Business',
      icon: '📈',
      today: {
        insight: 'Venus in 11th house favors partnerships and networking. Strong potential for collaborative opportunities.',
        guidance: 'Focus on relationship building and team synergy',
        energy: 'Collaborative',
        bestTime: '3:00 PM - 6:00 PM',
        background: corpAstroDarkTheme.colors.mystical.deep,

      },
      thisWeek: {
        insight: 'Business expansion opportunities multiply. Client relationships deepen and new partnerships emerge.',
        guidance: 'Prioritize client satisfaction and team development',
        energy: 'Growing',
        bestTime: 'Mid-week',
        background: corpAstroDarkTheme.colors.mystical.deep,
      },
      thisMonth: {
        insight: 'Significant business breakthroughs ahead. Innovation and strategic partnerships drive growth.',
        guidance: 'Implement long-term strategic initiatives',
        energy: 'Breakthrough',
        bestTime: 'New moon period',
        background: corpAstroDarkTheme.colors.mystical.deep,
      },
      color: '#7B1FA2',
      gradient: ['#9C27B0', '#7B1FA2'],
    },
  ], [theme.colors]);

  // Insights data for dynamic expansion - memoized for performance
  const insightsData = useMemo(() => [
    {
      icon: '♂️',
      title: 'Mars energizes your career sector',
      details: 'Perfect timing for negotiations, presentations, and leadership initiatives. Your confidence and assertiveness will be well-received.',
      color: '#FFD700', // Convert ColorValue to string
    },
    {
      icon: '🤝',
      title: 'Perfect timing for negotiations',
      details: 'Mercury-Venus alignment creates favorable conditions for deals, contracts, and business discussions. Communication flows smoothly.',
      color: '#FFC107',
    },
    {
      icon: '🌙',
      title: 'Avoid major decisions after 6 PM',
      details: 'Moon in 12th house suggests decreased clarity in evening hours. Better to postpone important choices until tomorrow morning.',
      color: '#FF6B6B',
    },
    {
      icon: '👥',
      title: 'Team harmony at 85% today',
      details: 'Strong collaborative energy supports group projects and team meetings. Excellent day for building workplace relationships.',
      color: '#4CAF50',
    },
  ], []);

  // Authentic Panchang-based Auspicious Timings - Enhanced with traditional Hindu astrology
  const getAuspiciousTimings = (): TimingData[] => {
    const currentDate = new Date();
    const todayData = calculateDailyPanchang(currentDate);
    
    switch (activeTimePeriod) {
      case 'today':
        return [
          { 
            name: 'Abhijit Muhurat', 
            time: '12:12 PM to 01:00 PM', 
            type: 'auspicious',
            description: 'Most powerful muhurat - ideal for all business ventures, contracts, and crucial decisions',
            intensity: 'high',
            category: 'business',
            panchang: {
              nakshatra: 'Abhijit (28th Nakshatra)',
              nature: 'Sarvabhadra',
              deity: 'Vishnu',
            }
          },
          { 
            name: 'Rahu Kaal', 
            time: '01:30 PM to 03:00 PM', 
            type: 'avoid',
            description: 'Highly inauspicious - avoid starting new ventures, important meetings, financial transactions',
            intensity: 'high',
            category: 'business',
            panchang: {
              nature: 'Malefic planetary period',
              impact: 'Obstacles and delays',
            }
          },
          { 
            name: 'Shubh Choghadiya', 
            time: '10:15 AM to 11:45 AM', 
            type: 'auspicious',
            description: 'Favorable for partnerships, collaborations, team meetings and relationship building',
            intensity: 'medium',
            category: 'business',
            panchang: {
              type: 'Shubh Choghadiya',
              duration: '90 minutes',
              nature: 'Benefic'
            }
          },
          { 
            name: 'Labh Choghadiya', 
            time: '06:45 AM to 08:15 AM', 
            type: 'auspicious',
            description: 'Excellent for financial planning, investments, profit-oriented activities',
            intensity: 'high',
            category: 'financial',
            panchang: {
              type: 'Labh Choghadiya',
              meaning: 'Profit and Gain',
              ruler: 'Mercury'
            }
          },
          { 
            name: 'Amrit Choghadiya', 
            time: '03:30 PM to 05:00 PM', 
            type: 'auspicious',
            description: 'Nectar-like auspicious time for important announcements and launches',
            intensity: 'high',
            category: 'business',
            panchang: {
              type: 'Amrit Choghadiya',
              meaning: 'Nectar Time',
              energy: 'Divine blessing'
            }
          },
          { 
            name: 'Gulika Kaal', 
            time: '07:30 AM to 09:00 AM', 
            type: 'avoid',
            description: 'Minor malefic period - suitable only for routine work, avoid new initiatives',
            intensity: 'medium',
            category: 'general',
            panchang: {
              nature: 'Son of Saturn',
              impact: 'Delays and obstacles'
            }
          },
          { 
            name: 'Pushya Nakshatra', 
            time: '11:00 PM to 02:15 AM+1', 
            type: 'auspicious',
            description: 'Most auspicious nakshatra for business growth and prosperity rituals',
            intensity: 'high',
            category: 'business',
            panchang: {
              nakshatra: 'Pushya',
              deity: 'Brihaspati',
              nature: 'Nourishing and Prosperous'
            }
          }
        ];
      case 'thisWeek':
        return [
          { 
            name: 'Monday - Abhijit Week', 
            time: '12:00 PM to 01:00 PM Daily', 
            type: 'auspicious',
            description: 'Daily Abhijit muhurat perfect for consistent business growth activities',
            intensity: 'high',
            category: 'business',
            panchang: {
              vara: 'Soma (Moon day)',
              energy: 'Emotional intelligence in business'
            }
          },
          { 
            name: 'Wednesday - Budh Hora', 
            time: '10:00 AM to 12:00 PM', 
            type: 'auspicious',
            description: 'Mercury rules - exceptional for communication, contracts, technology ventures',
            intensity: 'high',
            category: 'business',
            panchang: {
              vara: 'Budha (Mercury day)',
              speciality: 'Communication and Commerce'
            }
          },
          { 
            name: 'Thursday - Guru Day', 
            time: '06:00 AM to 09:00 AM', 
            type: 'auspicious',
            description: 'Jupiter energy - ideal for education, wisdom-based businesses, teaching, consulting',
            intensity: 'high',
            category: 'business',
            panchang: {
              vara: 'Guru (Jupiter day)',
              speciality: 'Knowledge and Expansion'
            }
          },
          { 
            name: 'Friday - Shukra Day', 
            time: '02:00 PM to 05:00 PM', 
            type: 'auspicious',
            description: 'Venus energy - perfect for luxury business, arts, beauty, entertainment sectors',
            intensity: 'high',
            category: 'financial',
            panchang: {
              vara: 'Shukra (Venus day)',
              speciality: 'Luxury and Prosperity'
            }
          },
          { 
            name: 'Tuesday - Mangal Energy', 
            time: '06:00 AM to 08:00 AM', 
            type: 'neutral',
            description: 'Mars energy - good for real estate, construction, sports businesses (use caution)',
            intensity: 'medium',
            category: 'business',
            panchang: {
              vara: 'Mangala (Mars day)',
              caution: 'Aggressive energy needs balance'
            }
          },
          { 
            name: 'Saturday - Shani Period', 
            time: 'Focus on Karma', 
            type: 'avoid',
            description: 'Saturn day - avoid new ventures, focus on completing existing work and karma',
            intensity: 'low',
            category: 'general',
            panchang: {
              vara: 'Shani (Saturn day)',
              advice: 'Complete pending tasks'
            }
          }
        ];
      case 'thisMonth':
        return [
          { 
            name: 'Shukla Paksha (Waxing Moon)', 
            time: '18th - 2nd Sept (15 days)', 
            type: 'auspicious',
            description: 'Growth phase - excellent for new business launches, expansion, team building',
            intensity: 'high',
            category: 'business',
            panchang: {
              paksha: 'Shukla (Bright fortnight)',
              energy: 'Growth and Expansion',
              tithis: 'Pratipada to Purnima'
            }
          },
          { 
            name: 'Krishna Paksha (Waning Moon)', 
            time: '3rd - 17th Sept', 
            type: 'neutral',
            description: 'Reflection phase - good for analysis, planning, debt collection, cost optimization',
            intensity: 'medium',
            category: 'business',
            panchang: {
              paksha: 'Krishna (Dark fortnight)',
              energy: 'Introspection and Completion',
              advice: 'Complete existing projects'
            }
          },
          { 
            name: 'Purnima (Full Moon)', 
            time: '2nd September', 
            type: 'auspicious',
            description: 'Peak energy day - ideal for major announcements, product launches, celebrations',
            intensity: 'high',
            category: 'business',
            panchang: {
              tithi: 'Purnima (15th tithi)',
              energy: 'Complete manifestation',
              speciality: 'Maximum lunar energy'
            }
          },
          { 
            name: 'Amavasya (New Moon)', 
            time: '17th September', 
            type: 'avoid',
            description: 'New beginnings preparation - avoid major launches, focus on planning and strategy',
            intensity: 'low',
            category: 'general',
            panchang: {
              tithi: 'Amavasya (30th tithi)',
              energy: 'Minimum lunar energy',
              advice: 'Plan for future cycles'
            }
          },
          { 
            name: 'Ekadashi Tithi', 
            time: '28th Aug & 12th Sept', 
            type: 'auspicious',
            description: 'Spiritual business energy - excellent for service-oriented and wellness businesses',
            intensity: 'high',
            category: 'business',
            panchang: {
              tithi: 'Ekadashi (11th tithi)',
              energy: 'Spiritual and Service',
              speciality: 'Higher consciousness in business'
            }
          },
          { 
            name: 'Chaturdashi Days', 
            time: '31st Aug & 15th Sept', 
            type: 'avoid',
            description: 'Avoid important decisions - energy can be destructive if not handled properly',
            intensity: 'medium',
            category: 'general',
            panchang: {
              tithi: 'Chaturdashi (14th tithi)',
              energy: 'Destructive potential',
              caution: 'Avoid major commitments'
            }
          }
        ];
      default:
        return [];
    }
  };

  // Helper function to calculate daily panchang (simplified version for demo)
  const calculateDailyPanchang = (date: Date) => {
    // This would typically connect to a real panchang API or calculation engine
    // For demo purposes, returning structured data
    return {
      tithi: 'Shukla Dvitiya',
      nakshatra: 'Ashwini',
      yoga: 'Vishkumbha', 
      karana: 'Bava',
      vara: 'Mangalwar',
      sunrise: '06:20 AM',
      sunset: '07:04 PM',
      rahu_kaal: '01:30 PM - 03:00 PM',
      gulika_kaal: '07:30 AM - 09:00 AM',
      abhijit_muhurat: '12:12 PM - 01:00 PM'
    };
  };

  // Enhanced Guidance Data with authentic Hindu business wisdom
  const getGuidanceData = () => {
    switch (activeTimePeriod) {
      case 'today':
        return {
          positive: [
            { 
              text: 'Begin crucial meetings during Abhijit Muhurat (12:12-1:00 PM) for guaranteed success', 
              priority: 'high' as const, 
              category: 'strategic' as const,
              confidence: 98,
              basis: 'Abhijit is the most auspicious time ruled by Vishnu, ensuring divine blessings'
            },
            { 
              text: 'Sign contracts during Labh Choghadiya for maximum profit and business growth', 
              priority: 'high' as const, 
              category: 'financial' as const,
              confidence: 95,
              basis: 'Mercury\'s beneficial influence on commerce and material gains'
            },
            { 
              text: 'Conduct team discussions in Shubh Choghadiya for harmonious collaboration', 
              priority: 'medium' as const, 
              category: 'interpersonal' as const,
              confidence: 88,
              basis: 'Venus energy promotes unity, cooperation and team harmony'
            },
            { 
              text: 'Launch new initiatives during Amrit Choghadiya for divine blessings', 
              priority: 'high' as const, 
              category: 'strategic' as const,
              confidence: 92,
              basis: 'Amrit means nectar - time blessed by the gods for new beginnings'
            },
            { 
              text: 'Make investment decisions during Pushya Nakshatra for prosperity', 
              priority: 'high' as const, 
              category: 'financial' as const,
              confidence: 93,
              basis: 'Pushya is the most nourishing nakshatra ruled by Jupiter'
            }
          ],
          negative: [
            { 
              text: 'Completely avoid Rahu Kaal (1:30-3:00 PM) - all ventures will face obstacles', 
              priority: 'high' as const, 
              category: 'timing' as const,
              confidence: 99,
              basis: 'Rahu period brings illusion, confusion and inevitable failures'
            },
            { 
              text: 'Postpone financial decisions during Gulika Kaal to prevent losses', 
              priority: 'high' as const, 
              category: 'financial' as const,
              confidence: 94,
              basis: 'Gulika (Saturn\'s son) creates delays and material losses'
            },
            { 
              text: 'Avoid ego-driven negotiations - Mars energy can create conflicts today', 
              priority: 'medium' as const, 
              category: 'interpersonal' as const,
              confidence: 82,
              basis: 'Mars in challenging position today creating aggressive tendencies'
            },
            { 
              text: 'Don\'t start partnerships on Chaturdashi tithi - destructive energy present', 
              priority: 'medium' as const, 
              category: 'strategic' as const,
              confidence: 88,
              basis: 'Chaturdashi ruled by Kali - transformative but potentially destructive'
            }
          ]
        };
      case 'thisWeek':
        return {
          positive: [
            { 
              text: 'Wednesday (Budh day) - perfect for technology launches and communication strategies', 
              priority: 'high' as const, 
              category: 'strategic' as const,
              confidence: 96,
              basis: 'Mercury rules communication, technology and commerce'
            },
            { 
              text: 'Thursday (Guru day) - ideal for educational ventures, consulting, and wisdom-based businesses', 
              priority: 'high' as const, 
              category: 'growth' as const,
              confidence: 94,
              basis: 'Jupiter bestows knowledge, teaching and expansion'
            },
            { 
              text: 'Friday (Shukra day) - excellent for luxury brands, arts, beauty and entertainment', 
              priority: 'high' as const, 
              category: 'financial' as const,
              confidence: 91,
              basis: 'Venus governs beauty, luxury and material prosperity'
            },
            { 
              text: 'Monday (Soma day) - focus on emotional intelligence and customer relationships', 
              priority: 'medium' as const, 
              category: 'interpersonal' as const,
              confidence: 86,
              basis: 'Moon governs emotions and public relations'
            }
          ],
          negative: [
            { 
              text: 'Saturday (Shani day) - avoid new ventures, focus on completing existing karma', 
              priority: 'high' as const, 
              category: 'timing' as const,
              confidence: 93,
              basis: 'Saturn demands completion before new beginnings'
            },
            { 
              text: 'Tuesday morning - be cautious with real estate and construction decisions', 
              priority: 'medium' as const, 
              category: 'financial' as const,
              confidence: 79,
              basis: 'Mars energy can be too aggressive for major investments'
            },
            { 
              text: 'Sunday afternoon - avoid ego conflicts with business partners', 
              priority: 'medium' as const, 
              category: 'interpersonal' as const,
              confidence: 81,
              basis: 'Strong Sun energy can create pride and conflicts'
            }
          ]
        };
      case 'thisMonth':
        return {
          positive: [
            { 
              text: 'Shukla Paksha (Waxing Moon) - optimal time for business expansion and team growth', 
              priority: 'high' as const, 
              category: 'growth' as const,
              confidence: 97,
              basis: 'Growing moon energy supports all expansion activities'
            },
            { 
              text: 'Purnima (Full Moon) - perfect for major product launches and grand openings', 
              priority: 'high' as const, 
              category: 'strategic' as const,
              confidence: 95,
              basis: 'Full moon provides maximum energy and public attention'
            },
            { 
              text: 'Ekadashi days - excellent for service-oriented and spiritual businesses', 
              priority: 'high' as const, 
              category: 'growth' as const,
              confidence: 89,
              basis: 'Ekadashi elevates consciousness and service orientation'
            },
            { 
              text: 'Benefic nakshatra transits - align major decisions with cosmic timing', 
              priority: 'medium' as const, 
              category: 'strategic' as const,
              confidence: 84,
              basis: 'Stellar positions significantly influence business outcomes'
            }
          ],
          negative: [
            { 
              text: 'Amavasya (New Moon) - avoid public launches, focus on internal planning', 
              priority: 'high' as const, 
              category: 'timing' as const,
              confidence: 92,
              basis: 'New moon energy is introspective, not expansive'
            },
            { 
              text: 'Krishna Paksha - reduce major expenditures, focus on cost optimization', 
              priority: 'medium' as const, 
              category: 'financial' as const,
              confidence: 87,
              basis: 'Waning moon supports reduction and optimization'
            },
            { 
              text: 'Malefic planetary combinations - postpone high-risk investments', 
              priority: 'high' as const, 
              category: 'financial' as const,
              confidence: 91,
              basis: 'Unfavorable planetary positions create market volatility'
            }
          ]
        };
      default:
        return { positive: [], negative: [] };
    }
  };

  const onRefresh = React.useCallback(() => {
    triggerLightHaptic(); // Haptic feedback for refresh action
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  // Animate live data indicator
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLiveDataAnimating(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const renderModernHeader = () => (
    <View style={styles.modernHeader}>
      <View style={[styles.headerGradient, { 
        backgroundColor: theme.colors.cosmos.void,
      }]}>
        <View style={styles.modernHeaderRow}>
          {/* Menu Button */}
          <Pressable 
            style={({ pressed }) => [
              styles.modernMenuButton,
              {
                backgroundColor: pressed ? 'rgba(255,255,255,0.1)' : 'transparent',
                transform: [{ scale: pressed ? animations.pressedScale : 1 }], // Standardized pressed animation
              }
            ]}
            onPress={hamburgerMenu.openMenu}
            accessibilityLabel="Open navigation menu"
            accessibilityHint="Double tap to open the main navigation menu"
            accessibilityRole="button"
          >
            <Text style={[styles.modernMenuIcon, { 
              color: theme.colors.neutral.text,
            }]}>☰</Text>
          </Pressable>
          
          {/* Brand Logo */}
          <View style={styles.modernLogoSection}>
            <Text style={[styles.modernLogoText, { 
              color: theme.colors.brand.primary,
              ...typography.heading3, // 20px for proper brand prominence
              fontWeight: '600',
              letterSpacing: 0.5,
            }]}>
              CORP ASTRO
            </Text>
            <View style={styles.taglineContainer}>
              <Text style={[styles.modernLogoTagline, { 
                color: theme.colors.neutral.light,
                ...typography.caption, // Updated to meet 12px minimum accessibility requirement
                fontWeight: '400',
                opacity: 0.9, // Improved contrast for accessibility compliance
              }]}>
                Business Intelligence
              </Text>
              <View style={[styles.livePulse, {
                backgroundColor: '#4CAF50',
                width: 4,
                height: 4,
                borderRadius: 2,
                marginLeft: 6,
              }]} />
            </View>
          </View>
          
          {/* Profile Avatar */}
          <Pressable 
            style={({ pressed }) => [
              styles.profileAvatarButton,
              { transform: [{ scale: pressed ? animations.pressedScale : 1 }] } // Standardized pressed animation
            ]}
            onPress={() => {/* Open profile */}}
            accessibilityLabel="User profile"
            accessibilityHint="Double tap to open your profile and settings"
            accessibilityRole="button"
          >
            <View style={[styles.profileAvatarContainer, {
              width: 44, // Updated to meet 44px minimum touch target requirement
              height: 44, // Updated to meet 44px minimum touch target requirement
              borderRadius: 22,
              borderWidth: 1,
              borderColor: 'rgba(255, 215, 0, 0.3)',
              backgroundColor: theme.colors.brand.primary,
            }]}>
              <Text style={[styles.profileAvatarText, {
                fontSize: 12,
                fontWeight: '600',
                color: '#000000',
              }]}>RK</Text>
              <View style={[styles.notificationDot, { 
                backgroundColor: '#FF4757',
                width: 12,
                height: 12,
                borderRadius: 6,
                position: 'absolute',
                top: -2,
                right: -2,
                borderWidth: 1,
                borderColor: theme.colors.cosmos.void,
              }]}>
                <Text style={[styles.notificationDotText, {
                  ...typography.caption, // Updated to meet 12px minimum accessibility requirement
                  fontWeight: '600',
                  color: '#FFFFFF',
                }]}>3</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );

  // Helper functions for chart colors
  const getChartCardColor = (type: string) => {
    switch (type) {
      case 'primary': return 'rgba(33, 150, 243, 0.15)';     // Blue for primary
      case 'relationship': return 'rgba(233, 30, 99, 0.15)'; // Pink for relationship
      case 'career': return 'rgba(255, 152, 0, 0.15)';      // Orange for career
      case 'wealth': return 'rgba(76, 175, 80, 0.15)';      // Green for wealth
      case 'finance': return 'rgba(255, 215, 0, 0.15)';     // Gold for finance
      case 'family': return 'rgba(156, 39, 176, 0.15)';     // Purple for family
      default: return 'rgba(255, 255, 255, 0.05)';
    }
  };
  const renderAstroRatanIntroCard = () => (
    <View style={[styles.astroRatanCard, { 
      backgroundColor: theme.colors.cosmos.deep,
      marginHorizontal: 16,
      marginVertical: 20,
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: 'rgba(255, 215, 0, 0.2)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    }]}>
      {/* Professional Header */}
      <View style={[styles.astroCompactHeader, { marginBottom: 20 }]}>
        <View style={[styles.astroIconBadge, {
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: 'rgba(255, 215, 0, 0.12)',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
          borderWidth: 1,
          borderColor: 'rgba(255, 215, 0, 0.3)',
        }]}>
          <Text style={[styles.astroMainIcon, { ...typography.heading1 }]}>🔮</Text>
        </View>
        
        <View style={styles.astroHeaderText}>
          <Text style={[styles.astroMainTitle, { 
            color: theme.colors.neutral.text,
            ...typography.heading2, // 24px for better hierarchy
            fontWeight: '700',
            marginBottom: 4,
          }]}>
            Astro Ratan
          </Text>
          <Text style={[styles.astroTagline, { 
            color: theme.colors.brand.primary,
            ...typography.body, // 14px for clear hierarchy
            fontWeight: '500',
            marginBottom: 8,
            opacity: 0.9,
          }]}>
            Advanced Vedic AI Strategic Advisor
          </Text>
          
          {/* Clean Technology Badges */}
          <View style={[styles.techBadges, { 
            flexDirection: 'row',
            gap: 8,
            marginTop: 4,
          }]}>
            <View style={[styles.aiPoweredBadge, { 
              backgroundColor: theme.colors.brand.primary,
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }]}>
              <Text style={[styles.aiPoweredText, { 
                ...typography.caption, // Updated to meet 12px minimum accessibility requirement
                fontWeight: '600',
                color: '#000000',
                letterSpacing: 0.5,
              }]}>AI POWERED</Text>
            </View>
            <View style={[styles.nasaBadge, { 
              backgroundColor: 'rgba(76, 175, 80, 0.9)',
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }]}>
              <Text style={[styles.nasaText, { 
                ...typography.caption, // Updated to meet 12px minimum accessibility requirement
                fontWeight: '600',
                color: '#FFFFFF',
                letterSpacing: 0.3,
              }]}>NASA PRECISION</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Compelling Value Proposition */}
      <Text style={[styles.astroValueProp, { 
        color: theme.colors.neutral.text,
        ...typography.bodyLarge, // 16px with proper line height
        marginBottom: 20,
        fontWeight: '400',
        textAlign: 'left',
      }]}>
        Meet the world's most sophisticated <Text style={{ 
          color: theme.colors.brand.primary, 
          fontWeight: '600',
        }}>Vedic AI strategist</Text> — meticulously trained on ancient astrological wisdom and powered by NASA-grade precision to deliver personalized business intelligence.
      </Text>

      {/* Core Technology Stack */}
      <View style={[styles.techStack, { 
        marginBottom: 20,
        padding: spacing.md, // Standardized padding
        backgroundColor: colors.surface.primary,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border.subtle,
      }]}>
        <Text style={[styles.techStackTitle, { 
          color: theme.colors.neutral.text,
          ...typography.body, // 14px for proper hierarchy
          fontWeight: '600',
          marginBottom: spacing.sm, // Standardized margin
          textAlign: 'center',
        }]}>
          Powered by Advanced Technology
        </Text>
        <View style={[styles.techGrid, { gap: spacing.md }]}>
          <View style={styles.techItem}>
            <Text style={[styles.techIcon, { ...typography.heading3, marginBottom: spacing.xs }]}>🧠</Text>
            <Text style={[styles.techLabel, { 
              color: theme.colors.neutral.light,
              ...typography.caption, // 12px for accessibility compliance
              fontWeight: '500',
              textAlign: 'center',
              lineHeight: 14,
            }]}>
              Proprietary{'\n'}Astro Engine
            </Text>
          </View>
          <View style={styles.techItem}>
            <Text style={[styles.techIcon, { ...typography.heading3, marginBottom: spacing.xs }]}>🚀</Text>
            <Text style={[styles.techLabel, { 
              color: theme.colors.neutral.light,
              fontSize: 11,
              fontWeight: '500',
              textAlign: 'center',
              lineHeight: 14,
            }]}>
              NASA Swiss{'\n'}Ephemeris
            </Text>
          </View>
          <View style={styles.techItem}>
            <Text style={[styles.techIcon, { ...typography.heading3, marginBottom: spacing.xs }]}>📚</Text>
            <Text style={[styles.techLabel, { 
              color: theme.colors.neutral.light,
              fontSize: 11,
              fontWeight: '500',
              textAlign: 'center',
              lineHeight: 14,
            }]}>
              Ancient Texts{'\n'}Knowledge Base
            </Text>
          </View>
          <View style={styles.techItem}>
            <Text style={[styles.techIcon, { ...typography.heading3, marginBottom: spacing.xs }]}>🎯</Text>
            <Text style={[styles.techLabel, { 
              color: theme.colors.neutral.light,
              fontSize: 11,
              fontWeight: '500',
              textAlign: 'center',
              lineHeight: 14,
            }]}>
              Hyper{'\n'}Personalization
            </Text>
          </View>
        </View>
      </View>

      {/* Key Capabilities with Better Hierarchy */}
      <View style={[styles.capabilityGrid, { marginBottom: 20 }]}>
        <View style={[styles.capabilityItem, { marginBottom: 8 }]}>
          <Text style={[styles.capabilityIcon, { ...typography.bodyLarge, marginRight: spacing.sm }]}>⚡</Text>
          <Text style={[styles.capabilityText, { 
            color: theme.colors.neutral.light,
            fontSize: 13,
            fontWeight: '500',
          }]}>
            Instant strategic insights and timing guidance
          </Text>
        </View>
        <View style={[styles.capabilityItem, { marginBottom: 8 }]}>
          <Text style={[styles.capabilityIcon, { ...typography.bodyLarge, marginRight: spacing.sm }]}>💡</Text>
          <Text style={[styles.capabilityText, { 
            color: theme.colors.neutral.light,
            fontSize: 13,
            fontWeight: '500',
          }]}>
            Data-driven business intelligence and market analysis
          </Text>
        </View>
        <View style={[styles.capabilityItem, { marginBottom: 8 }]}>
          <Text style={[styles.capabilityIcon, { fontSize: 16, marginRight: 8 }]}>�</Text>
          <Text style={[styles.capabilityText, { 
            color: theme.colors.neutral.light,
            fontSize: 13,
            fontWeight: '500',
          }]}>
            Predictive analytics for strategic decision making
          </Text>
        </View>
        <View style={[styles.capabilityItem, { marginBottom: 0 }]}>
          <Text style={[styles.capabilityIcon, { ...typography.bodyLarge, marginRight: spacing.sm }]}>🎯</Text>
          <Text style={[styles.capabilityText, { 
            color: theme.colors.neutral.light,
            fontSize: 13,
            fontWeight: '500',
          }]}>
            Personalized cosmic blueprint and optimization
          </Text>
        </View>
      </View>

      {/* Premium CTA Button */}
      <Pressable
        style={({ pressed }) => [
          styles.astroCompactCTA,
          {
            backgroundColor: theme.colors.brand.primary,
            borderRadius: 12,
            paddingVertical: 16,
            paddingHorizontal: 24,
            transform: [{ scale: pressed ? animations.pressedScale : 1 }], // Standardized pressed animation
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            shadowColor: theme.colors.brand.primary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 3,
          },
        ]}
        onPress={() => {
          triggerMediumHaptic(); // Haptic feedback for important CTA
          navigateTo('/astro-ratan');
        }}
        accessibilityLabel="Start Strategic Consultation with Astro Ratan"
        accessibilityHint="Double tap to begin AI-powered business astrology consultation"
        accessibilityRole="button"
      >
        <Text style={[styles.astroCTAText, { 
          color: '#000000',
          fontSize: 16,
          fontWeight: '700',
          letterSpacing: 0.3,
        }]}>
          Start Strategic Consultation
        </Text>
        <Text style={[styles.astroCTAArrow, { 
          color: '#000000',
          fontSize: 16,
          fontWeight: '700',
        }]}>→</Text>
      </Pressable>

      {/* Live Status Indicator */}
      <View style={[styles.liveStatusIndicator, { 
        marginTop: 14,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
      }]}>
        <View style={[styles.liveDot, { 
          backgroundColor: '#4CAF50',
          width: 6,
          height: 6,
          borderRadius: 3,
        }]} />
        <Text style={[styles.liveStatusText, { 
          color: theme.colors.neutral.light,
          fontSize: 12,
          fontWeight: '500',
          opacity: 0.8,
        }]}>
          Available 24/7 for strategic guidance
        </Text>
      </View>
    </View>
  );

  // Memoized insights data for performance
  // Insights interaction handlers - memoized for performance
  const handleInsightToggle = useCallback((index: number) => {
    setInsightsExpanded(insightsExpanded === index ? null : index);
  }, [insightsExpanded]);

  const renderHoroscopeSection = () => {
    const timePeriods = [
      { key: 'today' as const, label: 'Today', description: 'Live insights' },
      { key: 'thisWeek' as const, label: 'Week', description: 'Trends ahead' },
      { key: 'thisMonth' as const, label: 'Month', description: 'Big picture' }
    ];

    const getCurrentData = (category: any) => {
      switch (activeTimePeriod) {
        case 'today': return category.today;
        case 'thisWeek': return category.thisWeek;
        case 'thisMonth': return category.thisMonth;
        default: return category.thisWeek;
      }
    };

    return (
      <View style={styles.horoscopeSection}>
        {/* Professional Header */}
        <View style={styles.horoscopeSectionHeader}>
          <Text style={[styles.horoscopeSectionTitle, { color: theme.colors.neutral.text }]}>
            ✨ PERSONALIZED HOROSCOPE
          </Text>
          <Text style={[styles.horoscopeSectionSubtitle, { color: theme.colors.neutral.light }]}>
            Cosmic insights tailored for your journey • Live planetary guidance
          </Text>
        </View>

        {/* Modern Time Period Selector */}
        <View style={[styles.timePeriodSelector, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
          {timePeriods.map((period, index) => (
            <Pressable
              key={period.key}
              onPress={() => {
                triggerLightHaptic();
                setActiveTimePeriod(period.key);
              }}
              style={styles.timePeriodButton}
              accessibilityLabel={`${period.label} horoscope`}
              accessibilityHint={`Double tap to view ${period.description.toLowerCase()}`}
              accessibilityRole="button"
              accessibilityState={{ selected: activeTimePeriod === period.key }}
            >
              <Text style={[
                styles.timePeriodButtonText,
                { 
                  color: activeTimePeriod === period.key 
                    ? theme.colors.neutral.text 
                    : theme.colors.neutral.light,
                  fontWeight: activeTimePeriod === period.key ? '700' : '500',
                  opacity: activeTimePeriod === period.key ? 1 : 0.7
                }
              ]}>
                {period.label.split(' ')[0]}
              </Text>
              {activeTimePeriod === period.key && (
                <View style={[styles.activeIndicator, { backgroundColor: theme.colors.brand.primary }]} />
              )}
            </Pressable>
          ))}
        </View>

        {/* Professional Horoscope Cards */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horoscopeCardsContainer}
          decelerationRate="fast"
          snapToInterval={cards.horizontalScroll.width + spacing.md} // 280 + 16 = 296px for proper snapping
          snapToAlignment="start"
          onMomentumScrollEnd={(event) => {
            const cardWidth = cards.horizontalScroll.width + spacing.md;
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
            setHoroscopeScrollIndex(newIndex);
          }}
        >
          {horoscopeCategories.map((category, index) => {
            const currentData = getCurrentData(category);
            return (
              <View key={category.title} style={[
                styles.horoscopeCard,
                { 
                  backgroundColor: (currentData as any).background,
                  borderColor: createAlphaColor(String(category.color), 0.2),
                  shadowColor: String(category.color),
                  overflow: 'hidden',
                }
              ]}>
                {/* Compact Card Header */}
                <View style={styles.horoscopeCardHeader}>
                  <View style={[
                    styles.horoscopeIconContainer, 
                    { backgroundColor: createAlphaColor(String(category.color), 0.15) }
                  ]}>
                    <Text style={styles.horoscopeIcon}>{category.icon}</Text>
                  </View>
                  <View style={styles.horoscopeCardHeaderText}>
                    <Text style={[styles.horoscopeCardTitle, { 
                      color: (currentData as any)?.background ? theme.colors.neutral.light : category.color,
                      textShadowColor: 'rgba(0,0,0,0.3)',
                      textShadowOffset: { width: 0.5, height: 0.5 },
                      textShadowRadius: 1
                    }]}>
                      {category.title}
                    </Text>
                    <View style={styles.energyBadge}>
                      <View style={[styles.energyDot, { backgroundColor: category.color }]} />
                      <Text style={[styles.energyText, { color: theme.colors.neutral.light }]}>
                        {currentData.energy} Energy
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Optimized Card Content */}
                <Text style={[styles.horoscopeInsight, { color: theme.colors.neutral.light }]}>
                  {currentData.insight}
                </Text>

                <Text style={[styles.horoscopeGuidance, { color: theme.colors.neutral.light }]}>
                  💡 {currentData.guidance}
                </Text>

                {/* Professional Best Time Indicator */}
                <View style={styles.bestTimeContainer}>
                  <View style={[
                    styles.bestTimeIndicator, 
                    { borderColor: createAlphaColor(String(category.color), 0.4) }
                  ]}>
                    <Text style={[styles.bestTimeLabel, { color: theme.colors.neutral.light }]}>
                      ⏰ Best Time
                    </Text>
                    <Text style={[styles.bestTimeValue, { color: category.color }]}>
                      {currentData.bestTime}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Pagination Indicators */}
        <View style={styles.paginationContainer}>
          {horoscopeCategories.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  opacity: index === horoscopeScrollIndex ? pagination.indicator.activeOpacity : pagination.indicator.inactiveOpacity,
                  width: index === horoscopeScrollIndex ? pagination.indicator.activeSize : pagination.indicator.size,
                  height: index === horoscopeScrollIndex ? pagination.indicator.activeSize : pagination.indicator.size,
                  borderRadius: pagination.indicator.borderRadius,
                  backgroundColor: theme.colors.brand.primary,
                }
              ]}
            />
          ))}
        </View>

        {/* Cosmic Insights Footer */}
        <View style={styles.cosmicInsightsFooter}>
          <Text style={[styles.cosmicInsightsText, { color: theme.colors.neutral.light }]}>
            🌌 Insights generated based on your birth chart and current planetary transits
          </Text>
        </View>
      </View>
    );
  };

  const renderAuspiciousTimings = () => {
    const auspiciousTimings = getAuspiciousTimings();
    
    return (
      <View style={styles.auspiciousTimingsSection}>
        <View style={styles.auspiciousTimingsHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.neutral.text }]}>
            🕉️ AUSPICIOUS TIMINGS
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.neutral.light }]}>
            Strategic timing intelligence for optimal business decisions
          </Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalTimingsContent}
          style={styles.horizontalTimingsScroll}
          snapToInterval={160} // Card width (140px) + gap (20px) for proper snapping
          decelerationRate="fast"
        >
          {auspiciousTimings.map((timing, index) => (
            <ProfessionalTimingsCard
              key={index}
              timing={timing}
              index={index}
              onPress={(timing) => {
                // Handle timing card press - could show detailed modal
              }}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderVedicCharts = () => (
    <View style={[styles.sectionContainer, { backgroundColor: theme.colors.cosmos.deep }]}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.brand.primary }]}>
          ⭐ VEDIC CHARTS
        </Text>
        <Text style={[styles.sectionSubtitleCentered, { color: theme.colors.neutral.light }]}>
          Sacred Divisional Analysis • Professional Business Insights
        </Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        snapToInterval={cards.horizontalScroll.width + spacing.md} // 280 + 16 = 296px for proper snapping
        decelerationRate="fast"
      >
        {[
          { 
            title: 'Rashi Chart', 
            subtitle: 'D1 • Foundation', 
            icon: '🧭',
            description: 'Core personality & life direction',
            details: 'Primary chart showing fundamental nature, character traits, and overall life path. Essential for understanding basic temperament and potential.',
            businessRelevance: 'Leadership style & decision-making patterns',
            accuracy: '95%',
            type: 'primary',
            glowColor: '#4A90E2',
            shadowColor: '#4A90E2'
          },
          { 
            title: 'Navamsa Chart', 
            subtitle: 'D9 • DHARMA', 
            icon: '💎',
            description: 'Partnership & spiritual evolution',
            details: 'Reveals marriage compatibility, spiritual growth, and second half of life. Shows strength of planets and ultimate potential.',
            businessRelevance: 'Partnership dynamics & team leadership',
            accuracy: '88%',
            type: 'relationship',
            glowColor: '#E91E63',
            shadowColor: '#E91E63'
          },
          { 
            title: 'Dashamsa Chart', 
            subtitle: 'D10 • CAREER', 
            icon: '🏆',
            description: 'Professional achievements & recognition',
            details: 'Career success, professional reputation, and public recognition. Shows potential for authority, fame, and career growth.',
            businessRelevance: 'Career advancement & professional success',
            accuracy: '92%',
            type: 'career',
            glowColor: '#FF9800',
            shadowColor: '#FF9800'
          },
          { 
            title: 'Chaturthamsa', 
            subtitle: 'D4 • ASSETS', 
            icon: '🏢',
            description: 'Wealth accumulation & fixed assets',
            details: 'Property ownership, real estate investments, and material possessions. Indicates capacity for wealth accumulation and asset building.',
            businessRelevance: 'Real estate investments & asset portfolio',
            accuracy: '85%',
            type: 'wealth',
            glowColor: '#4CAF50',
            shadowColor: '#4CAF50'
          },
          { 
            title: 'Hora Chart', 
            subtitle: 'D2 • WEALTH', 
            icon: '💸',
            description: 'Financial prosperity & income',
            details: 'Money flow, income sources, and financial stability. Reveals potential for wealth creation and monetary success through various means.',
            businessRelevance: 'Revenue streams & financial planning',
            accuracy: '90%',
            type: 'finance',
            glowColor: '#FFD700',
            shadowColor: '#FFD700'
          },
          { 
            title: 'Dreshkana', 
            subtitle: 'D3 • COMMUNICATION', 
            icon: '🗣️',
            description: 'Communication & networking',
            details: 'Relationship with siblings, communication skills, and short journeys. Shows networking ability and social connections.',
            businessRelevance: 'Team collaboration & networking skills',
            accuracy: '80%',
            type: 'family',
            glowColor: '#9C27B0',
            shadowColor: '#9C27B0'
          },
        ].map((chart, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.enhancedChartCard,
              { 
                backgroundColor: getChartCardColor(chart.type),
                borderColor: chart.glowColor,
                shadowColor: chart.shadowColor,
                transform: [{ scale: pressed ? animations.pressedScale : 1 }], // Standardized pressed animation
                opacity: pressed ? 0.9 : 1,
              }
            ]}
            onPress={() => {
              // Navigate to Services tab with chart type
              navigateTo('/services');
            }}
            accessibilityLabel={`${chart.title} chart - ${chart.subtitle}`}
            accessibilityHint={`Double tap to view ${chart.title} astrological chart analysis`}
            accessibilityRole="button"
          >
            <View style={styles.chartGlowOverlay}>
              {/* Chart Badges Row */}
              <View style={styles.chartBadgesRow}>
                <View style={[styles.standardBadge, styles.chartTypeBadgeStyle, { 
                  backgroundColor: chart.glowColor + '20', 
                  borderColor: chart.glowColor 
                }]}>
                  <Text style={[styles.standardBadgeText, { color: chart.glowColor }]}>
                    {chart.subtitle}
                  </Text>
                </View>
                <View style={[styles.standardBadge, styles.accuracyBadgeStyle, { 
                  backgroundColor: 'rgba(76, 175, 80, 0.2)',
                  borderColor: '#4CAF50'
                }]}>
                  <Text style={[styles.standardBadgeText, { color: '#4CAF50' }]}>
                    {chart.accuracy}
                  </Text>
                </View>
              </View>
              
              {/* Chart Header with Icon */}
              <View style={styles.chartCardHeader}>
                <View style={styles.chartIconContainer}>
                  <Text style={styles.chartIcon}>{chart.icon}</Text>
                </View>
              </View>
              
              <View style={styles.chartMainContent}>
                <Text style={[styles.chartTitle, { color: theme.colors.neutral.text }]}>
                  {chart.title}
                </Text>
                <Text style={[styles.chartDescription, { color: theme.colors.neutral.light }]}>
                  {chart.description}
                </Text>
                <Text style={[styles.chartDetails, { color: theme.colors.neutral.light }]}>
                  {chart.details}
                </Text>
              </View>
              
              <View style={[styles.chartAction, { 
                borderColor: chart.glowColor,
                backgroundColor: chart.glowColor + '10'
              }]}>
                <Text style={[styles.chartActionText, { color: chart.glowColor }]}>
                  Analyze Chart →
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );

  const renderPersonalizedReports = () => (
    <View style={[styles.sectionContainer, { backgroundColor: theme.colors.cosmos.deep }]}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.brand.primary }]}>
          📋 PERSONALIZED REPORTS
        </Text>
        <Text style={[styles.sectionSubtitleCentered, { color: theme.colors.neutral.light }]}>
          AI-Powered Business Intelligence
        </Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        snapToInterval={cards.horizontalScroll.width + spacing.md} // 280 + 16 = 296px for proper snapping
        decelerationRate="fast"
      >
        {[
          { 
            title: 'Business Strategy Forecast', 
            subtitle: 'Q4 2025 Strategic Planning', 
            icon: '📊',
            description: 'Data-driven quarterly business forecasting with market trend analysis and growth opportunity identification.',
            tier: 'FREE',
            status: 'Ready',
            glowColor: '#4CAF50',
            type: 'business'
          },
          { 
            title: 'Executive Leadership Profile', 
            subtitle: 'C-Suite Potential Assessment', 
            icon: '👑',
            description: 'Advanced leadership capabilities analysis with executive presence scoring and board-readiness evaluation.',
            tier: 'PRO',
            status: 'Ready',
            glowColor: '#FF9800',
            type: 'leadership'
          },
          { 
            title: 'Career Acceleration Roadmap', 
            subtitle: 'Next 18 Months Growth Plan', 
            icon: '🚀',
            description: 'Personalized career progression strategy with milestone tracking and professional development priorities.',
            tier: 'FREE',
            status: 'Ready',
            glowColor: '#9C27B0',
            type: 'career'
          },
          { 
            title: 'Wealth Building Mastery', 
            subtitle: 'Investment Portfolio Optimization', 
            icon: '💎',
            description: 'Advanced financial planning with investment timing, asset allocation strategies, and wealth preservation tactics.',
            tier: 'PRO',
            status: 'Ready',
            glowColor: '#FFD700',
            type: 'finance'
          },
          { 
            title: 'Strategic Partnership Matrix', 
            subtitle: 'Alliance & Joint Venture Guide', 
            icon: '🤝',
            description: 'Partnership compatibility analysis with collaboration timing and strategic alliance recommendations.',
            tier: 'FREE',
            status: 'Ready',
            glowColor: '#2196F3',
            type: 'partnership'
          },
          { 
            title: 'Global Market Expansion', 
            subtitle: 'International Growth Strategy', 
            icon: '🌍',
            description: 'Market entry analysis with cultural adaptation strategies and international expansion roadmap.',
            tier: 'PREMIUM',
            status: 'Ready',
            glowColor: '#E91E63',
            type: 'global'
          },
        ].map((report, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.enhancedReportCard,
              { 
                backgroundColor: getReportCardColor(report.type),
                borderColor: report.glowColor,
                shadowColor: report.glowColor,
                transform: [{ scale: pressed ? animations.pressedScale : 1 }], // Standardized pressed animation
                opacity: pressed ? 0.9 : 1,
              }
            ]}
            onPress={() => {
              handleReportGeneration(report);
            }}
            accessibilityLabel={`${report.title} report - ${report.tier} tier`}
            accessibilityHint={`Double tap to generate ${report.title} business analysis report`}
            accessibilityRole="button"
          >
            <View style={styles.reportGlowOverlay}>
              {/* Top Badges Row */}
              <View style={styles.reportBadgesRow}>
                <View style={[
                  styles.standardBadge, 
                  styles.tierBadgeStyle, 
                  { 
                    backgroundColor: report.tier === 'PRO' ? theme.colors.brand.primary : 
                                    report.tier === 'PREMIUM' ? '#E91E63' : 'rgba(108, 117, 125, 0.2)',
                    borderColor: report.tier === 'PRO' ? 'rgba(0, 0, 0, 0.2)' : 
                                report.tier === 'PREMIUM' ? 'rgba(233, 30, 99, 0.4)' : 'rgba(108, 117, 125, 0.4)'
                  }
                ]}>
                  <Text style={[
                    styles.standardBadgeText, 
                    { color: report.tier === 'PRO' ? theme.colors.cosmos.void : 
                             report.tier === 'PREMIUM' ? '#FFFFFF' : '#6C757D' }
                  ]}>
                    {report.tier === 'PRO' ? '✨ PRO' : 
                     report.tier === 'PREMIUM' ? '💎 PREMIUM' : '🆓 FREE'}
                  </Text>
                </View>
                {isReportGenerated(report.type) ? (
                  <View style={[styles.standardBadge, styles.statusBadgeStyle, { 
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    borderColor: '#4CAF50'
                  }]}>
                    <Text style={[styles.standardBadgeText, { color: '#4CAF50' }]}>
                      ✅ AVAILABLE
                    </Text>
                  </View>
                ) : (
                  <View style={[styles.standardBadge, styles.statusBadgeStyle, { 
                    backgroundColor: getReportStatusColor(report.status),
                    borderColor: getReportStatusTextColor(report.status)
                  }]}>
                    <Text style={[styles.standardBadgeText, { color: getReportStatusTextColor(report.status) }]}>
                      {report.status}
                    </Text>
                  </View>
                )}
              </View>
              
              {/* Card Header with Icon */}
              <View style={styles.reportCardHeader}>
                <View style={styles.reportIconContainer}>
                  <Text style={styles.reportIcon}>{report.icon}</Text>
                </View>
              </View>
              
              <View style={styles.reportMainContent}>
                <Text style={[styles.reportTitle, { color: theme.colors.neutral.text }]}>
                  {report.title}
                </Text>
                <Text style={[styles.reportSubtitle, { color: theme.colors.neutral.light }]}>
                  {report.subtitle}
                </Text>
                <Text style={[styles.reportDescription, { color: theme.colors.neutral.light }]}>
                  {report.description}
                </Text>
              </View>
              
              <View style={[styles.reportAction, { 
                borderColor: report.glowColor,
                backgroundColor: report.glowColor + '10'
              }]}>
                <Text style={[styles.reportActionText, { color: report.glowColor }]}>
                  Generate Now
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );

  // Business Dashboard section
  const getChartBadgeColor = (type: string) => {
    switch (type) {
      case 'primary': return theme.colors.brand.primary;
      case 'featured': return '#E91E63';
      case 'business': return '#4CAF50';
      case 'wealth': return '#FF9800';
      case 'finance': return '#9C27B0';
      case 'family': return '#2196F3';
      default: return theme.colors.brand.primary;
    }
  };

  // Function to handle report generation based on subscription status
  const handleReportGeneration = (report: any) => {
    const canAccess = checkSubscriptionAccess(report.tier);
    
    if (canAccess) {
      // Generate the report
      generateReport(report);
    } else {
      // Navigate to subscription page
  navigateTo({ pathname: '/subscription' } as any);
    }
  };

  // Check if user can access report based on subscription
  const checkSubscriptionAccess = (requiredTier: string): boolean => {
    if (requiredTier === 'FREE') return true;
    if (requiredTier === 'PRO' && (userSubscription === 'PRO' || userSubscription === 'PREMIUM')) return true;
    if (requiredTier === 'PREMIUM' && userSubscription === 'PREMIUM') return true;
    return false;
  };

  // Generate report and mark as available
  const generateReport = (report: any) => {
    const reportId = `${report.type}_${Date.now()}`;
    setGeneratedReports(prev => [...prev, reportId]);
    // Here you would typically call your API to generate the report
    // Show success feedback to user
  };

  // Check if report is already generated
  const isReportGenerated = (reportType: string): boolean => {
    return generatedReports.some(id => id.startsWith(reportType));
  };

  // Helper functions for chart colors
  const getReportCardColor = (type: string) => {
    switch (type) {
      case 'business': return 'rgba(76, 175, 80, 0.15)';
      case 'leadership': return 'rgba(255, 152, 0, 0.15)';
      case 'career': return 'rgba(156, 39, 176, 0.15)';
      case 'finance': return 'rgba(255, 215, 0, 0.15)';
      case 'partnership': return 'rgba(33, 150, 243, 0.15)';
      case 'global': return 'rgba(233, 30, 99, 0.15)';
      default: return 'rgba(255, 255, 255, 0.05)';
    }
  };

  const getReportStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'rgba(76, 175, 80, 0.2)';
      case 'New': return 'rgba(255, 152, 0, 0.2)';
      case 'Premium': return 'rgba(255, 215, 0, 0.2)';
      case 'Coming Soon': return 'rgba(158, 158, 158, 0.2)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  };

  const getReportStatusTextColor = (status: string) => {
    switch (status) {
      case 'Ready': return '#4CAF50';
      case 'New': return '#FF9800';
      case 'Premium': return '#FFD700';
      case 'Coming Soon': return '#9E9E9E';
      default: return '#FFFFFF';
    }
  };

  // Handle notification press
  const handleNotificationPress = () => {
    // Add your notification handling logic here
    console.log('Notification icon pressed');
    // You can navigate to notifications screen or show a modal
    // navigation.navigate('Notifications');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.cosmos.void }]}>
      <CorporateProfessionalHeader
        showNotificationIcon={true}
        onNotificationPress={handleNotificationPress}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={theme.colors.brand.primary}
            colors={[theme.colors.brand.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <CosmicWelcomeSection 
          greeting={getGreeting()}
          userName="Rajesh Kumar"
        />
        <DailyInsightsSection
          insightsData={insightsData}
          insightsExpanded={insightsExpanded}
          refreshing={loadingStates.insights}
          onInsightToggle={handleInsightToggle}
          onRefresh={onRefresh}
          onHapticFeedback={triggerLightHaptic}
        />
        {renderHoroscopeSection()}
        {renderAuspiciousTimings()}
        {renderAstroRatanIntroCard()}
        {renderVedicCharts()}
        {renderPersonalizedReports()}
        <BusinessDashboardSection />
        
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  bottomSpacing: {
    height: 60,
  },

  // Modern Header Styles
  modernHeader: {
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'ios' ? 8 : 10,
  },
  headerGradient: {
    paddingVertical: 8,
  },
  modernHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
  },
  modernMenuButton: {
    width: 44, // Updated to meet 44px minimum touch target requirement
    height: 44, // Updated to meet 44px minimum touch target requirement
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modernMenuIcon: {
    fontSize: 24, // Updated to meet 24px minimum accessibility requirement
    fontWeight: '400',
  },
  modernLogoSection: {
    alignItems: 'flex-start',
    left: 16,
    flex: 1,
  },
  brandContainer: {
    alignItems: 'center',
    gap: 2,
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px for grid consistency
  },
  livePulse: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  modernLogoText: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  modernLogoTagline: {
    fontSize: 11,
    marginTop: 1,
    opacity: 0.7,
  },
  profileAvatarButton: {
    position: 'relative',
  },
  profileAvatarContainer: {
    width: 44, // Updated to meet 44px minimum touch target requirement
    height: 44, // Updated to meet 44px minimum touch target requirement
    borderRadius: 22,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  profileAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  notificationDotText: {
    color: '#FFFFFF',
    fontSize: 12, // Updated to meet 12px minimum accessibility requirement
    fontWeight: '700',
  },

  // Modern Welcome Section
  modernWelcomeSection: {
    gap: 20,
    marginTop: 8,
  },
  cosmicGreetingCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  cosmicBackground: {
    padding: 24,
    position: 'relative',
    minHeight: 180,
  },
  zodiacCircle: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  zodiacSymbol: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: '700',
  },
  userProfileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  userGreeting: {
    flex: 1,
    gap: 4,
  },
  greetingTime: {
    fontSize: 14,
    opacity: 0.8,
    fontWeight: '500',
  },
  userName: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
  },
  userAstrologyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  astroSign: {
    fontSize: 16,
    fontWeight: '600',
  },
  astroTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  largeProfileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 3,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  largeAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  onlineGlow: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: '#000',
  },

  // Value Proposition Card
  valuePropositionCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  valueContent: {
    gap: 16,
  },
  valueTagline: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 28,
  },
  valueDescription: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    opacity: 0.9,
  },
  quickStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statIcon: {
    fontSize: 20,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  liveDataBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  pulseIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  liveDataText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // Daily Insights Styles
  insightsCard: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    borderTopWidth: 2,
    borderTopColor: '#FFD700',
  },
  insightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  refreshButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshIcon: {
    fontSize: 12,
    color: '#000',
    fontWeight: '700',
  },
  insightsList: {
    gap: 12,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  insightIndicator: {
    width: 4,
    height: 24,
    borderRadius: 2,
  },
  insightText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
  },
  insightContent: {
    flex: 1,
    gap: 6,
  },
  insightDetails: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
    opacity: 0.9,
  },
  expandIcon: {
    fontSize: 12,
    opacity: 0.7,
  },

  // Professional Horoscope Section Styles
  horoscopeSection: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  horoscopeSectionHeader: {
    marginBottom: 20,
  },
  horoscopeSectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  horoscopeSectionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  
  // General section title for other sections
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  
  // Refined Time Period Selector
  timePeriodSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  timePeriodButton: {
    flex: 1,
    paddingVertical: spacing.md, // 16px for consistent spacing
    paddingHorizontal: spacing.md, // 16px for consistent spacing
    borderRadius: radius.md, // 12px for consistent radius
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timePeriodButtonText: {
    ...typography.body, // 14px for clear hierarchy
    fontWeight: '600',
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  timePeriodSubtext: {
    fontSize: 12, // Updated to meet 12px minimum accessibility requirement
    fontWeight: '500',
    opacity: 0.7,
  },
  
  // Professional Horizontal Horoscope Cards
  horoscopeCardsContainer: {
    paddingHorizontal: 4,
    gap: 16,
  },
  horoscopeCard: {
    width: cards.horizontalScroll.width, // 280px for improved horizontal scroll experience
    padding: spacing.lg, // Standardized padding
    borderRadius: radius.lg, // Consistent radius
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    marginVertical: 2,
  },
  horoscopeCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  horoscopeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  horoscopeIcon: {
    fontSize: 24,
  },
  horoscopeCardHeaderText: {
    flex: 1,
  },
  horoscopeCardTitle: {
    fontSize: 16, // Reduced from 18px to 16px for better hierarchy
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  energyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  energyDot: {
    width: 8, // Increased from 6px for better visibility
    height: 8, // Increased from 6px for better visibility
    borderRadius: 4,
    marginRight: 6,
  },
  energyText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // Professional Card Content
  horoscopeInsight: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
    fontWeight: '400',
  },
  horoscopeGuidance: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    fontStyle: 'italic',
    opacity: 0.9,
  },
  
  // Professional Best Time Indicator
  bestTimeContainer: {
    marginTop: 'auto',
  },
  bestTimeIndicator: {
    paddingVertical: spacing.sm, // 8px for consistent spacing
    paddingHorizontal: spacing.md, // 16px for consistent spacing
    borderWidth: 1,
    borderRadius: radius.sm, // Standardized radius
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bestTimeLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  bestTimeValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  
  // Cosmic Insights Footer
  cosmicInsightsFooter: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  cosmicInsightsText: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
    fontStyle: 'italic',
  },

  // Legacy Tab Styles (keeping for compatibility)
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabContent: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  tabContentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  tabContentText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  tabMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabMetricLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabMetricValue: {
    fontSize: 18,
    fontWeight: '700',
  },

  // Dashboard Styles (Legacy - kept for compatibility)
  dashboardSection: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  dashboardMetrics: {
    gap: 16,
    marginBottom: 20,
  },
  metricItem: {
    gap: 8,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  additionalInfo: {
    gap: 8,
  },
  timingInfo: {
    fontSize: 14,
    fontWeight: '500',
  },
  compatibilityInfo: {
    fontSize: 14,
    fontWeight: '500',
  },

  // Professional Hero Section Styles
  professionalHeroCard: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  heroMainSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greetingSection: {
    flex: 1,
    gap: 4,
  },
  ascendantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, // Reduced from aggressive 0.3 to subtle 0.15
    shadowRadius: 8,
    elevation: 8,
  },
  ascendantSymbol: {
    fontSize: 24,
    fontWeight: '700',
  },
  ascendantInfo: {
    gap: 2,
  },
  ascendantLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  ascendantSign: {
    fontSize: 14,
    fontWeight: '700',
  },
  introSection: {
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  introTagline: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  introDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    opacity: 0.9,
  },

  // Business Dashboard Styles
  businessDashboard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dashboardTitleSection: {
    flex: 1,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  dashboardSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    opacity: 0.8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  liveText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  metricIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  metricIconText: {
    fontSize: 20,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

  // Vedic Charts & Reports Section Styles
  sectionContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 20,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sectionHeader: {
    marginBottom: 20,
    alignItems: 'center',
  },
  sectionSubtitleCentered: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.8,
    textAlign: 'center',
  },
  horizontalScrollContent: {
    paddingHorizontal: 4,
    gap: 16,
  },

  // Chart Card Styles
  chartCard: {
    width: 200,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  chartCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartIcon: {
    fontSize: 32,
  },
  chartBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
  },
  chartBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  chartTitle: {
    fontSize: 16, // Reduced from 20px to 16px for consistent card hierarchy
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 20, // Adjusted line height proportionally
  },
  chartDescription: {
    fontSize: 14, // Reduced from 16px to 14px for better hierarchy
    lineHeight: 18, // Adjusted line height proportionally  
    marginBottom: 8,
    opacity: 0.9,
    fontWeight: '500',
  },
  chartAction: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  chartActionText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Enhanced Chart Card Styles with Glow Effects
  enhancedChartCard: {
    width: cards.horizontalScroll.width, // 280px for consistent horizontal scroll experience
    borderRadius: radius.lg, // Standardized radius
    padding: spacing.lg, // Standardized padding
    marginHorizontal: spacing.xs, // Reduced margin for better spacing
    borderWidth: 2,
    shadowOffset: { width: 0, height: 4 }, // Reduced excessive shadow
    shadowOpacity: 0.2, // Reduced excessive shadow
    shadowRadius: 8, // Reduced excessive shadow
    position: 'relative',
    overflow: 'hidden',
  },
  chartGlowOverlay: {
    flex: 1,
    position: 'relative',
  },
  chartIconContainer: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  chartMainContent: {
    marginVertical: 16,
    gap: 6,
    flex: 1,
  },
  chartDetails: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    fontStyle: 'italic',
    marginBottom: 12,
  },

  // Reports Grid Styles
  reportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  reportCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    zIndex: 10,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  premiumBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportIcon: {
    fontSize: 28,
  },
  reportStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  reportStatusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 20,
  },
  reportSubtitle: {
    fontSize: 13,
    marginBottom: 10,
    opacity: 0.8,
    fontWeight: '500',
  },
  reportDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
    opacity: 0.9,
  },
  reportFooter: {
    marginTop: 'auto',
  },

  // Enhanced Report Card Styles (Horizontal Scroll)
  enhancedReportCard: {
    width: cards.horizontalScroll.width, // 280px for consistent horizontal scroll experience
    borderRadius: radius.lg, // Standardized radius
    padding: spacing.lg, // Standardized padding
    marginHorizontal: spacing.xs, // Reduced margin for better spacing
    borderWidth: 2,
    shadowOffset: { width: 0, height: 4 }, // Reduced excessive shadow
    shadowOpacity: 0.2, // Reduced excessive shadow
    shadowRadius: 8, // Reduced excessive shadow
    position: 'relative',
    overflow: 'hidden',
  },
  reportGlowOverlay: {
    flex: 1,
    position: 'relative',
    paddingTop: 4, // Reduced since badges are now in flow
  },
  
  // Badge Styles - Standardized
  reportBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    minHeight: 28, // Ensure consistent height
  },
  standardBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  standardBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  premiumBadgeStyle: {
    borderColor: 'rgba(0, 0, 0, 0.2)',
    maxWidth: 70,
  },
  tierBadgeStyle: {
    borderColor: 'transparent',
    maxWidth: 80,
  },
  statusBadgeStyle: {
    borderColor: 'transparent',
    maxWidth: 95,
    marginLeft: 'auto', // Push to right
  },
  
  // Report stats section
  reportStats: {
    marginTop: 12,
    gap: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportStatLabel: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.8,
  },
  reportStatValue: {
    fontSize: 12,
    fontWeight: '800',
  },
  
  // Chart-specific badge styles
  chartBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    minHeight: 28,
  },
  chartTypeBadgeStyle: {
    borderColor: 'transparent',
    maxWidth: 120,
    flex: 1,
    marginRight: 8,
  },
  accuracyBadgeStyle: {
    borderColor: 'transparent',
    maxWidth: 50,
    minWidth: 50,
  },
  
  reportCardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  reportIconContainer: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  reportMainContent: {
    marginVertical: 16,
    gap: 6,
    flex: 1,
  },
  reportActionText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  reportAction: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },

  // Compact & Elegant Astro Ratan Card Styles
  astroRatanCard: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.15)',
  },
  astroCosmicBackground: {
    padding: 16,
    position: 'relative',
  },
  astroStarField: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  astroStar: {
    position: 'absolute',
    fontSize: 10,
    color: '#FFD700',
  },
  
  // Compact Header
  astroCompactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    zIndex: 1,
  },
  astroIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 215, 0, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.25)',
    marginRight: 12,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  astroMainIcon: {
    fontSize: 22,
  },
  astroHeaderText: {
    flex: 1,
  },
  astroTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  astroMainTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginRight: 8,
  },
  aiPoweredBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  aiPoweredText: {
    fontSize: 12, // Updated to meet 12px minimum accessibility requirement
    fontWeight: '900',
    letterSpacing: 0.5,
    color: '#000',
  },
  astroTagline: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
    opacity: 0.9,
  },
  
  // Value Proposition
  astroValueProp: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    opacity: 0.95,
  },
  
  // Compact Differentiators
  astroDifferentiators: {
    gap: 8,
    marginBottom: 12,
  },
  astroDiffItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  astroDiffIcon: {
    fontSize: 14,
    width: 20,
  },
  astroDiffText: {
    fontSize: 12,
    lineHeight: 16,
    flex: 1,
    opacity: 0.9,
  },
  
  // Compact Trust Row
  astroTrustRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 14,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  astroTrustItem: {
    alignItems: 'center',
    gap: 3,
  },
  astroTrustIcon: {
    fontSize: 12,
  },
  astroTrustLabel: {
    fontSize: 12, // Updated to meet 12px minimum accessibility requirement
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  
  // Time Period Selector
  timePeriodSelector: {
    flexDirection: 'row',
    borderRadius: 18,
    padding: 4,
    marginBottom: spacing.lg,
  },
  timePeriodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  timePeriodButtonText: {
    ...typography.body,
    fontSize: 14,
    textAlign: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '70%',
    borderRadius: 1,
  },
  
  // Compact CTA
  astroCompactCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    gap: 8,
  },
  astroCTAText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  astroCTAArrow: {
    fontSize: 14,
    fontWeight: '700',
  },

  // Auspicious Timings Section Styles
  auspiciousTimingsSection: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  auspiciousTimingsHeader: {
    marginBottom: 20,
  },
  professionalTimingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'stretch', // Ensure all cards stretch to same height
  },
  horizontalTimingsScroll: {
    marginVertical: 4,
  },
  horizontalTimingsContent: {
    paddingHorizontal: spacing.md, // Standardized padding
    paddingRight: spacing.xl, // Standardized padding
    gap: spacing.md, // 16px for grid consistency
  },
  timingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timingCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  timingCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timingName: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  timingTypeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  timingTime: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },

  // Astro Ratan Premium Styles
  techBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  nasaBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
  },
  nasaText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  techStack: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  techStackTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  techGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  techItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  techIcon: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 6,
  },
  techLabel: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 14,
  },
  capabilityGrid: {
    flexDirection: 'column',
    gap: 0,
  },
  capabilityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  capabilityIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  capabilityText: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    lineHeight: 18,
  },
  liveStatusIndicator: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
  },
  liveStatusText: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.8,
  },
  // Pagination indicators for horizontal scrolls
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
    gap: pagination.indicator.spacing,
  },
  paginationDot: {
    borderRadius: pagination.indicator.borderRadius,
  },
  // Common inline style patterns moved to StyleSheet for performance
  backgroundCosmosDeep: {
    backgroundColor: corpAstroDarkTheme.colors.cosmos.deep,
  },
  textBrandPrimary: {
    color: corpAstroDarkTheme.colors.brand.primary,
  },
  textNeutralLight: {
    color: corpAstroDarkTheme.colors.neutral.light,
  },
  textNeutralText: {
    color: corpAstroDarkTheme.colors.neutral.text,
  },
  borderSubtle: {
    borderColor: `rgba(255, 255, 255, ${borderOpacity.subtle})`,
  },
  borderMedium: {
    borderColor: `rgba(255, 255, 255, ${borderOpacity.medium})`,
  },
});

export default HomeTab;
