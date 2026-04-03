export function formatDate(date: Date | string | null | undefined) {
  if (!date) return "Date not set";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
