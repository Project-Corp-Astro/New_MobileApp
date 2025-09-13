/**
 * Corp Astro - Calendar Screen
 *
 * Premium calendar experience:
 * - Calendar view at top
 * - Month, week, day view toggle
 * - Astrological events (transits, moon phases, retrogrades, auspicious dates)
 * - Personal vs general events
 * - Premium insights (💎)
 * - Cosmic Insights section
 *
 * @module CalendarScreen
 * @version 2.1.0
 * @since 2025
 */

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BaseScreen } from "../../components/menusection/BaseScreen";
import CorporateHeader from "../../components/professional/CorporateProfessionalHeader";
import { corpAstroDarkTheme } from "../../components/DesignSystem/DarkTheme";
import { typography } from "../../components/DesignSystem/designTokens";
import { spacing } from "../../components/DesignSystem/SpacingScale";
import { Calendar } from 'react-native-calendars';

type RootStackParamList = {
  Home: undefined;
  Calendar: undefined;
};

interface CalendarEvent {
  id: string;
  title: string;
  type:
    | "auspicious"
    | "caution"
    | "neutral"
    | "special"
    | "personal"
    | "premium";
  category?: "love" | "career" | "health" | "spirituality" | "communication";
  date: string;
  time?: string;
  description: string;
  impact: "high" | "medium" | "low";
}

type CalendarScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Calendar"
>;

const CalendarScreen: React.FC = () => {
  const theme = corpAstroDarkTheme;
  const navigation = useNavigation<CalendarScreenNavigationProp>();
  const [selectedView, setSelectedView] = useState<"month" | "week" | "day">(
    "month"
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const getEventColor = (type: string) => {
    switch (type) {
      case "auspicious":
        return "#4CAF50";
      case "caution":
        return "#FF5722";
      case "special":
        return String(theme.colors.luxury.pure);
      case "personal":
        return "#2196F3";
      case "premium":
        return "#FFD700";
      case "neutral":
      default:
        return String(theme.colors.brand.primary);
    }
  };

  // Mock calendar events
  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Auspicious Business Meeting",
      type: "auspicious",
      category: "career",
      date: "2025-09-20",
      time: "2:30 PM - 4:00 PM",
      description:
        "Perfect time for important business discussions and contract signings.",
      impact: "high",
    },
    {
      id: "2",
      title: "Mercury Retrograde Begins",
      type: "caution",
      category: "communication",
      date: "2025-09-22",
      description:
        "Exercise caution with communication and technology. Avoid signing major contracts.",
      impact: "high",
    },
    {
      id: "3",
      title: "Lucky Day 💎",
      type: "personal",
      category: "love",
      date: "2025-09-23",
      description:
        "Based on your chart, today brings supportive Venus aspects. Great for love & relationships.",
      impact: "medium",
    },
  ];

  // Format marked dates for the calendar
  const markedDates = events.reduce((acc, event) => {
    acc[event.date] = {
      marked: true,
      dotColor: getEventColor(event.type),
      selected: event.date === selectedDate,
      selectedColor:
        event.date === selectedDate
          ? String(theme.colors.brand.primary)
          : undefined,
    };
    return acc;
  }, {} as any);


  const getEventIcon = (type: string) => {
    switch (type) {
      case "auspicious":
        return "✨";
      case "caution":
        return "⚠️";
      case "special":
        return "🌕";
      case "personal":
        return "💖";
      case "premium":
        return "💎";
      case "neutral":
      default:
        return "📅";
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high":
        return "🔥";
      case "medium":
        return "⭐";
      case "low":
        return "💫";
      default:
        return "💫";
    }
  };

  const handleEventPress = (event: CalendarEvent) => {
    Alert.alert(
      event.title,
      `${event.description}\n\nDate: ${event.date}${
        event.time ? `\nTime: ${event.time}` : ""
      }`,
      [
        { text: "OK", style: "default" },
        {
          text: "Add Reminder",
          onPress: () => console.log(`Add reminder for ${event.id}`),
        },
      ]
    );
  };


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <BaseScreen backgroundColor={String(theme.colors.cosmos.void)}>
      <CorporateHeader variant="centered" title="Calendar" showBackButton />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Calendar Component */}
        <View style={styles.calendarContainer}>
          <Calendar
            current={selectedDate}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            markedDates={markedDates}
            theme={{
              backgroundColor: String(theme.colors.cosmos.deep),
              calendarBackground: String(theme.colors.cosmos.deep),
              textSectionTitleColor: String(theme.colors.neutral.text),
              selectedDayBackgroundColor: String(theme.colors.brand.primary),
              selectedDayTextColor: String(theme.colors.cosmos.void),
              todayTextColor: String(theme.colors.brand.primary),
              dayTextColor: String(theme.colors.neutral.text),
              textDisabledColor: String(theme.colors.neutral.muted),
              dotColor: String(theme.colors.brand.primary),
              selectedDotColor: String(theme.colors.cosmos.void),
              arrowColor: String(theme.colors.brand.primary),
              monthTextColor: String(theme.colors.neutral.text),
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 14,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
            }}
          />
        </View>

        {/* View Toggle */}
        <View style={styles.toggleWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {["month", "week", "day"].map((view) => (
              <Pressable
                key={view}
                style={({ pressed }) => [
                  styles.viewToggle,
                  {
                    backgroundColor:
                      selectedView === view
                        ? String(theme.colors.brand.primary)
                        : String(theme.colors.cosmos.deep),
                    borderColor:
                      selectedView === view
                        ? String(theme.colors.brand.primary)
                        : "rgba(255, 255, 255, 0.1)",
                    opacity: pressed ? 0.8 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  },
                ]}
                onPress={() => setSelectedView(view as "month" | "week" | "day")}
              >
                <Text
                  style={[
                    typography.body,
                    {
                      color:
                        selectedView === view
                          ? String(theme.colors.cosmos.void)
                          : String(theme.colors.neutral.text),
                      fontWeight: "500",
                      textTransform: "capitalize",
                    },
                  ]}
                >
                  {view} View
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Events List */}
        <View style={styles.eventsWrapper}>
          <Text style={[typography.heading3, styles.sectionTitle]}>
            Events on {formatDate(selectedDate)}
          </Text>

          {events
            .filter((e) => e.date === selectedDate)
            .map((event) => (
              <Pressable
                key={event.id}
                style={({ pressed }) => [
                  styles.eventCard,
                  {
                    borderLeftColor: getEventColor(event.type),
                    opacity: pressed ? 0.9 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  },
                ]}
                onPress={() => handleEventPress(event)}
              >
                <View style={styles.eventHeader}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.eventTitleRow}>
                      <Text style={typography.body}>
                        {getEventIcon(event.type)}
                      </Text>
                      <Text
                        style={[
                          typography.heading3,
                          {
                            fontWeight: "600",
                            color: String(theme.colors.neutral.text),
                          },
                        ]}
                      >
                        {event.title}
                      </Text>
                    </View>

                    <View style={styles.eventMeta}>
                      <Text
                        style={[
                          typography.body,
                          {
                            color: getEventColor(event.type),
                            fontWeight: "500",
                          },
                        ]}
                      >
                        {formatDate(event.date)}
                      </Text>
                      {event.time && (
                        <Text
                          style={[
                            typography.body,
                            { color: String(theme.colors.neutral.light) },
                          ]}
                        >
                          {event.time}
                        </Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.impactWrapper}>
                    <Text style={typography.body}>
                      {getImpactIcon(event.impact)}
                    </Text>
                    <Text
                      style={[
                        typography.caption,
                        {
                          color: String(theme.colors.neutral.light),
                          textTransform: "uppercase",
                          fontWeight: "500",
                        },
                      ]}
                    >
                      {event.impact}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[
                    typography.body,
                    {
                      color: String(theme.colors.neutral.light),
                      lineHeight: 20,
                    },
                  ]}
                >
                  {event.description}
                </Text>
              </Pressable>
            ))}
        </View>

        {/* Insights */}
        <View style={styles.insightsWrapper}>
          <Text style={[typography.heading3, styles.sectionTitle]}>
            Today's Cosmic Insights
          </Text>
          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Text style={{ fontSize: 20 }}>🌟</Text>
              <Text
                style={[
                  typography.heading3,
                  {
                    fontWeight: "600",
                    color: String(theme.colors.neutral.text),
                  },
                ]}
              >
                Current Planetary Influences
              </Text>
            </View>
            <Text
              style={[
                typography.body,
                {
                  color: String(theme.colors.neutral.light),
                  lineHeight: 22,
                },
              ]}
            >
              The Moon in Capricorn today brings focus to business matters and
              long-term planning. Jupiter’s favorable aspect encourages
              expansion and growth. Excellent for strategy and laying future
              foundations.
            </Text>
          </View>
        </View>
      </ScrollView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xl,
    paddingTop: spacing.sm,
  },
  calendarContainer: {
    backgroundColor: String(corpAstroDarkTheme.colors.cosmos.deep),
    borderRadius: 12,
    margin: spacing.md,
    padding: spacing.sm,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  calendar: {
    margin: spacing.md,
    borderRadius: 12,
    overflow: "hidden",
  },
  toggleWrapper: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  viewToggle: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: spacing.sm,
  },
  eventsWrapper: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  sectionTitle: {
    fontWeight: "600",
    color: "#fff",
    marginBottom: spacing.sm,
  },
  eventCard: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderLeftWidth: 4,
    marginBottom: spacing.md,
  },
  eventHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  eventTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  eventMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  impactWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  insightsWrapper: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  insightCard: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  insightHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
});

export default CalendarScreen;
