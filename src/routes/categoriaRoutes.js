const express = require('express');
const router = express.Router();
const { listarCategorias, renderCrear, crearCategoria, renderEditar, editarCategoria, renderEliminar, eliminarCategoria } = require('../controllers/categoriaController');

router.get('/', listarCategorias);
router.get('/create', renderCrear);
router.post('/create', crearCategoria);
router.get('/edit/:id', renderEditar);
router.post('/edit/:id', editarCategoria);
router.get('/delete/:id', renderEliminar);
router.post('/delete/:id', eliminarCategoria);

module.exports = router;