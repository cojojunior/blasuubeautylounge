import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Booking } from "./pages/Booking";

// Import the individual policy pages
import { Terms } from "./pages/policies/Terms";
import { Privacy } from "./pages/policies/Privacy";
import { Cancellation } from "./pages/policies/Cancellation";
import { BookingFee } from "./pages/policies/BookingFee";
import { Cookies } from "./pages/policies/Cookies";
import { Refund } from "./pages/policies/Refund";

const About = () => (
  <div className="py-32 text-center">
    <h1 className="text-4xl font-serif">About Blasuu</h1>
    <p className="mt-4 text-elephant-muted">Coming soon.</p>
  </div>
);
const Contact = () => (
  <div className="py-32 text-center">
    <h1 className="text-4xl font-serif">Contact Us</h1>
    <p className="mt-4 text-elephant-muted">
      Contact page details coming soon.
    </p>
  </div>
);
const Reviews = () => (
  <div className="py-32 text-center">
    <h1 className="text-4xl font-serif">Reviews</h1>
    <p className="mt-4 text-elephant-muted">Google API integration pending.</p>
  </div>
);

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white-soft font-sans">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route
            path="/availability"
            element={
              <div className="py-32 text-center">
                <h1 className="text-4xl font-serif">Availability Calendar</h1>
              </div>
            }
          />

          {/* Policy Routes */}
          <Route path="/policies/terms" element={<Terms />} />
          <Route path="/policies/privacy" element={<Privacy />} />
          <Route path="/policies/cancellation" element={<Cancellation />} />
          <Route path="/policies/booking-fee" element={<BookingFee />} />
          <Route path="/policies/cookies" element={<Cookies />} />
          <Route path="/policies/refund" element={<Refund />} />
        </Route>
      </Routes>
    </Router>
  );
}
