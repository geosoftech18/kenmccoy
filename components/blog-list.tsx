'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Calendar, 
  Tag,
  ArrowRight
} from 'lucide-react'

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

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl text-foreground mb-2">No blog posts yet</h3>
        <p className="text-muted-foreground">Check back soon for new content!</p>
      </motion.div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <motion.div
          key={post._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/blog/${post.slug}`}>
            <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group cursor-pointer">
              {/* Featured Image */}
              <div className="relative overflow-hidden rounded-t-lg">
                {post.featuredImage ? (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <Badge 
                    variant={post.status === 'published' ? 'default' : 'secondary'}
                    className={post.status === 'published' 
                      ? 'bg-green-100 text-green-700 border-green-300' 
                      : 'bg-yellow-100 text-yellow-700 border-yellow-300'
                    }
                  >
                    {post.status}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-text-blue-500 font-bold text-lg line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Excerpt */}
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="bg-accent/10 text-accent border-accent/30 text-xs"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Date and Read More */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center text-muted-foreground text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  
                  <div className="text-accent group-hover:text-accent/80 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}



