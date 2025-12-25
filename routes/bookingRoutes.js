const express = require("express");
const router = express.Router();
const { createBooking, getBlockedDates } = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/blocked-dates", getBlockedDates);

module.exports = router;

