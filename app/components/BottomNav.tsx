"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav({
  onNavigate,
  onEmergency,
}: {
  onNavigate?: (id: string) => void;
  onEmergency: () => void;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const quickLinks = [
    { id: "overview", emoji: "📋", label: "Info", href: "/#overview" },
    { id: "flights", emoji: "✈️", label: "Flights", href: "/#flights" },
    { id: "emergency", emoji: "🚨", label: "SOS", href: "#" },
    { id: "topics", emoji: "📖", label: "Topics", href: "/topics" },
    { id: "context", emoji: "🌍", label: "Context", href: "/context" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--card)]/95 backdrop-blur-lg border-t border-[var(--card-border)] z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        {quickLinks.map((link) => {
          if (link.id === "emergency") {
            return (
              <button
                key={link.id}
                onClick={onEmergency}
                className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors text-red-400"
              >
                <span className="text-lg">{link.emoji}</span>
                <span className="text-[10px] font-medium">{link.label}</span>
              </button>
            );
          }

          if (isHome && onNavigate && (link.id === "overview" || link.id === "flights")) {
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors text-[var(--muted)] active:text-[var(--foreground)]"
              >
                <span className="text-lg">{link.emoji}</span>
                <span className="text-[10px] font-medium">{link.label}</span>
              </button>
            );
          }

          const isActive =
            (link.id === "topics" && (pathname === "/topics" || pathname.startsWith("/topics/"))) ||
            (link.id === "context" && pathname === "/context");

          return (
            <Link
              key={link.id}
              href={link.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                isActive
                  ? "text-red-400"
                  : "text-[var(--muted)] active:text-[var(--foreground)]"
              }`}
            >
              <span className="text-lg">{link.emoji}</span>
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
