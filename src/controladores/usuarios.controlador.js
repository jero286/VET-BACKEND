const { obtenerTodosLosUsuariosServicios,
       obtenerUnUsuarioPorIdServicios,
       crearNuevoUsuarioServicios,
       iniciarSesionServicios,
       actualizarUsuarioPorIdServicios,
       eliminarUsuarioPorIdServicios,
      recuperarContraseniaUsuarioServices
    
     } = require("../servicios/usuarios.servicios")

const obtenerTodosLosUsuarios = async (req, res) => {
    const {usuarios, statusCode} = await obtenerTodosLosUsuariosServicios()
    res.status(statusCode).json({usuarios})
}

const obtenerUnUsuarioPorId = async (req, res) => {
    const {usuario, statusCode} = await obtenerUnUsuarioPorIdServicios()
    res.status(statusCode). json({usuario})
}

const crearNuevoUsuario = async (req, res) => {
    const {msg, statusCode} = await crearNuevoUsuarioServicios(req.body)
    try {
        res.status(statusCode).json({msg})
    } catch (error) {
        res.status(statusCode).json({msg})
    }
}

const iniciarSesion = async (req, res) => {
    const {msg, token, rol, statusCode} = await iniciarSesionServicios(req.body)
    res.status(statusCode).json({msg, token, rol})
}

const actualizarUsuarioPorId = async (req, res) => {
    const {msg, statusCode} = await actualizarUsuarioPorIdServicios(
        req.params.id,
        req.body
    )
    res.status(statusCode).json({msg})
}

const eliminarUsuarioPorId = async (req, res) => {
    const {msg, statusCode} = await eliminarUsuarioPorIdServicios(req.params.id)
    res.status(statusCode).json({msg})
}

const recuperarContraseniaUsuario = async (req, res) => {
  try {
    const { msg, statusCode, error } = await recuperarContraseniaUsuarioServices(
      req.body.emailUsuario
    );

    if (error) {
      return res.status(statusCode).json({ error });
    }

    return res.status(statusCode).json({ msg: msg || "Operación exitosa" });
  } catch (error) {
    console.error(error);
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
   recuperarContraseniaUsuario
}