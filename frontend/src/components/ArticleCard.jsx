/**
 * ArticleCard Component
 * Displays a single article with title, description, category badge,
 * published date, and view count. Features hover animations.
 */

import { motion } from 'framer-motion';
import { HiOutlineEye, HiOutlineClock } from 'react-icons/hi2';

const ArticleCard = ({ post, index = 0 }) => {
  const categoryClass = `badge badge-${post.category?.toLowerCase() || 'technology'}`;

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Format view count
  const formatViews = (views) => {
    if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
    return views?.toString() || '0';
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -6,
        transition: { duration: 0.25 }
      }}
      style={{
        padding: '1.5rem',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--bg-card-hover)';
        e.currentTarget.style.borderColor = 'rgba(108, 92, 231, 0.2)';
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3), 0 0 20px rgba(108, 92, 231, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--bg-card)';
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Hover glow effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--gradient-primary)',
        opacity: 0,
        transition: 'opacity 0.3s ease'
      }}
        className="card-glow-top"
      />

      {/* Category badge */}
      <div style={{ marginBottom: '1rem' }}>
        <span className={categoryClass}>{post.category || 'Technology'}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '1.05rem',
        fontFamily: 'var(--font-heading)',
        fontWeight: 700,
        lineHeight: 1.4,
        marginBottom: '0.75rem',
        color: 'var(--text-primary)',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {post.title}
      </h3>

      {/* Body excerpt */}
      <p style={{
        fontSize: '0.88rem',
        lineHeight: 1.7,
        color: 'var(--text-secondary)',
        marginBottom: '1.25rem',
        flex: 1,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {post.body}
      </p>

      {/* Footer: date + views */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border-color)'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <HiOutlineClock />
          {formatDate(post.publishedAt)}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <HiOutlineEye />
          {formatViews(post.views)} views
        </span>
      </div>
    </motion.article>
  );
};

export default ArticleCard;
