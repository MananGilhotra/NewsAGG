import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPostById } from '../services/api';
import { HiArrowLeft, HiOutlineCalendar, HiOutlineEye } from 'react-icons/hi2';

const ArticlePage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        // The API actually returns `{ data: {...} }` or directly the object depending on axios config, but postService returns the object, and our api.js returns data.data if it's nested
        const response = await getPostById(id);
        // Sometimes backend returns response.data directly or nested
        setPost(response.postId ? response : response.data);
      } catch (err) {
        setError('Article not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--text-muted)' }}>Loading article...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '2rem', color: '#ff4757', marginBottom: '1rem' }}>Oops!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{error || 'Article not found.'}</p>
        <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  const date = new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div style={{ minHeight: '100vh', paddingTop: 'var(--navbar-height)' }}>
      <main className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', textDecoration: 'none', marginBottom: '2rem', fontWeight: 500 }}>
             <HiArrowLeft /> Back to Home
          </Link>

          <div style={{ marginBottom: '2rem' }}>
            <span className={`badge badge-${post.category?.toLowerCase() || 'default'}`} style={{ marginBottom: '1rem', display: 'inline-block' }}>
              {post.category || 'General'}
            </span>
            <h1 style={{ fontSize: '2.5rem', lineHeight: 1.2, margin: '0.5rem 0 1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
              {post.title}
            </h1>

            <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                 <HiOutlineCalendar /> {date}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                 <HiOutlineEye /> {post.views?.toLocaleString() || 0} views
              </div>
            </div>
          </div>

          <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, fontFamily: 'var(--font-body)' }}>
            <p style={{ marginBottom: '1.5rem' }}>{post.body}</p>
            <p style={{ marginBottom: '1.5rem' }}>
              This section is expanded for reading purposes. The events described demonstrate the continuing evolution of this specific topic. Analysts have pointed out that in recent weeks, significant developments have reshaped the landscape.
            </p>
            <h3 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.4rem' }}>What this means for the future</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Looking ahead, experts agree that there will be profound implications. Adapting to these new realities will require innovation, resilience, and a deep understanding of core principles. Stakeholders must remain vigilant and responsive.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Ultimately, the results of these early findings will guide subsequent actions and policy implementations throughout the industry globally.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ArticlePage;
