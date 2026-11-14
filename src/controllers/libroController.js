const { Libro, Categoria, Autor, Editorial } = require('../models');

const libroIncludes = [
    { model: Categoria, as: 'Categoria' },
    { model: Autor, as: 'Autor' },
    { model: Editorial, as: 'Editorial' }
];

const listarLibros = async (req, res) => {
    try {
        const libros = await Libro.findAll({ 
            include: libroIncludes,
            order: [['id', 'DESC']]
        });
        const plainLibros = libros.map(l => (l.toJSON ? l.toJSON() : l));
        res.render('libros/list', { libros: plainLibros });
    } catch (error) {
        console.error('Error al listar libros:', error);
        res.redirect('/');
    }
};

const renderCrear = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        const autores = await Autor.findAll();
        const editoriales = await Editorial.findAll();

        const faltantes = [];
        if (categorias.length === 0) faltantes.push('categorías');
        if (autores.length === 0) faltantes.push('autores');
        if (editoriales.length === 0) faltantes.push('editoriales');

        if (faltantes.length > 0) {
            return res.render('libros/create', { 
                noPuedeCrear: true,
                mensajeBloqueo: `No puede crear libros porque no hay ${faltantes.join(', ')} creadas en el sistema.`
            });
        }

        res.render('libros/create', { 
            categorias: categorias.map(c => (c.toJSON ? c.toJSON() : c)), 
            autores: autores.map(a => (a.toJSON ? a.toJSON() : a)), 
            editoriales: editoriales.map(e => (e.toJSON ? e.toJSON() : e)) 
        });
    } catch (error) {
        console.error('Error al renderizar crear libro:', error);
        res.redirect('/libros');
    }
};

const crearLibro = async (req, res) => {
    try {
        const { titulo, anoPublicacion, portadaUrl, categoriaId, autorId, editorialId } = req.body;
        const categorias = await Categoria.findAll();
        const autores = await Autor.findAll();
        const editoriales = await Editorial.findAll();

        const faltantes = [];
        if (categorias.length === 0) faltantes.push('categorías');
        if (autores.length === 0) faltantes.push('autores');
        if (editoriales.length === 0) faltantes.push('editoriales');

        if (faltantes.length > 0) {
            return res.render('libros/create', {
                noPuedeCrear: true,
                mensajeBloqueo: `No puede crear libros porque no hay ${faltantes.join(', ')} creadas en el sistema.`
            });
        }

        if (!titulo || !anoPublicacion || !portadaUrl || !categoriaId || !autorId || !editorialId ||
            !titulo.trim() || !portadaUrl.trim()) {
            return res.render('libros/create', { 
                error: 'Todos los campos son requeridos', 
                categorias: categorias.map(c => (c.toJSON ? c.toJSON() : c)), 
                autores: autores.map(a => (a.toJSON ? a.toJSON() : a)), 
                editoriales: editoriales.map(e => (e.toJSON ? e.toJSON() : e)),
                formData: req.body
            });
        }

        await Libro.create({ 
            titulo: titulo.trim(), 
            anoPublicacion: parseInt(anoPublicacion, 10), 
            portadaUrl: portadaUrl.trim(), 
            categoriaId: parseInt(categoriaId, 10), 
            autorId: parseInt(autorId, 10), 
            editorialId: parseInt(editorialId, 10) 
        });

        res.redirect('/libros');
    } catch (error) {
        console.error('Error al crear libro:', error);
        res.redirect('/libros');
    }
};

const renderEditar = async (req, res) => {
    try {
        const libro = await Libro.findByPk(req.params.id);
        if (!libro) return res.redirect('/libros');

        const categorias = await Categoria.findAll();
        const autores = await Autor.findAll();
        const editoriales = await Editorial.findAll();

        const faltantes = [];
        if (categorias.length === 0) faltantes.push('categorías');
        if (autores.length === 0) faltantes.push('autores');
        if (editoriales.length === 0) faltantes.push('editoriales');

        if (faltantes.length > 0) {
            return res.render('libros/edit', {
                noPuedeEditar: true,
                mensajeBloqueo: `No se puede editar el libro porque no hay ${faltantes.join(', ')} creadas en el sistema.`
            });
        }

        const plainLibro = libro.toJSON ? libro.toJSON() : libro;
        res.render('libros/edit', { 
            libro: plainLibro, 
            categorias: categorias.map(c => (c.toJSON ? c.toJSON() : c)), 
            autores: autores.map(a => (a.toJSON ? a.toJSON() : a)), 
            editoriales: editoriales.map(e => (e.toJSON ? e.toJSON() : e)) 
        });
    } catch (error) {
        console.error('Error al renderizar editar libro:', error);
        res.redirect('/libros');
    }
};

const editarLibro = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, anoPublicacion, portadaUrl, categoriaId, autorId, editorialId } = req.body;

        const libro = await Libro.findByPk(id);
        if (!libro) return res.redirect('/libros');

        const categorias = await Categoria.findAll();
        const autores = await Autor.findAll();
        const editoriales = await Editorial.findAll();

        // Validations: all fields required except portadaUrl
        if (!titulo || !anoPublicacion || !categoriaId || !autorId || !editorialId || !titulo.trim()) {
            return res.render('libros/edit', {
                error: 'Todos los campos son requeridos, menos la imagen de la portada.',
                libro: {
                    id,
                    titulo,
                    anoPublicacion,
                    portadaUrl: libro.portadaUrl,
                    categoriaId,
                    autorId,
                    editorialId
                },
                categorias: categorias.map(c => (c.toJSON ? c.toJSON() : c)),
                autores: autores.map(a => (a.toJSON ? a.toJSON() : a)),
                editoriales: editoriales.map(e => (e.toJSON ? e.toJSON() : e))
            });
        }

        const finalPortadaUrl = (portadaUrl && portadaUrl.trim() !== '') ? portadaUrl.trim() : libro.portadaUrl;

        await Libro.update({
            titulo: titulo.trim(),
            anoPublicacion: parseInt(anoPublicacion, 10),
            portadaUrl: finalPortadaUrl,
            categoriaId: parseInt(categoriaId, 10),
            autorId: parseInt(autorId, 10),
            editorialId: parseInt(editorialId, 10)
        }, {
            where: { id }
        });

        res.redirect('/libros');
    } catch (error) {
        console.error('Error al editar libro:', error);
        res.redirect('/libros');
    }
};

const renderEliminar = async (req, res) => {
    try {
        const libro = await Libro.findByPk(req.params.id, { 
            include: libroIncludes 
        });
        if (!libro) return res.redirect('/libros');
        const plainLibro = libro.toJSON ? libro.toJSON() : libro;
        res.render('libros/delete', { libro: plainLibro });
    } catch (error) {
        console.error('Error al renderizar eliminar libro:', error);
        res.redirect('/libros');
    }
};

const eliminarLibro = async (req, res) => {
    try {
        await Libro.destroy({ where: { id: req.params.id } });
        res.redirect('/libros');
    } catch (error) {
        console.error('Error al eliminar libro:', error);
        res.redirect('/libros');
    }
};

module.exports = { 
    listarLibros, 
    renderCrear, 
    crearLibro, 
    renderEditar, 
    editarLibro, 
    renderEliminar, 
    eliminarLibro 
};
