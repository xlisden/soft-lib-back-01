const express = require('express');
const router = express.Router();
const {
    getAutores,
    getAutorById,
    addAutor,
    actualizarAutor,
    eliminarAutor
} = require('../controllers/autorController');

/**
 * @swagger
 * tags:
 *   name: autores
 *   description: CRUD de autores
 */

/**
 * @swagger
 * /api/autores:
 *   get:
 *     summary: Obtener todos los autores
 *     tags: [autores]
 *     responses:
 *       200:
 *         description: Lista de autores
 */
router.get('/', getAutores);

/**
 * @swagger
 * /api/autores/{id}:
 *   get:
 *     summary: Obtener un autores por ID
 *     tags: [autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: autores encontrado
 */
router.get('/:id', getAutorById);

/**
 * @swagger
 * /api/autores/add:
 *   post:
 *     summary: Crear un nuevo autores
 *     tags: [autores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: autores creado correctamente
 */
router.post('/add', addAutor);

/**
 * @swagger
 * /api/autores/edit/{id}:
 *   put:
 *     summary: Actualizar autores
 *     tags: [autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: autores actualizado
 */
router.put('/edit/:id', actualizarAutor);

/**
 * @swagger
 * /api/autores/delete/{id}:
 *   delete:
 *     summary: Eliminar un autores
 *     tags: [autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       201:
 *         description: autores eliminado
 */
router.delete('/delete/:id', eliminarAutor);

module.exports = router;
