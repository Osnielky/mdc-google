import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Result from './components/reult';
import { getRandomLinks } from './Util';

function App() {
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (url: string, pages: number) => {
    setIsLoading(true);
    try {
      // For now, use mock data from getRandomLinks
      // Later replace this with actual API call
      const mockResults = getRandomLinks(50);
      setResults(mockResults);
      
      // Uncomment this when you have a backend API
      /*
      const response = await fetch('https://your-api-endpoint.com/run-crawler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, pages }),
      });
      const data = await response.json();
      setResults(data.results || []);
      */
    } catch (err) {
      console.error('Error running crawler:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', paddingTop: '3rem' }}>
      <div style={{ maxWidth: '600px', width: '100%', padding: '2rem', boxSizing: 'border-box' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'center', letterSpacing: '2px', fontFamily: 'Product Sans, Arial, sans-serif' }}>
          <span role="img" aria-label="Spider" style={{ fontSize: '3rem', verticalAlign: 'middle', marginRight: '0.5rem' }}>🕷️</span>
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
            <p>Searching...</p>
          </div>
        )}
        
        {results.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <p style={{ color: '#70757a', fontSize: '14px', marginBottom: '1rem' }}>
              About {results.length} results
            </p>
            {results.map((url, index) => (
              <Result
                key={index}
                title={`Result ${index + 1}`}
                url={url}
                description={`Sample description for ${url}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;