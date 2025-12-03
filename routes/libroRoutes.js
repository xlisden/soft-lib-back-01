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

/**
 * @swagger
 * /api/libros:
 *   get:
 *     summary: Obtener todos los libros
 *     tags: [Libros]
 *     responses:
 *       200:
 *         description: Lista de libros
 */
router.get('/', getLibros);

/**
 * @swagger
 * /api/libros/{id}:
 *   get:
 *     summary: Obtener un libro por ID
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Libro encontrado
 */
router.get('/:id', getLibroById);

/**
 * @swagger
 * /api/libros/add:
 *   post:
 *     summary: Crear un libro
 *     tags: [Libros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: integer
 *               isbn:
 *                 type: string
 *               editorial:
 *                 type: string
 *               idcategoria:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Libro creado correctamente
 */
router.post('/add', addLibro);

/**
 * @swagger
 * /api/libros/edit/{id}:
 *   put:
 *     summary: Actualizar libro
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Libro actualizado
 */
router.put('/edit/:id', actualizarLibro);

/**
 * @swagger
 * /api/libros/delete/{id}:
 *   delete:
 *     summary: Eliminar un libro
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       201:
 *         description: Libro eliminado
 */
router.delete('/delete/:id', eliminarLibro);

/**
 * @swagger
 * /api/libros/categoria/{id}:
 *   get:
 *     summary: Obtener libros por categoría
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         description: Libros de la categoría
 */
router.get('/categoria/:id', getLibrosByCategoria);

module.exports = router;
