/**
 * TrendingSection Component
 * Horizontal scrollable carousel of top trending articles.
 * Features drag-to-scroll via Framer Motion.
 */

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { HiOutlineFire, HiOutlineEye, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';

const TrendingSection = ({ posts }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Sort by views (top 10)
  const trendingPosts = [...posts]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollButtons();
  }, [trendingPosts]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(updateScrollButtons, 350);
    }
  };

  if (trendingPosts.length === 0) return null;

  return (
    <section id="trending" className="section" style={{ background: 'var(--bg-secondary)', overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}
        >
          <div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <HiOutlineFire style={{ color: '#e17055', WebkitTextFillColor: '#e17055' }} />
              Trending Now
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.5rem' }}>
              Most viewed articles this week
            </p>
          </div>

          {/* Scroll buttons */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: canScrollLeft ? 'rgba(108, 92, 231, 0.15)' : 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-color)',
                color: canScrollLeft ? 'var(--accent-secondary)' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                cursor: canScrollLeft ? 'pointer' : 'default',
                transition: 'all 0.3s ease'
              }}
            >
              <HiOutlineChevronLeft />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: canScrollRight ? 'rgba(108, 92, 231, 0.15)' : 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-color)',
                color: canScrollRight ? 'var(--accent-secondary)' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                cursor: canScrollRight ? 'pointer' : 'default',
                transition: 'all 0.3s ease'
              }}
            >
              <HiOutlineChevronRight />
            </motion.button>
          </div>
        </motion.div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          style={{
            display: 'flex',
            gap: '1.25rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '1rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <style>{`
            #trending div::-webkit-scrollbar { display: none; }
          `}</style>

          {trendingPosts.map((post, i) => (
            <motion.div
              key={post._id || post.postId}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              style={{
                minWidth: '320px',
                maxWidth: '320px',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--gradient-card)',
                border: '1px solid var(--border-color)',
                scrollSnapAlign: 'start',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(108, 92, 231, 0.3)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => navigate(`/article/${post.postId || post._id}`)}
            >
              {/* Rank badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: i < 3 ? 'rgba(225, 112, 85, 0.2)' : 'rgba(255,255,255,0.05)',
                color: i < 3 ? '#e17055' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: i < 3 ? '1px solid rgba(225, 112, 85, 0.3)' : '1px solid var(--border-color)'
              }}>
                #{i + 1}
              </div>

              <span className={`badge badge-${post.category?.toLowerCase()}`} style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
                {post.category}
              </span>

              <h3 style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                lineHeight: 1.4,
                marginBottom: '0.75rem',
                color: 'var(--text-primary)',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                paddingRight: '2rem'
              }}>
                {post.title}
              </h3>

              <p style={{
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                marginBottom: '1rem'
              }}>
                {post.body}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--accent-orange)',
                fontWeight: 600
              }}>
                <HiOutlineEye />
                {post.views?.toLocaleString() || 0} views
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
