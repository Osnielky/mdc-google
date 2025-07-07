import React, { useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const [result, setResult] = useState<any>(null);

  const handleSearch = async (url: string, pages: number) => {
    try {
      const response = await fetch('https://your-api-endpoint.com/run-crawler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, pages }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error running crawler:', err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', paddingTop: '3rem' }}>
      <div style={{ maxWidth: '600px', width: '100%', padding: '2rem', boxSizing: 'border-box' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>MDC Web Crawler</h1>
      <SearchBar onSearch={handleSearch} />
      {result && (
        <pre style={{ marginTop: '2rem', background: '#f9f9f9', padding: '1rem' }}>
        {JSON.stringify(result, null, 2)}
        </pre>
      )}
      </div>
    </div>
  );
}

export default App;
