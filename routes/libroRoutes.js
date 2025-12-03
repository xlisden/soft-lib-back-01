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
 * tags:
 *   name: Libros
 *   description: CRUD de libros
 */

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
 *         schema:
 *           type: integer
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
 *               isbn:
 *                 type: string
 *               editorial:
 *                 type: string
 *               idcategoria:
 *                 type: integer
 *               idautor:
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
 *     summary: Actualizar un libro
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               isbn:
 *                 type: string
 *               editorial:
 *                 type: string
 *               idcategoria:
 *                 type: integer
 *               idautor:
 *                 type: integer
 *     responses:
 *       200:
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
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
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
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de libros de la categoría
 */
router.get('/categoria/:id', getLibrosByCategoria);

module.exports = router;
