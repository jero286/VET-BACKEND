const carritoService = require("../servicios/carrito.servicios");

const agregarProducto = async (req, res) => {
  try {
    const idUsuario = req.user?.idUsuario || req.user?.id || req.user?._id;
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
      .json({ msg: "Producto agregado al carrito", carrito: resultado });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Error al agregar producto al carrito", error });
  }
};

const obtenerProductos = async (req, res) => {
  try {
    const idUsuario = req.user?.idUsuario || req.user?.id || req.user?._id;
    if (!idUsuario) return res.status(401).json({ msg: "No autenticado" });
    const carrito = await carritoService.obtenerCarrito(idUsuario);
    res.json(carrito);
  } catch (error) {
    console.error("Error en obtenerProductos:", error.message);
    res.status(500).json({ msg: "Error en servidor" });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const idUsuario = req.user?.idUsuario || req.user?.id || req.user?._id;
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

const vaciar = async (req, res) => {
  try {
    const idUsuario = req.user?.idUsuario || req.user?.id || req.user?._id;
    const carrito = await carritoService.vaciarCarrito(idUsuario);
    res.status(200).json({ mensaje: "Carrito vaciado", carrito });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al vaciar carrito", error });
  }
};
const pagarProducto = async (req, res) => {
  try {
    const idUsuario = req.user?.idUsuario || req.user?.id || req.user?._id;
    const { init_point, statusCode } =
      await carritoService.pagarProductoService(idUsuario);
    if (!init_point)
      return res.status(statusCode).json({ msg: "Carrito vacío" });
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
