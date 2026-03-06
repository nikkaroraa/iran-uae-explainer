import { NextResponse } from "next/server";
import { getNewsCache, setNewsCache, fetchGoogleNews } from "../../lib/news";

export async function GET() {
  const cache = getNewsCache();

  if (cache && cache.articles.length > 0) {
    return NextResponse.json({
      articles: cache.articles,
      updatedAt: cache.updatedAt,
    });
  }

  // If no cache, try to fetch fresh
  try {
    const articles = await fetchGoogleNews();
    if (articles.length > 0) {
      setNewsCache(articles);
      return NextResponse.json({
        articles,
        updatedAt: new Date().toISOString(),
      });
    }
  } catch {
    // Fall through to empty response
  }

  return NextResponse.json({
    articles: [],
    updatedAt: null,
  });
}
