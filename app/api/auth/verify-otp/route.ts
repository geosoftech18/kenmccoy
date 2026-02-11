import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getOTP, deleteOTP } from '@/lib/otp-store'

// Get authorized admin emails - support multiple emails (comma-separated)
// Default to info@kenmccoy.in for production
function getAuthorizedEmails(): string[] {
  const envEmails = process.env.ADMIN_EMAIL || process.env.ADMIN_EMAILS || 'info@kenmccoy.in'
  return envEmails.split(',').map(email => email.trim().toLowerCase()).filter(Boolean)
}

const AUTHORIZED_EMAILS = getAuthorizedEmails()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, otp } = body

    // Validate inputs
    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: 'Email and OTP are required' },
        { status: 400 }
      )
    }

    // Validate email
    if (!AUTHORIZED_EMAILS.includes(email.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized email address' },
        { status: 403 }
      )
    }

    // Get stored OTP
    const storedData = getOTP(email)

    if (!storedData) {
      return NextResponse.json(
        { success: false, error: 'No verification code found. Please request a new code.' },
        { status: 404 }
      )
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return NextResponse.json(
        { success: false, error: 'Invalid verification code' },
        { status: 401 }
      )
    }

    // OTP is valid - create session
    const sessionToken = Buffer.from(`${email}:${Date.now()}`).toString('base64')
    
    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    // Remove used OTP
    deleteOTP(email)

    return NextResponse.json({
      success: true,
      message: 'Login successful'
    })
  } catch (error: any) {
    console.error('Error verifying OTP:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to verify code' },
      { status: 500 }
    )
  }
}

