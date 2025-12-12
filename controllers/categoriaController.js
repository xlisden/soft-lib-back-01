const db = require('../config/db');

const getCategorias = async (req, res) => {
    try {
        const [categorias] = await db.query('SELECT * FROM categoria');
        res.json({
            success: true,
            count: categorias.length,
            data: categorias
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en getCategorias()",
            data: error.mensaje
        })
    }
}

const getCategoriaById = async (req, res) => {
    try {
        const { id } = req.params;
        const [categoria] = await db.query('SELECT * FROM categoria WHERE id = ?', [id]);
        if (categoria.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: "Categoria con id " + id + " no encontrada."
            })
        }
        res.json({
            success: true,
            data: categoria
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en getCategoriaById()",
            data: error.mensaje
        })
    }
}

const addCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(404).json({
                success: false,
                mensaje: "El nombre es obligatorio."
            })
        }
        const [categoria] = await db.query('INSERT INTO categoria (nombre) VALUES (?)', [nombre]);
        res.status(201).json({
            success: true,
            mensaje: "Se creo correctamente",
            data: {
                id: categoria.insertId,
                nombre
            }
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en addCategoria()",
            data: error.mensaje
        })
    }
}

const actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const [categoria] = await db.query('SELECT * FROM categoria WHERE id = ?', [id]);
        if (categoria.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: "Categoria con id " + id + " no encontrada."
            })
        }
        await db.query('UPDATE categoria SET nombre = ? WHERE id = ?', [nombre, id]);
        res.status(201).json({
            success: true,
            mensaje: "Se actualizo correctamente",
            data: { id, nombre }
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en actualizarCategoria()",
            data: error.mensaje
        })
    }
}

const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const [categoria] = await db.query('SELECT * FROM categoria WHERE id = ?', [id]);
        if (categoria.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: "Categoria con id " + id + " no encontrada."
            })
        }
        await db.query('DELETE FROM categoria WHERE id = ?', [id]);
        res.status(201).json({
            success: true,
            mensaje: "Se elimino correctamente"
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en eliminarCategoria()",
            data: error.mensaje
        })
    }
}

module.exports = {
    getCategorias,
    getCategoriaById,
    addCategoria,
    actualizarCategoria,
    eliminarCategoria
}
