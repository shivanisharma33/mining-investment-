/**
 * Downloads a remote PDF as a real .pdf file.
 *
 * The agenda PDFs are Cloudinary raw uploads served as application/octet-stream
 * with no file extension, and `<a download>` is ignored on cross-origin URLs —
 * so linking straight to them saves an extension-less file the OS cannot open.
 * Fetching the bytes first and re-tagging them as application/pdf makes the
 * blob same-origin, which restores both the correct type and the filename.
 */
export async function downloadPdf(
  sourceUrl: string,
  fileName: string
): Promise<void> {
  const res = await fetch(sourceUrl);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);

  const buffer = await res.arrayBuffer();
  const objectUrl = URL.createObjectURL(
    new Blob([buffer], { type: "application/pdf" })
  );

  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = fileName.toLowerCase().endsWith(".pdf")
    ? fileName
    : `${fileName}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(objectUrl);
}
