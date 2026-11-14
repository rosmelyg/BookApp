const { Categoria, Libro } = require('../models');

const listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        const categoriasConConteo = await Promise.all(categorias.map(async (cat) => {
            const count = await Libro.count({ where: { categoriaId: cat.id } });
            const data = cat.toJSON ? cat.toJSON() : cat;
            return { ...data, cantidadLibros: count };
        }));
        res.render('categorias/list', { categorias: categoriasConConteo });
    } catch (error) {
        console.error('Error al listar categorías:', error);
        res.redirect('/');
    }
};

const renderCrear = (req, res) => {
    res.render('categorias/create');
};

const crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        if (!nombre || !descripcion || !nombre.trim() || !descripcion.trim()) {
            return res.render('categorias/create', { 
                error: 'Todos los campos son requeridos',
                nombre,
                descripcion 
            });
        }
        await Categoria.create({ 
            nombre: nombre.trim(), 
            descripcion: descripcion.trim() 
        });
        res.redirect('/categorias');
    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.render('categorias/create', { error: 'Ocurrió un error al crear la categoría' });
    }
};

const renderEditar = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) return res.redirect('/categorias');
        const plainCategoria = categoria.toJSON ? categoria.toJSON() : categoria;
        res.render('categorias/edit', { categoria: plainCategoria });
    } catch (error) {
        console.error('Error al renderizar editar categoría:', error);
        res.redirect('/categorias');
    }
};

const editarCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        if (!nombre || !descripcion || !nombre.trim() || !descripcion.trim()) {
            return res.render('categorias/edit', { 
                categoria: { id: req.params.id, nombre, descripcion }, 
                error: 'Todos los campos son requeridos' 
            });
        }
        await Categoria.update(
            { nombre: nombre.trim(), descripcion: descripcion.trim() }, 
            { where: { id: req.params.id } }
        );
        res.redirect('/categorias');
    } catch (error) {
        console.error('Error al editar categoría:', error);
        res.redirect('/categorias');
    }
};

const renderEliminar = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) return res.redirect('/categorias');
        const plainCategoria = categoria.toJSON ? categoria.toJSON() : categoria;
        res.render('categorias/delete', { categoria: plainCategoria });
    } catch (error) {
        console.error('Error al renderizar eliminar categoría:', error);
        res.redirect('/categorias');
    }
};

const eliminarCategoria = async (req, res) => {
    try {
        await Categoria.destroy({ where: { id: req.params.id } });
        res.redirect('/categorias');
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.redirect('/categorias');
    }
};

module.exports = { 
    listarCategorias, 
    renderCrear, 
    crearCategoria, 
    renderEditar, 
    editarCategoria, 
    renderEliminar, 
    eliminarCategoria 
};
