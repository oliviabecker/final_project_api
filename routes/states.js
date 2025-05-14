const express = require('express');
const router = express.Router();
const statesController = require('../controller/statesController');

// GET /states
router.get('/', statesController.getAllStates);

// GET /states/:state
router.get('/:state', statesController.getState);

// GET /states/:state/funfact
router.get('/:state/funfact', statesController.getFunFact);

module.exports = router;
