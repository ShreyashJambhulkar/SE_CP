import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { roleDashboardPath } from "../utils/roleHelpers";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "donor",
    governmentId: "",
    incomeRange: "",
    familySize: "",
    notes: "",
  });

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
      address: form.address,
      role: form.role,
    };

    if (form.role === "needy") {
      payload.verificationDetails = {
        governmentId: form.governmentId,
        incomeRange: form.incomeRange,
        familySize: Number(form.familySize || 0),
        notes: form.notes,
      };
    }

    try {
      setLoading(true);
      const user = await register(payload);
      navigate(roleDashboardPath[user.role]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="section">
        <div className="container auth-wrap">
          <form className="card form" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input name="name" placeholder="Full name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input
              name="password"
              type="password"
              minLength="6"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <input name="phone" placeholder="Phone" onChange={handleChange} />
            <input name="address" placeholder="Address" onChange={handleChange} />

            <select name="role" onChange={handleChange} value={form.role}>
              <option value="donor">Donor</option>
              <option value="needy">Needy Person</option>
              <option value="volunteer">Volunteer</option>
            </select>

            {form.role === "needy" && (
              <>
                <input name="governmentId" placeholder="Government ID" onChange={handleChange} />
                <input name="incomeRange" placeholder="Income range" onChange={handleChange} />
                <input name="familySize" type="number" placeholder="Family size" onChange={handleChange} />
                <textarea name="notes" rows="3" placeholder="Verification notes" onChange={handleChange} />
              </>
            )}

            <button className="btn" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RegisterPage;
