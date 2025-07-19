const mongoose = require("mongoose");

const turnosSchema = new mongoose.Schema({
  detalle: {},
  veterinario: {},
  mascota: {},
  fecha: {},
  hora: {},
});

const turnosModelo = mongoose.model("turnos", turnosSchema);

module.exports = turnosModelo;
