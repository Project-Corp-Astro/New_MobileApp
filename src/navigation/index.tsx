import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import TabLayout from '../tabs/_layout';

import ProfileScreen from '../screens/Menu/ProfileScreen';
import BusinessScreen from '../screens/Menu/BusinessScreen';
import SettingsScreen from '../screens/Menu/SettingsScreen';
import NotificationScreen from '../screens/Menu/NotificationScreen';  
import ReportsScreen from '../screens/Menu/ReportsScreen';
import RateAppScreen from '../screens/Menu/RateAppScreen';
import ReferUsScreen from '../screens/Menu/ReferUsScreen';
import CalendarScreen from '../screens/Menu/CalendarScreen';
import SubscriptionScreen from '../screens/Menu/subscription';
import HelpSupportScreen from '../screens/Menu/HelpSupportScreen';
import ChartDetailScreen from '../screens/Charts/ChartDetailScreen';
import AllColorsScreen from '../screens/Menu/AllColorsScreen';



const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TabLayout"
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors[colorScheme ?? 'light'].background,
            },
            headerTintColor: Colors[colorScheme ?? 'light'].text,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
    
          <Stack.Screen
            name="TabLayout"
            component={TabLayout}
            options={{ headerShown: false }}
          />

          <Stack.Screen 
            name="HelpSupportScreen" 
            component={HelpSupportScreen} options={{ headerShown: false }}
          />
          
          <Stack.Screen 
            name="ProfileScreen" 
            component={ProfileScreen} options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="SettingsScreen" 
            component={SettingsScreen} options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ReportsScreen" 
            component={ReportsScreen} options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="RateAppScreen" 
            component={RateAppScreen} options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ReferUsScreen" 
            component={ReferUsScreen} options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="CalendarScreen" 
            component={CalendarScreen} options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="SubscriptionScreen" 
            component={SubscriptionScreen} options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ChartDetailScreen" 
            component={ChartDetailScreen} options={{ headerShown: false }}
          />  
          <Stack.Screen 
            name="NotificationScreen" 
            component={NotificationScreen} options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="BusinessScreen" 
            component={BusinessScreen} options={{ headerShown: false }}
          />
          <Stack.Screen
          name="AllColorsScreen"
          component={AllColorsScreen}
          />

        </Stack.Navigator>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </NavigationContainer>
    </QueryClientProvider>
  );
} 