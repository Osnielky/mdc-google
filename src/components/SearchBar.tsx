import React, { useState } from 'react';
import { getRandomLinks} from '../Util';

interface Props {
  onSearch: (url: string, pages: number) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState(100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;
    onSearch(search.trim(), pages);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputContainer}>
        <input type='text' placeholder='Search URL...' value={search} onChange={(e) => setSearch(e.target.value)} style={styles.searchInput} required />

        <button
          type='button'
          style={{
            ...styles.button,
            backgroundColor: '#4285F4',
            color: '#fff',
            border: 'none',
          }}
          onClick={() => {
            console.log(`Searching mdc.edu...  <<${search}>>`);
            const mockResults = getRandomLinks(50);
            console.log(mockResults);
            // Call the onSearch prop to pass results to parent
            onSearch(search.trim(), pages);
          }}>
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
