const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClientSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: { type: String, unique: true },
  password: String,
  numeroTel: String,
  role: String,
  photo: { type: String, default: null },
});

const ClientModel = mongoose.model("Client", ClientSchema);

module.exports = ClientModel;
