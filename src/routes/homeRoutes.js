const express = require('express');
const router = express.Router();
const { getHome, getDetalleLibro } = require('../controllers/homeController');

router.get('/', getHome);
router.get('/libro/:id', getDetalleLibro);

module.exports = router;