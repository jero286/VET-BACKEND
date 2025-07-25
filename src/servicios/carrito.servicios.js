let carrito = [];

// Agrega un producto al carrito
const agregarAlCarrito = (producto) => {
  carrito.push(producto);
  return producto;
};

// Devuelve todos los productos del carrito
const obtenerCarrito = () => {
  return carrito;
};

// Elimina un producto por su ID
const eliminarDelCarrito = (id) => {
  carrito = carrito.filter(item => item.id !== id);
  return carrito;
};

// Vacía completamente el carrito
const vaciarCarrito = () => {
  carrito = [];
  return carrito;
};

// Exportamos todas las funciones
module.exports = {
  agregarAlCarrito,
  obtenerCarrito,
  eliminarDelCarrito,
  vaciarCarrito
};