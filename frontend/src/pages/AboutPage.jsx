import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage = () => (
  <>
    <Navbar />
    <main className="section">
      <div className="container prose">
        <h1>About HopeBridge NGO System</h1>
        <p>
          This platform was built as a Software Engineering project to demonstrate a complete full-stack
          architecture for NGO operations.
        </p>
        <p>
          The system supports three core personas: donors contributing resources, needy individuals
          submitting verified help requests, and volunteers managing approvals, assignments, and impact
          analytics.
        </p>
        <p>
          It is designed with modular code, REST APIs, and a dashboard-driven user experience suitable
          for both classroom demonstration and real-world extension.
        </p>
      </div>
    </main>
    <Footer />
  </>
);

export default AboutPage;
