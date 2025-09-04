/**
 * Corp Astro - Calendar Screen
 * 
 * Screen for displaying user's cosmic calendar and events.
 * Using the BaseScreen layout and reusable components.
 * 
 * @module CalendarScreen
 * @version 1.0.0
 * @since 2025
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Calendar: undefined;
  // Add other screens as needed
};
import { BaseScreen } from '../../components/menusection/BaseScreen';
import CorporateProfessionalHeader from '../../components/professional/CorporateProfessionalHeader';
import { corpAstroDarkTheme } from '../../components/DesignSystem/DarkTheme';
import { designTokens, typography } from '../../components/DesignSystem/designTokens';
import { spacing } from '../../components/DesignSystem/SpacingScale';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'auspicious' | 'caution' | 'neutral' | 'special';
  date: string;
  time?: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

type CalendarScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Calendar'>;

const CalendarScreen: React.FC = () => {
  const theme = corpAstroDarkTheme;
  const navigation = useNavigation<CalendarScreenNavigationProp>();
  const [selectedView, setSelectedView] = useState<'month' | 'week' | 'day'>('month');

  // Set navigation options
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Mock calendar events
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Auspicious Business Meeting',
      type: 'auspicious',
      date: '2025-01-20',
      time: '2:30 PM - 4:00 PM',
      description: 'Perfect time for important business discussions and contract signings.',
      impact: 'high'
    },
    {
      id: '2',
      title: 'Mercury Retrograde Begins',
      type: 'caution',
      date: '2025-01-22',
      description: 'Exercise caution with communication and technology. Avoid signing major contracts.',
      impact: 'high'
    },
    {
      id: '3',
      title: 'Favorable Investment Window',
      type: 'auspicious',
      date: '2025-01-25',
      time: '10:00 AM - 6:00 PM',
      description: 'Excellent day for financial decisions and investment opportunities.',
      impact: 'medium'
    },
    {
      id: '4',
      title: 'Full Moon in Leo',
      type: 'special',
      date: '2025-01-28',
      time: '8:45 PM',
      description: 'Powerful time for manifestation and releasing what no longer serves.',
      impact: 'medium'
    }
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'auspicious':
        return '#4CAF50';
      case 'caution':
        return '#FF5722';
      case 'special':
        return String(theme.colors.luxury.pure);
      case 'neutral':
      default:
        return String(theme.colors.brand.primary);
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'auspicious':
        return '✨';
      case 'caution':
        return '⚠️';
      case 'special':
        return '🌕';
      case 'neutral':
      default:
        return '📅';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high':
        return '🔥';
      case 'medium':
        return '⭐';
      case 'low':
        return '💫';
      default:
        return '💫';
    }
  };

  const handleEventPress = (event: CalendarEvent) => {
    Alert.alert(
      event.title,
      `${event.description}\n\nDate: ${event.date}${event.time ? `\nTime: ${event.time}` : ''}`,
      [
        { text: 'OK', style: 'default' },
        { text: 'Add Reminder', onPress: () => console.log(`Add reminder for ${event.id}`) }
      ]
    );
  };

  const handleAddEvent = () => {
    Alert.alert(
      'Add Event',
      'What type of event would you like to add?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Business Meeting', onPress: () => console.log('Add business meeting') },
        { text: 'Personal Event', onPress: () => console.log('Add personal event') },
        { text: 'Reminder', onPress: () => console.log('Add reminder') }
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <BaseScreen backgroundColor={String(theme.colors.cosmos.void)}>
      <CorporateProfessionalHeader
        title="My Calendar"
        showBackButton
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <Pressable
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: 'rgba(46, 134, 222, 0.2)',
            }}
            onPress={handleAddEvent}
          >
            <Text style={{ fontSize: 16 }}>➕</Text>
          </Pressable>
        }
      />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: spacing.xl,
        }}
      >
        {/* View Toggle */}
        <View style={{
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
        }}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: spacing.sm }}
          >
            {['month', 'week', 'day'].map((view) => (
              <Pressable
                key={view}
                style={({ pressed }) => ({
                  backgroundColor: selectedView === view 
                    ? String(theme.colors.brand.primary)
                    : String(theme.colors.cosmos.deep),
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.sm,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: selectedView === view 
                    ? String(theme.colors.brand.primary)
                    : 'rgba(255, 255, 255, 0.1)',
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
                onPress={() => setSelectedView(view as 'month' | 'week' | 'day')}
              >
                <Text style={{
                  color: selectedView === view 
                    ? String(theme.colors.cosmos.void)
                    : String(theme.colors.neutral.text),
                  ...typography.body,
                  fontWeight: '500',
                  textTransform: 'capitalize',
                }}>
                  {view} View
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Calendar Events */}
        <View style={{
          paddingHorizontal: spacing.lg,
          gap: spacing.md,
        }}>
          <Text style={{
            ...typography.heading3,
            fontWeight: '600',
            color: String(theme.colors.neutral.text),
            marginBottom: spacing.sm,
          }}>
            Upcoming Events
          </Text>

          {events.map((event) => (
            <Pressable
              key={event.id}
              style={({ pressed }) => ({
                backgroundColor: String(theme.colors.cosmos.deep),
                borderRadius: 16,
                padding: spacing.lg,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderLeftWidth: 4,
                borderLeftColor: getEventColor(event.type),
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
              onPress={() => handleEventPress(event)}
            >
              <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: spacing.sm,
              }}>
                <View style={{ flex: 1 }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.xs,
                    marginBottom: spacing.xs,
                  }}>
                    <Text style={{ ...typography.body }}>
                      {getEventIcon(event.type)}
                    </Text>
                    <Text style={{
                      ...typography.heading3,
                      fontWeight: '600',
                      color: String(theme.colors.neutral.text),
                    }}>
                      {event.title}
                    </Text>
                  </View>
                  
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.sm,
                    marginBottom: spacing.sm,
                  }}>
                    <Text style={{
                      ...typography.body,
                      color: getEventColor(event.type),
                      fontWeight: '500',
                    }}>
                      {formatDate(event.date)}
                    </Text>
                    {event.time && (
                      <Text style={{
                        ...typography.body,
                        color: String(theme.colors.neutral.light),
                      }}>
                        {event.time}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: spacing.xs,
                }}>
                  <Text style={{ ...typography.body }}>
                    {getImpactIcon(event.impact)}
                  </Text>
                  <Text style={{
                    ...typography.caption,
                    color: String(theme.colors.neutral.light),
                    textTransform: 'uppercase',
                    fontWeight: '500',
                  }}>
                    {event.impact}
                  </Text>
                </View>
              </View>

              <Text style={{
                ...typography.body,
                color: String(theme.colors.neutral.light),
                lineHeight: 20,
              }}>
                {event.description}
              </Text>
            </Pressable>
          ))}

          {events.length === 0 && (
            <View style={{
              alignItems: 'center',
              paddingVertical: spacing.xl,
            }}>
              <Text style={{
                fontSize: 48,
                marginBottom: spacing.md,
              }}>
                📅
              </Text>
              <Text style={{
                ...typography.heading3,
                color: String(theme.colors.neutral.text),
                textAlign: 'center',
                marginBottom: spacing.sm,
              }}>
                No events scheduled
              </Text>
              <Text style={{
                ...typography.body,
                color: String(theme.colors.neutral.light),
                textAlign: 'center',
              }}>
                Add your first event to get started
              </Text>
            </View>
          )}
        </View>

        {/* Astrological Insights */}
        <View style={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.xl,
        }}>
          <Text style={{
            ...typography.heading3,
            fontWeight: '600',
            color: String(theme.colors.neutral.text),
            marginBottom: spacing.md,
          }}>
            Today's Cosmic Insights
          </Text>
          
          <View style={{
            backgroundColor: String(theme.colors.cosmos.deep),
            borderRadius: 16,
            padding: spacing.lg,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.sm,
              marginBottom: spacing.md,
            }}>
              <Text style={{ fontSize: 20 }}>🌟</Text>
              <Text style={{
                ...typography.heading3,
                fontWeight: '600',
                color: String(theme.colors.neutral.text),
              }}>
                Current Planetary Influences
              </Text>
            </View>
            
            <Text style={{
              ...typography.body,
              color: String(theme.colors.neutral.light),
              lineHeight: 22,
            }}>
              The Moon in Capricorn today brings focus to business matters and long-term planning. 
              Jupiter's favorable aspect encourages expansion and growth opportunities. 
              This is an excellent time for strategic thinking and laying foundations for future success.
            </Text>
          </View>
        </View>
      </ScrollView>
    </BaseScreen>
  );
};

export default CalendarScreen;
