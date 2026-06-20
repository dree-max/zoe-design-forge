export function formatDate(
  dateStr: string,
  monthFormat: "short" | "long" = "short",
): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: monthFormat,
    year: "numeric",
  });
}
