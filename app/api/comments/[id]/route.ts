import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Comment from '@/models/Comment'

// PUT - Update comment status (approve/reject)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params
    const body = await request.json()
    const { status } = body

    // Validate status
    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status. Must be pending, approved, or rejected' },
        { status: 400 }
      )
    }

    // Find and update comment
    const comment = await Comment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )

    if (!comment) {
      return NextResponse.json(
        { success: false, error: 'Comment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Comment ${status} successfully`,
      data: comment,
    })
  } catch (error: any) {
    console.error('Error updating comment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update comment', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE - Delete a comment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params

    const comment = await Comment.findByIdAndDelete(id)

    if (!comment) {
      return NextResponse.json(
        { success: false, error: 'Comment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Comment deleted successfully',
    })
  } catch (error: any) {
    console.error('Error deleting comment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete comment', details: error.message },
      { status: 500 }
    )
  }
}






