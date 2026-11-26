import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";

// Auth Guard
import { ProtectedRoute } from "./admin/components/ProtectedRoute";

// Public Pages
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Booking } from "./pages/Booking";
import { Availability } from "./pages/Availability";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Reviews } from "./pages/Reviews";
import { NotFound } from "./pages/NotFound";
import { BookingConfirmation } from "./pages/BookingConfirmation";
import { Careers } from "./pages/Careers";

// Policies
import { Terms } from "./pages/policies/Terms";
import { Privacy } from "./pages/policies/Privacy";
import { Cancellation } from "./pages/policies/Cancellation";
import { BookingFee } from "./pages/policies/BookingFee";
import { Cookies } from "./pages/policies/Cookies";
import { Refund } from "./pages/policies/Refund";

// Admin Pages
import { AdminLayout } from "./admin/AdminLayout";
import { Login } from "./admin/Login";
import { Dashboard } from "./admin/Dashboard";
import { Appointments } from "./admin/Appointments";
import { AppointmentDetail } from "./admin/AppointmentDetail";
import { Services as AdminServices } from "./admin/Services";
import { BlockedSlots } from "./admin/BlockedSlots";
import { BusinessHours } from "./admin/BusinessHours";
import { Notifications } from "./admin/Notifications";
import { Payments } from "./admin/Payments";
import { Policies } from "./admin/Policies";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/careers" element={<Careers />} />

          <Route path="/policies/terms" element={<Terms />} />
          <Route path="/policies/privacy" element={<Privacy />} />
          <Route path="/policies/cancellation" element={<Cancellation />} />
          <Route path="/policies/booking-fee" element={<BookingFee />} />
          <Route path="/policies/cookies" element={<Cookies />} />
          <Route path="/policies/refund" element={<Refund />} />
          <Route
            path="/booking-confirmation"
            element={<BookingConfirmation />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ADMIN LOGIN — no sidebar, no protection */}
        <Route path="/admin" element={<Login />} />

        {/* ADMIN PROTECTED ROUTES — guarded, then rendered inside AdminLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/appointments" element={<Appointments />} />
            <Route
              path="/admin/appointments/:id"
              element={<AppointmentDetail />}
            />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/hours" element={<BusinessHours />} />
            <Route path="/admin/blocked" element={<BlockedSlots />} />
            <Route path="/admin/notifications" element={<Notifications />} />
            <Route path="/admin/payments" element={<Payments />} />
            <Route path="/admin/policies" element={<Policies />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
