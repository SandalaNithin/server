import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./pages/About";
import Home from "./pages/Home";
import ContactPage from "./pages/Contact";
import PrivacyPolicy from "./pages/Privacy";
import BookingCalendar from "./components/BookingCalendar";
import { AnimatePresence } from "framer-motion";

function AnimatedApp() {
  const location = useLocation();

  return (
    <>
      <Header />

      <AnimatePresence mode="wait">
        <main className="flex-grow" key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/booking" element={<BookingCalendar />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AnimatedApp />
      </Router>
    </HelmetProvider>
  );
}
