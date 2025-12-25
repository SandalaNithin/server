const { z } = require("zod");

const bookingSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().length(10, "Phone number must be exactly 10 digits").regex(/^\d+$/, "Phone must contain only numbers"),
    eventType: z.string().min(1, "Event type is required"),
    guests: z.number().int().positive("Guests must be a positive integer"),
    fromDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid from date" }),
    toDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid to date" }),
    checkIn: z.string().min(1, "Check-in time is required"),
    checkOut: z.string().min(1, "Check-out time is required"),
    message: z.string().optional(),
}).refine(
    (data) => {
        const from = new Date(data.fromDate);
        const to = new Date(data.toDate);
        return to >= from;
    },
    { message: "To date cannot be before from date", path: ["toDate"] }
);

module.exports = bookingSchema;

