const fs = require('fs');
const path = require('path');

// Load the states data from the JSON file
const statesData = require('../data/statesData.json');

// GET /states
const getAllStates = (req, res) => {
  try {
    const contig = req.query.contig;
    let filteredStates = [...statesData]; // Make a copy of all states data

    if (contig === 'true') {
      filteredStates = filteredStates.filter(state => state.code !== 'AK' && state.code !== 'HI');
    } else if (contig === 'false') {
      filteredStates = filteredStates.filter(state => state.code === 'AK' || state.code === 'HI');
    }

    res.json(filteredStates);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err });
  }
};

// GET /states/:state
const getState = (req, res) => {
  try {
    const param = req.params.state;
    const stateCode = param.length === 2 ? param.toUpperCase() : null;

    // Find the state based on the code or name
    const stateData = statesData.find(state => 
      state.code === stateCode || state.state.toLowerCase() === param.toLowerCase()
    );

    if (!stateData) {
      return res.status(400).json({ message: 'Invalid state abbreviation or name' });
    }

    res.json(stateData);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err });
  }
};

// GET /states/:state/funfact (This would be populated when you integrate MongoDB or fun facts logic)
const getFunFact = (req, res) => {
  res.status(501).json({ message: "Fun fact feature is not implemented yet." });
};

module.exports = { getAllStates, getState, getFunFact };
