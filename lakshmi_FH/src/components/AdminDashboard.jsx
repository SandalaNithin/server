import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    CheckCircle,
    XCircle,
    Clock,
    Calendar,
    Users,
    Mail,
    Phone,
    AlertCircle,
    Loader,
    LogOut
} from "lucide-react";
import {
    getPendingBookings,
    confirmBooking,
    rejectBooking,
    getAllBookings
} from "../util/axios";
import { format } from "date-fns";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("pending");
    const [actionLoading, setActionLoading] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [adminEmail, setAdminEmail] = useState("");

    // Check authentication on mount
    useEffect(() => {
        const adminAuth = localStorage.getItem("adminAuth");
        if (!adminAuth) {
            navigate("/booking");
            return;
        }

        try {
            const authData = JSON.parse(adminAuth);
            setAdminEmail(authData.email);
        } catch (err) {
            console.error("Invalid auth data");
            navigate("/booking");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminAuth");
        navigate("/booking");
    };

    // Fetch bookings based on filter
    useEffect(() => {
        fetchBookings();
    }, [filter]);

    const fetchBookings = async () => {
        setLoading(true);
        setError("");
        try {
            let response;
            if (filter === "pending") {
                response = await getPendingBookings();
            } else if (filter === "all") {
                response = await getAllBookings();
            } else {
                response = await getAllBookings(filter);
            }
            setBookings(response.data.data);
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setError("Failed to load bookings. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async (bookingId) => {
        if (!window.confirm("Are you sure you want to CONFIRM this booking? This will send an email and block the dates.")) {
            return;
        }

        setActionLoading(bookingId);
        setError("");
        setSuccess("");

        try {
            const response = await confirmBooking(bookingId);
            setSuccess(response.data.message);
            await fetchBookings();
            setTimeout(() => setSuccess(""), 5000);
        } catch (err) {
            console.error("Error confirming booking:", err);
            const errorMsg = err.response?.data?.message || "Failed to confirm booking";
            setError(errorMsg);
            setTimeout(() => setError(""), 5000);
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (bookingId) => {
        const reason = window.prompt(
            "Please provide a reason for rejection:\n\n(This will be sent to the customer via email)",
            "The requested dates are not available for booking"
        );

        if (!reason) {
            // User cancelled or provided empty reason
            return;
        }

        setActionLoading(bookingId);
        setError("");
        setSuccess("");

        try {
            const response = await rejectBooking(bookingId, reason);
            setSuccess(response.data.message);
            await fetchBookings();
            setTimeout(() => setSuccess(""), 5000);
        } catch (err) {
            console.error("Error rejecting booking:", err);
            const errorMsg = err.response?.data?.message || "Failed to reject booking";
            setError(errorMsg);
            setTimeout(() => setError(""), 5000);
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
            confirmed: "bg-green-100 text-green-800 border-green-300",
            rejected: "bg-red-100 text-red-800 border-red-300"
        };

        const icons = {
            pending: <Clock size={14} />,
            confirmed: <CheckCircle size={14} />,
            rejected: <XCircle size={14} />
        };

        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
                {icons[status]}
                {status.toUpperCase()}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 py-8 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                        <p className="text-gray-600">Manage booking requests for Lakshmi Function Hall</p>
                        {adminEmail && (
                            <p className="text-sm text-indigo-600 mt-1">Logged in as: {adminEmail}</p>
                        )}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>

                {/* Notifications */}
                {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-lg flex items-start gap-3">
                        <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                        <p className="text-green-800 font-medium">{success}</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg flex items-start gap-3">
                        <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                        <p className="text-red-800 font-medium">{error}</p>
                    </div>
                )}

                {/* Filter Tabs */}
                <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex gap-2">
                    {["pending", "confirmed", "rejected", "all"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${filter === tab
                                ? "bg-indigo-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Bookings List */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader className="animate-spin text-indigo-600" size={40} />
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                        <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bookings Found</h3>
                        <p className="text-gray-500">There are no {filter} bookings at the moment.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="p-6">

                                    {/* Header Row */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{booking.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                Submitted on {format(new Date(booking.createdAt), "MMM dd, yyyy 'at' hh:mm a")}
                                            </p>
                                        </div>
                                        {getStatusBadge(booking.status)}
                                    </div>

                                    {/* Details Grid */}
                                    <div className="grid md:grid-cols-2 gap-4 mb-6">

                                        {/* Contact Info */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-gray-700">
                                                <Mail className="text-indigo-600 flex-shrink-0" size={18} />
                                                <span className="text-sm">{booking.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-700">
                                                <Phone className="text-indigo-600 flex-shrink-0" size={18} />
                                                <span className="text-sm">{booking.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-700">
                                                <Users className="text-indigo-600 flex-shrink-0" size={18} />
                                                <span className="text-sm">{booking.guests} Guests • {booking.eventType}</span>
                                            </div>
                                        </div>

                                        {/* Event Details */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-gray-700">
                                                <Calendar className="text-indigo-600 flex-shrink-0" size={18} />
                                                <span className="text-sm font-medium">
                                                    {format(new Date(booking.fromDate), "MMM dd, yyyy")} - {format(new Date(booking.toDate), "MMM dd, yyyy")}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-700">
                                                <Clock className="text-indigo-600 flex-shrink-0" size={18} />
                                                <span className="text-sm">{booking.checkIn} - {booking.checkOut}</span>
                                            </div>
                                            {booking.confirmedAt && (
                                                <div className="text-sm text-green-700 font-medium">
                                                    ✓ Confirmed on {format(new Date(booking.confirmedAt), "MMM dd, yyyy 'at' hh:mm a")}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Message */}
                                    {booking.message && (
                                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                            <p className="text-sm text-gray-700">
                                                <span className="font-semibold">Message:</span> {booking.message}
                                            </p>
                                        </div>
                                    )}

                                    {/* Action Buttons (only for pending bookings) */}
                                    {booking.status === "pending" && (
                                        <div className="flex gap-3 pt-4 border-t border-gray-200">
                                            <button
                                                onClick={() => handleConfirm(booking._id)}
                                                disabled={actionLoading === booking._id}
                                                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {actionLoading === booking._id ? (
                                                    <>
                                                        <Loader className="animate-spin" size={18} />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle size={18} />
                                                        Confirm Booking
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleReject(booking._id)}
                                                disabled={actionLoading === booking._id}
                                                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {actionLoading === booking._id ? (
                                                    <>
                                                        <Loader className="animate-spin" size={18} />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle size={18} />
                                                        Reject Booking
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
