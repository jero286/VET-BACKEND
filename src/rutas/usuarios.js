const express = require("express");
const { obtenerTodosLosUsuarios, 
       obtenerUnUsuarioPorId,
       crearNuevoUsuario,
       actualizarUsuarioPorId,
       eliminarUsuarioPorId,
       iniciarSesion, } = require("../controladores/usuarios.controlador");
const router = express.Router();

router.get("/", obtenerTodosLosUsuarios)
router.get("/:id", obtenerUnUsuarioPorId);
router.post("/", crearNuevoUsuario);
router.post("/login", iniciarSesion);
router.put("/:id", actualizarUsuarioPorId);
router.delete("/:id", eliminarUsuarioPorId);

module.exports = router;

//CRUD USUARIOS 