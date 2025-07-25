const carritoService = require('../servicios/carrito.servicios');

// POST /carrito/agregar
const agregarProducto = (req, res) => {
  const producto = req.body;
  const resultado = carritoService.agregarAlCarrito(producto);
  res.status(201).json({ mensaje: 'Producto agregado', producto: resultado });
};

// GET /carrito
const obtenerProductos = (req, res) => {
  const items = carritoService.obtenerCarrito();
  res.status(200).json(items);
};

// DELETE /carrito/eliminar/:id
const eliminarProducto = (req, res) => {
  const { id } = req.params;
  const resultado = carritoService.eliminarDelCarrito(id);
  res.status(200).json({ mensaje: 'Producto eliminado', carrito: resultado });
};

// DELETE /carrito/vaciar
const vaciar = (req, res) => {
  const resultado = carritoService.vaciarCarrito();
  res.status(200).json({ mensaje: 'Carrito vaciado', carrito: resultado });
};

module.exports = {
  agregarProducto,
  obtenerProductos,
  eliminarProducto,
  vaciar
};
