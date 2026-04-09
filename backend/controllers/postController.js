/**
 * Post Controller
 * Handles HTTP request/response logic for post-related routes.
 * Delegates business logic to postService.
 */

const postService = require('../services/postService');

/**
 * GET /posts
 * Returns all articles from the database.
 */
const handleGetAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch posts'
    });
  }
};

/**
 * GET /posts/:id
 * Returns a single article by its postId.
 */
const handleGetPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Error fetching post:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch post'
    });
  }
};

/**
 * POST /fetch-posts
 * Fetches posts from JSONPlaceholder API and stores them in MongoDB.
 */
const handleFetchPosts = async (req, res) => {
  try {
    const result = await postService.fetchAndStorePosts();
    res.json({
      success: true,
      message: 'Posts fetched and stored successfully',
      data: result
    });
  } catch (error) {
    console.error('Error in fetch-posts:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch and store posts'
    });
  }
};

/**
 * GET /posts/trending
 * Returns the top 10 trending articles by view count.
 */
const handleGetTrending = async (req, res) => {
  try {
    const posts = await postService.getTrendingPosts();
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error('Error fetching trending:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trending posts'
    });
  }
};

/**
 * GET /posts/featured
 * Returns featured articles.
 */
const handleGetFeatured = async (req, res) => {
  try {
    const posts = await postService.getFeaturedPosts();
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error('Error fetching featured:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch featured posts'
    });
  }
};

module.exports = {
  handleGetAllPosts,
  handleGetPostById,
  handleFetchPosts,
  handleGetTrending,
  handleGetFeatured
};
