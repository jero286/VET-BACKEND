const mongoose = require("mongoose");

const carritoSchema = new mongoose.Schema({
  idUsuario: {
    type: String,
  },
  productos: [],
});

const modeloCarrito = mongoose.model("carrito", carritoSchema);

module.exports = modeloCarrito;
