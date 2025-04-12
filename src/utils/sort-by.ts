type SortOrder = "asc" | "desc";

export function sortBy<T>(array: T[], key?: keyof T, order: SortOrder = "asc"): T[] {
  return [...array].sort((a, b) => {
    const valueA = key ? a[key] : a;
    const valueB = key ? b[key] : b;

    if (valueA < valueB) {
      return order === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
}
