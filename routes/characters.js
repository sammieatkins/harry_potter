const express = require('express');
const router = express.Router();

const charactersController = require('../controllers/characters');

router.get('/characters', charactersController.getAll);

router.get('/getSingle/:id', charactersController.getSingle);

router.post('/newCharacter', charactersController.newCharacter);

router.put('/updateCharacter/:id', charactersController.updateCharacter);

router.delete('/deleteCharacter/:id', charactersController.updateCharacter);

module.exports = router;