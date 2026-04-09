import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => (
  <>
    <Navbar />
    <main className="section">
      <div className="container contact-grid">
        <div>
          <h1>Contact Us</h1>
          <p>If you have questions or collaboration ideas, reach out to the volunteer team.</p>
          <div className="contact-item">
            <FiMail /> support@hopebridge.org
          </div>
          <div className="contact-item">
            <FiPhone /> +91 90000 12345
          </div>
          <div className="contact-item">
            <FiMapPin /> Community Hub, New Delhi, India
          </div>
        </div>
        <form className="card form">
          <h3>Send a Message</h3>
          <input placeholder="Your name" />
          <input placeholder="Your email" type="email" />
          <textarea rows="5" placeholder="Write your message" />
          <button type="button" className="btn">
            Submit
          </button>
        </form>
      </div>
    </main>
    <Footer />
  </>
);

export default ContactPage;
