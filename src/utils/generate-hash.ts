export function generateHash() {
  return (Date.now() + Math.random()).toString(36);
}
