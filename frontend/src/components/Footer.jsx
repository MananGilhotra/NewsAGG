/**
 * Footer Component
 * Minimal, clean footer with links, credits, and tech stack badges.
 */

import { motion } from 'framer-motion';
import { HiOutlineHeart, HiOutlineCodeBracket } from 'react-icons/hi2';

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--bg-primary)',
      borderTop: '1px solid var(--border-color)',
      padding: '3rem 0 2rem'
    }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}
        >
          {/* Logo */}
          <div style={{
            fontSize: '1.3rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            NewsAgg
          </div>

          {/* Tech stack badges */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Framer Motion'].map((tech) => (
              <span key={tech} style={{
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-color)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                fontWeight: 500
              }}>
                {tech}
              </span>
            ))}
          </div>

          {/* Nav links */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)'
          }}>
            {['Home', 'Features', 'Search', 'Articles', 'Trending'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  color: 'var(--text-secondary)',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => { e.target.style.color = 'var(--accent-secondary)'; }}
                onMouseLeave={(e) => { e.target.style.color = 'var(--text-secondary)'; }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div style={{
            width: '100%',
            maxWidth: '400px',
            height: '1px',
            background: 'var(--border-color)'
          }} />

          {/* Credits */}
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            <HiOutlineCodeBracket />
            Built with
            <HiOutlineHeart style={{ color: '#fd79a8', fontSize: '0.9rem' }} />
            by NewsAgg • {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
