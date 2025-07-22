const express = require("express");
const {
  obtenerTurnoPorId,
  crearTurno,
  actualizarTurno,
  eliminarTurno,
} = require("../controladores/turnos.controlador");
const router = express.Router();

router.get("/:id", obtenerTurnoPorId);
router.post("/", crearTurno);
router.put("/:id", actualizarTurno);
router.delete("/:id", eliminarTurno);

module.exports = router;
