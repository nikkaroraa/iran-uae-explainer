import { NewsArticle } from "./types";

// In-memory cache using globalThis to persist across hot reloads
const globalForNews = globalThis as unknown as {
  newsCache?: { articles: NewsArticle[]; updatedAt: string };
};

export function getNewsCache() {
  return globalForNews.newsCache;
}

export function setNewsCache(articles: NewsArticle[]) {
  globalForNews.newsCache = {
    articles,
    updatedAt: new Date().toISOString(),
  };
}

export async function fetchGoogleNews(): Promise<NewsArticle[]> {
  const res = await fetch(
    "https://news.google.com/rss/search?q=Iran+UAE+conflict&hl=en-US&gl=US&ceid=US:en",
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const xml = await res.text();
  return parseRssXml(xml);
}

function parseRssXml(xml: string): NewsArticle[] {
  const articles: NewsArticle[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;

  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const title = extractTag(itemXml, "title");
    const link = extractTag(itemXml, "link");
    const pubDate = extractTag(itemXml, "pubDate");
    const source = extractTag(itemXml, "source");

    if (title && link) {
      articles.push({
        title: decodeHtmlEntities(title),
        link,
        pubDate: pubDate || "",
        source: source || "Unknown",
      });
    }
  }

  return articles.slice(0, 20);
}

function extractTag(xml: string, tag: string): string | null {
  const regex = new RegExp(
    `<${tag}[^>]*>(?:<!\\[CDATA\\[)?(.*?)(?:\\]\\]>)?<\\/${tag}>`,
    "s"
  );
  const match = regex.exec(xml);
  return match ? match[1].trim() : null;
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}
