/** Max original file size before we refuse to read it (bytes). */
export const MAX_IMAGE_UPLOAD_BYTES = 2 * 1024 * 1024; // 2 MB

/** Soft target after compression (base64 grows ~33%). */
export const TARGET_IMAGE_BYTES = 700 * 1024;

export function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/** Approximate decoded size of a data-URL image. */
export function estimateDataUrlBytes(dataUrl: string) {
  if (!dataUrl.startsWith("data:")) return 0;
  const comma = dataUrl.indexOf(",");
  if (comma < 0) return 0;
  const base64 = dataUrl.slice(comma + 1);
  return Math.floor((base64.length * 3) / 4);
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) reject(new Error("Could not read that image."));
      else resolve(result);
    };
    reader.onerror = () => reject(new Error("Could not read that image."));
    reader.readAsDataURL(file);
  });
}

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that image."));
    };
    img.src = url;
  });
}

/**
 * Compress / resize an image for CMS storage (data URL).
 * Keeps the original when it is already small enough.
 */
export async function prepareImageDataUrl(
  file: File,
  variant: "logo" | "photo" = "photo",
): Promise<{ dataUrl: string; originalBytes: number; resultBytes: number }> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose a PNG, JPG, or WEBP image.");
  }
  if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
    throw new Error(
      `This file is ${formatBytes(file.size)}. Maximum allowed is ${formatBytes(MAX_IMAGE_UPLOAD_BYTES)}. Choose a smaller image.`,
    );
  }

  const originalDataUrl = await readFileAsDataUrl(file);
  const img = await loadImageFromFile(file);
  const maxEdge = variant === "logo" ? 512 : 1600;
  const needsResize = Math.max(img.width, img.height) > maxEdge;

  // Keep original when already within size and dimensions
  if (!needsResize && file.size <= TARGET_IMAGE_BYTES) {
    return {
      dataUrl: originalDataUrl,
      originalBytes: file.size,
      resultBytes: file.size,
    };
  }

  const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process that image.");
  ctx.drawImage(img, 0, 0, width, height);

  const preferPng =
    variant === "logo" ||
    file.type === "image/png" ||
    file.type === "image/webp";

  let dataUrl: string;
  let resultBytes: number;

  if (preferPng) {
    dataUrl = canvas.toDataURL("image/png");
    resultBytes = estimateDataUrlBytes(dataUrl);
    if (resultBytes > TARGET_IMAGE_BYTES) {
      let quality = 0.88;
      dataUrl = canvas.toDataURL("image/jpeg", quality);
      resultBytes = estimateDataUrlBytes(dataUrl);
      while (resultBytes > TARGET_IMAGE_BYTES && quality > 0.45) {
        quality -= 0.08;
        dataUrl = canvas.toDataURL("image/jpeg", quality);
        resultBytes = estimateDataUrlBytes(dataUrl);
      }
    }
  } else {
    let quality = 0.82;
    dataUrl = canvas.toDataURL("image/jpeg", quality);
    resultBytes = estimateDataUrlBytes(dataUrl);
    while (resultBytes > TARGET_IMAGE_BYTES && quality > 0.45) {
      quality -= 0.08;
      dataUrl = canvas.toDataURL("image/jpeg", quality);
      resultBytes = estimateDataUrlBytes(dataUrl);
    }
  }

  // Prefer original if compression made it larger
  if (resultBytes >= file.size && file.size <= TARGET_IMAGE_BYTES) {
    return {
      dataUrl: originalDataUrl,
      originalBytes: file.size,
      resultBytes: file.size,
    };
  }

  if (resultBytes > TARGET_IMAGE_BYTES) {
    throw new Error(
      `After compressing, this image is still ${formatBytes(resultBytes)} (limit ${formatBytes(TARGET_IMAGE_BYTES)}). Try a smaller or simpler image.`,
    );
  }

  return { dataUrl, originalBytes: file.size, resultBytes };
}
