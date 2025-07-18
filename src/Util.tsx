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

export async function fetchBackendLinks(searchTerm: string): Promise<string[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000);

    // Use relative URL since you have proxy configured
  //  const response = await fetch(`https://mdc-web-crowler-cf-821639951132.us-east1.run.app/?term=${encodeURIComponent(searchTerm)}`, {
    const response = await fetch(`https://mdc-web-crowler-cf-821639951132.us-east1.run.app/?term=${encodeURIComponent(searchTerm)}`, {
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);

    if (!data.matches || data.matches.length === 0) {
      console.log('No matches found in response');
      return [];
    }

    console.log(`Received ${data.matches.length} results`);
    return data.matches;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out after 2 minutes');
      }
      console.error('Error in fetchBackendLinks:', error.message);
    }
    console.error('Full error:', error);
    throw error;
  }
}
// "proxy": "https://mdc-web-crowler-cf-821639951132.us-east1.run.app",