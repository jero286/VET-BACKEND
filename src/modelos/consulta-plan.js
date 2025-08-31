const mongoose = require("mongoose");

const ConsultaSchema = new mongoose.Schema({
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
    minlength:5,
    maxlenght:50,
  },
  fechaCreación: {
    type: Date,
    default: Date.now(),
  },
});

const ModeloConsulta = mongoose.model("consultaPLan", ConsultaSchema);

module.exports = ModeloConsulta;