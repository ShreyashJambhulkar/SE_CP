import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DonorDashboard from "./pages/DonorDashboard";
import NeedyDashboard from "./pages/NeedyDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import DonationPage from "./pages/DonationPage";
import RequestHelpPage from "./pages/RequestHelpPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/donate"
        element={
          <ProtectedRoute roles={["donor"]}>
            <DonationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/request-help"
        element={
          <ProtectedRoute roles={["needy"]}>
            <RequestHelpPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/donor"
        element={
          <ProtectedRoute roles={["donor"]}>
            <DonorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/needy"
        element={
          <ProtectedRoute roles={["needy"]}>
            <NeedyDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/volunteer"
        element={
          <ProtectedRoute roles={["volunteer"]}>
            <VolunteerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/panel"
        element={
          <ProtectedRoute roles={["volunteer"]}>
            <AdminPanelPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
