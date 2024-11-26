export function generateHash(seed: string | number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charsLength = chars.length;

  let hash = 0;
  const seedString = seed.toString();
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash * 31 + seedString.charCodeAt(i)) & 0xffffffff;
  }

  let result = "";
  while (result.length < 5) {
    hash = (hash * 31 + 17) & 0xffffffff;
    const index = Math.abs(hash % charsLength);
    result += chars[index];
  }

  return result;
}
