const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

// Determine env file based on NODE_ENV (development by default, or qa)
const nodeEnv = process.env.NODE_ENV || 'development';
const envFile = nodeEnv === 'qa' ? '.env.qa' : '.env';
require('dotenv').config({ path: path.resolve(process.cwd(), envFile) });

const { sequelize } = require('./src/models');

const app = express();
const PORT = process.env.PORT || 3000;

// Handlebars setup
app.engine('.hbs', engine({ 
    extname: '.hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'src/views/layouts'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        eq: function (a, b, options) {
            const matches = (a == b);
            if (options && typeof options.fn === 'function') {
                return matches ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
            }
            return matches;
        }
    }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'src/views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./src/routes/homeRoutes'));
app.use('/libros', require('./src/routes/libroRoutes'));
app.use('/categorias', require('./src/routes/categoriaRoutes'));
app.use('/autores', require('./src/routes/autorRoutes'));
app.use('/editoriales', require('./src/routes/editorialRoutes'));

// Database synchronization and server start
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor BookApp corriendo en http://localhost:${PORT} (Entorno: ${nodeEnv})`);
    });
}).catch(err => {
    console.error('Error al conectar con la base de datos:', err);
});
