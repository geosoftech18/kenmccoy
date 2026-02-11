import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')

    return NextResponse.json({
      success: true,
      message: 'Logout successful'
    })
  } catch (error: any) {
    console.error('Error during logout:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Logout failed' },
      { status: 500 }
    )
  }
}










