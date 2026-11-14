const express = require('express');
const router = express.Router();
const { listarLibros, renderCrear, crearLibro, renderEditar, editarLibro, renderEliminar, eliminarLibro } = require('../controllers/libroController');

router.get('/', listarLibros);
router.get('/create', renderCrear);
router.post('/create', crearLibro);
router.get('/edit/:id', renderEditar);
router.post('/edit/:id', editarLibro);
router.get('/delete/:id', renderEliminar);
router.post('/delete/:id', eliminarLibro);

module.exports = router;