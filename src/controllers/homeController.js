const { Libro, Categoria, Autor, Editorial } = require('../models');
const { Op } = require('sequelize');

const libroIncludes = [
    { model: Categoria, as: 'Categoria' },
    { model: Autor, as: 'Autor' },
    { model: Editorial, as: 'Editorial' }
];

const getHome = async (req, res) => {
    try {
        const { titulo, categoriaId } = req.query;
        const categorias = await Categoria.findAll({ order: [['nombre', 'ASC']] });
        
        let whereCondition = {};
        if (titulo && titulo.trim() !== '') {
            whereCondition.titulo = { [Op.like]: `%${titulo.trim()}%` };
        }
        
        let selectedCategoryIds = [];
        if (categoriaId) {
            selectedCategoryIds = Array.isArray(categoriaId) ? categoriaId : [categoriaId];
            selectedCategoryIds = selectedCategoryIds.map(id => String(id)).filter(id => id.trim() !== '');
            if (selectedCategoryIds.length > 0) {
                whereCondition.categoriaId = { [Op.in]: selectedCategoryIds };
            }
        }

        const libros = await Libro.findAll({
            where: whereCondition,
            include: libroIncludes,
            order: [['id', 'DESC']]
        });

        const plainLibros = libros.map(l => (l.toJSON ? l.toJSON() : l));
        const categoriasConSeleccion = categorias.map(cat => {
            const data = cat.toJSON ? cat.toJSON() : cat;
            return {
                ...data,
                selected: selectedCategoryIds.includes(String(data.id))
            };
        });

        res.render('home/index', { 
            libros: plainLibros, 
            categorias: categoriasConSeleccion, 
            tituloFiltro: titulo ? titulo.trim() : ''
        });
    } catch (error) {
        console.error('Error al cargar la pantalla Home:', error);
        res.status(500).send("Error en el servidor");
    }
};

const getDetalleLibro = async (req, res) => {
    try {
        const libro = await Libro.findByPk(req.params.id, {
            include: libroIncludes
        });
        if (!libro) return res.redirect('/');
        res.render('home/detalle', { libro: libro.toJSON ? libro.toJSON() : libro });
    } catch (error) {
        console.error('Error al obtener detalle del libro:', error);
        res.redirect('/');
    }
};

module.exports = { getHome, getDetalleLibro };
