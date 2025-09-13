const { MercadoPagoConfig, Preference } = require("mercadopago");
const modeloCarrito = require("../modelos/carrito");
const modeloProducto = require("../modelos/productos");

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
    const carrito = await modeloCarrito
      .findOne({ idUsuario })
      .populate({ path: "productos.producto", model: "productos" });

    if (!carrito) {
      return { productos: [], msg: "Carrito vacío" };
    }

    return carrito;
  } catch (error) {
    throw error;
  }
};

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

    if (!carrito) {
      return {
        msg: "El carrito no existe",
        statusCode: 400,
        init_point: null,
      };
    }

    const productosValidos = carrito.productos.filter(
      (item) =>
        item &&
        item.producto &&
        item.producto.nombre &&
        item.producto.precio &&
        item.cantidad > 0
    );

    if (productosValidos.length === 0) {
      return {
        msg: "El carrito está vacío o no tiene productos válidos",
        statusCode: 400,
        init_point: null,
      };
    }

    if (productosValidos.length !== carrito.productos.length) {
      carrito.productos = productosValidos;
      await carrito.save();
    }

    if (!process.env.MP_ACCESS_TOKEN) {
      return {
        msg: "Error de configuración de pago",
        statusCode: 500,
        init_point: null,
      };
    }

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });
    const preference = new Preference(client);

    const backUrls = {
      success: "https://veterinariacare.netlify.app/pagoExitoso",
      pending: "https://veterinariacare.netlify.app/pagoPendiente",
      failure: "https://veterinariacare.netlify.app/pagoFallido",
    };

    const result = await preference.create({
      body: {
        items: productosValidos.map((item) => ({
          title: item.producto.nombre,
          quantity: item.cantidad,
          unit_price: item.producto.precio,
          currency_id: "ARS",
        })),
        back_urls: backUrls,
        auto_return: "approved",
      },
    });

    return {
      init_point: result.init_point,
      statusCode: 200,
      msg: "Preferencia creada exitosamente",
    };
  } catch (error) {
    return {
      msg: "Error al generar preferencia de pago",
      statusCode: 500,
      init_point: null,
    };
  }
};

module.exports = {
  agregarAlCarrito,
  obtenerCarrito,
  eliminarDelCarrito,
  vaciarCarrito,
  pagarProductoService,
};
