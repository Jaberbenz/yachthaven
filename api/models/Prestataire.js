const mongoose = require('mongoose');
const ClientModel = require('./Client.js');

const PrestataireSchema = new mongoose.Schema({
    numeroSiret: String,
    adresse: String,
});

const PrestataireModel = ClientModel.discriminator('Prestataire', PrestataireSchema);

module.exports = PrestataireModel;