import { Request, Response } from "express";
import axios from "axios";
import { razorpay } from "../config/razorpay.js";
import { verifyRazorpaySignature } from "../config/verifyRazorpay.js";
import { publishPaymentSuccess } from "../config/payment.producer.js";
import dotenv from "dotenv";

dotenv.config();

export const createRazorpayOrder = async (req: Request, res: Response) => {
  const { orderId } = req.body;
  if (!orderId) {
    return res.status(400).json({ message: "orderId is required" });
  }
  try {
    const { data } = await axios.get(
      `${process.env.RESTAURANT_SERVICE}/api/order/payment/${orderId}`,
      {
        headers: {
          "x-internal-key": process.env.INTERNAL_SERVICE_KEY,
        },
      }
    );
    const amount = Number(data.amount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid order amount" });
    }
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: orderId,
    });
    res.json({ razorpayOrderId: razorpayOrder.id, key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.error("Razorpay order creation error", error);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
};

export const verifyRazorpayPayment = async (req: Request, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const isValid = verifyRazorpaySignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );
  if (!isValid) {
    return res.status(400).json({ message: "Payment verification failed" });
  }
  await publishPaymentSuccess({ orderId, paymentId: razorpay_payment_id, provider: "razorpay" });
  res.json({ message: "Payment verified successfully" });
};

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const payWithStripe = async (req: Request, res: Response) => {
  const { orderId } = req.body;
  if (!orderId) {
    return res.status(400).json({ message: "orderId is required" });
  }
  try {
    const { data } = await axios.get(
      `${process.env.RESTAURANT_SERVICE}/api/order/payment/${orderId}`,
      {
        headers: { "x-internal-key": process.env.INTERNAL_SERVICE_KEY },
      }
    );
    const amount = Number(data.amount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid order amount" });
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "inr",
          product_data: { name: "Tomato food order" },
          unit_amount: amount * 100,
        },
        quantity: 1,
      }],
      metadata: { orderId },
      success_url: `${process.env.FRONTEND_URL}/ordersuccess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe payment creation error", error);
    res.status(500).json({ message: "Stripe payment failed" });
  }
};

export const verifyStripe = async (req: Request, res: Response) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ message: "sessionId is required" });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return res.status(400).json({ message: "Payment verification failed" });
    }
    const orderId = session.metadata?.orderId;
    if (!orderId) {
      return res.status(400).json({ message: "orderId missing in Stripe session" });
    }
    await publishPaymentSuccess({ orderId, paymentId: sessionId, provider: "stripe" });
    res.json({ message: "payment verified successfully" });
  } catch (error) {
    console.error("Stripe verification error", error);
    res.status(500).json({ message: "Stripe verification failed" });
  }
};

export const generateUpiQr = async (req: Request, res: Response) => {
  const { orderId } = req.body;
  if (!orderId) return res.status(400).json({ message: "orderId is required" });
  try {
    const { data } = await axios.get(
      `${process.env.RESTAURANT_SERVICE}/api/order/payment/${orderId}`,
      { headers: { "x-internal-key": process.env.INTERNAL_SERVICE_KEY } }
    );
    const amount = Number(data.amount);
    if (isNaN(amount) || amount <= 0) return res.status(400).json({ message: "Invalid order amount" });
    const vpa = process.env.RAZORPAY_UPI_VPA || 'test@razorpay';
    const upiUrl = `upi://pay?pa=${vpa}&pn=Tomato&am=${amount}&cu=INR`;
    const qrUrl = `https://quickchart.io/qr?text=${encodeURIComponent(upiUrl)}&size=250`;
    res.json({ qrUrl });
  } catch (e) {
    console.error("UPI QR generation error", e);
    res.status(500).json({ message: "Failed to generate UPI QR" });
  }
};
