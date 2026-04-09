import Razorpay from "razorpay";

let razorpayClient;

export const getRazorpayClient = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  const hasMissingKeys = !keyId || !keySecret;
  const hasPlaceholderKeys =
    keyId === "rzp_test_your_key_id" ||
    keySecret === "your_key_secret" ||
    keySecret === "replace_with_razorpay_secret";

  if (hasMissingKeys || hasPlaceholderKeys) {
    throw new Error("Razorpay keys are missing. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in backend/.env");
  }

  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }

  return razorpayClient;
};
