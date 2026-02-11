import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IComment extends Document {
  blogId: mongoose.Types.ObjectId
  name: string
  email: string
  message: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: Date
  updatedAt: Date
}

const CommentSchema: Schema = new Schema(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      required: [true, 'Blog ID is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
)

// Index for faster queries
CommentSchema.index({ blogId: 1, status: 1 })
CommentSchema.index({ createdAt: -1 })

const Comment: Model<IComment> = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema)

export default Comment






