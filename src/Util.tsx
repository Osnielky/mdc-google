export function getRandomLinks(count: number = 20): string[] {
    const links: string[] = [];
    const domains = [
        "example.com", "testsite.org", "mywebsite.net", "randompage.io",
        "coolstuff.co", "funnylinks.biz", "sampledomain.com", "webpage.info",
        "fakesite.xyz", "demoapp.dev"
    ];
    for (let i = 0; i < count; i++) {
        const domain = domains[Math.floor(Math.random() * domains.length)];
        const path = Math.random().toString(36).substring(2, 8);
        links.push(`https://${domain}/${path}`);
    }
    return links;
}