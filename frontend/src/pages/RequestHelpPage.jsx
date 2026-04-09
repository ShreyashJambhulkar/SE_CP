import { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api";

const categories = ["food", "financial", "education", "essentials"];

const RequestHelpPage = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    category: "food",
    title: "",
    details: "",
    urgency: "medium",
    verificationDocument: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "verificationDocument") {
      setForm((prev) => ({ ...prev, verificationDocument: e.target.files[0] }));
      return;
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const payload = new FormData();
      payload.append("category", form.category);
      payload.append("title", form.title);
      payload.append("details", form.details);
      payload.append("urgency", form.urgency);
      if (form.verificationDocument) {
        payload.append("verificationDocument", form.verificationDocument);
      }

      await api.post("/needy/requests", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Help request submitted");
      setForm({
        category: "food",
        title: "",
        details: "",
        urgency: "medium",
        verificationDocument: null,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Request Help" subtitle="Submit your request for volunteer verification">
      <form className="card form" onSubmit={handleSubmit}>
        <select name="category" value={form.category} onChange={handleChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          name="title"
          placeholder="Request title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="details"
          rows="4"
          placeholder="Describe your need"
          value={form.details}
          onChange={handleChange}
          required
        />
        <select name="urgency" value={form.urgency} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input name="verificationDocument" type="file" onChange={handleChange} />

        <button className="btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </DashboardLayout>
  );
};

export default RequestHelpPage;
