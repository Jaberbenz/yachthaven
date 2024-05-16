const mongoose = require("mongoose");
const { Schema } = mongoose;

const PrestataireSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: { type: String, unique: true },
  password: String,
  numeroTel: String,
  role: String,
  photo: { type: String, default: null },
  numeroSiret: String,
  adresse: String,
});

const PrestataireModel = mongoose.model("Prestataire", PrestataireSchema);

module.exports = PrestataireModel;
