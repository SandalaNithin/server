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

        // 2. IP BLOCK (Limit 1 booking per 24 hours) - Disabled in Test
        if (process.env.NODE_ENV !== "test") {
            const lastBooking = await Booking.findOne({
                ip: userIP,
                createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
            });

            if (lastBooking) {
                return res.status(429).json({
                    success: false,
                    message: "You have already submitted a booking in the last 24 hours.",
                });
            }
        }

        // 3. CHECK TIME SLOT CONFLICT
        const slotTaken = await Booking.findOne({
            fromDate,
            toDate,
            $or: [
                { checkIn: { $lte: checkIn }, checkOut: { $gt: checkIn } },
                { checkIn: { $lt: checkOut }, checkOut: { $gte: checkOut } },
                { checkIn: { $gte: checkIn }, checkOut: { $lte: checkOut } },
            ],
        });

        if (slotTaken) {
            return res.status(409).json({
                success: false,
                message: "This time slot is already booked. Please choose another time.",
            });
        }

        // 4. SAVE TO DB
        const booking = await Booking.create({
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
            ip: userIP,
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

module.exports = { createBooking };
