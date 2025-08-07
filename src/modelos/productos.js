const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
    max: 100000,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  imagen: {
    type: String,
    default: "url",
  },
  habilitado: {
    type: Boolean,
    default: false,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now(),
  },
});

const ModeloProducto = mongoose.model("productos", ProductoSchema);

module.exports = ModeloProducto;