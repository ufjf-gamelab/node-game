export function flattenArray<T>(array: Array<T | Array<T>>): Array<T> {
  if (!Array.isArray(array[0])) return array as T[];
  return array.flat(Infinity) as T[];
}
