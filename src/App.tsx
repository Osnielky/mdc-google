import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Result from './components/reult';
import { fetchBackendLinks } from './Util';

function App() {
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (url: string, pages: number) => {
    console.log('handleSearch called with:', url, pages);

    // Clear previous results immediately when starting a new search
    setResults([]);
    setIsLoading(true);

    try {
      console.log('About to call fetchBackendLinks');
      const results = await fetchBackendLinks(url);
      console.log('fetchBackendLinks returned:', results);
      setResults(results);
    } catch (err) {
      console.error('Error running crawler:', err);
      // Keep results empty on error
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', paddingTop: '3rem' }}>
      <div style={{ maxWidth: '600px', width: '100%', padding: '2rem', boxSizing: 'border-box' }}>
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 700,
            marginBottom: '1rem',
            textAlign: 'center',
            letterSpacing: '2px',
            fontFamily: 'Product Sans, Arial, sans-serif',
          }}>
          <span role='img' aria-label='Spider' style={{ fontSize: '3rem', verticalAlign: 'middle', marginRight: '0.5rem' }}>
            🕷️
          </span>
          MDC&nbsp;
          <span style={{ color: '#4285F4' }}>G</span>
          <span style={{ color: '#EA4335' }}>o</span>
          <span style={{ color: '#FBBC05' }}>o</span>
          <span style={{ color: '#4285F4' }}>g</span>
          <span style={{ color: '#34A853' }}>l</span>
          <span style={{ color: '#EA4335' }}>e</span>
        </h1>
        <SearchBar onSearch={handleSearch} />

        {isLoading && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p>🕷️ Crawling MDC website...</p>
            <p style={{ fontSize: '14px', color: '#666' }}>This may take up to 2 minutes</p>
          </div>
        )}
        {!isLoading && results.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <p style={{ color: '#70757a', fontSize: '14px', marginBottom: '1rem' }}>About {results.length} results</p>
            {results.map((url, index) => (
              <Result key={index} title={`Result ${index + 1}`} url={url} description={`Sample description for ${url}`} />
            ))}
          </div>
        )}

        {results.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <p style={{ color: '#70757a', fontSize: '14px', marginBottom: '1rem' }}>About {results.length} results</p>
            {results.map((url, index) => (
              <Result key={index} title={`Result ${index + 1}`} url={url} description={`Sample description for ${url}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
