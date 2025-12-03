const db = require('../config/db');

const getAutores = async (req, res) => {
    try {
        const [autores] = await db.query('SELECT * FROM autor');
        res.json({
            success: true,
            count: autores.length,
            data: autores
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en getAutores()",
            data: error.mensaje
        })
    }
}

const getAutorById = async (req, res) => {
    try {
        const { id } = req.params;
        const [autor] = await db.query('SELECT * FROM autor WHERE id = ?', [id]);
        if (autor.length === 0) {
            return res.status(404).json({
                succes: false,
                mensaje: "Autor con id " + id + " no encontrado."
            })
        }
        res.json({
            succes: true,
            data: autor
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en getAutorById()",
            data: error.mensaje
        })
    }
}

const addAutor = async (req, res) => {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(404).json({
                succes: false,
                mensaje: "El nombre es obligatorio."
            })
        }
        const [autor] = await db.query('INSERT INTO autor (nombre) VALUES (?)', [nombre]);
        res.status(201).json({
            succes: true,
            mensaje: "Se creo correctamente",
            data: {
                id: autor.insertId,
                nombre
            }
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en addAutor()",
            data: error.mensaje
        })
    }
}

const actualizarAutor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const [autor] = await db.query('SELECT * FROM autor WHERE id = ?', [id]);
        if (autor.length === 0) {
            return res.status(404).json({
                succes: false,
                mensaje: "Autor con id " + id + " no encontrado."
            })
        }
        await db.query('UPDATE autor SET nombre = ? WHERE id = ?', [nombre, id]);
        res.status(201).json({
            succes: true,
            mensaje: "Se actualizo correctamente",
            data: { id, nombre }
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en actualizarAutor()",
            data: error.mensaje
        })
    }
}

const eliminarAutor = async (req, res) => {
    try {
        const { id } = req.params;
        const [autor] = await db.query('SELECT * FROM autor WHERE id = ?', [id]);
        if (autor.length === 0) {
            return res.status(404).json({
                succes: false,
                mensaje: "Autor con id " + id + " no encontrado."
            })
        }
        await db.query('DELETE FROM autor WHERE id = ?', [id]);
        res.status(201).json({
            succes: true,
            mensaje: "Se elimino correctamente"
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en eliminarAutor()",
            data: error.mensaje
        })
    }
}

module.exports = {
    getAutores,
    getAutorById,
    addAutor,
    actualizarAutor,
    eliminarAutor
}
