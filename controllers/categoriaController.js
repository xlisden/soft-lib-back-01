const db = require('../config/db');

const getCategorias = async (req, res) => {
    try {
        const [libros] = await db.query('SELECT * FROM categoria ORDER BY id DESC');
        res.json({
            succes: true,
            count: libros.length,
            data: libros
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en getCategorias()",
            data: error.mensaje
        })
        console.log(`${error}`);
    }
}

module.exports = {
    getCategorias
};