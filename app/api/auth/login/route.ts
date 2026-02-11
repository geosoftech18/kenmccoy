import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Simple authentication - in production, use proper authentication
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create session token (simple implementation)
      const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString('base64')
      
      // Set cookie
      const cookieStore = await cookies()
      cookieStore.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })

      return NextResponse.json({
        success: true,
        message: 'Login successful'
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error: any) {
    console.error('Error during login:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Login failed' },
      { status: 500 }
    )
  }
}










