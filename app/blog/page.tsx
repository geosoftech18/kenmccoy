'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import BlogList from '@/components/blog-list'
import BlogHeader from '@/components/blog-header'
import Footer from '@/components/footer'

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  tags: string[]
  status: 'published' | 'draft'
  featuredImage: string | null
  slug: string
  createdAt: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch data client-side - page loads instantly, data loads in background
    const loadBlogs = async () => {
      try {
        const response = await fetch('/api/blog?status=published')
        const result = await response.json()

        if (result.success) {
          setPosts(result.data)
        } else {
          console.error('Error loading blogs:', result.error)
        }
      } catch (error) {
        console.error('Error loading blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBlogs()
  }, [])

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <BlogHeader />

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-card border-border rounded-lg shadow-lg animate-pulse"
                >
                  <div className="w-full h-48 bg-muted rounded-t-lg" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                    <div className="flex gap-2">
                      <div className="h-6 bg-muted rounded w-16" />
                      <div className="h-6 bg-muted rounded w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <BlogList posts={posts} />
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

