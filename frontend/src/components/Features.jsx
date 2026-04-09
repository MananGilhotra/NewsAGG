/**
 * Features Component
 * Displays 4 animated feature cards with scroll-triggered animations.
 * Showcases the core capabilities of the News Aggregator.
 */

import { motion } from 'framer-motion';
import { HiOutlineMagnifyingGlass, HiOutlineBolt, HiOutlineServerStack, HiOutlineSparkles } from 'react-icons/hi2';

const features = [
  {
    icon: <HiOutlineMagnifyingGlass />,
    title: 'Real-Time Search',
    description: 'Instantly find articles as you type. Powered by WebSocket technology for zero-latency results.',
    color: '#6c5ce7'
  },
  {
    icon: <HiOutlineBolt />,
    title: 'Fast API Integration',
    description: 'Lightning-fast REST APIs built on Express.js. Fetches and serves articles in milliseconds.',
    color: '#00cec9'
  },
  {
    icon: <HiOutlineServerStack />,
    title: 'Scalable Backend',
    description: 'MongoDB Atlas cloud database with optimized queries. Built to handle growing data effortlessly.',
    color: '#0984e3'
  },
  {
    icon: <HiOutlineSparkles />,
    title: 'Modern UI',
    description: 'Premium design with glassmorphism, smooth animations, and responsive layouts across all devices.',
    color: '#fd79a8'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const Features = () => {
  return (
    <section id="features" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Why Choose NewsAgg?
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Built with cutting-edge technology for the best news experience
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${feature.color}15`
              }}
              style={{
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                cursor: 'default',
                transition: 'background 0.3s ease'
              }}
            >
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 'var(--radius-md)',
                background: `${feature.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: feature.color,
                marginBottom: '1.25rem',
                border: `1px solid ${feature.color}25`
              }}>
                {feature.icon}
              </div>

              <h3 style={{
                fontSize: '1.15rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                marginBottom: '0.75rem',
                color: 'var(--text-primary)'
              }}>
                {feature.title}
              </h3>

              <p style={{
                fontSize: '0.9rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)'
              }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
