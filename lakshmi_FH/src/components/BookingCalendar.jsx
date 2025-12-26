import { useState, useEffect } from "react";
import { CalendarDays, Check, Users, Info, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sendBooking, getBlockedDates } from "../util/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO, isWithinInterval } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingCalendar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", eventType: "", guests: "", fromDate: null, toDate: null, checkIn: null, checkOut: null, message: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blockedDateRanges, setBlockedDateRanges] = useState([]);
  const [isLoadingDates, setIsLoadingDates] = useState(true);

  // Fetch blocked dates on component mount
  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        console.log("🟢 Fetching blocked dates from API...");
        const response = await getBlockedDates();
        console.log("🟢 API Response:", response.data);
        if (response.data.success) {
          setBlockedDateRanges(response.data.data);
          console.log("🟢 Blocked Date Ranges Set:", response.data.data);
        }
      } catch (error) {
        console.error("❌ Failed to fetch blocked dates:", error);
      } finally {
        setIsLoadingDates(false);
      }
    };
    fetchBlockedDates();
  }, []);

  // Helper function to check if a date is blocked
  const isDateBlocked = (date) => {
    if (!date) return false;

    const blocked = blockedDateRanges.some(range => {
      const from = parseISO(range.fromDate);
      const to = parseISO(range.toDate);

      // Set time to midnight for accurate date comparison
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      from.setHours(0, 0, 0, 0);
      to.setHours(0, 0, 0, 0);

      return isWithinInterval(checkDate, { start: from, end: to });
    });

    if (blocked) {
      console.log("🔴 Date blocked:", format(date, "yyyy-MM-dd"));
    }
    return blocked;
  };

  // Custom day class for styling blocked dates
  const getDayClassName = (date) => {
    if (isDateBlocked(date)) {
      return "blocked-date";
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleDateChange = (date, field) => {
    setFormData(prev => ({ ...prev, [field]: date }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(formData.phone)) e.phone = "Enter a valid 10-digit phone number";
    if (!formData.eventType) e.eventType = "Select an event type";
    if (!formData.guests || isNaN(formData.guests) || parseInt(formData.guests) <= 0) e.guests = "Enter a valid number of guests";
    if (!formData.fromDate) e.fromDate = "From date required";
    if (!formData.toDate) e.toDate = "To date required";
    if (formData.fromDate && formData.toDate && formData.fromDate > formData.toDate) {
      e.toDate = "To Date cannot be before From Date";
    }
    if (!formData.checkIn) e.checkIn = "Check-in time required";
    if (!formData.checkOut) e.checkOut = "Check-out time required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      return setErrors(newErrors);
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        guests: parseInt(formData.guests),
        fromDate: format(formData.fromDate, "yyyy-MM-dd"),
        toDate: format(formData.toDate, "yyyy-MM-dd"),
        checkIn: format(formData.checkIn, "HH:mm"),
        checkOut: format(formData.checkOut, "HH:mm"),
      };

      await sendBooking(payload);

      setSuccess("Booking request submitted successfully! Email sent to owner.");

      setFormData({
        name: "", email: "", phone: "", eventType: "", guests: "", fromDate: null, toDate: null, checkIn: null, checkOut: null, message: ""
      });

      setTimeout(() => navigate("/"), 2000);

    } catch (error) {
      console.error("Booking Error:", error);
      const errorMessage = error.response?.data?.message || "❌ Failed to submit booking. Please check your connection.";
      setErrors({ server: errorMessage });
      setTimeout(() => setErrors(prev => {
        const { server, ...rest } = prev;
        return rest;
      }), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-24 bg-gray-50 flex flex-col items-center relative">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

        {/* Header */}
        <div className="bg-indigo-600 text-white p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Book Your Event</h1>
          <p className="text-indigo-100 opacity-90">Secure your spot at Lakshmi Function Hall.</p>
        </div>

        <div className="p-8 md:p-12">

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Personal Details */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: "Full Name", name: "name", type: "text", placeholder: "e.g. John Doe" },
                { label: "Phone Number", name: "phone", type: "tel", placeholder: "10-digit number" },
                { label: "Email Address", name: "email", type: "email", placeholder: "john@example.com" }
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{label} <span className="text-red-500">*</span></label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={name === "phone" ? (e) =>
                      setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }) : handleChange}
                    placeholder={placeholder}
                    className={`w-full border ${errors[name] ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50"} rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none`}
                  />
                  {errors[name] && <p className="text-red-500 text-xs mt-1 font-medium">{errors[name]}</p>}
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Event Type <span className="text-red-500">*</span></label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className={`w-full border ${errors.eventType ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50"} rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none`}
                >
                  <option value="">Select Event Type</option>
                  {["Wedding", "Birthday", "Corporate", "Engagement", "Other"].map((ev) => (
                    <option key={ev} value={ev}>{ev}</option>
                  ))}
                </select>
                {errors.eventType && <p className="text-red-500 text-xs mt-1 font-medium">{errors.eventType}</p>}
              </div>
            </div>

            {/* Date & Time Section */}
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-6 md:p-8">
              <h3 className="text-lg font-bold text-indigo-900 mb-6 flex items-center gap-2">
                <CalendarDays className="text-indigo-600" size={24} /> Event Schedule
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">From Date <span className="text-red-500">*</span></label>
                  <DatePicker
                    selected={formData.fromDate}
                    onChange={(date) => handleDateChange(date, "fromDate")}
                    selectsStart
                    startDate={formData.fromDate}
                    endDate={formData.toDate}
                    minDate={new Date()}
                    filterDate={(date) => !isDateBlocked(date)}
                    dayClassName={getDayClassName}
                    placeholderText="Select start date"
                    className={`w-full border ${errors.fromDate ? "border-red-500 bg-red-50" : "border-gray-300"} rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none w-full block`}
                    wrapperClassName="w-full"
                  />
                  {errors.fromDate && <p className="text-red-500 text-xs mt-1 font-medium">{errors.fromDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">To Date <span className="text-red-500">*</span></label>
                  <DatePicker
                    selected={formData.toDate}
                    onChange={(date) => handleDateChange(date, "toDate")}
                    selectsEnd
                    startDate={formData.fromDate}
                    endDate={formData.toDate}
                    minDate={formData.fromDate || new Date()}
                    filterDate={(date) => !isDateBlocked(date)}
                    dayClassName={getDayClassName}
                    placeholderText="Select end date"
                    className={`w-full border ${errors.toDate ? "border-red-500 bg-red-50" : "border-gray-300"} rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none w-full block`}
                    wrapperClassName="w-full"
                  />
                  {errors.toDate && <p className="text-red-500 text-xs mt-1 font-medium">{errors.toDate}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Check-In Time <span className="text-red-500">*</span></label>
                  <DatePicker
                    selected={formData.checkIn}
                    onChange={(date) => handleDateChange(date, "checkIn")}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="Select time"
                    className={`w-full border ${errors.checkIn ? "border-red-500 bg-red-50" : "border-gray-300"} rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none w-full block`}
                    wrapperClassName="w-full"
                  />
                  {errors.checkIn && <p className="text-red-500 text-xs mt-1 font-medium">{errors.checkIn}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Check-Out Time <span className="text-red-500">*</span></label>
                  <DatePicker
                    selected={formData.checkOut}
                    onChange={(date) => handleDateChange(date, "checkOut")}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="Select time"
                    className={`w-full border ${errors.checkOut ? "border-red-500 bg-red-50" : "border-gray-300"} rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none w-full block`}
                    wrapperClassName="w-full"
                  />
                  {errors.checkOut && <p className="text-red-500 text-xs mt-1 font-medium">{errors.checkOut}</p>}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Users size={18} /> Number of Guests <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                min="1"
                className={`w-full border ${errors.guests ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50"} rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none`}
                placeholder="e.g., 250"
              />
              {errors.guests && <p className="text-red-500 text-xs mt-1 font-medium">{errors.guests}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none resize-none"
                placeholder="Tell us any specific requirements..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
              >
                {isSubmitting ? "Submitting..." : "Submit Booking"}
              </button>
              <button
                type="button"
                onClick={() => setFormData({
                  name: "", email: "", phone: "", eventType: "", guests: "", fromDate: null, toDate: null, checkIn: null, checkOut: null, message: ""
                })}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all hover:text-gray-900"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Floating Notifications */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            className="fixed bottom-6 right-6 z-[9999] bg-white border-l-4 border-green-500 shadow-2xl rounded-lg p-4 flex items-start gap-3 max-w-sm"
          >
            <div className="bg-green-100 p-2 rounded-full">
              <Check size={20} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Success</h4>
              <p className="text-sm text-gray-600">{success}</p>
            </div>
            <button onClick={() => setSuccess("")} className="text-gray-400 hover:text-gray-600 ml-auto">
              <X size={18} />
            </button>
          </motion.div>
        )}

        {errors.server && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            className="fixed bottom-6 right-6 z-[9999] bg-white border-l-4 border-red-500 shadow-2xl rounded-lg p-4 flex items-start gap-3 max-w-sm"
          >
            <div className="bg-red-100 p-2 rounded-full">
              <Info size={20} className="text-red-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Error</h4>
              <p className="text-sm text-gray-600">{errors.server}</p>
            </div>
            <button onClick={() => setErrors(prev => { const { server, ...rest } = prev; return rest; })} className="text-gray-400 hover:text-gray-600 ml-auto">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
