/**
 * Professional Guidance Cards
 * 
 * Sophisticated cards for displaying actionable business guidance and recommendations.
 * Features clean design, interactive elements, and professional micro-animations.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  ViewStyle,
} from 'react-native';
import { corpAstroDarkTheme } from '../DesignSystem/DarkTheme';

interface GuidanceItem {
  text: string;
  priority?: 'high' | 'medium' | 'low';
  category?: 'strategic' | 'operational' | 'interpersonal' | 'financial' | 'growth' | 'timing';
  confidence?: number; // 0-100
  basis?: string; // Astrological or traditional basis for the guidance
}

interface ProfessionalGuidanceCardProps {
  title: string;
  type: 'positive' | 'negative';
  items: GuidanceItem[];
  period: string;
  onItemPress?: (item: GuidanceItem, index: number) => void;
  style?: ViewStyle;
}

export type { GuidanceItem, ProfessionalGuidanceCardProps };

const ProfessionalGuidanceCard: React.FC<ProfessionalGuidanceCardProps> = ({
  title,
  type,
  items,
  period,
  onItemPress,
  style,
}) => {
  const theme = corpAstroDarkTheme;
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Smooth entrance animation
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getCardTheme = () => {
    if (type === 'positive') {
      return {
        accentColor: '#16A34A',
        backgroundColor: 'rgba(34, 197, 94, 0.10)',
        borderColor: 'rgba(34, 197, 94, 0.35)',
        iconBackground: 'rgba(34, 197, 94, 0.18)',
        shadowColor: 'rgba(34, 197, 94, 0.3)',
        icon: '✓',
        label: 'Recommended Actions',
      };
    } else {
      return {
        accentColor: '#DC2626',
        backgroundColor: 'rgba(239, 68, 68, 0.10)',
        borderColor: 'rgba(239, 68, 68, 0.35)',
        iconBackground: 'rgba(239, 68, 68, 0.18)',
        shadowColor: 'rgba(239, 68, 68, 0.3)',
        icon: '!',
        label: 'Avoid These Actions',
      };
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return '#FF5722';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return theme.colors.neutral.light;
    }
  };

  const getPriorityBackgroundColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'rgba(255, 87, 34, 0.2)';
      case 'medium': return 'rgba(255, 152, 0, 0.2)';
      case 'low': return 'rgba(76, 175, 80, 0.2)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'strategic': return '🎯';
      case 'operational': return '⚙️';
      case 'interpersonal': return '🤝';
      case 'financial': return '💼';
      default: return '📋';
    }
  };

  const toggleItemExpansion = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const cardTheme = getCardTheme();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
          opacity: opacityAnim,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.cosmos.deep,
            borderColor: cardTheme.borderColor,
            shadowColor: cardTheme.shadowColor,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 6,
          },
        ]}
      >
        {/* Glassmorphism Background */}
        <View
          style={[
            styles.backgroundOverlay,
            {
              backgroundColor: cardTheme.backgroundColor,
            },
          ]}
        />

        {/* Card Header */}
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <View style={[styles.iconContainer, { backgroundColor: cardTheme.iconBackground }]}>
              <Text style={[styles.icon, { color: cardTheme.accentColor }]}>
                {cardTheme.icon}
              </Text>
            </View>
            <View style={styles.titleInfo}>
              <Text style={[styles.cardTitle, { color: cardTheme.accentColor }]}>
                {cardTheme.label}
              </Text>
              <Text style={[styles.periodText, { color: theme.colors.neutral.light }]}>
                {period}
              </Text>
            </View>
          </View>
          
          <View style={styles.countBadge}>
            <Text style={[styles.countText, { color: cardTheme.accentColor }]}>
              {items.length}
            </Text>
          </View>
        </View>

        {/* Items List */}
        <View style={styles.itemsList}>
          {items.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => {
                toggleItemExpansion(index);
                onItemPress?.(item, index);
              }}
              style={({ pressed }) => [
                styles.guidanceItem,
                {
                  backgroundColor: pressed ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  borderLeftColor: cardTheme.accentColor,
                },
              ]}
            >
              <View style={styles.itemHeader}>
                <View style={styles.itemIcon}>
                  <Text style={[styles.itemIconText, { color: cardTheme.accentColor }]}>
                    {cardTheme.icon}
                  </Text>
                </View>
                
                <View style={styles.itemContent}>
                  <Text style={[styles.itemText, { color: theme.colors.neutral.text }]}>
                    {item.text}
                  </Text>
                  
                  <View style={styles.itemMeta}>
                    {item.category && (
                      <View style={styles.categoryTag}>
                        <Text style={styles.categoryIcon}>
                          {getCategoryIcon(item.category)}
                        </Text>
                        <Text style={[styles.categoryText, { color: theme.colors.neutral.light }]}>
                          {item.category}
                        </Text>
                      </View>
                    )}
                    
                    {item.priority && (
                      <View style={[styles.priorityIndicator, { backgroundColor: getPriorityBackgroundColor(item.priority) }]}>
                        <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(item.priority) }]} />
                        <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
                          {item.priority}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {item.confidence && (
                  <View style={styles.confidenceSection}>
                    <Text style={[styles.confidenceLabel, { color: theme.colors.neutral.light }]}>
                      Confidence
                    </Text>
                    <View style={styles.confidenceBar}>
                      <View
                        style={[
                          styles.confidenceProgress,
                          {
                            width: `${item.confidence}%`,
                            backgroundColor: cardTheme.accentColor,
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.confidenceValue, { color: cardTheme.accentColor }]}>
                      {item.confidence}%
                    </Text>
                  </View>
                )}
              </View>
              
              {/* Astrological Basis (shown when expanded) */}
              {expandedItems.has(index) && item.basis && (
                <Animated.View style={[styles.basisSection, { opacity: expandedItems.has(index) ? 1 : 0 }]}>
                  <View style={styles.basisHeader}>
                    <Text style={[styles.basisTitle, { color: cardTheme.accentColor }]}>
                      📚 Vedic Basis
                    </Text>
                  </View>
                  <Text style={[styles.basisText, { color: theme.colors.neutral.light }]}>
                    {item.basis}
                  </Text>
                </Animated.View>
              )}
            </Pressable>
          ))}
        </View>

        {/* Card Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.neutral.light }]}>
            🎯 Strategic insights based on planetary analysis
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300, // Fixed width for horizontal scroll
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16, // Reduced from 20
    paddingBottom: 12, // Reduced from 16
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
    fontWeight: '700',
  },
  titleInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  periodText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  countBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  countText: {
    fontSize: 14,
    fontWeight: '700',
  },
  itemsList: {
    paddingHorizontal: 16, // Reduced from 20
  },
  guidanceItem: {
    borderLeftWidth: 3,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10, // Reduced from 12
    paddingLeft: 14, // Reduced from 16
  },
  itemIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  itemIconText: {
    fontSize: 14,
    fontWeight: '700',
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  priorityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  confidenceSection: {
    alignItems: 'center',
    marginLeft: 16,
    minWidth: 60,
  },
  confidenceLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  confidenceBar: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 4,
    overflow: 'hidden',
  },
  confidenceProgress: {
    height: '100%',
    borderRadius: 2,
  },
  confidenceValue: {
    fontSize: 10,
    fontWeight: '700',
  },
  footer: {
    padding: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  basisSection: {
    marginTop: 12,
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  basisHeader: {
    marginBottom: 8,
  },
  basisTitle: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  basisText: {
    fontSize: 11,
    lineHeight: 16,
    fontStyle: 'italic',
    opacity: 0.9,
  },
});

export default ProfessionalGuidanceCard;
