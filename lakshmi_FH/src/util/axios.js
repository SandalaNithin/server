import axios from "axios";

const API = axios.create({
  baseURL: "https://server-2-jbhd.onrender.com",
});

// Public booking APIs
export const sendBooking = (data) => API.post("/api/booking", data);
export const getBlockedDates = () => API.get("/api/booking/blocked-dates");

// Admin booking management APIs
export const confirmBooking = (id) => API.patch(`/api/booking/${id}/confirm`);
export const rejectBooking = (id, reason) => API.patch(`/api/booking/${id}/reject`, { reason });
export const getAllBookings = (status) => API.get("/api/booking/all", { params: { status } });
export const getPendingBookings = () => API.get("/api/booking/pending");

// Admin authentication APIs
export const adminLogin = (credentials) => API.post("/api/admin/login", credentials);
export const setupAdmin = () => API.post("/api/admin/setup");

export default API;
