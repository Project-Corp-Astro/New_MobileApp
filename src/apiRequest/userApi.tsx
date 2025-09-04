import { url } from './config';

export async function sendOtpApi(phoneNumber: string) {
  const response = await fetch(`${url}/usermanagement/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mobileNumber: `+91${phoneNumber}`,
      action: 'sendOtp'
    }),
  });
  if (!response.ok) throw new Error('Failed to send OTP');
  return response.json();
}
