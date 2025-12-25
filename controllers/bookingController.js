const Booking = require("../models/Booking");
const sendEmail = require("../utils/emailService");
const bookingSchema = require("../validations/bookingSchema");
const fs = require("fs");

// @desc    Create new booking
// @route   POST /api/booking
// @access  Public
const createBooking = async (req, res) => {
    try {
        // 1. Zod Validation
        const validation = bookingSchema.safeParse(req.body);
        if (!validation.success) {
            const errorMessages = validation.error.issues.map((issue) => issue.message).join(", ");
            console.log("❌ Validation Error:", errorMessages);
            return res.status(400).json({ success: false, message: errorMessages });
        }

        const {
            name,
            email,
            phone,
            eventType,
            guests,
            fromDate,
            toDate,
            checkIn,
            checkOut,
            message,
        } = validation.data;

        const userIP = req.ip;

        // 2. EMAIL-BASED 24-HOUR RESTRICTION (Limit 1 booking per email every 24 hours)
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const recentBooking = await Booking.findOne({
            email: email.toLowerCase(),
            createdAt: { $gte: twentyFourHoursAgo },
        });

        if (recentBooking) {
            return res.status(429).json({
                success: false,
                message: "You can submit only once every 24 hours.",
            });
        }

        // 3. DATE RANGE OVERLAP VALIDATION
        // Convert date strings to Date objects for proper comparison
        const requestedFromDate = new Date(fromDate);
        const requestedToDate = new Date(toDate);

        // Check if requested date range overlaps with any confirmed booking
        // Overlap logic: requested_from_date <= existing_to_date AND requested_to_date >= existing_from_date
        const overlappingBooking = await Booking.findOne({
            status: "confirmed",
            fromDate: { $lte: requestedToDate },
            toDate: { $gte: requestedFromDate },
        });

        if (overlappingBooking) {
            return res.status(409).json({
                success: false,
                message: "These dates are already booked. Please choose different dates.",
            });
        }

        // 4. SAVE TO DB
        const booking = await Booking.create({
            name,
            email: email.toLowerCase(),
            phone,
            eventType,
            guests,
            fromDate: requestedFromDate,
            toDate: requestedToDate,
            checkIn,
            checkOut,
            message,
            ip: userIP,
            status: "confirmed",
        });

        console.log("✅ SAVED TO DB:", booking._id);

        // 5. SEND EMAIL
        const emailContent = `
        <h3>New Booking Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Event:</strong> ${eventType}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Date:</strong> ${fromDate} to ${toDate}</p>
        <p><strong>Time:</strong> ${checkIn} - ${checkOut}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
      `;

        await sendEmail({
            name,
            email,
            subject: `New Booking - ${name}`,
            html: emailContent,
        });

        res.status(201).json({
            success: true,
            message: "Booking saved & email sent successfully",
            data: booking,
        });

    } catch (error) {
        console.error("❌ SERVER ERROR:", error);
        // Log error to file (simple logging mechanism)
        fs.appendFileSync("error.log", `${new Date().toISOString()} - ${error.stack}\n`);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// @desc    Get all blocked dates (confirmed bookings)
// @route   GET /api/booking/blocked-dates
// @access  Public
const getBlockedDates = async (req, res) => {
    try {
        // Fetch all confirmed bookings
        const confirmedBookings = await Booking.find(
            { status: "confirmed" },
            { fromDate: 1, toDate: 1, _id: 0 }
        ).sort({ fromDate: 1 });

        // Format dates as ISO strings for frontend
        const blockedRanges = confirmedBookings.map(booking => ({
            fromDate: booking.fromDate.toISOString().split('T')[0],
            toDate: booking.toDate.toISOString().split('T')[0],
        }));

        res.status(200).json({
            success: true,
            data: blockedRanges,
        });

    } catch (error) {
        console.error("❌ ERROR FETCHING BLOCKED DATES:", error);
        res.status(500).json({ success: false, message: "Failed to fetch blocked dates" });
    }
};

module.exports = { createBooking, getBlockedDates };

