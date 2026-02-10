import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'

// GET - Fetch all blog posts (with optional filters)
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // Build query
    const query: any = {}

    // Filter by status
    if (status && status !== 'all') {
      query.status = status
    }

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    }

    // Fetch posts - only select fields we need for listing (exclude content for performance)
    const posts = await Blog.find(query)
      .select('title excerpt tags status featuredImage slug createdAt updatedAt') // Only fetch needed fields
      .sort({ createdAt: -1 }) // Newest first
      .lean() // Convert to plain JavaScript objects

    // Convert MongoDB _id to string and format dates
    const formattedPosts = posts.map((post: any) => ({
      _id: post._id.toString(),
      title: post.title,
      excerpt: post.excerpt,
      tags: post.tags,
      status: post.status,
      featuredImage: post.featuredImage,
      slug: post.slug,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString()
    }))

    // Add caching headers for better performance
    const response = NextResponse.json({
      success: true,
      data: formattedPosts
    })

    // Cache for 60 seconds if fetching published posts only
    if (status === 'published') {
      response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
    }

    return response
  } catch (error: any) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, content, tags, featuredImage, status } = body

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Generate excerpt from content (strip HTML tags)
    const textContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    const excerpt = textContent.length > 150 ? textContent.substring(0, 150) + '...' : textContent

    // Generate slug from title
    let baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
    
    if (!baseSlug) {
      baseSlug = 'blog-post'
    }

    // Ensure slug is unique by appending a number if needed
    let slug = baseSlug
    let counter = 1
    let existing = await Blog.findOne({ slug })
    
    while (existing) {
      slug = `${baseSlug}-${counter}`
      counter++
      existing = await Blog.findOne({ slug })
    }

    // Create new post
    const newPost = new Blog({
      title,
      content,
      excerpt,
      tags: tags || [],
      status: status || 'draft',
      featuredImage: featuredImage || null,
      slug // Set slug explicitly
    })

    await newPost.save()

    return NextResponse.json({
      success: true,
      data: {
        _id: newPost._id.toString(),
        title: newPost.title,
        content: newPost.content,
        excerpt: newPost.excerpt,
        tags: newPost.tags,
        status: newPost.status,
        featuredImage: newPost.featuredImage,
        slug: newPost.slug,
        createdAt: newPost.createdAt.toISOString(),
        updatedAt: newPost.updatedAt.toISOString()
      }
    })
  } catch (error: any) {
    console.error('Error creating blog post:', error)
    
    // Handle duplicate slug error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A blog post with this title already exists' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
