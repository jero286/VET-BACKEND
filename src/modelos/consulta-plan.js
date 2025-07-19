const mongoose = require("mongoose");

const consultaSchema = new mongoose.Schema({
  tipoPlan: {
    type: String,
    required: true,
    trim: true,
    enum: ["Primeros pasos", "Madurando", "Adultos"],
  },
  nombreUsuario: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  emailUsuario: {
    type: String,
    required: true,
    trim: true,
  },
  mensaje: {
    type: String,
    required: true,
    trim: true,
    minlength,
    maxlenght,
  },
  fechaCreación: {
    type: Date,
    default: Date.now(),
  },
});

const modeloConsulta = mongoose.model("consultaPLan", consultaSchema);

module.exports = modeloConsulta;
