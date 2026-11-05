import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { CookieBanner } from "./components/consent/CookieBanner";

// Pages
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Booking } from "./pages/Booking";
import { Availability } from "./pages/Availability";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Reviews } from "./pages/Reviews"; // Import real page
import { NotFound } from "./pages/NotFound"; // Import 404

// Policies
import { Terms } from "./pages/policies/Terms";
import { Privacy } from "./pages/policies/Privacy";
import { Cancellation } from "./pages/policies/Cancellation";
import { BookingFee } from "./pages/policies/BookingFee";
import { Cookies } from "./pages/policies/Cookies";
import { Refund } from "./pages/policies/Refund";

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white-soft font-sans">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />

          {/* Policies */}
          <Route path="/policies/terms" element={<Terms />} />
          <Route path="/policies/privacy" element={<Privacy />} />
          <Route path="/policies/cancellation" element={<Cancellation />} />
          <Route path="/policies/booking-fee" element={<BookingFee />} />
          <Route path="/policies/cookies" element={<Cookies />} />
          <Route path="/policies/refund" element={<Refund />} />

          {/* Catch all 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
