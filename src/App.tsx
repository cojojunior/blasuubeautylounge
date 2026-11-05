import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Booking } from "./pages/Booking";
import { Availability } from "./pages/Availability";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Reviews } from "./pages/Reviews";
import { NotFound } from "./pages/NotFound";

import { Terms } from "./pages/policies/Terms";
import { Privacy } from "./pages/policies/Privacy";
import { Cancellation } from "./pages/policies/Cancellation";
import { BookingFee } from "./pages/policies/BookingFee";
import { Cookies } from "./pages/policies/Cookies";
import { Refund } from "./pages/policies/Refund";

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

          <Route path="/policies/terms" element={<Terms />} />
          <Route path="/policies/privacy" element={<Privacy />} />
          <Route path="/policies/cancellation" element={<Cancellation />} />
          <Route path="/policies/booking-fee" element={<BookingFee />} />
          <Route path="/policies/cookies" element={<Cookies />} />
          <Route path="/policies/refund" element={<Refund />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
