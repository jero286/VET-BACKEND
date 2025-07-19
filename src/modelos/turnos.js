const mongoose = require("mongoose");

const turnosSchema = new mongoose.Schema({
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
});

const turnosModelo = mongoose.model("turnos", turnosSchema);

module.exports = turnosModelo;
