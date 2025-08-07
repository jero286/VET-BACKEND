const express = require("express")
const {
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  crearNuevoProducto,
  actualizarProductoPorId,
  eliminarProductoPorId,
  crearEditarImagen,
} = require("../controladores/productos.controlador");
const router = express.Router();
const multerMiddleware = require("../middlewares/multer.middleware");

router.get("/", obtenerTodosLosProductos);
router.get("/:id", obtenerProductoPorId);
router.post("/", multerMiddleware.single("imagen"), crearNuevoProducto);
router.put("/:id", actualizarProductoPorId);
router.delete("/:id", eliminarProductoPorId);

module.exports = router