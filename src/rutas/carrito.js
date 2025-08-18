const express = require("express");
const router = express.Router();
const carritoController = require("../controladores/carrito.controladores");




router.post("/agregar", carritoController.agregarProducto);

router.get("/", carritoController.obtenerProductos);

router.delete("/eliminar/:id", carritoController.eliminarProducto);

router.delete("/vaciar", carritoController.vaciar);

router.post("/pagarProducto", carritoController.pagarProducto);

module.exports = router;
