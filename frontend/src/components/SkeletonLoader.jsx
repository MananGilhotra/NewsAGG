/**
 * SkeletonLoader Component
 * Animated shimmer placeholder for loading states.
 * Mimics the shape of article cards.
 */

const SkeletonLoader = ({ count = 6 }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '1.5rem'
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)'
          }}
        >
          {/* Category badge skeleton */}
          <div className="skeleton" style={{ width: 80, height: 24, marginBottom: 16, borderRadius: 'var(--radius-full)' }} />

          {/* Title skeleton */}
          <div className="skeleton" style={{ width: '90%', height: 20, marginBottom: 10 }} />
          <div className="skeleton" style={{ width: '70%', height: 20, marginBottom: 20 }} />

          {/* Body skeleton */}
          <div className="skeleton" style={{ width: '100%', height: 14, marginBottom: 8 }} />
          <div className="skeleton" style={{ width: '95%', height: 14, marginBottom: 8 }} />
          <div className="skeleton" style={{ width: '60%', height: 14, marginBottom: 24 }} />

          {/* Footer skeleton */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="skeleton" style={{ width: 100, height: 14 }} />
            <div className="skeleton" style={{ width: 60, height: 14 }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
