import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { setOTP } from '@/lib/otp-store'

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
    const { email } = body

    // Validate email
    if (!email || !AUTHORIZED_EMAILS.includes(email.toLowerCase())) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unauthorized email address',
          hint: 'Only authorized admin emails can access the admin panel'
        },
        { status: 403 }
      )
    }

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString()

    // Store OTP (expires in 10 minutes)
    setOTP(email, otp, 10)

    // Send OTP via email if Gmail is configured
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
          },
          tls: {
            // Handle self-signed certificates in development
            rejectUnauthorized: process.env.NODE_ENV === 'production'
          },
          // Additional options for better compatibility
          requireTLS: true
        })

        await transporter.sendMail({
          from: `"Ken McCoy Admin" <${process.env.GMAIL_USER}>`,
          to: email,
          subject: 'Admin Login Verification Code',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #2563eb;">Admin Login Verification</h2>
              <p>Your verification code is:</p>
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <h1 style="font-size: 32px; letter-spacing: 8px; color: #1e40af; margin: 0;">${otp}</h1>
              </div>
              <p style="color: #6b7280; font-size: 14px;">This code will expire in 10 minutes.</p>
              <p style="color: #6b7280; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
            </div>
          `,
          text: `Your admin login verification code is: ${otp}\n\nThis code will expire in 10 minutes.`
        })
      } catch (emailError: any) {
        console.error('Error sending email:', emailError)
        // Continue even if email fails - return OTP in development
      }
    }

    // In development, return OTP for testing
    const isDevelopment = process.env.NODE_ENV !== 'production'

    return NextResponse.json({
      success: true,
      message: 'Verification code sent to your email',
      ...(isDevelopment && { otp }) // Only include OTP in development
    })
  } catch (error: any) {
    console.error('Error sending OTP:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send verification code',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

