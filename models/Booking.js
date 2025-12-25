const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventType: String,
  guests: Number,

  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },

  message: String,
  ip: String,

  status: {
    type: String,
    enum: ["confirmed", "rejected"],
    default: "confirmed"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for performance
bookingSchema.index({ email: 1, createdAt: -1 });
bookingSchema.index({ fromDate: 1, toDate: 1, status: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
