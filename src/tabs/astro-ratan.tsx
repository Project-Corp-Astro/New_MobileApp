/**
 * Astro Ratan Chat Interface - Grok-Inspired Design
 * 
 * Premium AI chat experience with cosmic theme, advanced animations,
 * and mystical visual elements aligned with Corp Astro design system.
 * 
 * Design Features:
 * - Animated cosmic star field background
 * - Grok-inspired chat bubbles and interactions
 * - Premium header with animated avatar
 * - Typing indicators and suggestion pills
 * - Cosmic gradients and mystical elements
 * 
 * @format
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CorporateHeader from '../components/professional/CorporateProfessionalHeader';

type RootStackParamList = {
  // Define your screen params here if needed
  Home: undefined;
  Services: undefined;
  AstroRatan: undefined;
  MyBusiness: undefined;
  RatanStudio: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AstroRatan'>;

// Import design tokens
import { designTokens } from '../components/DesignSystem/designTokens';
import { corpAstroDarkTheme } from '../components/DesignSystem/DarkTheme';

// Import premium components
import { HamburgerMenu, useHamburgerMenu } from '../components/Home/HamburgerMenu';
import CorporateProfessionalHeaderWrapper from '../components/professional/CorporateProfessionalHeader';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface StarProps {
  style: any;
}

// ============================================================================
// ANIMATED STAR FIELD COMPONENT
// ============================================================================

const AnimatedStar: React.FC<StarProps> = ({ style }) => {
  const opacity = useRef(new Animated.Value(Math.random())).current;
  const scale = useRef(new Animated.Value(0.5 + Math.random() * 0.5)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.3 + Math.random() * 0.7,
            duration: 2000 + Math.random() * 3000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.1 + Math.random() * 0.3,
            duration: 2000 + Math.random() * 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animate();
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
    />
  );
};

const StarField: React.FC = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * SCREEN_WIDTH,
    top: Math.random() * SCREEN_HEIGHT,
    size: 1 + Math.random() * 2,
  }));

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {stars.map((star) => (
        <AnimatedStar
          key={star.id}
          style={{
            position: 'absolute',
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            backgroundColor: corpAstroDarkTheme.colors.luxury.shimmer,
            borderRadius: star.size / 2,
          }}
        />
      ))}
    </View>
  );
};

// ============================================================================
// TYPING INDICATOR COMPONENT
// ============================================================================

const TypingIndicator: React.FC = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot1, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(dot2, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(dot3, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(dot1, { toValue: 0, duration: 400, useNativeDriver: true }),
          Animated.timing(dot2, { toValue: 0, duration: 400, useNativeDriver: true }),
          Animated.timing(dot3, { toValue: 0, duration: 400, useNativeDriver: true }),
        ])
      ).start();
    };

    animate();
  }, []);

  return (
    <View style={styles.typingContainer}>
      <View style={styles.typingBubble}>
        <View style={styles.typingDots}>
          <Animated.View style={[styles.typingDot, { opacity: dot1 }]} />
          <Animated.View style={[styles.typingDot, { opacity: dot2 }]} />
          <Animated.View style={[styles.typingDot, { opacity: dot3 }]} />
        </View>
      </View>
    </View>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function AstroRatanScreen() {
  const navigation = useNavigation<NavigationProp>();
  
  // Hamburger menu hook
  const hamburgerMenu = useHamburgerMenu({
    onNavigate: (route: string) => {
      navigation.navigate(route as keyof RootStackParamList);
    },
  });
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "🌟 Namaste! I'm Astro Ratan, your cosmic guide through the mysteries of Vedic astrology. How may I illuminate your celestial path today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  
  // Set navigation options
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Animation on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const quickSuggestions = [
    { text: "Daily horoscope", icon: "🔮", category: "Today" },
    { text: "Birth chart analysis", icon: "🌙", category: "Personal" },
    { text: "Planetary positions", icon: "💫", category: "Current" },
    { text: "Love compatibility", icon: "💝", category: "Relationship" },
    { text: "Lucky numbers", icon: "✨", category: "Fortune" },
    { text: "Career guidance", icon: "🌟", category: "Professional" },
  ];

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "🌟 The stars whisper of great fortune ahead. Your celestial alignment suggests a period of transformation and growth.",
        "🔮 I sense powerful cosmic energies surrounding you. The planets are aligning to bring clarity to your path.",
        "✨ The ancient wisdom of the Vedas reveals insights about your spiritual journey. Let me share what the cosmos has shown me.",
        "🌙 Your birth chart holds fascinating secrets. The positioning of Mars and Venus suggests interesting developments in your relationships.",
        "💫 The lunar cycles are particularly favorable for you this month. I see opportunities for both personal and professional growth.",
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000 + Math.random() * 2000);

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sendQuickMessage = (suggestion: string) => {
    setInputText(suggestion);
    setTimeout(sendMessage, 100);
  };

  const renderMessage = (message: Message) => {
    const isUser = message.isUser;
    
    return (
      <View 
        key={message.id} 
        style={[
          styles.messageContainer, 
          isUser ? styles.userMessageContainer : styles.aiMessageContainer
        ]}
      >
        {!isUser && (
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={[corpAstroDarkTheme.colors.mystical.royal, corpAstroDarkTheme.colors.luxury.pure]}
              style={styles.avatar}
            >
              <MaterialIcons name="auto-awesome" size={18} color={corpAstroDarkTheme.colors.cosmos.dark} />
            </LinearGradient>
            <View style={[styles.onlineIndicator, { backgroundColor: '#00FF88' }]} />
          </View>
        )}
        
        <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
          {!isUser && (
            <>
              <LinearGradient
                colors={[
                  'rgba(138, 43, 226, 0.08)',
                  'rgba(75, 0, 130, 0.08)',
                  'rgba(25, 25, 112, 0.05)',
                ]}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              {/* Subtle animated border for AI messages */}
              <View style={styles.aiMessageBorder} />
            </>
          )}
          
          <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.aiMessageText]}>
            {message.text}
          </Text>
          
          <View style={styles.messageFooter}>
            <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.aiTimestamp]}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            {isUser && (
              <View style={styles.messageStatus}>
                <Ionicons name="checkmark-done" size={14} color="rgba(255, 255, 255, 0.6)" />
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <CorporateHeader variant="centered" title="ASTRO RATAN" />
      <SafeAreaView style={styles.container}>
        {/* Animated Star Field Background */}
        <StarField />
      
      {/* Cosmic Background Gradient */}
      <LinearGradient
        colors={[
          corpAstroDarkTheme.colors.cosmos.void,
          corpAstroDarkTheme.colors.cosmos.deep,
          corpAstroDarkTheme.colors.cosmos.dark,
        ]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    

      {/* Chat Messages */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onScroll={(event) => {
            const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
            const isNearBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 100;
            setShowScrollToBottom(!isNearBottom);
          }}
          scrollEventThrottle={16}
        >
          {messages.map(renderMessage)}
          {isTyping && <TypingIndicator />}
        </ScrollView>

        {/* Scroll to Bottom Button */}
        {showScrollToBottom && (
          <TouchableOpacity
            style={styles.scrollToBottomButton}
            onPress={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            <LinearGradient
              colors={[corpAstroDarkTheme.colors.mystical.royal, corpAstroDarkTheme.colors.luxury.pure]}
              style={styles.scrollToBottomGradient}
            >
              <Ionicons name="chevron-down" size={20} color={corpAstroDarkTheme.colors.cosmos.dark} />
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Quick Suggestions */}
        {messages.length === 1 && (
          <View style={styles.suggestionsWrapper}>
            <Text style={styles.suggestionsTitle}>✨ Quick cosmic insights</Text>
            <ScrollView
              horizontal
              style={styles.suggestionsContainer}
              contentContainerStyle={styles.suggestionsContent}
              showsHorizontalScrollIndicator={false}
              snapToInterval={200}
              decelerationRate="fast"
            >
              {quickSuggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionPill}
                  onPress={() => sendQuickMessage(`${suggestion.icon} ${suggestion.text}`)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[
                      'rgba(138, 43, 226, 0.15)',
                      'rgba(75, 0, 130, 0.08)',
                    ]}
                    style={styles.suggestionGradient}
                  />
                  <View style={styles.suggestionContent}>
                    <Text style={styles.suggestionIcon}>{suggestion.icon}</Text>
                    <View style={styles.suggestionTextContainer}>
                      <Text style={styles.suggestionText}>{suggestion.text}</Text>
                      <Text style={styles.suggestionCategory}>{suggestion.category}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0.03)',
              'rgba(255, 255, 255, 0.01)',
            ]}
            style={styles.inputGradient}
          />
          
          <View style={[styles.inputWrapper, inputText.length > 0 && styles.inputWrapperFocused]}>
            <View style={styles.inputLeftSection}>
              <TouchableOpacity style={styles.attachButton}>
                <Ionicons name="add" size={20} color={designTokens.colors.text.secondary} />
              </TouchableOpacity>
              
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Ask about your cosmic destiny..."
                placeholderTextColor={designTokens.colors.text.tertiary}
                multiline
                maxLength={500}
                returnKeyType="send"
                onSubmitEditing={sendMessage}
              />
            </View>
            
            <View style={styles.inputRightSection}>
              {inputText.length > 0 && (
                <Text style={styles.characterCount}>{inputText.length}/500</Text>
              )}
              
              <TouchableOpacity
                style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                onPress={sendMessage}
                disabled={!inputText.trim()}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={
                    inputText.trim()
                      ? [corpAstroDarkTheme.colors.mystical.royal, corpAstroDarkTheme.colors.luxury.pure]
                      : ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']
                  }
                  style={styles.sendButtonGradient}
                >
                  <Ionicons 
                    name="arrow-up" 
                    size={18} 
                    color={inputText.trim() ? corpAstroDarkTheme.colors.cosmos.dark : designTokens.colors.text.tertiary} 
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

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
    </View>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corpAstroDarkTheme.colors.cosmos.void,
  },

  // Header Styles
  header: {
    paddingTop: designTokens.spacing.sm,
    paddingBottom: designTokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: designTokens.colors.border.subtle,
  },
  headerGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: designTokens.spacing.md,
  },
  hamburgerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: designTokens.spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerAvatarContainer: {
    position: 'relative',
    marginRight: designTokens.spacing.sm,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    ...designTokens.shadows.default,
  },
  headerOnlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00FF88',
    borderWidth: 2,
    borderColor: corpAstroDarkTheme.colors.cosmos.dark,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    ...designTokens.typography.bodyLarge,
    color: designTokens.colors.text.primary,
    fontWeight: '600',
  },
  headerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00FF88',
    marginRight: 6,
  },
  headerSubtitle: {
    ...designTokens.typography.caption,
    color: designTokens.colors.text.secondary,
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: designTokens.colors.surface.secondary,
  },

  // Chat Container
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: designTokens.spacing.md,
  },

  // Message Styles
  messageContainer: {
    marginBottom: designTokens.spacing.md,
    paddingHorizontal: designTokens.spacing.md,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  aiMessageContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: designTokens.spacing.sm,
    marginTop: designTokens.spacing.xs,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    ...designTokens.shadows.subtle,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: corpAstroDarkTheme.colors.cosmos.dark,
  },
  messageBubble: {
    maxWidth: '78%',
    paddingHorizontal: designTokens.spacing.md,
    paddingVertical: designTokens.spacing.sm,
    borderRadius: 18,
    position: 'relative',
    overflow: 'hidden',
    ...designTokens.shadows.subtle,
  },
  userBubble: {
    backgroundColor: corpAstroDarkTheme.colors.brand.primary,
    borderBottomRightRadius: 6,
  },
  aiBubble: {
    backgroundColor: designTokens.colors.surface.secondary,
    borderWidth: 1,
    borderColor: designTokens.colors.border.subtle,
    borderBottomLeftRadius: 6,
  },
  aiMessageBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(138, 43, 226, 0.3)',
  },
  messageText: {
    ...designTokens.typography.body,
    lineHeight: 20,
    marginBottom: designTokens.spacing.xs,
  },
  userMessageText: {
    color: designTokens.colors.text.primary,
  },
  aiMessageText: {
    color: designTokens.colors.text.primary,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timestamp: {
    ...designTokens.typography.caption,
    fontSize: 11,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  aiTimestamp: {
    color: designTokens.colors.text.tertiary,
  },
  messageStatus: {
    marginLeft: designTokens.spacing.xs,
  },

  // Typing Indicator
  typingContainer: {
    paddingHorizontal: designTokens.spacing.md,
    marginBottom: designTokens.spacing.md,
    flexDirection: 'row',
  },
  typingBubble: {
    backgroundColor: designTokens.colors.surface.secondary,
    borderRadius: designTokens.radius.lg,
    borderBottomLeftRadius: 8,
    paddingHorizontal: designTokens.spacing.md,
    paddingVertical: designTokens.spacing.sm,
    borderWidth: 1,
    borderColor: designTokens.colors.border.subtle,
    marginLeft: 44, // Avatar width + margin
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: designTokens.colors.text.secondary,
    marginHorizontal: 2,
  },

  // Quick Suggestions
  suggestionsWrapper: {
    paddingVertical: designTokens.spacing.md,
    paddingHorizontal: designTokens.spacing.md,
  },
  suggestionsTitle: {
    ...designTokens.typography.body,
    color: designTokens.colors.text.secondary,
    fontWeight: '500',
    marginBottom: designTokens.spacing.sm,
    textAlign: 'center',
  },
  suggestionsContainer: {
    paddingVertical: designTokens.spacing.xs,
  },
  suggestionsContent: {
    paddingHorizontal: designTokens.spacing.xs,
    gap: designTokens.spacing.sm,
  },
  suggestionPill: {
    width: 180,
    paddingHorizontal: designTokens.spacing.md,
    paddingVertical: designTokens.spacing.sm,
    borderRadius: designTokens.radius.lg,
    borderWidth: 1,
    borderColor: designTokens.colors.border.default,
    overflow: 'hidden',
    position: 'relative',
    ...designTokens.shadows.subtle,
  },
  suggestionGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  suggestionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionIcon: {
    fontSize: 16,
    marginRight: designTokens.spacing.sm,
  },
  suggestionTextContainer: {
    flex: 1,
  },
  suggestionText: {
    ...designTokens.typography.body,
    color: designTokens.colors.text.primary,
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 16,
  },
  suggestionCategory: {
    ...designTokens.typography.caption,
    color: designTokens.colors.text.tertiary,
    fontSize: 10,
    marginTop: 1,
  },

  // Input Area
  inputContainer: {
    paddingHorizontal: designTokens.spacing.md,
    paddingVertical: designTokens.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: designTokens.colors.border.subtle,
    position: 'relative',
    overflow: 'hidden',
  },
  inputGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: designTokens.colors.surface.primary,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: designTokens.colors.border.default,
    paddingHorizontal: designTokens.spacing.sm,
    paddingVertical: designTokens.spacing.xs,
    minHeight: 48,
    ...designTokens.shadows.subtle,
  },
  inputWrapperFocused: {
    borderColor: 'rgba(138, 43, 226, 0.4)',
    backgroundColor: designTokens.colors.surface.secondary,
  },
  inputLeftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  attachButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: designTokens.colors.surface.tertiary,
    marginRight: designTokens.spacing.sm,
  },
  textInput: {
    flex: 1,
    ...designTokens.typography.body,
    color: designTokens.colors.text.primary,
    maxHeight: 100,
    paddingVertical: designTokens.spacing.xs,
  },
  inputRightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 32,
  },
  characterCount: {
    ...designTokens.typography.caption,
    color: designTokens.colors.text.tertiary,
    fontSize: 10,
    marginBottom: 2,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    ...designTokens.shadows.subtle,
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Scroll to Bottom Button
  scrollToBottomButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    ...designTokens.shadows.emphasis,
  },
  scrollToBottomGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
