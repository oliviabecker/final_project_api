const mongoose = require('mongoose');

// Define the schema for the States collection
const stateSchema = new mongoose.Schema({
  stateCode: {
    type: String,
    required: true,
    unique: true,
  },
  funFacts: [{
    type: String,
  }],
});

// Create a model using the schema
const State = mongoose.model('State', stateSchema);

module.exports = State;
