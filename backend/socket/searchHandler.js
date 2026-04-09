/**
 * WebSocket Search Handler
 * Handles real-time search via Socket.io.
 * 
 * Events:
 *   "search"        → Client sends search query string
 *   "searchResults"  → Server responds with filtered posts
 */

const { searchPosts } = require('../services/postService');

const setupSearchHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Listen for search events from the client
    socket.on('search', async (data) => {
      const query = typeof data === 'string' ? data : data.query;
      const category = typeof data === 'string' ? null : data.category;
      try {
        console.log(`🔍 Search query from ${socket.id}: "${query}"`);
        const results = await searchPosts(query, category);
        
        // Emit filtered results back to the requesting client
        socket.emit('searchResults', {
          success: true,
          query,
          count: results.length,
          data: results
        });
      } catch (error) {
        console.error('❌ Search error:', error.message);
        socket.emit('searchResults', {
          success: false,
          query,
          count: 0,
          data: [],
          error: 'Search failed'
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });
};

module.exports = setupSearchHandler;
