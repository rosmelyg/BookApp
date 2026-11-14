const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Editorial = sequelize.define('Editorial', {
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    telefono: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    pais: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }
});

module.exports = Editorial;