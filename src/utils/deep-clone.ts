export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    const arrCopy = [] as unknown as T;
    (obj as unknown as any[]).forEach((_, i) => {
      (arrCopy as unknown as any[])[i] = deepClone((obj as unknown as any[])[i]);
    });
    return arrCopy;
  }

  const objCopy = {} as T;
  Object.keys(obj).forEach((key) => {
    (objCopy as any)[key] = deepClone((obj as any)[key]);
  });
  return objCopy;
}
