const express = require('express');
const router = express.Router();
const { listarEditoriales, renderCrear, crearEditorial, renderEditar, editarEditorial, renderEliminar, eliminarEditorial } = require('../controllers/editorialController');

router.get('/', listarEditoriales);
router.get('/create', renderCrear);
router.post('/create', crearEditorial);
router.get('/edit/:id', renderEditar);
router.post('/edit/:id', editarEditorial);
router.get('/delete/:id', renderEliminar);
router.post('/delete/:id', eliminarEditorial);

module.exports = router;