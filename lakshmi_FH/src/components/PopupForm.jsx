import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function PopupForm() {
  const [showPopup, setShowPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const location = useLocation();

  useEffect(() => {
    const popupRegistered = sessionStorage.getItem("popupRegistered");

    if (!popupRegistered) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setShowPopup(false);
    }
  }, [location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    sessionStorage.setItem("popupRegistered", "true");

    setError("");
    setSuccessMessage("Thank you! We’ll contact you soon.");
    setSuccessPopup(true);

    setTimeout(() => {
      setSuccessPopup(false);
      setShowPopup(false);
      setName("");
      setPhone("");
    }, 2000);
  };

  return (
    <AnimatePresence>
      {/* SUCCESS POPUP */}
      {successPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[10000]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white p-6 rounded-2xl shadow-2xl text-center max-w-sm mx-4"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <p className="text-xl font-bold text-gray-800">
              {successMessage}
            </p>
          </motion.div>
        </div>
      )}

      {/* MAIN POPUP */}
      {showPopup && !successPopup && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] px-4"
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-full p-1"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Welcome!
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Enter your details to get started with Lakshmi Function Hall.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone Number (10 digits)"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                />
              </div>

              {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-1 rounded-md">{error}</p>}

              <button
                type="submit"
                className="bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg mt-2"
              >
                Submit Details
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
