const db = require('../config/db');

const getLibros = async (req, res) => {
    try {
        const [libros] = await db.query('SELECT * FROM libros');
        res.json({
            success: true,
            count: libros.length,
            data: libros
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en getLibros()",
            data: error.mensaje
        })
        console.log(`${error}`);
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
        console.log(`${error}`);
    }
}

const addLibro = async (req, res) => {
    try {
        const { titulo, autor, isbn, editorial, idcategoria, idautor } = req.body;
        if (!titulo || !autor) {
            return res.status(404).json({
                succes: false,
                mensaje: "Titulo y autor son obligatorios."
            })
        }
        const [libro] = await db.query('INSERT INTO libros (titulo, isbn, editorial, idcategoria, idautor) VALUES (?, ?, ?, ?, ?)', [titulo, isbn, editorial, idcategoria, idautor]);
        res.status(201).json({
            succes: true,
            mensaje: "Se creo correctamente",
            data: {
                id: libro.insertId,
                titulo,
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
        console.log(`${error}`);
    }
}

const actualizarLibro = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, isbn, editorial, idcategoria, idautor } = req.body;
        const [libro] = await db.query('SELECT * FROM libros WHERE id = ?', [id]);
        if (libro.length === 0) {
            return res.status(404).json({
                succes: false,
                mensaje: "Libro con id " + id + " no encontrado."
            })
        }
        const [response] = await db.query('UPDATE libros SET titulo =?,  isbn =?, editorial =?, idcategoria =?, idautor=? where id =? ', [titulo, isbn, editorial, idcategoria, idautor, id])
        res.status(201).json({
            succes: true,
            mensaje: "Se actualizo correctamente",
            data: {
                id,
                titulo,
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
        console.log(`${error}`);
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

const getLibrosByCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const [categoria] = await db.query('SELECT * FROM categoria WHERE id = ?', [id]);
        if (categoria.length === 0) {
            return res.status(404).json({
                succes: false,
                mensaje: "Categoria con id " + id + " no encontrada."
            })
        }
        const [libros] = await db.query('SELECT * FROM libros WHERE idcategoria = ?', [id]);
        if (libros.length === 0) {
            return res.status(404).json({
                succes: false,
                mensaje: "Libros con idcategoria " + id + " no encontrados."
            })
        }        
        res.status(200).json({
            succes: true,
            categoria: categoria[0],
            count: libros.length,
            data: libros
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            mensaje: "Error en getLibrosByCategoria()",
            data: error.mensaje
        })
        console.log(`${error}`);
    }    
}

module.exports = {
    getLibros,
    getLibroById,
    addLibro,
    actualizarLibro,
    eliminarLibro,
    getLibrosByCategoria
};