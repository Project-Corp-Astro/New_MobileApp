/**
 * Corp Astro - Business Intelligence Hub
 * 
 * Simple, clean DOs and DON'Ts for business guidance.
 */

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Home: undefined;
  Services: undefined;
  AstroRatan: undefined;
  MyBusiness: undefined;
  RatanStudio: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MyBusiness'>;

const { width } = Dimensions.get('window');

export default function BusinessIntelligenceScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState('today');

  // Set navigation options
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  
  // Simple DOs and DON'Ts data
  const businessGuidance = {
    today: {
      dos: [
        "Engage in lively conversations",
        "Explore new hobbies", 
        "Connect with loved ones",
        "Focus on creative projects",
        "Make important phone calls",
        "Schedule team meetings"
      ],
      donts: [
        "Rush financial decisions",
        "Avoid deep conversations", 
        "Overcommit socially",
        "Start new partnerships",
        "Sign major contracts",
        "Make impulsive purchases"
      ]
    },
    week: {
      dos: [
        "Plan strategic initiatives",
        "Network with industry leaders",
        "Invest in skill development", 
        "Strengthen existing partnerships",
        "Focus on team building",
        "Review financial portfolios"
      ],
      donts: [
        "Avoid major restructuring",
        "Delay important decisions",
        "Neglect due diligence",
        "Overlook market research", 
        "Rush expansion plans",
        "Ignore team feedback"
      ]
    },
    month: {
      dos: [
        "Launch new business ventures",
        "Expand into new markets",
        "Strengthen brand presence",
        "Build strategic alliances",
        "Invest in technology",
        "Develop long-term vision"
      ],
      donts: [
        "Avoid hostile takeovers",
        "Don't ignore compliance",
        "Avoid overextending resources",
        "Don't neglect cash flow",
        "Avoid rushed hiring",
        "Don't compromise on quality"
      ]
    }
  };

  const getCurrentGuidance = () => {
    return businessGuidance[activeTab as keyof typeof businessGuidance];
  };

  const renderTabButton = (tabId: string, label: string, isActive: boolean) => (
    <TouchableOpacity
      onPress={() => setActiveTab(tabId)}
      style={[
        {
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 25,
          marginRight: 12,
        },
        isActive 
          ? { backgroundColor: '#2E86DE', shadowColor: '#2E86DE', shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } }
          : { backgroundColor: '#1a1a2e', borderWidth: 1, borderColor: '#333' }
      ]}
    >
      <Text style={[
        { fontSize: 14, fontWeight: '600' },
        isActive ? { color: '#fff' } : { color: '#64748b' }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderDoItem = (item: string, index: number) => (
    <View key={index} style={{
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 8,
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      borderRadius: 12,
      borderLeftWidth: 4,
      borderLeftColor: '#22c55e'
    }}>
      <View style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#22c55e',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12
      }}>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>✓</Text>
      </View>
      <Text style={{ 
        fontSize: 16, 
        color: '#fff',
        flex: 1,
        lineHeight: 24
      }}>
        {item}
      </Text>
    </View>
  );

  const renderDontItem = (item: string, index: number) => (
    <View key={index} style={{
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 8,
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderRadius: 12,
      borderLeftWidth: 4,
      borderLeftColor: '#ef4444'
    }}>
      <View style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#ef4444',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12
      }}>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>✕</Text>
      </View>
      <Text style={{ 
        fontSize: 16, 
        color: '#fff',
        flex: 1,
        lineHeight: 24
      }}>
        {item}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#08080F' }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ padding: 20, paddingTop: 40 }}>
          <Text style={{ 
            fontSize: 28, 
            fontWeight: '800', 
            color: '#fff',
            marginBottom: 6
          }}>
            Business Intelligence
          </Text>
          <Text style={{ 
            fontSize: 16, 
            color: '#64748b',
            marginBottom: 24
          }}>
            Smart guidance for business success
          </Text>

          {/* Tab Navigation */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
          >
            {renderTabButton('today', '☀️ Today', activeTab === 'today')}
            {renderTabButton('week', '📅 This Week', activeTab === 'week')}
            {renderTabButton('month', '🌙 This Month', activeTab === 'month')}
          </ScrollView>
        </View>

        {/* DOs and DONTs Content */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 100 }}>
          {/* DOs Section */}
          <View style={{ marginBottom: 40 }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              paddingHorizontal: 16
            }}>
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: '#22c55e',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16
              }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>✓</Text>
              </View>
              <Text style={{ 
                fontSize: 24, 
                fontWeight: '800', 
                color: '#fff'
              }}>
                Yes for {activeTab}
              </Text>
            </View>
            
            <View>
              {getCurrentGuidance().dos.map(renderDoItem)}
            </View>
          </View>

          {/* DONTs Section */}
          <View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              paddingHorizontal: 16
            }}>
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: '#ef4444',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16
              }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>✕</Text>
              </View>
              <Text style={{ 
                fontSize: 24, 
                fontWeight: '800', 
                color: '#fff'
              }}>
                No for {activeTab}
              </Text>
            </View>
            
            <View>
              {getCurrentGuidance().donts.map(renderDontItem)}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
