const express = require("express");
const { obtenerTodosLosProductos,
        obtenerProductoPorId,
        crearNuevoProducto,
        actualizarProductoPorId,
        eliminarProductoPorId, } = require("../controladores/productos.controlador");
const router = express.Router();

router.get("/", obtenerTodosLosProductos);
router.get("/:id", obtenerProductoPorId);
router.post("/", crearNuevoProducto);
router.put("/:id", actualizarProductoPorId);
router.delete("/:id", eliminarProductoPorId);

module.exports = router;