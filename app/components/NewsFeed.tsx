"use client";

import { useState, useEffect } from "react";
import { NewsArticle } from "../lib/types";
import { InfoCard } from "./InfoCard";

function timeAgo(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays}d ago`;
}

export default function NewsFeed() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      if (data.articles) {
        setArticles(data.articles);
        setUpdatedAt(data.updatedAt);
      }
    } catch {
      // Silently fail — news is supplementary
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // Auto-refresh every 30 minutes
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section id="news" className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          📰 Latest News
        </h2>
        <InfoCard>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-[var(--muted-bg)] rounded w-3/4 mb-2" />
                <div className="h-3 bg-[var(--muted-bg)] rounded w-1/4" />
              </div>
            ))}
          </div>
        </InfoCard>
      </section>
    );
  }

  if (articles.length === 0) {
    return null; // Don't show section if no news available
  }

  return (
    <section id="news" className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        📰 Latest News
      </h2>
      <InfoCard>
        <div className="space-y-1">
          <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
            {articles.map((article, i) => (
              <a
                key={i}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:bg-[var(--muted-bg)] rounded-lg px-3 py-2.5 -mx-1 transition-colors"
              >
                <p className="text-sm leading-snug font-medium line-clamp-2">
                  {article.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[var(--muted)]">
                    {article.source}
                  </span>
                  {article.pubDate && (
                    <>
                      <span className="text-xs text-[var(--muted)]">•</span>
                      <span className="text-xs text-[var(--muted)]">
                        {timeAgo(article.pubDate)}
                      </span>
                    </>
                  )}
                </div>
              </a>
            ))}
          </div>
          {updatedAt && (
            <p className="text-[10px] text-[var(--muted)] pt-2 border-t border-[var(--card-border)] mt-2">
              News feed updated {timeAgo(updatedAt)}
            </p>
          )}
        </div>
      </InfoCard>
    </section>
  );
}
