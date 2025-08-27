const express = require("express");
const router = express.Router();
const carritoController = require("../controladores/carrito.controladores");
const auth = require("../middlewares/auth");

router.post("/agregar", auth("usuario"), carritoController.agregarProducto);

router.get("/", auth("usuario"), carritoController.obtenerProductos);

router.delete(
  "/eliminar/:id",
  auth("usuario"),
  carritoController.eliminarProducto
);

router.delete("/vaciar", auth("usuario"), carritoController.vaciar);

router.post("/pagarProducto", auth("usuario"), carritoController.pagarProducto);

module.exports = router;
