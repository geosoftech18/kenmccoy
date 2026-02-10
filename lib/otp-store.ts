// Shared OTP store for authentication
// In production, replace this with Redis or a database

interface OTPData {
  otp: string
  expiresAt: number
}

const otpStore = new Map<string, OTPData>()

// Clean up expired OTPs every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [email, data] of otpStore.entries()) {
    if (data.expiresAt < now) {
      otpStore.delete(email)
    }
  }
}, 10 * 60 * 1000)

export function setOTP(email: string, otp: string, expiresInMinutes: number = 10) {
  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + expiresInMinutes * 60 * 1000
  })
}

export function getOTP(email: string): OTPData | undefined {
  const data = otpStore.get(email)
  if (data && Date.now() > data.expiresAt) {
    otpStore.delete(email)
    return undefined
  }
  return data
}

export function deleteOTP(email: string) {
  otpStore.delete(email)
}








