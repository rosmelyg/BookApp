const { Editorial, Libro } = require('../models');

const listarEditoriales = async (req, res) => {
    try {
        const editoriales = await Editorial.findAll();
        const editorialesConConteo = await Promise.all(editoriales.map(async (edit) => {
            const count = await Libro.count({ where: { editorialId: edit.id } });
            const data = edit.toJSON ? edit.toJSON() : edit;
            return { ...data, cantidadLibros: count };
        }));
        res.render('editoriales/list', { editoriales: editorialesConConteo });
    } catch (error) {
        console.error('Error al listar editoriales:', error);
        res.redirect('/');
    }
};

const renderCrear = (req, res) => {
    res.render('editoriales/create');
};

const crearEditorial = async (req, res) => {
    try {
        const { nombre, telefono, pais } = req.body;
        if (!nombre || !telefono || !pais || !nombre.trim() || !telefono.trim() || !pais.trim()) {
            return res.render('editoriales/create', { 
                error: 'Todos los campos son requeridos',
                nombre,
                telefono,
                pais
            });
        }
        await Editorial.create({ 
            nombre: nombre.trim(), 
            telefono: telefono.trim(), 
            pais: pais.trim() 
        });
        res.redirect('/editoriales');
    } catch (error) {
        console.error('Error al crear editorial:', error);
        res.render('editoriales/create', { error: 'Ocurrió un error al crear la editorial' });
    }
};

const renderEditar = async (req, res) => {
    try {
        const editorial = await Editorial.findByPk(req.params.id);
        if (!editorial) return res.redirect('/editoriales');
        const plainEditorial = editorial.toJSON ? editorial.toJSON() : editorial;
        res.render('editoriales/edit', { editorial: plainEditorial });
    } catch (error) {
        console.error('Error al renderizar editar editorial:', error);
        res.redirect('/editoriales');
    }
};

const editarEditorial = async (req, res) => {
    try {
        const { nombre, telefono, pais } = req.body;
        if (!nombre || !telefono || !pais || !nombre.trim() || !telefono.trim() || !pais.trim()) {
            return res.render('editoriales/edit', { 
                editorial: { id: req.params.id, nombre, telefono, pais }, 
                error: 'Todos los campos son requeridos' 
            });
        }
        await Editorial.update(
            { nombre: nombre.trim(), telefono: telefono.trim(), pais: pais.trim() }, 
            { where: { id: req.params.id } }
        );
        res.redirect('/editoriales');
    } catch (error) {
        console.error('Error al editar editorial:', error);
        res.redirect('/editoriales');
    }
};

const renderEliminar = async (req, res) => {
    try {
        const editorial = await Editorial.findByPk(req.params.id);
        if (!editorial) return res.redirect('/editoriales');
        const plainEditorial = editorial.toJSON ? editorial.toJSON() : editorial;
        res.render('editoriales/delete', { editorial: plainEditorial });
    } catch (error) {
        console.error('Error al renderizar eliminar editorial:', error);
        res.redirect('/editoriales');
    }
};

const eliminarEditorial = async (req, res) => {
    try {
        await Editorial.destroy({ where: { id: req.params.id } });
        res.redirect('/editoriales');
    } catch (error) {
        console.error('Error al eliminar editorial:', error);
        res.redirect('/editoriales');
    }
};

module.exports = { 
    listarEditoriales, 
    renderCrear, 
    crearEditorial, 
    renderEditar, 
    editarEditorial, 
    renderEliminar, 
    eliminarEditorial 
};
