'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Header from '@/components/header'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  User,
  Share2,
  Heart,
  MessageCircle,
  BookOpen,
  Send,
  Mail
} from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

interface BlogPost {
  _id?: string
  id?: number
  title: string
  content: string
  excerpt: string
  tags: string[]
  status: string
  featuredImage: string | null
  slug?: string
  createdAt: string
  author?: string
  readTime?: string
  likes?: number
  comments?: number
}

interface Comment {
  _id: string
  name: string
  email: string
  message: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [liked, setLiked] = useState(false)
  const [slug, setSlug] = useState<string>('')
  const [comments, setComments] = useState<Comment[]>([])
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    // Await params first
    const initParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    initParams()
  }, [params])

  useEffect(() => {
    if (!slug) return
    
    // Load post from API
    const fetchPost = async () => {
      setLoading(true)
      
      try {
        const response = await fetch(`/api/blog/slug/${slug}`)
        const result = await response.json()

        if (result.success && result.data) {
          const blogData = result.data
          // Add default values if missing
          const foundPost: BlogPost = {
            ...blogData,
            author: 'Admin User',
            readTime: '5 min read',
            likes: 0,
            comments: 0
          }
          setPost(foundPost)
          
          // Fetch related posts (published posts excluding current one)
          fetchRelatedPosts(blogData._id)
          
          // Fetch comments for this blog
          fetchComments(blogData._id)
        } else {
          setPost(null)
        }
      } catch (error) {
        console.error('Error loading blog post:', error)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  const fetchRelatedPosts = async (currentPostId: string) => {
    try {
      const response = await fetch(`/api/blog?status=published`)
      const result = await response.json()

      if (result.success && result.data) {
        // Filter out current post and limit to 2 related posts
        const related = result.data
          .filter((p: BlogPost) => p._id !== currentPostId)
          .slice(0, 2)
          .map((p: BlogPost) => ({
            ...p,
            author: 'Admin User',
            readTime: '5 min read',
            likes: 0,
            comments: 0
          }))
        setRelatedPosts(related)
      }
    } catch (error) {
      console.error('Error loading related posts:', error)
      setRelatedPosts([])
    }
  }

  const fetchComments = async (blogId: string) => {
    setCommentsLoading(true)
    try {
      const response = await fetch(`/api/comments?blogId=${blogId}`)
      const result = await response.json()

      if (result.success && result.data) {
        setComments(result.data)
      }
    } catch (error) {
      console.error('Error loading comments:', error)
      setComments([])
    } finally {
      setCommentsLoading(false)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitMessage(null)

    if (!post?._id) {
      setSubmitMessage({ type: 'error', text: 'Blog post not found' })
      setSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blogId: post._id,
          name: commentForm.name.trim(),
          email: commentForm.email.trim(),
          message: commentForm.message.trim(),
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitMessage({ type: 'success', text: result.message || 'Comment submitted successfully! It will be visible after admin approval.' })
        setCommentForm({ name: '', email: '', message: '' })
        // Refresh comments to show the new one (if admin approved it immediately, though unlikely)
        if (post._id) {
          fetchComments(post._id)
        }
      } else {
        setSubmitMessage({ type: 'error', text: result.error || 'Failed to submit comment' })
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
      setSubmitMessage({ type: 'error', text: 'Failed to submit comment. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleLike = () => {
    if (post) {
      setLiked(!liked)
      // In real app, this would update the database
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-muted border-t-accent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20">
      {/* Header */}
      <div className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <Link href="/blog">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={handleLike}
                variant="ghost"
                size="sm"
                className={`rounded-xl ${
                  liked 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-muted-foreground hover:text-accent'
                }`}
              >
                <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-current' : ''}`} />
                {(post.likes || 0) + (liked ? 1 : 0)}
              </Button>
              
              <Button
                onClick={handleShare}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-accent rounded-xl"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          {post.featuredImage ? (
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-muted to-muted/50 h-64 md:h-80 flex items-center justify-center">
              <BookOpen className="w-24 h-24 text-muted-foreground" />
            </div>
          )}
        </motion.div>

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card border-border shadow-xl">
            <CardContent className="p-8">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-accent/10 text-accent border-accent/30"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Content */}
              <div className="blog-content prose max-w-none">
                <div 
                  className="text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
              <style jsx global>{`
                .blog-content h1 {
                  font-size: 2.5em;
                  font-weight: bold;
                  color: var(--foreground);
                  margin: 1.5em 0 0.75em 0;
                  line-height: 1.2;
                }
                .blog-content h2 {
                  font-size: 2em;
                  font-weight: bold;
                  color: var(--foreground);
                  margin: 1.25em 0 0.625em 0;
                  line-height: 1.3;
                }
                .blog-content h3,
                .blog-content h4,
                .blog-content h5,
                .blog-content h6 {
                  font-weight: bold;
                  color: var(--accent);
                  margin: 1em 0 0.5em 0;
                  line-height: 1.4;
                }
                .blog-content h3 { font-size: 1.5em; }
                .blog-content h4 { font-size: 1.25em; margin: 0.875em 0 0.4375em 0; }
                .blog-content h5 { font-size: 1.125em; margin: 0.75em 0 0.375em 0; }
                .blog-content h6 { font-size: 1em; margin: 0.625em 0 0.3125em 0; }
                .blog-content h1:first-child,
                .blog-content h2:first-child,
                .blog-content h3:first-child,
                .blog-content h4:first-child,
                .blog-content h5:first-child,
                .blog-content h6:first-child {
                  margin-top: 0;
                }
                .blog-content p,
                .blog-content ul,
                .blog-content ol,
                .blog-content li,
                .blog-content em {
                  color: var(--muted-foreground);
                  margin: 1em 0;
                  line-height: 1.7;
                  font-size: 1rem;
                }
                .blog-content ul, .blog-content ol { padding-left: 2em; }
                .blog-content li { margin: 0.5em 0; }
                .blog-content strong {
                  font-weight: bold;
                  color: var(--foreground);
                }
                .blog-content u { text-decoration: underline; }
                .blog-content s { text-decoration: line-through; }
                .blog-content blockquote {
                  border-left: 4px solid var(--accent);
                  padding-left: 1.5em;
                  margin: 1.5em 0;
                  color: var(--muted-foreground);
                  font-style: italic;
                  background: var(--muted);
                  padding: 1em 1.5em;
                  border-radius: 0.5em;
                }
                .blog-content blockquote p { margin: 0.5em 0; }
                .blog-content a {
                  color: var(--accent);
                  text-decoration: underline;
                  transition: color 0.2s;
                }
                .blog-content a:hover { opacity: 0.9; }
                .blog-content code {
                  background-color: var(--muted);
                  color: var(--foreground);
                  padding: 0.2em 0.4em;
                  border-radius: 0.25em;
                  font-size: 0.9em;
                  font-family: 'Courier New', monospace;
                }
                .blog-content pre {
                  background-color: var(--muted);
                  color: var(--foreground);
                  padding: 1.5em;
                  border-radius: 0.5em;
                  overflow-x: auto;
                  margin: 1.5em 0;
                  border: 1px solid var(--border);
                }
                .blog-content pre code {
                  background-color: transparent;
                  padding: 0;
                  color: inherit;
                }
                .blog-content img {
                  max-width: 100%;
                  height: auto;
                  margin: 2em 0;
                  border-radius: 0.5em;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                }
                .blog-content table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 1.5em 0;
                  background: var(--muted);
                  border-radius: 0.5em;
                  overflow: hidden;
                  border: 1px solid var(--border);
                }
                .blog-content th,
                .blog-content td {
                  border: 1px solid var(--border);
                  padding: 0.75em;
                  text-align: left;
                  color: var(--foreground);
                }
                .blog-content th {
                  background-color: var(--muted);
                  font-weight: bold;
                  color: var(--accent);
                }
                .blog-content hr {
                  border: none;
                  border-top: 2px solid var(--border);
                  margin: 2em 0;
                }
                .blog-content iframe {
                  max-width: 100%;
                  margin: 2em 0;
                  border-radius: 0.5em;
                }
              `}</style>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-border">
                <Button
                  onClick={handleLike}
                  className={`rounded-xl ${
                    liked 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-accent hover:bg-accent/90 text-accent-foreground'
                  }`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                  {liked ? 'Liked' : 'Like'} ({(post.likes || 0) + (liked ? 1 : 0)})
                </Button>
                
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="border-border text-foreground hover:bg-accent/10 hover:border-accent hover:text-accent rounded-xl"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Post
                </Button>
                
           
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          <Card className="bg-card border-border shadow-lg mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="comment-name" className="text-foreground flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Name
                    </Label>
                    <Input
                      id="comment-name"
                      type="text"
                      value={commentForm.name}
                      onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/20 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comment-email" className="text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="comment-email"
                      type="email"
                      value={commentForm.email}
                      onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                      placeholder="your.email@example.com"
                      required
                      className="bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/20 rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment-message" className="text-foreground">
                    Your Comment
                  </Label>
                  <Textarea
                    id="comment-message"
                    value={commentForm.message}
                    onChange={(e) => setCommentForm({ ...commentForm, message: e.target.value })}
                    placeholder="Share your thoughts..."
                    required
                    rows={5}
                    className="bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/20 rounded-xl resize-none"
                  />
                </div>
                {submitMessage && (
                  <div className={`px-4 py-3 rounded-xl text-sm ${
                    submitMessage.type === 'success'
                      ? 'bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-300'
                      : 'bg-destructive/10 border border-destructive/30 text-destructive'
                  }`}>
                    {submitMessage.text}
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={submitting || !commentForm.name || !commentForm.email || !commentForm.message}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Post Comment
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Comments List */}
          {commentsLoading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-muted border-t-accent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-muted-foreground">Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment._id} className="bg-card border-border hover:border-accent/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F57433] rounded-full flex items-center justify-center text-accent-foreground font-semibold">
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-card-foreground">{comment.name}</h4>
                          <p className="text-xs text-muted-foreground">{comment.email}</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed whitespace-pre-wrap">{comment.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">Related Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost._id}
                  href={`/blog/${relatedPost.slug || relatedPost.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}`}
                >
                  <Card className="bg-card border-border hover:border-accent hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      {relatedPost.featuredImage ? (
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gradient-to-br from-muted to-muted/50 rounded-lg mb-4 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                      <h3 className="text-card-foreground font-semibold mb-2 group-hover:text-accent transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
    </>
  )
}