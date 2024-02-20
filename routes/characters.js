const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const charactersController = require('../controllers/characters');

router.get('/characters', charactersController.getAll);

router.get('/getSingle/:id', charactersController.getSingle);

router.post('/newCharacter', validation.saveCharacter, charactersController.newCharacter);

router.put('/updateCharacter/:id', validation.saveCharacter, charactersController.updateCharacter);

router.delete('/deleteCharacter/:id', charactersController.updateCharacter);

module.exports = router;