const express = require('express');
const router = express.Router();
const {
    getLibros,
    getLibroById
} = require('../controllers/librosController');

router.get('/', getLibros);
router.get('/:id', getLibroById);

module.exports = router;