const express = require("express");
const router = express.Router();
const { crearConsultaController, obtenerConsultasController} = require("../controladores/consultas.controller");


router.post("/", crearConsultaController);
router.get("/", obtenerConsultasController);




module.exports = router;
