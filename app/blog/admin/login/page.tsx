'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Mail, 
  Lock, 
  ArrowLeft,
  Loader2,
  Shield
} from 'lucide-react'
import Link from 'next/link'

// For client-side components, use NEXT_PUBLIC_ prefix
const ADMIN_EMAIL = process.env.ADMIN_EMAIL

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [displayOtp, setDisplayOtp] = useState('')

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (result.success) {
        setStep('otp')
        // In development, show OTP directly in UI
        if (result.otp) {
          console.log('🔐 Development OTP:', result.otp)
          setDisplayOtp(result.otp)
          setMessage(`✅ Email sent successfully!\n\n📧 Check your inbox AND spam/junk folder.\n\n🔐 Your OTP code is displayed below (development mode):`)
        } else {
          setMessage(`✅ ${result.message}\n\n📧 Please check your inbox AND spam/junk folder.\n⏱️ It may take 1-2 minutes to arrive.`)
        }
      } else {
        const errorMsg = result.error || 'Failed to send verification code'
        const details = result.details ? `\n${result.details}` : ''
        const hint = result.hint ? `\n\n💡 ${result.hint}` : ''
        setError(`${errorMsg}${details}${hint}`)
      }
    } catch (error: any) {
      setError('Failed to send verification code. Please try again.')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    if (otp.length !== 4) {
      setError('Please enter a 4-digit code')
      setLoading(false)
      return
    }

    try {
      console.log('🔐 Sending verify request:', { email, otp })
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      })

      console.log('🔐 Response status:', response.status)

      let result
      try {
        result = await response.json()
        console.log('🔐 Response data:', result)
      } catch (e) {
        console.error('❌ Error parsing response:', e)
        const text = await response.text()
        console.error('❌ Response text:', text)
        setError('Failed to verify code. Please try again.')
        setLoading(false)
        return
      }

      if (result.success) {
        setMessage('Login successful! Redirecting...')
        // Wait a bit longer to ensure cookie is set, then redirect
        setTimeout(() => {
          // Force a hard navigation to ensure cookies are sent
          window.location.href = '/blog/admin'
        }, 1500)
      } else {
        setError(result.error || 'Invalid verification code')
        setOtp('')
      }
    } catch (error: any) {
      console.error('❌ Network error:', error)
      setError('Failed to verify code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="bg-card backdrop-blur-sm border-border shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-accent-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl text-card-foreground">
              Admin Login
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              {step === 'email' 
                ? 'Enter your admin email to receive a verification code'
                : 'Enter the 4-digit code sent to your email'
              }
            </p>
          </CardHeader>

          <CardContent>
            {step === 'email' ? (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Admin Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                   
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                    
                    className="bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/20 rounded-xl h-12"
                  />
                  <p className="text-muted-foreground text-xs">
                    Only authorized email addresses can access the admin panel
                  </p>
                </div>

                {error && (
                  <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-300 px-4 py-3 rounded-xl text-sm whitespace-pre-line">
                    {message}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending Code...
                    </div>
                  ) : (
                    'Send Verification Code'
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Verification Code
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                      setOtp(value)
                    }}
                    placeholder="0000"
                    maxLength={4}
                    required
                    className="bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/20 rounded-xl h-12 text-center text-2xl tracking-widest font-mono"
                  />
                  <p className="text-muted-foreground text-xs text-center">
                    {displayOtp 
                      ? 'Enter the code above or from your email' 
                      : 'Check your email (and spam folder) for the 4-digit code'
                    }
                  </p>
                </div>

                {error && (
                  <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-300 px-4 py-3 rounded-xl text-sm whitespace-pre-line">
                    {message}
                  </div>
                )}
{/* 
                {displayOtp && (
                  <div className="bg-purple-500/20 border-2 border-purple-400/50 rounded-xl p-6 text-center">
                    <p className="text-white/70 text-sm mb-2">Development Mode OTP:</p>
                    <div className="text-4xl font-bold text-purple-300 tracking-widest font-mono">
                      {displayOtp}
                    </div>
                    <p className="text-white/50 text-xs mt-2">Use this code to login</p>
                  </div>
                )} */}

                <div className="space-y-3">
                  <Button
                    type="submit"
                    disabled={loading || otp.length !== 4}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Verifying...
                      </div>
                    ) : (
                      'Verify & Login'
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setStep('email')
                      setOtp('')
                      setError('')
                      setMessage('')
                      setDisplayOtp('')
                    }}
                    className="w-full text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl"
                  >
                    Back to Email
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-border">
              <Link href="/blog">
                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

