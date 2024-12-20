type KeyOf<T> = keyof T;
type SortOrder = "asc" | "desc";

export function sortBy<T>(array: T[], key: KeyOf<T>, order: SortOrder = "asc"): T[] {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
}
