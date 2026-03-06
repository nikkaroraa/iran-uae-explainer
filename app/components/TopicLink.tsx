import Link from "next/link";

export default function TopicLink({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={`/topics/${slug}`}
      className="text-blue-400 hover:text-blue-300 border-b border-dotted border-blue-400/50 hover:border-blue-300 transition-colors"
    >
      {children}
    </Link>
  );
}
