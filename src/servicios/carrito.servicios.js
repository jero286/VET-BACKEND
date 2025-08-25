const { MercadoPagoConfig, Preference } = require("mercadopago");
const modeloCarrito = require("../modelos/carrito");
const modeloProducto = require("../modelos/productos");

// Agrega un producto al carrito
const agregarAlCarrito = async (idUsuario, productoId, cantidad = 1) => {
  const productoExiste = await modeloProducto.findById(productoId);
  if (!productoExiste) {
    throw new Error("El producto no existe");
  }
  let carrito = await modeloCarrito.findOne({ idUsuario });
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

const obtenerCarrito = async (idUsuario) => {
  try {
    console.log("ID recibido en obtenerCarrito:", idUsuario);

    const carrito = await modeloCarrito
      .findOne({ idUsuario })
      .populate({ path: "productos.producto", model: "productos" });

    if (!carrito) {
      console.log("No se encontró carrito para usuario:", idUsuario);
      return { productos: [], msg: "Carrito vacío" };
    }

    return carrito;
  } catch (error) {
    console.error("Error en obtenerCarrito:", error);
    throw error;
  }
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

const pagarProductoService = async (idUsuario) => {
  try {
    const carrito = await modeloCarrito
      .findOne({ idUsuario })
      .populate("productos.producto");

    if (!carrito || carrito.productos.length === 0) {
      return {
        msg: "El carrito está vacío o no existe",
        statusCode: 400,
      };
    }

    const items = carrito.productos.map((item) => ({
      title: item.producto.nombre,
      quantity: item.cantidad,
      unit_price: item.producto.precio,
      currency_id: "ARS",
    }));

    const permisoDelServidorAMercadoPago = new MercadoPagoConfig({
      accessToken: `${process.env.MP_ACCESS_TOKEN}`,
    });
    const preference = new Preference(permisoDelServidorAMercadoPago);

    const res = await preference.create({
      body: {
        items,
        back_urls: {
          success: "http://localhost:5173/pagoExitoso",
          pending: "http://localhost:5173/pagoPendiente",
          failure: "http://localhost:5173/pagoFallido",
        },
        auto_return: "approved",
      },
    });

    return {
      init_point: res.init_point,
      statusCode: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      msg: "Error al generar preferencia de pago",
      statusCode: 500,
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
