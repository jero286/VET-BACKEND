const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nombreUsuario: {
    required: true,
    type: String,
    trim: true,
  },
  apellidoUsuario: {
    required: true,
    type: String,
    trim: true,
  },
  emailUsuario: {
    required: true,
    type: String,
    trim: true,
    unique: true,
  },
  rolUsuario: {
    type: String,
    enum: ["usuario", "admin"],
    default: "usuario",
  },
  contrasenia: {
    required: true,
    type: String,
    trim: true,
  },
  telefono: {
    required: true,
    type: String,
    trim: true,
    unique: true,
  },
  idCarrito: {
    type: String,
  },
  idTurnos: {
    type: String,
  },
});

const UsuariosModelo = mongoose.model("usuarios", UsuarioSchema);

module.exports = UsuariosModelo;
