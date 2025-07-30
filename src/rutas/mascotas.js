const express = require("express")
const { obtenerTodasLasMascotas,
       obtenerMascotaPorId,
       crearNuevaMascota,
       actualizarMascotaPorId,
       eliminarMascotaPorId, } = require("../controladores/mascotas.controlador")
const auth = require("../middlewares/auth")
const router = express.Router()

router.get("/", auth("usuario"), obtenerTodasLasMascotas)
router.get("/:id", auth("usuario"), obtenerMascotaPorId)
router.post("/", auth("usuario"), crearNuevaMascota)
router.put("/:id", auth("usuario"), actualizarMascotaPorId)
router.delete("/:id", auth("usuario"), eliminarMascotaPorId)

module.exports = router