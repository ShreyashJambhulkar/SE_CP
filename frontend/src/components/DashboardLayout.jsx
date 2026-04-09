import Navbar from "./Navbar";
import Footer from "./Footer";

const DashboardLayout = ({ title, subtitle, children }) => (
  <>
    <Navbar />
    <main className="section">
      <div className="container">
        <header className="page-head">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </header>
        {children}
      </div>
    </main>
    <Footer />
  </>
);

export default DashboardLayout;
