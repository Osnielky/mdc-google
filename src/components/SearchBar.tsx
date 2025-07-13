import React, { useState } from 'react';

interface Props {
  onSearch: (url: string, pages: number) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [url, setUrl] = useState('');
  const [pages, setPages] = useState(100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    onSearch(url.trim(), pages);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Search URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.searchInput}
          required
        />
        <button
          type="submit"
          style={styles.button}
          onClick={() => alert('Searching... not implemented yet')}
        >
          🔍 Search
        </button>
      </div>
    </form>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '4rem',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
    border: '1px solid #dfe1e5',
    borderRadius: '24px',
    boxShadow: '0 1px 6px rgba(32, 33, 36, 0.28)',
    padding: '0.5rem 1rem',
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    padding: '0.5rem',
  },
  pageInput: {
    width: '80px',
    marginLeft: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '0.4rem',
    fontSize: '14px',
  },
  button: {
    marginLeft: '1rem',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dfe1e5',
    borderRadius: '4px',
    padding: '0.4rem 1rem',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default SearchBar;
