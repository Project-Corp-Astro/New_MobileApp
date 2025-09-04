import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { sendOtpApi } from '../apiRequest/userApi';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  const mutation = useMutation({
    mutationFn: sendOtpApi,
    onSuccess: (data) => {
      // Navigate to OTP screen, pass orderId or whatever your API returns
      (navigation as any).navigate('OtpScreen', { phoneNumber: phone, orderId: data.orderId });
    },
    onError: (error: any) => {
      Alert.alert('Error', error.message || 'Failed to send OTP');
    },
  });

  const handleSendOtp = () => {
    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    mutation.mutate(phone.trim());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Phone</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        style={styles.input}
      />
      <Pressable
        onPress={handleSendOtp}
        disabled={mutation.isPending}
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed || mutation.isPending ? 0.8 : 1 },
        ]}
      >
        <Text style={styles.buttonText}>
          {mutation.isPending ? 'Sending OTP...' : 'Send OTP'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { backgroundColor: '#F3F4F6', borderRadius: 12, padding: 16, fontSize: 16, marginBottom: 24, borderWidth: 1, borderColor: '#E5E7EB' },
  button: { backgroundColor: '#7B61FF', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
}); 