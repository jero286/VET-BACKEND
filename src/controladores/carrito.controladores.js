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
  const items = await carritoService.obtenerCarrito();
  res.status(200).json(items);
};

// DELETE /carrito/eliminar/:id
const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  const resultado = await carritoService.eliminarDelCarrito(id);
  res.status(200).json({ mensaje: "Producto eliminado", carrito: resultado });
};

// DELETE /carrito/vaciar
const vaciar = async (req, res) => {
  const resultado = await carritoService.vaciarCarrito();
  res.status(200).json({ mensaje: "Carrito vaciado", carrito: resultado });
};

const pagarProducto = async (req, res) => {
  try {
    const { msg, statusCode } = await carritoService.pagarProductoService();
    res.status(statusCode).json({ msg });
  } catch {
    const { statusCodeError, error } =
      await carritoService.pagarProductoService();
    res
      .status(statusCodeError)
      .json({ msg: "Problema en el servidor:", error });
  }
};

module.exports = {
  agregarProducto,
  obtenerProductos,
  eliminarProducto,
  vaciar,
  pagarProducto,
};
