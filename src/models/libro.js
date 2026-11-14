const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Libro = sequelize.define('Libro', {
    titulo: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    anoPublicacion: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    portadaUrl: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    autorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    editorialId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Libro;