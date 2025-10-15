const db = require('../config/db');

const getLibros = async (req, res) => {
    try {
        const [libros] = await db.query('SELECT * FROM libros ORDER BY id DESC');
        res.json({
            succes: true,
            count: libros.length,
            data: libros
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en getLibros()",
            data: error.mensaje
        })
    }
}

const getLibroById = async (req, res) => {
    try {
        const { id } = req.params;
        const [libro] = await db.query('SELECT * FROM libros WHERE id = ?', [id]);
        if (libro.length === 0) {
            return res.status(404).json({
                succes: false,
                mensaje: "Libro con id " + id + " no encontrado."
            })
        }
        res.json({
            succes: true,
            data: libro
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en getLibroById()",
            data: error.mensaje
        })
    }
}

module.exports = {
    getLibros,
    getLibroById
};