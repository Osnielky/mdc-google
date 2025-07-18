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

// export async function fetchBackendLinks(searchTerm: string): Promise<string[]> {

export async function fetchBackendLinks(searchTerm: string): Promise<string[]> {
  console.log('=== Testing fake endpoint ===');
  console.log('Search term (not used by fake endpoint):', searchTerm);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('Request timing out after 2 minutes...');
      controller.abort();
    }, 120000);

    const url = 'https://mdc-fake-crowler-821639951132.europe-west1.run.app';
    console.log('Making request to fake endpoint:', url);
    
    const startTime = Date.now();
    
    // Match your exact curl command
    const response = await fetch(url, {
      method: 'POST',
      // Remove Content-Type header to match curl exactly
      body: '', // Empty body like your curl
      signal: controller.signal,
    });

    const endTime = Date.now();
    console.log(`Fake endpoint request completed in ${endTime - startTime}ms`);
    
    clearTimeout(timeoutId);
    console.log('Fake endpoint response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fake endpoint response data:', data);

    if (!data.matches || data.matches.length === 0) {
      console.log('No matches found in fake response');
      return [];
    }

    console.log(`Received ${data.matches.length} fake results`);
    return data.matches;
  } catch (error) {
    console.log('=== Fake endpoint error ===');
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('Fake endpoint request aborted/timed out');
        throw new Error('Request timed out after 2 minutes');
      }
      console.error('Fake endpoint error message:', error.message);
    }
    console.error('Full fake endpoint error:', error);
    throw error;
  }
}
//   try {
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 120000);

//     // Use relative URL since you have proxy configured
//   //  const response = await fetch(`https://mdc-web-crowler-cf-821639951132.us-east1.run.app/?term=${encodeURIComponent(searchTerm)}`, {
//     const response = await fetch(`https://mdc-fake-crowler-821639951132.europe-west1.run.app`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: '',
//       signal: controller.signal,
//     });

//     clearTimeout(timeoutId);
//     console.log('Response status:', response.status);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log('Response data:', data);

//     if (!data.matches || data.matches.length === 0) {
//       console.log('No matches found in response');
//       return [];
//     }

//     console.log(`Received ${data.matches.length} results`);
//     return data.matches;
//   } catch (error) {
//     if (error instanceof Error) {
//       if (error.name === 'AbortError') {
//         throw new Error('Request timed out after 2 minutes');
//       }
//       console.error('Error in fetchBackendLinks:', error.message);
//     }
//     console.error('Full error:', error);
//     throw error;
//   }
// }
// "proxy": "https://mdc-web-crowler-cf-821639951132.us-east1.run.app",