const statesData = require('../data/statesData.json');
const State = require('../models/States');

// Helper to get state data by code
const getStateData = (code) => {
  return statesData.find(
    (state) => state.code.toUpperCase() === code.toUpperCase()
  );
};

// GET /states
const getAllStates = async (req, res) => {
  let states = statesData;

  if (req.query.contig === 'true') {
    states = states.filter((state) => state.code !== 'AK' && state.code !== 'HI');
  } else if (req.query.contig === 'false') {
    states = states.filter((state) => state.code === 'AK' || state.code === 'HI');
  }

  const dbStates = await State.find();
  const merged = states.map((state) => {
    const dbEntry = dbStates.find((s) => s.stateCode === state.code);
    if (dbEntry && dbEntry.funFacts && dbEntry.funFacts.length > 0) {
      return { ...state, funfacts: dbEntry.funFacts };
    }
    return state;
  });

  res.json(merged);
};

// GET /states/:state
const getState = async (req, res) => {
  const stateData = getStateData(req.params.state);
  if (!stateData) return res.status(404).json({ message: 'Invalid state abbreviation parameter' });

  const dbEntry = await State.findOne({ stateCode: stateData.code });
  if (dbEntry && dbEntry.funFacts && dbEntry.funFacts.length > 0) {
    return res.json({ ...stateData, funfacts: dbEntry.funFacts });
  }

  res.json(stateData);
};

// GET /states/:state/funfact
const getFunFact = async (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const dbEntry = await State.findOne({ stateCode });

  if (!dbEntry || !dbEntry.funFacts || dbEntry.funFacts.length === 0) {
    return res.status(404).json({ message: 'No Fun Facts found for ' + stateCode });
  }

  const randomIndex = Math.floor(Math.random() * dbEntry.funFacts.length);
  res.json({ funfact: dbEntry.funFacts[randomIndex] });
};

// GET /states/:state/capital
const getCapital = (req, res) => {
  const stateData = getStateData(req.params.state);
  if (!stateData) return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
  res.json({ state: stateData.state, capital: stateData.capital });
};

// GET /states/:state/nickname
const getNickname = (req, res) => {
  const stateData = getStateData(req.params.state);
  if (!stateData) return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
  res.json({ state: stateData.state, nickname: stateData.nickname });
};

// GET /states/:state/population
const getPopulation = (req, res) => {
  const stateData = getStateData(req.params.state);
  if (!stateData) return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
  res.json({ state: stateData.state, population: stateData.population.toLocaleString() });
};

// GET /states/:state/admission
const getAdmission = (req, res) => {
  const stateData = getStateData(req.params.state);
  if (!stateData) return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
  res.json({ state: stateData.state, admitted: stateData.admission_date });
};

// POST /states/:state/funfact
const createFunFact = async (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const funfacts = req.body.funfacts;

  if (!Array.isArray(funfacts)) {
    return res.status(400).json({ message: 'State fun facts value must be an array' });
  }

  const existing = await State.findOne({ stateCode });
  if (existing) {
    existing.funFacts.push(...funfacts);
    await existing.save();
    return res.json(existing);
  }

  const newEntry = await State.create({ stateCode, funFacts: funfacts });
  res.status(201).json(newEntry);
};

// PATCH /states/:state/funfact
const updateFunFact = async (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const { index, funfact } = req.body;

  if (index === undefined || !funfact) {
    return res.status(400).json({ message: 'State fun fact index and value are required' });
  }

  const dbEntry = await State.findOne({ stateCode });
  if (!dbEntry || !dbEntry.funFacts || dbEntry.funFacts.length === 0) {
    return res.status(404).json({ message: 'No Fun Facts found for ' + stateCode });
  }

  if (index < 1 || index > dbEntry.funFacts.length) {
    return res.status(400).json({ message: 'Invalid index' });
  }

  dbEntry.funFacts[index - 1] = funfact;
  await dbEntry.save();

  res.json(dbEntry);
};

// DELETE /states/:state/funfact
const deleteFunFact = async (req, res) => {
  const stateCode = req.params.state.toUpperCase();
  const { index } = req.body;

  if (index === undefined) {
    return res.status(400).json({ message: 'State fun fact index is required' });
  }

  const dbEntry = await State.findOne({ stateCode });
  if (!dbEntry || !dbEntry.funFacts || dbEntry.funFacts.length === 0) {
    return res.status(404).json({ message: 'No Fun Facts found for ' + stateCode });
  }

  if (index < 1 || index > dbEntry.funFacts.length) {
    return res.status(400).json({ message: 'Invalid index' });
  }

  dbEntry.funFacts.splice(index - 1, 1);
  await dbEntry.save();

  res.json(dbEntry);
};

module.exports = {
  getAllStates,
  getState,
  getFunFact,
  getCapital,
  getNickname,
  getPopulation,
  getAdmission,
  createFunFact,
  updateFunFact,
  deleteFunFact,
};
