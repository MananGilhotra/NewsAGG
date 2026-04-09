/**
 * SearchSection Component
 * Live search powered by WebSocket (Socket.io).
 * Features a glowing search bar with animated dropdown results
 * and highlighted matching text.
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineMagnifyingGlass, HiOutlineSignal, HiOutlineFunnel } from 'react-icons/hi2';
import useSocket from '../hooks/useSocket';

const categories = ['All', 'Technology', 'Business', 'Sports', 'Health', 'Entertainment', 'Science', 'Politics', 'World'];



const SearchSection = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const { results, isConnected, isSearching, search } = useSocket();
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    search(value, category);
  }, [search, category]);

  const handleCategoryChange = useCallback((e) => {
    const value = e.target.value;
    setCategory(value);
    search(query, value);
  }, [search, query]);

  // Highlight matching text in results
  const highlightMatch = (text, searchQuery) => {
    if (!searchQuery || searchQuery.trim() === '') return text;
    const parts = text.split(new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark key={i} style={{
          background: 'rgba(108, 92, 231, 0.3)',
          color: 'var(--accent-secondary)',
          borderRadius: '2px',
          padding: '0 2px'
        }}>{part}</mark>
      ) : part
    );
  };

  const showResults = query.trim().length > 0 || category !== 'All';

  return (
    <section id="search" className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'visible', paddingBottom: '12rem' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'var(--gradient-glow)',
        borderRadius: '50%',
        pointerEvents: 'none',
        opacity: isFocused ? 1 : 0.5,
        transition: 'opacity 0.5s ease'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Live Search
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Search articles in real-time — results appear instantly as you type
        </motion.p>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            maxWidth: '650px',
            margin: '0 auto',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'stretch',
            background: 'rgba(255,255,255,0.04)',
            border: isFocused ? '1px solid rgba(108, 92, 231, 0.5)' : '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)',
            transition: 'all 0.3s ease',
            boxShadow: isFocused ? '0 0 30px rgba(108, 92, 231, 0.15), 0 0 60px rgba(108, 92, 231, 0.05)' : 'none'
          }}>
            <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
              <HiOutlineMagnifyingGlass style={{
                position: 'absolute',
                left: '1.25rem',
                fontSize: '1.3rem',
                color: isFocused ? 'var(--accent-secondary)' : 'var(--text-muted)',
                transition: 'color 0.3s ease',
                zIndex: 2
              }} />

              <input
                id="search-input"
                type="text"
                placeholder="Search articles by title or content..."
                value={query}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                style={{
                  width: '100%',
                  padding: '1.1rem 1.25rem 1.1rem 3.5rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                }}
              />
            </div>

            {/* Category Filter */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              borderLeft: '1px solid var(--border-color)',
              padding: '0 1rem',
              position: 'relative'
            }}>
              <HiOutlineFunnel style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }} />
              <select
                value={category}
                onChange={handleCategoryChange}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  appearance: 'none',
                  paddingRight: '1rem'
                }}
              >
                {categories.map(c => (
                  <option key={c} value={c} style={{ background: '#06060f', color: '#fff' }}>{c}</option>
                ))}
              </select>
            </div>

            {/* Connection indicator */}
            <div style={{
              position: 'absolute',
              right: '-8rem',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              color: isConnected ? 'var(--accent-green)' : 'var(--text-muted)',
              zIndex: 2
            }}>
              <HiOutlineSignal />
              {isSearching ? (
                <span style={{ color: 'var(--accent-secondary)' }}>Searching...</span>
              ) : isConnected ? 'Live' : 'Connecting...'}
            </div>
          </div>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.75rem)',
                  left: 0,
                  right: 0,
                  maxHeight: '420px',
                  overflowY: 'auto',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(12, 12, 29, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(108, 92, 231, 0.2)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  zIndex: 100
                }}
              >
                {isSearching ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{
                        width: 24,
                        height: 24,
                        border: '2px solid var(--border-color)',
                        borderTopColor: 'var(--accent-primary)',
                        borderRadius: '50%',
                        margin: '0 auto 0.75rem'
                      }}
                    />
                    Searching...
                  </div>
                ) : results.length > 0 ? (
                  <>
                    <div style={{
                      padding: '0.75rem 1.25rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      borderBottom: '1px solid var(--border-color)'
                    }}>
                      {results.length} result{results.length !== 1 ? 's' : ''} found
                    </div>
                    {results.map((post, i) => (
                      <Link to={`/article/${post.postId || post._id}`} key={post._id || post.postId} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        style={{
                          padding: '1rem 1.25rem',
                          borderBottom: '1px solid var(--border-color)',
                          cursor: 'pointer',
                          transition: 'background 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(108, 92, 231, 0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                        
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                          <span className={`badge badge-${post.category?.toLowerCase()}`} style={{ fontSize: '0.65rem' }}>
                            {post.category}
                          </span>
                        </div>
                        <h4 style={{
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          marginBottom: '0.3rem',
                          lineHeight: 1.4
                        }}>
                          {highlightMatch(post.title, query)}
                        </h4>
                        <p style={{
                          fontSize: '0.82rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'visible'
                        }}>
                          {highlightMatch(post.body, query)}
                        </p>
                      </motion.div>
                      </Link>
                    ))}
                  </>
                ) : (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>No results found</p>
                    <p style={{ fontSize: '0.85rem' }}>Try a different search term</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchSection;
