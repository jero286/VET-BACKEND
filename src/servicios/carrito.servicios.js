const { MercadoPagoConfig, Preference } = require("mercadopago");
const modeloCarrito = require("../modelos/carrito");
const modeloProducto = require("../modelos/productos");

// Agrega un producto al carrito
const agregarAlCarrito = async (idUsuario, productoId, cantidad = 1) => {
  const productoExiste = await modeloProducto.findById(productoId);
  if (!productoExiste) {
    throw new Error("El producto no existe");
  }
  const carrito = await modeloCarrito.findOne({ idUsuario });
  if (!carrito) {
    carrito = new modeloCarrito({
      idUsuario,
      productos: [{ producto: productoId, cantidad }],
    });
  } else {
    const productoEnCarrito = carrito.productos.find(
      (prod) => prod.producto.toString() === productoId
    );
    if (productoEnCarrito) {
      productoEnCarrito.cantidad += cantidad;
    } else {
      carrito.productos.push({ producto: productoId, cantidad });
    }
  }

  await carrito.save();
  return carrito;
};

// Devuelve todos los productos del carrito
const obtenerCarrito = async (idUsuario) => {
  const carrito = await modeloCarrito
    .findOne({ idUsuario })
    .populate("productos.producto");
  if (!carrito) {
    return {
      productos: [],
      msg: "Carrito vacío",
    };
  }
  return carrito;
};

// Elimina un producto por su ID
const eliminarDelCarrito = async (idUsuario, productoId) => {
  const carrito = await modeloCarrito.findOne({ idUsuario });

  if (!carrito) {
    throw new Error("No se encontró un carrito para este usuario");
  }

  carrito.productos = carrito.productos.filter(
    (p) => p.producto.toString() !== productoId
  );

  await carrito.save();

  return carrito;
};

// Vacía completamente el carrito
const vaciarCarrito = async (idUsuario) => {
  const carrito = await modeloCarrito.findOne({ idUsuario });

  if (!carrito) {
    throw new Error("No se encontró un carrito para este usuario");
  }

  carrito.productos = [];
  await carrito.save();

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
      statusCodeError: 500,
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
  pagarProductoService,
};
