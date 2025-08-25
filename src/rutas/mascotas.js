const express = require("express");
const {
  obtenerTodasLasMascotas,
  obtenerMascotaPorId,
  crearNuevaMascota,
  actualizarMascotaPorId,
  eliminarMascotaPorId,
} = require("../controladores/mascotas.controlador");

const router = express.Router();

router.get("/", obtenerTodasLasMascotas);
router.get("/:id", obtenerMascotaPorId);
router.post("/", crearNuevaMascota);
router.put("/:id", actualizarMascotaPorId);
router.delete("/:id", eliminarMascotaPorId);

module.exports = router;
