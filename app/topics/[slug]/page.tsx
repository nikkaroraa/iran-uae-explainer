import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TOPICS, getTopicBySlug, TOPIC_CATEGORIES } from "../../data/topics";
import PageShell from "../../components/PageShell";

interface WikiSummary {
  title: string;
  extract: string;
  description?: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  content_urls?: {
    desktop?: { page: string };
  };
}

async function fetchWikipediaSummary(
  wikipediaTitle: string
): Promise<WikiSummary | null> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        wikipediaTitle
      )}`,
      { next: { revalidate: 86400 } } // 24h ISR
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  return TOPICS.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const topic = getTopicBySlug(params.slug);
  if (!topic) return { title: "Topic Not Found" };

  return {
    title: `${topic.title} — Iran-UAE Conflict Explainer`,
    description: `Learn about ${topic.title} and its role in the Iran-UAE conflict.`,
  };
}

export default async function TopicDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const topic = getTopicBySlug(params.slug);
  if (!topic) notFound();

  const wiki = await fetchWikipediaSummary(topic.wikipediaTitle);

  const relatedTopics = topic.relatedSlugs
    .map((slug) => getTopicBySlug(slug))
    .filter(Boolean);

  const categoryInfo =
    TOPIC_CATEGORIES[topic.category as keyof typeof TOPIC_CATEGORIES];

  return (
    <PageShell>
      <div className="py-8 lg:py-12 max-w-2xl">
        {/* Back link */}
        <Link
          href="/topics"
          className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-6"
        >
          ← Back to Topics
        </Link>

        {/* Category badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-[var(--muted-bg)] border-[var(--card-border)] text-[var(--muted)]">
            {categoryInfo.emoji} {categoryInfo.label}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          {topic.emoji} {topic.title}
        </h1>

        {/* Wikipedia content */}
        {wiki ? (
          <div className="mt-6 space-y-6">
            {wiki.thumbnail && (
              <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl overflow-hidden">
                <Image
                  src={wiki.thumbnail.source}
                  alt={topic.title}
                  width={wiki.thumbnail.width}
                  height={wiki.thumbnail.height}
                  className="w-full max-h-64 object-cover"
                />
              </div>
            )}

            {wiki.description && (
              <p className="text-sm text-[var(--muted)] italic">
                {wiki.description}
              </p>
            )}

            <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
              <p className="text-sm leading-relaxed text-[var(--foreground)]">
                {wiki.extract}
              </p>
            </div>

            {wiki.content_urls?.desktop?.page && (
              <a
                href={wiki.content_urls.desktop.page}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                📚 Read more on Wikipedia →
              </a>
            )}
          </div>
        ) : (
          <div className="mt-6 bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
            <p className="text-sm text-[var(--muted)]">
              Information for this topic is currently unavailable. Please check
              back later.
            </p>
          </div>
        )}

        {/* Related topics */}
        {relatedTopics.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-[var(--card-border)]" />
              Related Topics
              <span className="flex-1 h-px bg-[var(--card-border)]" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedTopics.map((related) =>
                related ? (
                  <Link
                    key={related.slug}
                    href={`/topics/${related.slug}`}
                    className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 hover:border-[var(--muted)] hover:bg-[var(--muted-bg)] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{related.emoji}</span>
                      <span className="text-sm font-medium group-hover:text-red-400 transition-colors">
                        {related.title}
                      </span>
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          </div>
        )}

        {/* Context link */}
        <div className="mt-10 bg-[var(--muted-bg)] rounded-xl p-5">
          <p className="text-sm text-[var(--muted)]">
            Want to understand the full picture?
          </p>
          <Link
            href="/context"
            className="inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-300 font-medium mt-2 transition-colors"
          >
            🌍 Read the full war background →
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
