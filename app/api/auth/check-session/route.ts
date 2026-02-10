import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')

    if (session && session.value) {
      return NextResponse.json({
        success: true,
        authenticated: true
      })
    }

    return NextResponse.json({
      success: true,
      authenticated: false
    })
  } catch (error: any) {
    console.error('Error checking session:', error)
    return NextResponse.json(
      { success: false, authenticated: false, error: error.message },
      { status: 500 }
    )
  }
}








