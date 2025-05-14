const mongoose = require('mongoose');

const funFactSchema = new mongoose.Schema({
  stateCode: { type: String, required: true, unique: true },
  funfacts: { type: [String], required: true }
});

const FunFact = mongoose.model('FunFact', funFactSchema);

module.exports = FunFact;
