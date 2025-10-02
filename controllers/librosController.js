const db = require('../config/db');

const getLibros = async(req, res) => {
    try {
        const [libros] = await db.query('SELECT * FROM libros ORDER BY id DESC');
        res.json({
            succes: true,
            count: libros.length,
            data: libros
        })
    } catch (error) {
        res.json({
            sucess: false,
            mensaje: "Error en getLibros()",
            data: error.mensaje
        })
    }
}

module.exports = {
    getLibros
};