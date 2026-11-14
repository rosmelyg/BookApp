const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Autor = sequelize.define('Autor', {
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    correo: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    }
});

module.exports = Autor;