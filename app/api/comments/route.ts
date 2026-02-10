import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Comment from '@/models/Comment'
import Blog from '@/models/Blog'

// GET - Fetch comments for a specific blog (only approved comments for public, all for admin)
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const blogId = searchParams.get('blogId')
    const admin = searchParams.get('admin') === 'true'

    if (!blogId) {
      return NextResponse.json(
        { success: false, error: 'Blog ID is required' },
        { status: 400 }
      )
    }

    // Verify blog exists
    const blog = await Blog.findById(blogId)
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Build query
    const query: any = { blogId }

    // If not admin, only show approved comments
    if (!admin) {
      query.status = 'approved'
    }

    // Fetch comments sorted by newest first
    const comments = await Comment.find(query)
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      data: comments,
      count: comments.length,
    })
  } catch (error: any) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments', details: error.message },
      { status: 500 }
    )
  }
}

// POST - Create a new comment
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { blogId, name, email, message } = body

    // Validation
    if (!blogId || !name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Verify blog exists
    const blog = await Blog.findById(blogId)
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Create comment
    const comment = new Comment({
      blogId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      status: 'pending', // All comments start as pending
    })

    await comment.save()

    return NextResponse.json({
      success: true,
      message: 'Comment submitted successfully! It will be visible after admin approval.',
      data: comment,
    })
  } catch (error: any) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit comment', details: error.message },
      { status: 500 }
    )
  }
}




