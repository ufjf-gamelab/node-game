import html2canvas from "html2canvas";

export async function downloadElementImage(el: HTMLElement, name: string) {
  const canvas = await html2canvas(el);
  const dataUrl = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = (name.replaceAll(" ", "-") + ".png").toLowerCase();
  link.click();
}
