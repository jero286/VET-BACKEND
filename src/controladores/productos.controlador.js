const {
  obtenerTodosLosProductosServicios,
  obtenerProductoPorIdServicios,
  crearNuevoProductoServicios,
  actualizarProductoPorIdServicios,
  eliminarProductoPorIdServicios,
  cambiarEstadoDeLProductoServicios,
} = require("../servicios/productos.servicios");

const obtenerTodosLosProductos = async (req, res) => {
  const { productos, statusCode } = await obtenerTodosLosProductosServicios();
  res.status(statusCode).json({ productos });
};

const obtenerProductoPorId = async (req, res) => {
  const { producto, statusCode } = await obtenerProductoPorIdServicios(
    req.params.id
  );
  res.status(statusCode).json({ producto });
};

const crearNuevoProducto = async (req, res) => {
  try {
     if (!req.file) {
       return res.status(400).json({ msg: "La imagen es obligatoria" });
     }
    const { msg, statusCode, idProducto } = await crearNuevoProductoServicios(
      req.body,
      req.file
    );
    res.status(statusCode).json({ msg, idProducto });
  } catch {
    res.status(400).json({msg:"Verifique bien los campos"})
  }
};

const actualizarProductoPorId = async (req, res) => {
  const { msg, statusCode } = await actualizarProductoPorIdServicios(
    req.params.id,
    req.body
  );
  res.status(statusCode).json({ msg });
};

const eliminarProductoPorId = async (req, res) => {
  const { msg, statusCode } = await eliminarProductoPorIdServicios(
    req.params.id
  );
  res.status(statusCode).json({ msg });
};

const cambiarEstadoDelProducto = async (req, res) => {
  const { msg, statusCode, error } = await cambiarEstadoDeLProductoServicios(
    req.params.idProducto
  );

  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  crearNuevoProducto,
  actualizarProductoPorId,
  eliminarProductoPorId,
  cambiarEstadoDelProducto,
};
