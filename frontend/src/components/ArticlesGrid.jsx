/**
 * ArticlesGrid Component
 * Responsive grid layout displaying all articles with staggered animations.
 * Includes a "Load More" mechanism and category filtering.
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleCard from './ArticleCard';
import SkeletonLoader from './SkeletonLoader';

const ITEMS_PER_PAGE = 9;
const ALL_CATEGORIES = ['All', 'Technology', 'Business', 'Sports', 'Health', 'Entertainment', 'Science', 'Politics', 'World'];

const ArticlesGrid = ({ posts, loading }) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter posts by selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return posts;
    return posts.filter((p) => p.category === selectedCategory);
  }, [posts, selectedCategory]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <section id="articles" className="section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Latest Articles
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Browse through our curated collection of news and insights
        </motion.p>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          {ALL_CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(cat)}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 500,
                cursor: 'pointer',
                background: selectedCategory === cat ? 'rgba(108, 92, 231, 0.2)' : 'rgba(255,255,255,0.03)',
                color: selectedCategory === cat ? 'var(--accent-secondary)' : 'var(--text-secondary)',
                border: selectedCategory === cat ? '1px solid rgba(108, 92, 231, 0.4)' : '1px solid var(--border-color)',
                transition: 'all 0.25s ease'
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        {loading ? (
          <SkeletonLoader count={6} />
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem'
            }}>
              <AnimatePresence mode="popLayout">
                {visiblePosts.map((post, index) => (
                  <ArticleCard key={post._id || post.postId} post={post} index={index % ITEMS_PER_PAGE} />
                ))}
              </AnimatePresence>
            </div>

            {/* Empty state */}
            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  color: 'var(--text-muted)'
                }}
              >
                <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No articles found in this category</p>
                <p style={{ fontSize: '0.9rem' }}>Try selecting a different category</p>
              </motion.div>
            )}

            {/* Load More */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginTop: '2.5rem' }}
              >
                <motion.button
                  id="load-more-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLoadMore}
                  style={{
                    padding: '0.8rem 2.5rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(108, 92, 231, 0.12)',
                    color: 'var(--accent-secondary)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    border: '1px solid rgba(108, 92, 231, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Load More Articles
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ArticlesGrid;
