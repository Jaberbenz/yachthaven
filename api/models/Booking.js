const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  prestation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prestation", // Assurez-vous que 'Prestation' correspond au nom du modèle de votre prestation
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },

  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  guestName: {
    type: String,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
