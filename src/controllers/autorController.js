const { Autor, Libro } = require('../models');

const listarAutores = async (req, res) => {
    try {
        const autores = await Autor.findAll();
        const autoresConConteo = await Promise.all(autores.map(async (aut) => {
            const count = await Libro.count({ where: { autorId: aut.id } });
            const data = aut.toJSON ? aut.toJSON() : aut;
            return { ...data, cantidadLibros: count };
        }));
        res.render('autores/list', { autores: autoresConConteo });
    } catch (error) {
        console.error('Error al listar autores:', error);
        res.redirect('/');
    }
};

const renderCrear = (req, res) => {
    res.render('autores/create');
};

const crearAutor = async (req, res) => {
    try {
        const { nombre, correo } = req.body;
        if (!nombre || !correo || !nombre.trim() || !correo.trim()) {
            return res.render('autores/create', { 
                error: 'Todos los campos son requeridos',
                nombre,
                correo
            });
        }
        await Autor.create({ 
            nombre: nombre.trim(), 
            correo: correo.trim() 
        });
        res.redirect('/autores');
    } catch (error) {
        console.error('Error al crear autor:', error);
        let errorMsg = 'Ocurrió un error al crear el autor';
        if (error.name === 'SequelizeUniqueConstraintError') {
            errorMsg = 'El correo electrónico ya se encuentra registrado.';
        }
        res.render('autores/create', { 
            error: errorMsg, 
            nombre: req.body.nombre, 
            correo: req.body.correo 
        });
    }
};

const renderEditar = async (req, res) => {
    try {
        const autor = await Autor.findByPk(req.params.id);
        if (!autor) return res.redirect('/autores');
        const plainAutor = autor.toJSON ? autor.toJSON() : autor;
        res.render('autores/edit', { autor: plainAutor });
    } catch (error) {
        console.error('Error al renderizar editar autor:', error);
        res.redirect('/autores');
    }
};

const editarAutor = async (req, res) => {
    try {
        const { nombre, correo } = req.body;
        if (!nombre || !correo || !nombre.trim() || !correo.trim()) {
            return res.render('autores/edit', { 
                autor: { id: req.params.id, nombre, correo }, 
                error: 'Todos los campos son requeridos' 
            });
        }
        await Autor.update(
            { nombre: nombre.trim(), correo: correo.trim() }, 
            { where: { id: req.params.id } }
        );
        res.redirect('/autores');
    } catch (error) {
        console.error('Error al editar autor:', error);
        let errorMsg = 'Ocurrió un error al guardar los cambios';
        if (error.name === 'SequelizeUniqueConstraintError') {
            errorMsg = 'El correo electrónico ya se encuentra registrado por otro autor.';
        }
        res.render('autores/edit', { 
            autor: { id: req.params.id, nombre: req.body.nombre, correo: req.body.correo }, 
            error: errorMsg 
        });
    }
};

const renderEliminar = async (req, res) => {
    try {
        const autor = await Autor.findByPk(req.params.id);
        if (!autor) return res.redirect('/autores');
        const plainAutor = autor.toJSON ? autor.toJSON() : autor;
        res.render('autores/delete', { autor: plainAutor });
    } catch (error) {
        console.error('Error al renderizar eliminar autor:', error);
        res.redirect('/autores');
    }
};

const eliminarAutor = async (req, res) => {
    try {
        await Autor.destroy({ where: { id: req.params.id } });
        res.redirect('/autores');
    } catch (error) {
        console.error('Error al eliminar autor:', error);
        res.redirect('/autores');
    }
};

module.exports = { 
    listarAutores, 
    renderCrear, 
    crearAutor, 
    renderEditar, 
    editarAutor, 
    renderEliminar, 
    eliminarAutor 
};
