/**
 * API Service
 * Centralized HTTP client for all backend API calls.
 * Uses axios with a configured base URL from environment variables.
 */

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Fetches all posts/articles from the backend.
 * @returns {Promise<Array>} Array of post objects
 */
export const getPosts = async () => {
  const { data } = await api.get('/posts');
  return data;
};

/**
 * Fetches a single post by its ID.
 * @param {number} id - The post ID
 * @returns {Promise<Object>} Single post object
 */
export const getPostById = async (id) => {
  const { data } = await api.get(`/posts/${id}`);
  return data;
};

/**
 * Fetches trending posts (top by views).
 * @returns {Promise<Array>} Array of trending posts
 */
export const getTrendingPosts = async () => {
  const { data } = await api.get('/posts/trending');
  return data;
};

/**
 * Fetches featured posts.
 * @returns {Promise<Array>} Array of featured posts
 */
export const getFeaturedPosts = async () => {
  const { data } = await api.get('/posts/featured');
  return data;
};

/**
 * Triggers the backend to fetch posts from JSONPlaceholder and store them.
 * @returns {Promise<Object>} Result summary
 */
export const triggerFetchPosts = async () => {
  const { data } = await api.post('/fetch-posts');
  return data;
};

export default api;
