const { Sequelize } = require('sequelize');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const envFile = nodeEnv === 'qa' ? '.env.qa' : '.env';
require('dotenv').config({ path: path.resolve(process.cwd(), envFile) });

const dialect = process.env.DB_DIALECT || (nodeEnv === 'qa' ? 'mysql' : 'sqlite');

let sequelize;

if (dialect === 'sqlite') {
    const storagePath = process.env.DB_STORAGE 
        ? path.resolve(process.cwd(), process.env.DB_STORAGE)
        : path.join(__dirname, '..', 'database.sqlite');

    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: storagePath,
        logging: false
    });
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            dialect: dialect,
            logging: false
        }
    );
}

module.exports = sequelize;
