import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Result from './components/reult';
import { fetchBackendLinks } from './Util';

interface SearchResult {
  url: string;
  score: number;
  relevance: number;
  pagerank: number;
}

function App() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState<number>(0);

  const handleSearch = async (url: string, pages: number) => {
    console.log('handleSearch called with:', url, pages);

    // Clear previous results immediately when starting a new search
    setResults([]);
    setTotalResults(0);
    setIsLoading(true);

    try {
      console.log('About to call fetchBackendLinks');
      const searchResults = await fetchBackendLinks(url);
      console.log('fetchBackendLinks returned:', searchResults);
      setResults(searchResults);
      setTotalResults(searchResults.length);
    } catch (err) {
      console.error('Error running crawler:', err);
      setResults([]);
      setTotalResults(0);
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
          MDC-&nbsp;
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
            <p>🕷️ Searching MDC</p>
            <p style={{ fontSize: '14px', color: '#666' }}>This will be fast</p>
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <p style={{ color: '#70757a', fontSize: '14px', marginBottom: '1rem' }}>About {results.length} results</p>
            {results.map((result, index) => (
              <Result
                key={index}
                title={`Result ${index + 1} - Score: ${result.score.toFixed(3)}`}
                url={result.url}
                description={`Relevance: ${result.relevance.toFixed(3)} | PageRank: ${result.pagerank.toFixed(3)} | Score: ${result.score.toFixed(3)}`}
              />
            ))}
          </div>
        )}

        {!isLoading && results.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem' }}>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '1rem' }}>🔍 No results found</p>
            <p style={{ fontSize: '14px', color: '#999' }}>Try searching with different keywords or check your spelling</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
