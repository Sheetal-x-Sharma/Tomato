# Implementation Plan

## Goal
Add a **UPI QR** payment option for the checkout flow using Razorpay's test VPA. The flow should:
1. Create an order (same as other payment methods).
2. Call a new backend endpoint `/api/payment/upiqr` that returns a QR‑code URL.
3. Show the QR code in a modal so the user can scan it with any UPI app (Google Pay, PhonePe, etc.).
4. Keep existing Razorpay and Stripe flows untouched.

## User Review Required
- A new **"Pay with UPI QR"** button will be added next to the Razorpay button. If you prefer to replace the Razorpay button instead, let me know.

## Open Questions
- Desired size of the QR image (default 250 × 250 is fine).
- Should the QR modal auto‑close after a short delay or only when the user clicks **Close**?

## Proposed Changes
---
### Backend (utils service)
#### [MODIFY] services/utils/src/controllers/payment.ts
- Import `process.env.RAZORPAY_UPI_VPA`.
- Add new handler `generateUpiQr`:
```ts
export const generateUpiQr = async (req: Request, res: Response) => {
  const { orderId } = req.body;
  if (!orderId) return res.status(400).json({ message: "orderId is required" });
  try {
    const { data } = await axios.get(`${process.env.RESTAURANT_SERVICE}/api/order/payment/${orderId}`, {
      headers: { "x-internal-key": process.env.INTERNAL_SERVICE_KEY },
    });
    const amount = Number(data.amount);
    if (isNaN(amount) || amount <= 0) return res.status(400).json({ message: "Invalid order amount" });
    const vpa = process.env.RAZORPAY_UPI_VPA;
    const upiUrl = `upi://pay?pa=${vpa}&pn=Tomato&am=${amount}&cu=INR`;
    const qrUrl = `https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${encodeURIComponent(upiUrl)}`;
    res.json({ qrUrl });
  } catch (e) {
    console.error("UPI QR generation error", e);
    res.status(500).json({ message: "Failed to generate UPI QR" });
  }
};
```
- Export the new handler.

#### [MODIFY] services/utils/src/routes/payment.ts
- Import `generateUpiQr`.
- Add route: `router.post("/upiqr", generateUpiQr);`

#### [NEW] services/utils/.env (if not present)
```env
RAZORPAY_UPI_VPA=test_tomato@razorpay   # test VPA for sandbox
# keep existing env vars – copy from your current .env
RESTAURANT_SERVICE=http://localhost:5000
INTERNAL_SERVICE_KEY=your-test-key
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=your_test_secret
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_test_XXXXXXXXXXXXXXXX
FRONTEND_URL=http://localhost:3000
```

### Frontend (Checkout page)
#### [MODIFY] frontend/src/pages/Checkout.tsx
- Add new state variables:
```tsx
const [showQr, setShowQr] = useState(false);
const [qrUrl, setQrUrl] = useState<string>("");
const [loadingUPI, setLoadingUPI] = useState(false);
```
- Implement `payWithUPI` function:
```tsx
const payWithUPI = async () => {
  try {
    setLoadingUPI(true);
    const order = await createOrder("upi");
    if (!order) return;
    const { orderId } = order;
    const { data } = await axios.post(`${utilsService}/api/payment/upiqr`, { orderId });
    setQrUrl(data.qrUrl);
    setShowQr(true);
  } catch (e) {
    toast.error("Failed to generate UPI QR");
  } finally {
    setLoadingUPI(false);
  }
};
```
- Add a new button after the Razorpay button:
```tsx
<button
  disabled={!selectedAddressId || loadingUPI || creatingOrder}
  onClick={payWithUPI}
  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00B894] py-3 text-sm font-semibold text-white hover:bg-[#019E7C] disabled:opacity-50"
>
  {loadingUPI ? <BiLoader size={18} className="animate-spin" /> : <BiCreditCard size={18} />}
  Pay with UPI QR
</button>
```
- Add a modal JSX block at the end of the component render:
```tsx
{showQr && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
      <h3 className="text-lg font-semibold mb-2">Scan UPI QR to Pay</h3>
      <img src={qrUrl} alt="UPI QR" className="mx-auto" />
      <button
        onClick={() => setShowQr(false)}
        className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Close
      </button>
    </div>
  </div>
)}
```
- Ensure `BiLoader` import already exists (it does).

## Verification Plan
- **Backend**: Run the utils service (`npm run dev`) and POST to `/api/payment/upiqr` with a valid `orderId`. Expect JSON `{ "qrUrl": "…" }`.
- **Frontend**: Start the React dev server, navigate to Checkout, select an address, click **Pay with UPI QR**. The QR modal should appear. Scan with a UPI app – Razorpay test mode will show a *Test payment* screen.
- Existing Razorpay and Stripe flows remain unchanged.

---
**Please confirm**:
- Do you want the new **Pay with UPI QR** button added as described, or should we replace the current Razorpay button?
- Any styling preferences for the QR modal (size, colors)?
