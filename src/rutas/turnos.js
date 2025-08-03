const express = require("express");
const {
  obtenerTurnoPorId,
  crearTurno,
  actualizarTurno,
  eliminarTurno,
  obtenerTurnoDelUsuario,
} = require("../controladores/turnos.controlador");
const router = express.Router();

router.get("/:id", obtenerTurnoPorId);
router.get("/:id", obtenerTurnoDelUsuario);
router.post("/", crearTurno);
router.put("/:id", actualizarTurno);
router.delete("/:id", eliminarTurno);

module.exports = router;
