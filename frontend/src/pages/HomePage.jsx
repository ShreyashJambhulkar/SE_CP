import { Link } from "react-router-dom";
import { FiBookOpen, FiBox, FiDollarSign, FiShield, FiUsers } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categories = [
  { icon: <FiDollarSign />, title: "Money", desc: "Support urgent financial needs." },
  { icon: <FiBox />, title: "Food", desc: "Contribute meals and groceries." },
  { icon: <FiBookOpen />, title: "Education", desc: "Sponsor books, fees, or learning kits." },
  { icon: <FiShield />, title: "Essentials", desc: "Donate clothes and daily utilities." },
];

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="hero section">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">NGO Management Platform</p>
              <h1>Connect Donors, Volunteers, and Families In Need</h1>
              <p>
                HopeBridge simplifies donation workflows, help request verification, and impact tracking
                in one secure system.
              </p>
              <div className="hero-actions">
                <Link to="/register" className="btn">
                  Join the Platform
                </Link>
                <Link to="/about" className="btn ghost">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hero-card">
              <h3>What would you like to contribute?</h3>
              <p>Choose a category and instantly create a donation pledge.</p>
              <div className="hero-badges">
                <span>Money</span>
                <span>Food</span>
                <span>Education</span>
                <span>Clothes</span>
                <span>Essentials</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>Contribution Categories</h2>
              <p>Multiple ways to create meaningful social impact.</p>
            </div>
            <div className="grid-4">
              {categories.map((item) => (
                <article className="feature-card" key={item.title}>
                  <div className="feature-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section highlight">
          <div className="container mini-grid">
            <article>
              <FiUsers />
              <h3>Role-based dashboards</h3>
              <p>Dedicated interfaces for donor, needy person, and volunteer.</p>
            </article>
            <article>
              <FiShield />
              <h3>Secure workflows</h3>
              <p>JWT authentication, encrypted passwords, and protected routes.</p>
            </article>
            <article>
              <FiBookOpen />
              <h3>Clear impact records</h3>
              <p>Track request approvals and assignments from one panel.</p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
