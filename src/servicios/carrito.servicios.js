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
    console.log("ID recibido en obtenerCarrito:", idUsuario);

    const carrito = await modeloCarrito
      .findOne({ idUsuario })
      .populate({ path: "productos.producto", model: "productos" });
    console.log("RESPUESTA /carrito ->", JSON.stringify(carrito, null, 2));

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

    if (!carrito || carrito.productos.length === 0) {
      return {
        msg: "El carrito está vacío o no existe",
        statusCode: 400,
        init_point: null,
      };
    }

    if (!process.env.MP_ACCESS_TOKEN) {
      console.error("MP_ACCESS_TOKEN no está configurado");
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
        items: carrito.productos.map((item) => ({
          title: item.producto.nombre,
          quantity: item.cantidad,
          unit_price: item.producto.precio,
          currency_id: "ARS",
        })),
        back_urls: backUrls,
        auto_return: "approved",
      },
    });

    console.log("Preferencia creada:", result);

    return {
      init_point: result.init_point,
      statusCode: 200,
      msg: "Preferencia creada exitosamente",
    };
  } catch (error) {
    console.error("Error en pagarProductoService:", error);
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
