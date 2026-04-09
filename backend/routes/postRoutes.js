/**
 * Post Routes
 * Defines all REST API endpoints for post/article operations.
 * 
 * Routes:
 *   GET    /posts          → Get all articles
 *   GET    /posts/trending  → Get trending articles
 *   GET    /posts/featured  → Get featured articles
 *   GET    /posts/:id       → Get single article
 *   POST   /fetch-posts     → Fetch & store from JSONPlaceholder
 */

const express = require('express');
const router = express.Router();
const {
  handleGetAllPosts,
  handleGetPostById,
  handleFetchPosts,
  handleGetTrending,
  handleGetFeatured
} = require('../controllers/postController');

// Specific routes MUST come before parameterized routes
router.get('/posts/trending', handleGetTrending);
router.get('/posts/featured', handleGetFeatured);
router.get('/posts', handleGetAllPosts);
router.get('/posts/:id', handleGetPostById);
router.post('/fetch-posts', handleFetchPosts);

module.exports = router;
