/**
 * Server Entry Point
 * Initializes Express, Socket.io, connects to MongoDB,
 * and fetches initial posts from JSONPlaceholder on startup.
 */

require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const setupSearchHandler = require('./socket/searchHandler');
const { fetchAndStorePosts } = require('./services/postService');

const app = express();
const server = http.createServer(app);

// Socket.io setup with CORS
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', postRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Smart News Aggregator API is running',
    endpoints: {
      getAllPosts: 'GET /api/posts',
      getPost: 'GET /api/posts/:id',
      getTrending: 'GET /api/posts/trending',
      getFeatured: 'GET /api/posts/featured',
      fetchPosts: 'POST /api/fetch-posts'
    }
  });
});

// Setup WebSocket search handler
setupSearchHandler(io);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Fetch and store posts from JSONPlaceholder on startup
    console.log('🔄 Fetching initial posts from JSONPlaceholder...');
    await fetchAndStorePosts();

    // 3. Start listening
    server.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}`);
      console.log(`📡 REST API: http://localhost:${PORT}/api/posts`);
      console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
      console.log(`💡 Health check: http://localhost:${PORT}/\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Only start the server natively if we are not running in Vercel
if (process.env.NODE_ENV !== 'production' || process.env.RENDER) {
  startServer();
}

// THIS IS REQUIRED FOR VERCEL SERVERLESS FUNCTIONS
module.exports = app;
