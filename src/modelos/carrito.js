const mongoose = require("mongoose");

const CarritoSchema = new mongoose.Schema({
  idUsuario: {
    type: String,
    required: true,
  },
  productos: [],
  planMascota: []
});

const ModeloCarrito = mongoose.model("carrito", CarritoSchema);

module.exports = ModeloCarrito;
