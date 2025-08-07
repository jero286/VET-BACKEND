const mongoose = require("mongoose");

const consultaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  mensaje: { type: String, required: true },
  plan: { type: String, required: true },
});

module.exports = mongoose.model("Consulta", consultaSchema);
