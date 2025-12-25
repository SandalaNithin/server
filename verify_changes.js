const axios = require("axios");

const BASE_URL = "http://localhost:5000/api/booking";

const bookingData = {
  name: "Verification User",
  email: "verify@example.com",
  phone: "9998887777",
  eventType: "Corporate",
  guests: 50,
  fromDate: "2025-02-01",
  toDate: "2025-02-01",
  checkIn: "09:00",
  checkOut: "11:00",
  message: "Verification Test Auto"
};

(async () => {
  console.log("Running Verification Test...");

  try {
    const res = await axios.post(BASE_URL, bookingData);
    console.log("✅RESPONSE:", res.data);
  } catch (err) {
    console.error(
      "❌ERROR:",
      err.response ? err.response.data : err.message
    );
  }
})();
