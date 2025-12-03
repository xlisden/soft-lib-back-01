const express = require('express');
const router = express.Router();
const {
    getCategorias,
    getCategoriaById,
    addCategoria,
    actualizarCategoria,
    eliminarCategoria
} = require('../controllers/categoriaController');

/**
 * @swagger
 * tags:
 *   name: categorias
 *   description: CRUD de categorías
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [categorias]
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get('/', getCategorias);

/**
 * @swagger
 * /api/categorias/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Categoría encontrada
 */
router.get('/:id', getCategoriaById);

/**
 * @swagger
 * /api/categorias/add:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [categorias]
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
 *         description: Categoría creada correctamente
 */
router.post('/add', addCategoria);

/**
 * @swagger
 * /api/categorias/edit/{id}:
 *   put:
 *     summary: Actualizar una categoría
 *     tags: [categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Categoría actualizada
 */
router.put('/edit/:id', actualizarCategoria);

/**
 * @swagger
 * /api/categorias/delete/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       201:
 *         description: Categoría eliminada
 */
router.delete('/delete/:id', eliminarCategoria);

module.exports = router;
