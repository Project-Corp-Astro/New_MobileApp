/**
 * Corp Astro - Reports Screen
 *
 * Screen for displaying user's personalized astrological reports.
 * Self-contained version without BaseScreen wrapper.
 *
 * @module ReportsScreen
 * @version 1.0.1
 * @since 2025
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Reports: undefined;
};

import CorporateProfessionalHeader from '../../components/professional/CorporateProfessionalHeader';
import { corpAstroDarkTheme } from '../../components/DesignSystem/DarkTheme';
import { spacing } from '../../components/DesignSystem/SpacingScale';
import { typography } from '../../components/DesignSystem/designTokens';

interface Report {
  id: string;
  title: string;
  type: string;
  date: string;
  status: 'completed' | 'processing' | 'pending';
  description: string;
  accuracy: string;
}

type ReportsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Reports'
>;

const ReportsScreen: React.FC = () => {
  const theme = corpAstroDarkTheme;
  const navigation = useNavigation<ReportsScreenNavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState('all');

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Mock reports data
  const reports: Report[] = [
    {
      id: '1',
      title: 'Business Growth Analysis',
      type: 'Business',
      date: '2025-01-15',
      status: 'completed',
      description:
        'Comprehensive analysis of business growth potential and strategic opportunities.',
      accuracy: '92%',
    },
    {
      id: '2',
      title: 'Yearly Career Forecast',
      type: 'Career',
      date: '2025-01-14',
      status: 'completed',
      description:
        'Detailed career forecast and professional development insights for 2025.',
      accuracy: '88%',
    },
    {
      id: '3',
      title: 'Partnership Compatibility',
      type: 'Relationship',
      date: '2025-01-12',
      status: 'processing',
      description:
        'Analysis of business partnership compatibility and team dynamics.',
      accuracy: 'Pending',
    },
    {
      id: '4',
      title: 'Financial Timeline',
      type: 'Finance',
      date: '2025-01-10',
      status: 'completed',
      description:
        'Optimal timing for financial decisions and investment opportunities.',
      accuracy: '89%',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Reports', count: reports.length },
    {
      id: 'business',
      label: 'Business',
      count: reports.filter((r) => r.type === 'Business').length,
    },
    {
      id: 'career',
      label: 'Career',
      count: reports.filter((r) => r.type === 'Career').length,
    },
    {
      id: 'relationship',
      label: 'Relationship',
      count: reports.filter((r) => r.type === 'Relationship').length,
    },
    {
      id: 'finance',
      label: 'Finance',
      count: reports.filter((r) => r.type === 'Finance').length,
    },
  ];

  const filteredReports =
    selectedCategory === 'all'
      ? reports
      : reports.filter(
          (r) => r.type.toLowerCase() === selectedCategory.toLowerCase()
        );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'processing':
        return '#FF9800';
      case 'pending':
        return theme.colors.brand.primary;
      default:
        return theme.colors.neutral.text;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'processing':
        return '⏳';
      case 'pending':
        return '⏸️';
      default:
        return '📄';
    }
  };

  const handleReportPress = (report: Report) => {
    if (report.status === 'completed') {
      Alert.alert(
        report.title,
        `View your ${report.title.toLowerCase()} report with ${report.accuracy} accuracy.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'View Report', onPress: () => console.log(`Opening report ${report.id}`) },
        ]
      );
    } else {
      Alert.alert(
        'Report Status',
        `This report is currently ${report.status}. You'll be notified when it's ready.`
      );
    }
  };

  const handleGenerateReport = () => {
    Alert.alert(
      'Generate New Report',
      'What type of report would you like to generate?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Business Analysis', onPress: () => console.log('Generate business report') },
        { text: 'Career Forecast', onPress: () => console.log('Generate career report') },
        { text: 'Financial Timeline', onPress: () => console.log('Generate financial report') },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: String(theme.colors.cosmos.void) }}>
      <CorporateProfessionalHeader
        title="My Reports"
        showBackButton
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <Pressable
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: 'rgba(46, 134, 222, 0.2)',
            }}
            onPress={handleGenerateReport}
          >
            <Text style={{ ...typography.body }}>📊</Text>
          </Pressable>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
      >
        {/* Categories Filter */}
        <View
          style={{
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.md,
          }}
        >
          <Text
            style={{
              ...typography.heading3,
              fontWeight: '600',
              color: String(theme.colors.neutral.text),
              marginBottom: spacing.md,
            }}
          >
            Report Categories
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: spacing.sm }}
          >
            {categories.map((category) => (
              <Pressable
                key={category.id}
                style={({ pressed }) => ({
                  backgroundColor:
                    selectedCategory === category.id
                      ? String(theme.colors.brand.primary)
                      : String(theme.colors.cosmos.deep),
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor:
                    selectedCategory === category.id
                      ? String(theme.colors.brand.primary)
                      : 'rgba(255, 255, 255, 0.1)',
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  style={{
                    color:
                      selectedCategory === category.id
                        ? String(theme.colors.cosmos.void)
                        : String(theme.colors.neutral.text),
                    ...typography.body,
                    fontWeight: '500',
                  }}
                >
                  {category.label} ({category.count})
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Reports List */}
        <View
          style={{
            paddingHorizontal: spacing.lg,
            gap: spacing.md,
          }}
        >
          <Text
            style={{
              ...typography.heading3,
              fontWeight: '600',
              color: String(theme.colors.neutral.text),
              marginBottom: spacing.sm,
            }}
          >
            {selectedCategory === 'all'
              ? 'All Reports'
              : categories.find((c) => c.id === selectedCategory)?.label}
          </Text>

          {filteredReports.map((report) => (
            <Pressable
              key={report.id}
              style={({ pressed }) => ({
                backgroundColor: String(theme.colors.cosmos.deep),
                borderRadius: 16,
                padding: spacing.lg,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)',
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
              onPress={() => handleReportPress(report)}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: spacing.sm,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      ...typography.heading3,
                      fontWeight: '600',
                      color: String(theme.colors.neutral.text),
                      marginBottom: spacing.xs,
                    }}
                  >
                    {report.title}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: spacing.sm,
                      marginBottom: spacing.sm,
                    }}
                  >
                    <Text
                      style={{
                        ...typography.body,
                        color: String(theme.colors.brand.primary),
                        fontWeight: '500',
                      }}
                    >
                      {report.type}
                    </Text>
                    <Text
                      style={{
                        ...typography.body,
                        color: String(theme.colors.neutral.light),
                      }}
                    >
                      {report.date}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                  }}
                >
                  <Text style={{ ...typography.body }}>{getStatusIcon(report.status)}</Text>
                  <Text
                    style={{
                      ...typography.body,
                      color: getStatusColor(report.status),
                      fontWeight: '500',
                    }}
                  >
                    {report.status.charAt(0).toUpperCase() +
                      report.status.slice(1)}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  ...typography.body,
                  color: String(theme.colors.neutral.light),
                  lineHeight: 20,
                  marginBottom: spacing.sm,
                }}
              >
                {report.description}
              </Text>

              {report.status === 'completed' && (
                <View
                  style={{
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    paddingHorizontal: spacing.sm,
                    paddingVertical: spacing.xs,
                    borderRadius: 8,
                    alignSelf: 'flex-start',
                  }}
                >
                  <Text
                    style={{
                      ...typography.body,
                      color: '#4CAF50',
                      fontWeight: '500',
                    }}
                  >
                    Accuracy: {report.accuracy}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}

          {filteredReports.length === 0 && (
            <View
              style={{
                alignItems: 'center',
                paddingVertical: spacing.xl,
              }}
            >
              <Text style={{ ...typography.heading2, marginBottom: spacing.md }}>📄</Text>
              <Text
                style={{
                  ...typography.heading3,
                  color: String(theme.colors.neutral.text),
                  textAlign: 'center',
                  marginBottom: spacing.sm,
                }}
              >
                No reports found
              </Text>
              <Text
                style={{
                  ...typography.body,
                  color: String(theme.colors.neutral.light),
                  textAlign: 'center',
                }}
              >
                {selectedCategory === 'all'
                  ? 'Generate your first report to get started'
                  : `No ${
                      categories.find((c) => c.id === selectedCategory)?.label.toLowerCase()
                    } reports available`}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReportsScreen;
