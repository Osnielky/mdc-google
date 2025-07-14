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
        {result && <pre style={{ marginTop: '2rem', background: '#f9f9f9', padding: '1rem' }}>{JSON.stringify(result, null, 2)}</pre>}
      </div>
    </div>
  );
}

export default App;
