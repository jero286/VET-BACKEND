const {
  obtenerTodosLosUsuariosServicios,
  obtenerUnUsuarioPorIdServicios,
  crearNuevoUsuarioServicios,
  iniciarSesionServicios,
  actualizarUsuarioPorIdServicios,
  eliminarUsuarioPorIdServicios,
  recuperarContraseniaUsuarioServices,
  cambioDeContraseniaUsuarioTokenServicios,
} = require("../servicios/usuarios.servicios");

const obtenerTodosLosUsuarios = async (req, res) => {
  const { usuarios, statusCode } = await obtenerTodosLosUsuariosServicios();
  res.status(statusCode).json({ usuarios });
};

const obtenerUnUsuarioPorId = async (req, res) => {
  const { usuario, statusCode } = await obtenerUnUsuarioPorIdServicios(req.params.id); // ✅ Agregar req.params.id
  res.status(statusCode).json({ usuario });
};

const crearNuevoUsuario = async (req, res) => {
  try {
    const { msg, statusCode } = await crearNuevoUsuarioServicios(req.body);
    res.status(statusCode).json({ msg });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error inesperado en el servidor" });
  }
};

const iniciarSesion = async (req, res) => {
  const { msg, token, statusCode, rol, idUsuario } =
    await iniciarSesionServicios(req.body);
  res.status(statusCode).json({ msg, token, rol, idUsuario });
};

const actualizarUsuarioPorId = async (req, res) => {
  const { msg, statusCode } = await actualizarUsuarioPorIdServicios(
    req.params.id,
    req.body
  );
  res.status(statusCode).json({ msg });
};

const eliminarUsuarioPorId = async (req, res) => {
  const { msg, statusCode } = await eliminarUsuarioPorIdServicios(
    req.params.id
  );
  res.status(statusCode).json({ msg });
};

const recuperarContraseniaUsuario = async (req, res) => {
  try {
    const { msg, statusCode, error } =
      await recuperarContraseniaUsuarioServices(req.body.emailUsuario);

    if (error) {
      return res.status(statusCode).json({ error });
    }

    return res.status(statusCode).json({ msg: msg || "Operación exitosa" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const cambioDeContraseniaUsuarioToken = async (req, res) => {
  try {
    const token = (req.query.token || "").trim();
    const { contrasenia } = req.body;

    console.log("Controller - token recibido:", token);
    console.log("Controller - body:", req.body);

    if (!token)
      return res.status(400).json({ error: "Falta token en la query." });
    if (!contrasenia)
      return res
        .status(400)
        .json({ error: "Falta el campo contrasenia en body." });

    const resultado = await cambioDeContraseniaUsuarioTokenServicios(
      token,
      contrasenia
    );

    if (resultado.error) {
      return res
        .status(resultado.statusCode || 500)
        .json({ error: resultado.error });
    }

    return res.status(resultado.statusCode || 200).json({ msg: resultado.msg });
  } catch (err) {
    console.error("Controller - error inesperado:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  crearNuevoUsuario,
  iniciarSesion,
  actualizarUsuarioPorId,
  eliminarUsuarioPorId,
  recuperarContraseniaUsuario,
  cambioDeContraseniaUsuarioToken,
};
