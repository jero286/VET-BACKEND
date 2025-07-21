const mongoose = require("mongoose");

const TurnosSchema = new mongoose.Schema({
  idUsuario: {
    type: String,
    required: true
  },  
  detalle: {
    type: String,
    trim: true,
    required: true,
  },
  veterinario: {
    type: String,
    required: true,
    trim: true,
  },
  mascota: {
    type: String,
    required: true,
    trim: true,
  },
  fecha: {
    type: Date,
    default: null,
  },
  hora: {
    type: Date,
    default: null,
  },
  turnos: []
});

const TurnosModelo = mongoose.model("turnos", TurnosSchema);

module.exports = TurnosModelo;