import React from 'react';

interface ResultProps {
  title: string;
  url: string;
  description: string;
  score?: number;
  relevance?: number;
  pagerank?: number;
}

const Result: React.FC<ResultProps> = ({ title, url, description, score, relevance, pagerank }) => {
  return (
    <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '18px', color: '#1a0dab' }}>
        <a 
          href={url} 
          target='_blank' 
          rel='noopener noreferrer' 
          style={{ 
            textDecoration: 'underline', 
            color: '#1a0dab',
            cursor: 'pointer'
          }}
        >
          {title}
        </a>
      </h3>
      <p style={{ margin: '0 0 0.5rem 0', fontSize: '14px' }}>
        <a 
          href={url} 
          target='_blank' 
          rel='noopener noreferrer' 
          style={{ 
            color: '#006621',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
        >
          {url}
        </a>
      </p>
      <p style={{ margin: '0', fontSize: '14px', color: '#545454' }}>{description}</p>
      {score !== undefined && (
        <div style={{ marginTop: '0.5rem', fontSize: '12px', color: '#666' }}>
          Score: {score.toFixed(3)} | Relevance: {relevance?.toFixed(3)} | PageRank: {pagerank?.toFixed(3)}
        </div>
      )}
    </div>
  );
};

export default Result;