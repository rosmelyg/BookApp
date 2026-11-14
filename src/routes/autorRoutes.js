const express = require('express');
const router = express.Router();
const { listarAutores, renderCrear, crearAutor, renderEditar, editarAutor, renderEliminar, eliminarAutor } = require('../controllers/autorController');

router.get('/', listarAutores);
router.get('/create', renderCrear);
router.post('/create', crearAutor);
router.get('/edit/:id', renderEditar);
router.post('/edit/:id', editarAutor);
router.get('/delete/:id', renderEliminar);
router.post('/delete/:id', eliminarAutor);

module.exports = router;