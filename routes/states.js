const express = require('express');
const router = express.Router();
const statesController = require('../controllers/statesController');

// GET all states (optionally filtered by contig=true/false)
router.get('/', statesController.getAllStates);

// GET specific state
router.get('/:state', statesController.getState);

// GET random fun fact
router.get('/:state/funfact', statesController.getFunFact);

// GET specific state data points
router.get('/:state/capital', statesController.getCapital);
router.get('/:state/nickname', statesController.getNickname);
router.get('/:state/population', statesController.getPopulation);
router.get('/:state/admission', statesController.getAdmission);

// POST a fun fact
router.post('/:state/funfact', statesController.createFunFact);

// PATCH a fun fact
router.patch('/:state/funfact', statesController.updateFunFact);

// DELETE a fun fact
router.delete('/:state/funfact', statesController.deleteFunFact);

module.exports = router;
