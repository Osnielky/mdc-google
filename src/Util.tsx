export function getRandomLinks(count: number = 20): string[] {
  const links: string[] = [];
  const domains = [
    'example.com',
    'testsite.org',
    'mywebsite.net',
    'randompage.io',
    'coolstuff.co',
    'funnylinks.biz',
    'sampledomain.com',
    'webpage.info',
    'fakesite.xyz',
    'demoapp.dev',
  ];
  for (let i = 0; i < count; i++) {
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const path = Math.random().toString(36).substring(2, 8);
    links.push(`https://${domain}/${path}`);
  }
  return links;
}

interface SearchResult {
  url: string;
  score: number;
  relevance: number;
  pagerank: number;
}

interface BackendResponse {
  results: SearchResult[];
  total_results: number;
}

export async function fetchBackendLinks(searchTerm: string): Promise<SearchResult[]> {
  console.log('=== Calling backend directly (no proxy) ===');
  console.log('Search term:', searchTerm);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('Request timing out...');
      controller.abort();
    }, 120000);

    // Use direct URL (no proxy needed for Cloud Run to Cloud Run)
    const url = `https://mdc-bknd-crawler-821639951132.europe-west1.run.app/?searchTerm=${encodeURIComponent(searchTerm)}`;
    console.log('Making direct request to:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data: BackendResponse = await response.json();
    console.log('Response data:', data);
    console.log('Total results found:', data.total_results);

    if (!data.results || data.results.length === 0) {
      console.log('No results found in response');
      return [];
    }

    console.log(`Received ${data.results.length} results out of ${data.total_results} total`);
    return data.results;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('Request timed out after 2 minutes');
        throw new Error('Request timed out after 2 minutes');
      }
      console.error('Error in fetchBackendLinks:', error.message);
    }
    console.error('Full error:', error);
    throw error;
  }
}


// "proxy": "https://mdc-bknd-crawler-821639951132.europe-west1.run.app",