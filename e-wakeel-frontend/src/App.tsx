import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./assets/components/Navbar";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import LegalConsultation from "./pages/LegalConsultation/LegalConsultation";
import CourtAlerts from "./pages/CourtAlerts/CourtAlerts";
import FAQs from "./pages/FAQs/FAQs";
import AdvocateServices from "./pages/AdvocateServices/AdvocateServices";
import DocumentManagement from "./pages/DocumentManagement/DocumentManagement";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const location = useLocation();

  const noNavbarRoutes = ["/login", "/signup"];
  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  return (
    <div className="font-inter select-none">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/legal-consultation" element={<LegalConsultation />} />
        <Route path="/court-alerts" element={<CourtAlerts />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/document-management" element={<DocumentManagement />} />
        <Route path="/advocate-services" element={<AdvocateServices />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
