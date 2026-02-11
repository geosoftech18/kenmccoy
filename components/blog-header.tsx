'use client'

import { motion } from 'framer-motion'

export default function BlogHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <div className="items-center justify-between mb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Blog Posts
        </h1>
      </div>
      <p className="text-muted-foreground text-lg">
        Discover amazing content and share your thoughts
      </p>
    </motion.div>
  )
}



