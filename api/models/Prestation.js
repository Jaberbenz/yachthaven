const mongoose = require("mongoose");

const prestationSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Prestataire" },
  titre: String,
  adresse: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  maxGuests: Number,
  prix: Number,
  disponibilities: [
    {
      jour: String,
      ouverture: String,
      fermeture: String,
    },
  ],
});

const PrestationModel = mongoose.model("Prestation", prestationSchema);

module.exports = PrestationModel;
