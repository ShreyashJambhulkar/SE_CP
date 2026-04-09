import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { roleDashboardPath } from "../utils/roleHelpers";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await login(form);
      navigate(roleDashboardPath[user.role]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
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
            <h1>Login</h1>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button className="btn" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
            <p>
              New user? <Link to="/register">Create an account</Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
