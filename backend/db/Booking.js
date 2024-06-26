// Booking.js
const mongoose = require("mongoose");

// Schema for EV bookings
const EVBookingSchema = new mongoose.Schema({
  pumpId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PetrolPump", // Reference to the PetrolPump schema
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the User schema
    required: true,
  },
  vehicleNo: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  bookedAt: {
    type: String,
    required:true,
    // default: Date(),
  },
});

// Schema for CNG bookings
const CNGBookingSchema = new mongoose.Schema({
  pumpId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PetrolPump", // Reference to the PetrolPump schema
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the User schema
    required: true,
  },
  vehicleNo: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  bookedAt: {
    type: String,
    required:true,

    // default: Date.now(),
  },
});

// payment
const PaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  paymentDate: {
    type: String,
    trim: true,
  },
  totalAmount: {
    type: Number,
  },
  amountPaid: {
    type: Number,
  },
  razorpayOrderId: {
    type: String,
    trim: true,
  },
  razorpayPaymentId: {
    type: String,
    trim: true,
  },
  razorpaySignature: {
    type: String,
    trim: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Fully Paid", "Partially Paid"],
    default: "Pending",
  },
});

const Payment = mongoose.model("Payment", PaymentSchema);
const EVBooking = mongoose.model("EVBooking", EVBookingSchema);
const CNGBooking = mongoose.model("CNGBooking", CNGBookingSchema);

module.exports = { EVBooking, CNGBooking, Payment };
