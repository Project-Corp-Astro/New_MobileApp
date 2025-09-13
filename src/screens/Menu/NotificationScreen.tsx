/**
 * Corp Astro - Notification Screen
 * 
 * Dedicated screen for displaying user notifications.
 * Shows a list of notifications with different types and statuses.
 * 
 * @module NotificationScreen
 * @version 1.0.0
 * @since 2025
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

// Types
type RootStackParamList = {
  Notification: undefined;
  // Add other screens as needed
};

type NotificationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Notification'>;

// Design System
import { designTokens } from '../../components/DesignSystem/designTokens';
const { spacing, colors, typography } = designTokens;

// Components
import { BaseScreen } from '../../components/menusection/BaseScreen';
import CorporateHeader from '../../components/professional/CorporateProfessionalHeader';

// Types
interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

// Mock data
const notifications: NotificationItem[] = [
  {
    id: '1',
    title: 'New Update Available',
    message: 'A new version of the app is available. Update now to get the latest features.',
    time: '2 minutes ago',
    isRead: false,
    type: 'info'
  },
  {
    id: '2',
    title: 'Payment Successful',
    message: 'Your subscription payment of $9.99 has been processed successfully.',
    time: '1 hour ago',
    isRead: true,
    type: 'success'
  },
  {
    id: '3',
    title: 'Scheduled Maintenance',
    message: 'We will be performing scheduled maintenance on our servers tomorrow at 2 AM UTC.',
    time: '5 hours ago',
    isRead: true,
    type: 'warning'
  },
  {
    id: '4',
    title: 'Login Alert',
    message: 'A new device logged into your account. If this was not you, please secure your account.',
    time: '1 day ago',
    isRead: false,
    type: 'error'
  },
];

/**
 * Notification Screen Component
 * 
 * Displays a list of notifications with different types and statuses.
 * Allows users to mark notifications as read and interact with them.
 */
const NotificationScreen = () => {
  const navigation = useNavigation<NotificationScreenNavigationProp>();
  const [notificationList, setNotificationList] = useState<NotificationItem[]>(notifications);

  const handleBack = () => {
    navigation.goBack();
  };

  const markAsRead = (id: string) => {
    setNotificationList(prevList =>
      prevList.map(notification =>
        notification.id === id 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prevList =>
      prevList.map(notification => ({
        ...notification,
        isRead: true
      }))
    );
  };

  const getNotificationIcon = (type: 'info' | 'success' | 'warning' | 'error') => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'info':
      default:
        return 'info';
    }
  };

  const getNotificationColor = (type: 'info' | 'success' | 'warning' | 'error') => {
    switch (type) {
      case 'success':
        return '#4CAF50'; // Green
      case 'warning':
        return '#FFC107'; // Amber
      case 'error':
        return '#F44336'; // Red
      case 'info':
      default:
        return '#2196F3'; // Blue
    }
  };

  const renderNotificationItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem,
        !item.isRead && styles.unreadNotification,
        { borderLeftColor: getNotificationColor(item.type) }
      ]}
      onPress={() => markAsRead(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <MaterialIcons 
            name={getNotificationIcon(item.type)} 
            size={20} 
            color={getNotificationColor(item.type)} 
            style={styles.notificationIcon}
          />
          <Text style={styles.notificationTitle}>{item.title}</Text>
          {!item.isRead && <View style={styles.unreadBadge} />}
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  // Set header options
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <BaseScreen>
      <SafeAreaView style={styles.safeArea}>
   <CorporateHeader variant="centered" title="Notifications" showBackButton />

        
        <FlatList
          data={notificationList}
          renderItem={renderNotificationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons 
                name="notifications-off" 
                size={48} 
                color="rgba(255, 255, 255, 0.5)" 
              />
              <Text style={styles.emptyText}>No notifications yet</Text>
              <Text style={styles.emptySubtext}>
                We'll notify you when something new comes up
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  listContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  notificationItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadNotification: {
    backgroundColor: 'rgba(66, 133, 244, 0.05)',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  notificationIcon: {
    marginRight: spacing.sm,
  },
  notificationTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  notificationMessage: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.xs,
    fontSize: 14,
    lineHeight: 20,
  },
  notificationTime: {
    color: 'rgba(255, 255, 255, 0.6)',
    alignSelf: 'flex-end',
    fontSize: 12,
    lineHeight: 16,
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3', // Blue
    marginLeft: spacing.xs,
  },
  markAllText: {
    color: '#2196F3', // Blue
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    marginTop: spacing.xxl,
  },
  emptyText: {
    color: '#FFFFFF',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    fontSize: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default NotificationScreen;
