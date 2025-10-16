const express = require('express');
const router = express.Router();
const {
    getLibros,
    getLibroById,
    addLibro,
    actualizarLibro,
    eliminarLibro,
    getLibrosByCategoria
} = require('../controllers/librosController');

router.get('/', getLibros);
router.get('/:id', getLibroById);
router.post('/add', addLibro);
router.put('/edit/:id', actualizarLibro);
router.delete('/delete/:id', eliminarLibro);
router.get('/categoria/:id', getLibrosByCategoria);

module.exports = router;