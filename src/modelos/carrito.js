const mongoose = require("mongoose");

const CarritoSchema = new mongoose.Schema({
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productos",
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
      },
    },
  ],
  planMascota: [],
});

const ModeloCarrito = mongoose.model("carrito", CarritoSchema);

module.exports = ModeloCarrito;
