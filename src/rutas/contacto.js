const express = require('express');
const router = express.Router();
const contactoController = require('../controladores/contacto.controlador');

router.post('/contacto', contactoController.enviarMensaje);

module.exports = router;
