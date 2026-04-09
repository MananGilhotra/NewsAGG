/**
 * Post Service
 * Handles all business logic for posts/articles:
 * - Fetching from JSONPlaceholder API
 * - Storing in MongoDB with duplicate prevention
 * - Searching and filtering posts
 */

const axios = require('axios');
const Post = require('../models/Post');
const { CATEGORIES } = require('../models/Post');

const JSONPLACEHOLDER_URL = 'https://dummyjson.com/posts?limit=100';

/**
 * Fetches posts from JSONPlaceholder API and stores them in MongoDB.
 * Enriches each post with a random category, publish date, and view count.
 * Uses upsert to prevent duplicate entries.
 * @returns {Object} Summary of inserted/updated posts
 */
const fetchAndStorePosts = async () => {
  try {
    console.log('📡 Fetching posts from JSONPlaceholder...');
    const response = await axios.get(JSONPLACEHOLDER_URL);
    const data = response.data.posts || response.data;

    let inserted = 0;
    let skipped = 0;

    for (const post of data) {
      // Enrich post with mock news data
      const enrichedPost = {
        postId: post.id,
        title: capitalizeTitle(post.title),
        body: post.body,
        userId: post.userId,
        category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
        publishedAt: getRandomDate(),
        views: Math.floor(Math.random() * 10000),
        isFeatured: Math.random() > 0.85 // ~15% chance of being featured
      };

      try {
        // Upsert: insert if not exists, skip if already present
        await Post.findOneAndUpdate(
          { postId: enrichedPost.postId },
          { $setOnInsert: enrichedPost },
          { upsert: true, new: true }
        );
        inserted++;
      } catch (err) {
        if (err.code === 11000) {
          skipped++; // Duplicate — skip
        } else {
          throw err;
        }
      }
    }

    console.log(`✅ Posts processed: ${inserted} stored, ${skipped} duplicates skipped`);
    return { total: data.length, inserted, skipped };
  } catch (error) {
    console.error('❌ Error fetching posts:', error.message);
    return { total: 0, inserted: 0, skipped: 0 };
  }
};

/**
 * Retrieves all posts from MongoDB, sorted by publishedAt descending.
 */
const getAllPosts = async () => {
  return Post.find().sort({ publishedAt: -1 });
};

/**
 * Retrieves a single post by its postId.
 * @param {Number} id - The post ID
 */
const getPostById = async (id) => {
  return Post.findOne({ postId: parseInt(id) });
};

/**
 * Searches posts by title or body using case-insensitive regex.
 * @param {String} query - The search query string
 * @returns {Array} Matching posts
 */
const searchPosts = async (query, category) => {
  const filter = {};

  // Add category filter if provided
  if (category && category !== 'All') {
    filter.category = category;
  }

  // Add text search filter if query provided
  if (query && query.trim() !== '') {
    const regex = new RegExp(query.trim(), 'i');
    filter['$or'] = [
      { title: { $regex: regex } },
      { body: { $regex: regex } }
    ];
  }

  // If no filters, return all
  if (Object.keys(filter).length === 0) {
    return getAllPosts();
  }

  return Post.find(filter).sort({ views: -1 }).limit(20);
};

/**
 * Gets trending posts (top 10 by view count).
 */
const getTrendingPosts = async () => {
  return Post.find().sort({ views: -1 }).limit(10);
};

/**
 * Gets featured posts (isFeatured: true).
 */
const getFeaturedPosts = async () => {
  return Post.find({ isFeatured: true }).sort({ views: -1 });
};

// --- Helper Functions ---

/**
 * Capitalizes the first letter of each word in a title.
 */
function capitalizeTitle(title) {
  return title.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Generates a random date within the last 30 days.
 */
function getRandomDate() {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  return new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
}

module.exports = {
  fetchAndStorePosts,
  getAllPosts,
  getPostById,
  searchPosts,
  getTrendingPosts,
  getFeaturedPosts
};
