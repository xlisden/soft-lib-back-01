const db = require('../config/db');

const getLibros = async (req, res) => {
    try {
        const query = `
            SELECT 
                l.id, 
                l.titulo, 
                l.isbn, 
                l.editorial, 
                l.categoriaId,
                l.autorId,
                a.nombre AS autor,
                c.nombre AS categoria
            FROM libros l
            JOIN autor a ON l.autorId = a.id
            JOIN categoria c ON l.categoriaId = c.id
        `;
        const [libros] = await db.query(query);
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
        const query = `
            SELECT 
                l.id, 
                l.titulo, 
                l.isbn, 
                l.editorial, 
                l.categoriaId,
                l.autorId,
                a.nombre AS autor,
                c.nombre AS categoria
            FROM libros l
            JOIN autor a ON l.autorId = a.id
            JOIN categoria c ON l.categoriaId = c.id
            WHERE l.id = ?
        `;
        const [libro] = await db.query(query, [id]);
        if (libro.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: "Libro con id " + id + " no encontrado."
            })
        }
        res.json({
            success: true,
            data: libro[0]
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
        const { titulo, isbn, editorial, categoriaId, autorId } = req.body;
        if (!titulo || !autorId || !categoriaId) {
            return res.status(404).json({
                success: false,
                mensaje: "Titulo, autorId y categoriaId son obligatorios."
            })
        }
        const [libro] = await db.query('INSERT INTO libros (titulo, isbn, editorial, categoriaId, autorId) VALUES (?, ?, ?, ?, ?)', [titulo, isbn, editorial, categoriaId, autorId]);
        res.status(201).json({
            success: true,
            mensaje: "Se creo correctamente",
            data: {
                id: libro.insertId,
                titulo,
                isbn,
                editorial,
                categoriaId,
                autorId
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
        const { titulo, isbn, editorial, categoriaId, autorId } = req.body;
        const [libro] = await db.query('SELECT * FROM libros WHERE id = ?', [id]);
        if (libro.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: "Libro con id " + id + " no encontrado."
            })
        }
        const [response] = await db.query('UPDATE libros SET titulo =?, isbn =?, editorial =?, categoriaId =?, autorId=? where id =? ', [titulo, isbn, editorial, categoriaId, autorId, id])
        res.status(201).json({
            success: true,
            mensaje: "Se actualizo correctamente",
            data: {
                id,
                titulo,
                isbn,
                editorial,
                categoriaId,
                autorId
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
                success: false,
                mensaje: "Libro con id " + id + " no encontrado."
            })
        }
        
        const [response] = await db.query('DELETE FROM libros WHERE id = ?', [id]);     
        res.status(201).json({
            success: true,
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
                success: false,
                mensaje: "Categoria con id " + id + " no encontrada."
            })
        }
        const query = `
            SELECT 
                l.id, 
                l.titulo, 
                l.isbn, 
                l.editorial, 
                l.categoriaId,
                l.autorId,
                a.nombre AS autor,
                c.nombre AS categoria
            FROM libros l
            JOIN autor a ON l.autorId = a.id
            JOIN categoria c ON l.categoriaId = c.id
            WHERE l.categoriaId = ?
        `;
        const [libros] = await db.query(query, [id]);
        if (libros.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: "Libros con idcategoria " + id + " no encontrados."
            })
        }     
        res.status(200).json({
            success: true,
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