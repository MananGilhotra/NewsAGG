/**
 * Navbar Component
 * Sticky navigation bar with backdrop blur, smooth scrolling,
 * and active section highlighting via IntersectionObserver.
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineNewspaper } from 'react-icons/hi2';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Features', href: '#features' },
  { label: 'Search', href: '#search' },
  { label: 'Articles', href: '#articles' },
  { label: 'Trending', href: '#trending' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Track scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-70px 0px 0px 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <motion.nav
      id="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 'var(--navbar-height)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        background: scrolled ? 'rgba(6, 6, 15, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          whileHover={{ scale: 1.05 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1.3rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          <HiOutlineNewspaper style={{ fontSize: '1.6rem', color: '#6c5ce7', WebkitTextFillColor: '#6c5ce7' }} />
          NewsAgg
        </motion.a>

        {/* Desktop Nav Links */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center'
        }}
        className="nav-links-desktop"
        >
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: activeSection === link.href.replace('#', '') ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: activeSection === link.href.replace('#', '') ? 'rgba(108, 92, 231, 0.15)' : 'transparent',
                border: activeSection === link.href.replace('#', '') ? '1px solid rgba(108, 92, 231, 0.3)' : '1px solid transparent',
                transition: 'all 0.3s ease'
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} className="nav-links-desktop">
          {user ? (
            <>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginRight: '0.5rem' }}>
                Hi, <strong style={{ color: 'var(--text-primary)' }}>{user.name}</strong>
              </span>
              <button 
                onClick={handleLogout}
                style={{ padding: '0.4rem 1rem', background: 'rgba(255, 71, 87, 0.1)', color: '#ff4757', border: '1px solid rgba(255, 71, 87, 0.3)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ padding: '0.4rem 1rem', color: 'var(--text-primary)', textDecoration: 'none' }}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 1rem', textDecoration: 'none' }}>Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            color: 'var(--text-primary)',
            fontSize: '1.5rem',
            padding: '0.5rem'
          }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mobile-menu"
          style={{
            position: 'absolute',
            top: 'var(--navbar-height)',
            left: 0,
            right: 0,
            background: 'rgba(6, 6, 15, 0.95)',
            backdropFilter: 'blur(20px)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            borderBottom: '1px solid var(--border-color)'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                color: activeSection === link.href.replace('#', '') ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: activeSection === link.href.replace('#', '') ? 'rgba(108, 92, 231, 0.15)' : 'transparent',
              }}
            >
              {link.label}
            </a>
          ))}
          {user ? (
            <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)', padding: '0 1rem' }}>{user.name}</span>
              <button onClick={handleLogout} style={{ padding: '0.75rem 1rem', textAlign: 'left', background: 'none', color: '#ff4757', border: 'none' }}>Logout</button>
            </div>
          ) : (
            <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/login" style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)', textDecoration: 'none' }}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.75rem 1rem', textAlign: 'center', textDecoration: 'none', margin: '0 1rem' }}>Sign Up</Link>
            </div>
          )}
        </motion.div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
