export function InfoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5 ${className}`}
    >
      {children}
    </div>
  );
}

export function StatusBadge({
  status,
  label,
}: {
  status: "red" | "yellow" | "green";
  label: string;
}) {
  const colors = {
    red: "bg-red-500/20 text-red-400 border-red-500/30",
    yellow: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    green: "bg-green-500/20 text-green-400 border-green-500/30",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${colors[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "red"
            ? "bg-red-400"
            : status === "yellow"
            ? "bg-yellow-400"
            : "bg-green-400"
        }`}
      />
      {label}
    </span>
  );
}
