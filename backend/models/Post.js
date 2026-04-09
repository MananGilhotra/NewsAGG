/**
 * Post Model
 * Represents a news article stored in MongoDB.
 * Uses a unique index on 'postId' to prevent duplicate entries
 * when fetching from JSONPlaceholder API.
 */

const mongoose = require('mongoose');

// Available categories for mock news categorization
const CATEGORIES = [
  'Technology', 'Business', 'Sports', 'Health',
  'Entertainment', 'Science', 'Politics', 'World'
];

const postSchema = new mongoose.Schema({
  postId: {
    type: Number,
    required: true,
    unique: true, // Prevents duplicate entries
    index: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  userId: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: CATEGORIES,
    default: 'Technology'
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Text index for efficient search
postSchema.index({ title: 'text', body: 'text' });

module.exports = mongoose.model('Post', postSchema);
module.exports.CATEGORIES = CATEGORIES;
