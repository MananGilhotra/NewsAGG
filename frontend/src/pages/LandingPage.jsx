/**
 * App Component
 * Root component that assembles all sections into a single-page layout.
 * Fetches posts from the backend API on mount and passes data to child components.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import Features from '../components/Features';
import SearchSection from '../components/SearchSection';
import ArticlesGrid from '../components/ArticlesGrid';
import TrendingSection from '../components/TrendingSection';
import { getPosts } from '../services/api';

function LandingPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all posts from backend on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getPosts();
        setPosts(response.data || []);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to load articles. Please ensure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        <main>
          <Hero />
          <Features />
          <SearchSection />

          {/* Error banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                maxWidth: '600px',
                margin: '0 auto 2rem',
                padding: '1rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(225, 112, 85, 0.1)',
                border: '1px solid rgba(225, 112, 85, 0.3)',
                color: '#fab1a0',
                textAlign: 'center',
                fontSize: '0.9rem'
              }}
            >
              {error}
            </motion.div>
          )}

          <ArticlesGrid posts={posts} loading={loading} />
          <TrendingSection posts={posts} />
        </main>
        
      </motion.div>
    </AnimatePresence>
  );
}

export default LandingPage;
