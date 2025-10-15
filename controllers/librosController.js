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
        console.log(`error ${error}`);
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
        console.log(`error ${error}`);
    }
}

const addLibro = async (req, res) => {
    try {
        const { titulo, autor, isbn, editorial } = req.body;
        if (!titulo || !autor) {
            return res.status(404).json({
                succes: false,
                mensaje: "Titulo y autor son obligatorios."
            })
        }
        const [libro] = await db.query('INSERT INTO libros (titulo, autor, isbn, editorial) VALUES (?, ?, ?, ?)', [titulo, autor, isbn, editorial]);
        res.status(201).json({
            succes: true,
            mensaje: "Se creo correctamente",
            data: {
                id: libro.insertId,
                titulo,
                autor,
                isbn,
                editorial
            }
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en addLibro()",
            data: error.mensaje
        })        
        console.log(`error ${error}`);
    }
}

const actualizarLibro = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor, isbn, editorial } = req.body;
        const [libro] = await db.query('SELECT * FROM libros WHERE id = ?', [id]);
        if (libro.length === 0) {
            return res.status(404).json({
                succes: false,
                mensaje: "Libro con id " + id + " no encontrado."
            })
        }
        const [response] = await db.query('UPDATE libros SET titulo =?, autor =?, isbn =?, editorial =? where id =? ', [titulo, autor, isbn, editorial, id])
        res.status(201).json({
            succes: true,
            mensaje: "Se actualizo correctamente",
            data: {
                id,
                titulo,
                autor,
                isbn,
                editorial
            }
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en actualizarLibro()",
            data: error.mensaje
        })
        console.log(`error ${error}`);
    }
}

const eliminarLibro = async (req, res) => {
    try {
        const { id } = req.params;
        const [libro] = await db.query('SELECT * FROM libros WHERE id = ?', [id]);
        if (libro.length === 0) {
            return res.status(404).json({
                succes: false,
                mensaje: "Libro con id " + id + " no encontrado."
            })
        }
        
        const [response] = await db.query('DELETE FROM libros WHERE id = ?', [id]);        
        res.status(201).json({
            succes: true,
            mensaje: "Se elimino correctamente"
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en eliminarLibro()",
            data: error.mensaje
        })
        console.log(`eliminarLibro => ${error}`);
    }
}

module.exports = {
    getLibros,
    getLibroById,
    addLibro,
    actualizarLibro,
    eliminarLibro
};