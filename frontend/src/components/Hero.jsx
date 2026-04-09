/**
 * Hero Component
 * Full-viewport hero section with animated heading, subheading,
 * CTA button, and particle background.
 */

import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
  const handleCTA = () => {
    document.querySelector('#articles')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--gradient-hero)'
      }}
    >
      <ParticleBackground />

      {/* Gradient orbs */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '15%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(108, 92, 231, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(0, 206, 201, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '800px',
        padding: '0 2rem'
      }}>
        {/* Small badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(108, 92, 231, 0.1)',
            border: '1px solid rgba(108, 92, 231, 0.25)',
            color: 'var(--accent-secondary)',
            fontSize: '0.85rem',
            fontWeight: 500,
            marginBottom: '1.5rem'
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00b894', display: 'inline-block', animation: 'pulse 2s ease infinite' }} />
          Powered by WebSockets • Real-time Updates
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #f0f0f8 0%, #a29bfe 50%, #6c5ce7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Stay Updated.{' '}
          <br />
          Stay Smart.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            maxWidth: '550px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7
          }}
        >
          Explore real-time news powered by WebSockets.
          Instant search, live updates, and a premium reading experience.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            id="cta-explore"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(108, 92, 231, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCTA}
            style={{
              padding: '0.9rem 2.5rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--gradient-primary)',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Explore News →
          </motion.button>

          <motion.button
            id="cta-search"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('#search')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '0.9rem 2.5rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
          >
            Live Search
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{
            display: 'flex',
            gap: '3rem',
            justifyContent: 'center',
            marginTop: '4rem',
            flexWrap: 'wrap'
          }}
        >
          {[
            { value: '100+', label: 'Articles' },
            { value: 'Real-time', label: 'Search' },
            { value: '8', label: 'Categories' }
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                fontFamily: 'var(--font-heading)',
                color: 'var(--accent-secondary)'
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-muted)',
          fontSize: '0.75rem'
        }}
      >
        <span>Scroll to explore</span>
        <div style={{
          width: 20,
          height: 30,
          border: '2px solid var(--text-muted)',
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 5
        }}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: 3,
              height: 8,
              background: 'var(--accent-primary)',
              borderRadius: 2
            }}
          />
        </div>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
