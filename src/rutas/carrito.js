const express = require("express");
const router = express.Router();
const carritoController = require("../controladores/carrito.controladores");
const authMiddleware = require("../middlewares/auth");

// Ruta para agregar producto al carrito
router.use(authMiddleware);

router.post("/agregar", carritoController.agregarProducto);

// Ruta para obtener todo el carrito
router.get("/", carritoController.obtenerProductos);

// Ruta para eliminar un producto por ID
router.delete("/eliminar/:id", carritoController.eliminarProducto);

// Ruta para vaciar el carrito
router.delete("/vaciar", carritoController.vaciar);

router.post("/pagarProducto", carritoController.pagarProducto);

module.exports = router;
