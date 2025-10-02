const express = require('express');
const router = express.Router();
const {
    getLibros
} = require('../controllers/librosController');

router.get('/', getLibros);

module.exports = router;