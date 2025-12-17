const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventType: String,
  guests: Number,

  fromDate: { type: String, required: true },
  toDate: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },

  message: String,
  ip: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
