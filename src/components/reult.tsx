import React from 'react';

interface ResultProps {
    title: string;
    url: string;
    description?: string;
}

const Result: React.FC<ResultProps> = ({ title, url, description }) => (
    <div style={{ marginBottom: '24px' }}>
        <a
            href={url}
            style={{
                color: '#1a0dab',
                fontSize: '18px',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '4px',
            }}
            target="_blank"
            rel="noopener noreferrer"
        >
            {title}
        </a>
        <div style={{ color: '#006621', fontSize: '14px', marginBottom: '4px' }}>
            {url}
        </div>
        {description && (
            <div style={{ color: '#545454', fontSize: '14px' }}>
                {description}
            </div>
        )}
    </div>
);

export default Result;