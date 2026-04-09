import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api";

const categories = ["money", "food", "education", "clothes", "essentials"];

const DonationPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    category: "money",
    amount: "",
    quantity: 1,
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const startPayment = async (donationId) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      toast.error("Failed to load Razorpay");
      return;
    }

    const { data } = await api.post("/donor/payments/order", { donationId });
    const options = {
      key: data.key || import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: data.order.currency,
      name: "HopeBridge NGO",
      description: "Monetary donation",
      order_id: data.order.id,
      handler: async (response) => {
        await api.post("/donor/payments/verify", {
          ...response,
          donationId,
        });
        toast.success("Payment verified successfully");
        navigate("/dashboard/donor");
      },
      prefill: {},
      theme: { color: "#007BFF" },
      modal: {
        ondismiss: () => {
          toast("Payment cancelled");
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", () => {
      toast.error("Payment failed. Please try again.");
    });
    paymentObject.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...form,
        amount: Number(form.amount || 0),
        quantity: Number(form.quantity || 1),
      };

      const { data } = await api.post("/donor/donations", payload);
      toast.success(form.category === "money" ? "Donation created. Opening payment..." : "Donation submitted");

      if (form.category === "money") {
        await startPayment(data.donation._id);
        return;
      }

      setForm({ category: "money", amount: "", quantity: 1, description: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit donation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      title="Create Donation"
      subtitle="Tell us what you would like to contribute"
    >
      <form className="card form" onSubmit={handleSubmit}>
        <label>What would you like to contribute?</label>
        <select name="category" value={form.category} onChange={handleChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {form.category === "money" ? (
          <input
            name="amount"
            type="number"
            min="1"
            placeholder="Amount (INR)"
            value={form.amount}
            onChange={handleChange}
            required
          />
        ) : (
          <input
            name="quantity"
            type="number"
            min="1"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        )}

        <textarea
          name="description"
          rows="4"
          placeholder="Add details about your donation"
          value={form.description}
          onChange={handleChange}
          required
        />

        <button className="btn" disabled={loading}>
          {loading
            ? form.category === "money"
              ? "Preparing payment..."
              : "Submitting..."
            : form.category === "money"
            ? "Donate"
            : "Submit Donation"}
        </button>
      </form>
    </DashboardLayout>
  );
};

export default DonationPage;
