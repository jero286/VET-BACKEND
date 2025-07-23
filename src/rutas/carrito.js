const express = require('express');
const router = express.Router();
const carritoController = require('../controladores/carrito.controladores');

// Ruta para agregar producto al carrito
router.post('/agregar', carritoController.agregarProducto);

// Ruta para obtener todo el carrito
router.get('/', carritoController.obtenerProductos);

// Ruta para eliminar un producto por ID
router.delete('/eliminar/:id', carritoController.eliminarProducto);

// Ruta para vaciar el carrito
router.delete('/vaciar', carritoController.vaciar);

module.exports = router;