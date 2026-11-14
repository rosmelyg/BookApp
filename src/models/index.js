const sequelize = require('../../config/database');
const Libro = require('./libro');
const Categoria = require('./categoria');
const Autor = require('./autor');
const Editorial = require('./editorial');

// relationships
Categoria.hasMany(Libro, { foreignKey: 'categoriaId', as: 'libros', onDelete: 'CASCADE' });
Libro.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'Categoria' });

Autor.hasMany(Libro, { foreignKey: 'autorId', as: 'libros', onDelete: 'CASCADE' });
Libro.belongsTo(Autor, { foreignKey: 'autorId', as: 'Autor' });

Editorial.hasMany(Libro, { foreignKey: 'editorialId', as: 'libros', onDelete: 'CASCADE' });
Libro.belongsTo(Editorial, { foreignKey: 'editorialId', as: 'Editorial' });

module.exports = { sequelize, Libro, Categoria, Autor, Editorial };
