export function flattenArray<T>(array: (T | T[])[]): T[] {
  return array.flat(Infinity) as T[];
}
