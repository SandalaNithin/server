require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");

// Initialize Express
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(require("morgan")("dev")); // Logs requests to the console

// Routes
app.use("/api/booking", bookingRoutes);

// Health Check Endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Global Error Handler (Optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
