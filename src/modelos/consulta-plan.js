const mongoose = require("mongoose");

const consultaSchema = new mongoose.Schema({
  tipoPlan: {},
  nombreUsuario: {},
  emailUsuario: {},
  mensaje: {},
  fechaCreación: {},
});

const modeloConsulta = mongoose.model("consultaPLan", consultaSchema);

module.exports = modeloConsulta;
