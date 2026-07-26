/**
 * Pass Generator — Direct 3in × 4in high-res Canvas Renderer & PDF Exporter.
 *
 * Designed to be 100% fail-proof: draws the badge directly onto a 300 DPI canvas
 * using native 2D context drawing operations. No html2canvas or DOM capture issues!
 */

import QRCode from "qrcode";
import jsPDF from "jspdf";
import { EVENT } from "../config/site.config";

export interface PassData {
  id: string;
  fullName: string;
  gender: string;
  dob: string;
  qrDataUrl: string;
  issuedAt: string;
}

/**
 * Generate a high-res QR code base64 image.
 */
export async function generateQRDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    width: 300,
    margin: 1,
    color: { dark: "#270585", light: "#ffffff" },
    errorCorrectionLevel: "H",
  });
}

/**
 * Renders the 3in × 4in Visitor Pass onto an HTML5 Canvas at 300 DPI (900px × 1200px).
 * Returns a high-definition PNG base64 data URL instantly.
 */
export async function renderPassToCanvasDataUrl(data: PassData): Promise<string> {
  const width = 900;  // 3 in * 300 dpi
  const height = 1200; // 4 in * 300 dpi

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas 2D context");

  // Enable font smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // 1. White Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // 2. Top Accent Gradient Bar (height: 18px)
  const topGrad = ctx.createLinearGradient(0, 0, width, 0);
  topGrad.addColorStop(0, "#270585");
  topGrad.addColorStop(0.5, "#850527");
  topGrad.addColorStop(1, "#270585");
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, width, 18);

  // 3. TOP SECTION — Logo Only
  const logoX = width / 2;
  const logoY = 135;
  
  // Draw modern vector logo mark
  ctx.beginPath();
  ctx.arc(logoX, logoY, 50, 0, Math.PI * 2);
  const logoGrad = ctx.createLinearGradient(logoX - 50, logoY - 50, logoX + 50, logoY + 50);
  logoGrad.addColorStop(0, "#270585");
  logoGrad.addColorStop(1, "#850527");
  ctx.fillStyle = logoGrad;
  ctx.fill();

  // Event abbreviation (first letters of each word)
  const abbr = EVENT.name.split(" ").map(w => w[0]).join("").substring(0, 3) || "BAE";
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px Sora, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(abbr, logoX, logoY);

  // Event Name & Year
  ctx.fillStyle = "#12033a";
  ctx.font = "black 32px Sora, Arial, sans-serif";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(`${EVENT.name.toUpperCase()} ${EVENT.year}`, width / 2, 235);

  // 4. MIDDLE SECTION — QR Code, ID, Name
  if (data.qrDataUrl) {
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const qrSize = 340;
        const qrX = (width - qrSize) / 2;
        const qrY = 300;
        
        // QR Container border
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(qrX - 12, qrY - 12, qrSize + 24, qrSize + 24);
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 2;
        ctx.strokeRect(qrX - 12, qrY - 12, qrSize + 24, qrSize + 24);
        
        ctx.drawImage(img, qrX, qrY, qrSize, qrSize);
        resolve();
      };
      img.onerror = () => resolve();
      img.src = data.qrDataUrl;
    });
  }

  // Unique Visitor ID
  ctx.fillStyle = "#270585";
  ctx.font = "bold 44px 'Courier New', Courier, monospace";
  ctx.fillText(data.id, width / 2, 725);

  // Visitor Name
  ctx.fillStyle = "#0f172a";
  ctx.font = "extrabold 40px Sora, Arial, sans-serif";
  ctx.fillText(data.fullName.toUpperCase(), width / 2, 795);

  // 5. BOTTOM SECTION — Event Details with Gradient Background
  const bottomY = 880;
  const bottomHeight = height - bottomY;

  const bottomGrad = ctx.createLinearGradient(0, bottomY, width, height);
  bottomGrad.addColorStop(0, "#270585");
  bottomGrad.addColorStop(0.5, "#1d085e");
  bottomGrad.addColorStop(1, "#850527");
  ctx.fillStyle = bottomGrad;
  ctx.fillRect(0, bottomY, width, bottomHeight);

  // Date
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px Sora, Arial, sans-serif";
  ctx.fillText(EVENT.dates.toUpperCase(), width / 2, bottomY + 75);

  // Time
  ctx.fillStyle = "#e4e2f6";
  ctx.font = "500 26px Inter, Arial, sans-serif";
  ctx.fillText("10:00 AM – 7:00 PM DAILY", width / 2, bottomY + 130);

  // Venue
  ctx.fillStyle = "#e4e2f6";
  ctx.font = "500 24px Inter, Arial, sans-serif";
  // Wrap venue to 2 lines if needed
  const venueText = EVENT.venue.toUpperCase();
  if (venueText.length > 35) {
    ctx.fillText("BIEC, BENGALURU, INDIA", width / 2, bottomY + 185);
  } else {
    ctx.fillText(venueText, width / 2, bottomY + 185);
  }

  // Website
  ctx.fillStyle = "#f0d27a"; // Gold
  ctx.font = "bold 28px Sora, Arial, sans-serif";
  ctx.fillText(EVENT.website || "bengaluruautoexpo.in", width / 2, bottomY + 245);

  return canvas.toDataURL("image/png");
}

/**
 * Trigger browser download of image.
 */
export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * PDF Exporter:
 * - Custom size of exactly 3 inches wide × 4 inches high.
 * - Fits the 3in × 4in pass perfectly without surrounding margins/borders.
 */
export function downloadPdf(imgDataUrl: string, filename: string) {
  // Custom document size: 3in × 4in
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: [3, 4],
  });

  // Since doc is exactly 3x4, draw it covering the full page
  pdf.addImage(imgDataUrl, "PNG", 0, 0, 3, 4, undefined, "FAST");
  pdf.save(filename);
}

/**
 * Generates the raw base64 string of the print-compatible 3x4 PDF pass.
 */
export function generatePdfBase64(imgDataUrl: string): string {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: [3, 4],
  });
  pdf.addImage(imgDataUrl, "PNG", 0, 0, 3, 4, undefined, "FAST");
  const dataUri = pdf.output("datauristring");
  return dataUri.split(",")[1];
}

/**
 * DOM capture fallback.
 */
export async function captureElement(el: HTMLElement): Promise<string> {
  try {
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(el, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });
    return canvas.toDataURL("image/png");
  } catch {
    return "";
  }
}
