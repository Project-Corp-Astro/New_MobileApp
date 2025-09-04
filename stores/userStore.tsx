import { create } from 'zustand';

interface UserState {
  phone: string;
  setPhone: (phone: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
  sendOtp: (phone: string) => Promise<{ success: boolean; orderId?: string }>;
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
  // Add OTP and other user-related state/actions here
}

export const useUserStore = create<UserState>((set) => ({
  phone: '',
  setPhone: (phone) => set({ phone }),
  otp: '',
  setOtp: (otp) => set({ otp }),
  error: null,
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  sendOtp: async (phone) => {
    // Mock implementation: replace with real API call
    set({ error: null });
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (phone.startsWith('+91')) {
        // Simulate success
        return { success: true, orderId: 'mock-order-id' };
      } else {
        set({ error: 'Invalid phone number' });
        return { success: false };
      }
    } catch (e) {
      set({ error: 'Failed to send OTP' });
      return { success: false };
    }
  },
  // Add OTP and other actions here
}));
