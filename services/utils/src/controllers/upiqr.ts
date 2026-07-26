import { Request, Response } from "express";
import QRCode from "qrcode";
import dotenv from "dotenv";

dotenv.config();

// UPI ID for receiving payments (e.g., "yourname@bank")
const UPI_ID = process.env.UPI_ID;
if (!UPI_ID) {
  throw new Error("Missing UPI_ID environment variable for QR code generation");
}

/**
 * Generate a UPI payment QR code.
 * Expected body: { orderId: string, amount: number, name?: string }
 */
export const generateUPIQR = async (req: Request, res: Response) => {
  const { orderId, amount, name } = req.body;
  if (!orderId || typeof amount !== "number") {
    return res.status(400).json({ message: "orderId and numeric amount are required" });
  }

  const payeeName = encodeURIComponent(name || "Tomato Food");
  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${payeeName}&am=${amount}&tn=Order%20${orderId}`;

  try {
    const qrDataUrl = await QRCode.toDataURL(upiUrl);
    return res.json({ qrCode: qrDataUrl, upiUrl });
  } catch (err) {
    console.error("QR code generation error", err);
    return res.status(500).json({ message: "Failed to generate QR code" });
  }
};
