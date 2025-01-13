export function downloadFile(file: File | Blob, fileName: string) {
  const linkEl = document.createElement("a");
  linkEl.href = URL.createObjectURL(file);
  linkEl.download = fileName;
  document.body.appendChild(linkEl);
  linkEl.click();
}
