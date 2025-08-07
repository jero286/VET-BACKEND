const carritoService = require("../servicios/carrito.servicios");

// POST /carrito/agregar
const agregarProducto = async (req, res) => {
  try {
    const idUsuario = req.user.id;
    const { cantidad, productoId } = req.body;
    if (!productoId || !cantidad) {
      return res
        .status(400)
        .json({ msg: "Faltan datos: productoId o cantidad" });
    }
    const resultado = await carritoService.agregarAlCarrito(
      idUsuario,
      productoId,
      cantidad
    );
    res
      .status(201)
      .json({ mensaje: "Producto agregado al carrito", carrito: resultado });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Error al agregar producto al carrito", error });
  }
};

// GET /carrito
const obtenerProductos = async (req, res) => {
  try {
    const idUsuario = req.user.id;
    const carrito = await carritoService.obtenerCarrito(idUsuario);
    res.status(200).json(carrito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener el carrito", error });
  }
};

// DELETE /carrito/eliminar/:id
const eliminarProducto = async (req, res) => {
  try {
    const idUsuario = req.user.id;
    const productoId = req.params.id;

    const carrito = await carritoService.eliminarDelCarrito(
      idUsuario,
      productoId
    );
    res
      .status(200)
      .json({ mensaje: "Producto eliminado del carrito", carrito });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar producto", error });
  }
};

// DELETE /carrito/vaciar
const vaciar = async (req, res) => {
  try {
    const idUsuario = req.user.id;
    const carrito = await carritoService.vaciarCarrito(idUsuario);
    res.status(200).json({ mensaje: "Carrito vaciado", carrito });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al vaciar carrito", error });
  }
};
const pagarProducto = async (req, res) => {
  try {
    const {} = req.user.id;
    const { msg, statusCode } = await carritoService.pagarProductoService(
      idUsuario
    );
    res.status(statusCode).json({ init_point: msg });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Error al generar preferencia de pago", error });
  }
};

module.exports = {
  agregarProducto,
  obtenerProductos,
  eliminarProducto,
  vaciar,
  pagarProducto,
};
