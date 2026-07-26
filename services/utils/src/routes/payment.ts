import express from "express";
import { createRazorpayOrder, payWithStripe, verifyRazorpayPayment, verifyStripe, generateUpiQr } from "../controllers/payment.js";

const router = express.Router();

router.post("/create", createRazorpayOrder);
router.post("/verify", verifyRazorpayPayment);
router.post("/stripe/create", payWithStripe);
router.post("/upiqr", generateUpiQr);
router.post("/stripe/verify", verifyStripe);

export default router;
