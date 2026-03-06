import Link from "next/link";
import { TOPICS, TOPIC_CATEGORIES } from "../data/topics";
import PageShell from "../components/PageShell";

export const metadata = {
  title: "Topics & Glossary — Iran-UAE Conflict Explainer",
  description:
    "Understand the key terms, weapons, locations, and organizations involved in the Iran-UAE conflict.",
};

export default function TopicsPage() {
  const categories = Object.entries(TOPIC_CATEGORIES) as [
    keyof typeof TOPIC_CATEGORIES,
    (typeof TOPIC_CATEGORIES)[keyof typeof TOPIC_CATEGORIES]
  ][];

  return (
    <PageShell>
      <div className="py-8 lg:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          📖 Topics & Glossary
        </h1>
        <p className="text-[var(--muted)] text-sm sm:text-base max-w-2xl leading-relaxed">
          Key terms, weapons systems, locations, and organizations involved in
          the Iran-UAE conflict. Click any topic to learn more.
        </p>
      </div>

      <div className="space-y-10 pb-12">
        {categories.map(([categoryKey, category]) => {
          const topicsInCategory = TOPICS.filter(
            (t) => t.category === categoryKey
          );
          if (topicsInCategory.length === 0) return null;

          return (
            <div key={categoryKey}>
              <h2 className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-[var(--card-border)]" />
                {category.emoji} {category.label}
                <span className="flex-1 h-px bg-[var(--card-border)]" />
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {topicsInCategory.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/topics/${topic.slug}`}
                    className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 hover:border-[var(--muted)] hover:bg-[var(--muted-bg)] transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{topic.emoji}</span>
                      <div>
                        <h3 className="text-sm font-semibold group-hover:text-red-400 transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-xs text-[var(--muted)] mt-1 capitalize">
                          {category.label}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
