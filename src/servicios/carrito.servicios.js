const { MercadoPagoConfig, Preference } = require("mercadopago");

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
  carrito = carrito.filter((item) => item.id !== id);
  return carrito;
};

// Vacía completamente el carrito
const vaciarCarrito = () => {
  carrito = [];
  return carrito;
};

const pagarProductoService = async (carrito) => {
  try {
    const permisoDelServidorAMercadoPago = new MercadoPagoConfig({
      accessToken: `${process.env.MP_ACCESS_TOKEN}`,
    });

    const preference = new Preference(permisoDelServidorAMercadoPago);

    const res = preference.create({
      body: {
        items: [{ title, quantity, unit_price, currency_id }],
        back_urls: {
          success,
          pending,
          failure,
        },
      },
    });
    return {
      msg: (await res).init_point,
      statusCode: 200,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error,
    };
  }
};

// Exportamos todas las funciones
module.exports = {
  agregarAlCarrito,
  obtenerCarrito,
  eliminarDelCarrito,
  vaciarCarrito,
};
