const ModeloProducto = require("../modelos/productos");
const cloudinary = require("../middlewares/cloudinary.config");

const obtenerTodosLosProductosServicios = async () => {
  const productos = await ModeloProducto.find();
  return {
    productos,
    statusCode: 200,
  };
};

const obtenerProductoPorIdServicios = async (idProducto) => {
  const producto = await ModeloProducto.findOne({ _id: idProducto });
  return {
    producto,
    statusCode: 200,
  };
};

const crearNuevoProductoServicios = async (body, file) => {
  if (!file || !file.path) {
    throw new Error("No se ha subido ninguna imagen");
  }
  const nuevoProducto = new ModeloProducto(body);
  const imagenCloud = await cloudinary.uploader.upload(file.path);
  nuevoProducto.imagen = imagenCloud.secure_url;

  await nuevoProducto.save();

  return {
    msg: "Producto Creado",
    idProducto: nuevoProducto._id,
    statusCode: 201,
  };
};

const crearEditarImagenServicios = async (idProducto, file) => {
  try {
    const producto = await ModeloProducto.findById(idProducto);
    const imgCloud = await cloudinary.uploader.upload(file.path);
    producto.imagen = imgCloud.secure_url;

    await producto.save();
    return {
      msg: "Imagen cargada",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const actualizarProductoPorIdServicios = async (idProducto, body) => {
  await ModeloProducto.findByIdAndUpdate({ _id: idProducto }, body);
  return {
    msg: "Producto Actualizado",
    statusCode: 200,
  };
};

const eliminarProductoPorIdServicios = async (idProducto) => {
  await ModeloProducto.findByIdAndDelete({ _id: idProducto });
  return {
    msg: "Producto Eliminado",
    statusCode: 200,
  };
};

const cambiarEstadoDeLProductoServicios = async (idProducto) => {
  try {
    const producto = await ModeloProducto.findById(idProducto);

    if (producto.habilitado) {
      producto.habilitado = false;
    } else {
      producto.habilitado = true;
    }

    await producto.save();

    return {
      msg: `Producto ${producto.habilitado ? "habilitado" : "desabilitado"}`,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  obtenerTodosLosProductosServicios,
  obtenerProductoPorIdServicios,
  crearNuevoProductoServicios,
  crearEditarImagenServicios,
  actualizarProductoPorIdServicios,
  eliminarProductoPorIdServicios,
  cambiarEstadoDeLProductoServicios,
};
