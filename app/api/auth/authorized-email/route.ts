import { NextRequest, NextResponse } from 'next/server'

// Get authorized admin emails - support multiple emails (comma-separated)
// Default to info@kenmccoy.in for production
function getAuthorizedEmails(): string[] {
  const envEmails = process.env.ADMIN_EMAIL || process.env.ADMIN_EMAILS || 'info@kenmccoy.in'
  return envEmails.split(',').map(email => email.trim().toLowerCase()).filter(Boolean)
}

export async function GET(request: NextRequest) {
  try {
    const authorizedEmails = getAuthorizedEmails()
    
    // Return the first email as the primary email for the login form
    // This is safe to expose as it's just the email address, not sensitive data
    return NextResponse.json({
      success: true,
      email: authorizedEmails[0] || 'info@kenmccoy.in',
      // Optionally return all emails if needed for UI
      allEmails: authorizedEmails
    })
  } catch (error: any) {
    console.error('Error getting authorized email:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to get authorized email',
        email: 'info@kenmccoy.in' // Fallback
      },
      { status: 500 }
    )
  }
}

