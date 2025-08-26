const UsuariosModelo = require("../modelos/usuarios.modelo");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const ModeloCarrito = require("../modelos/carrito");
const { registroExitoso, recuperarContrasenia } = require("../helpers/mensajes.nodemailer.helpers");

const obtenerTodosLosUsuariosServicios = async () => {
  const usuarios = await UsuariosModelo.find();
  return {
    usuarios,
    statusCode: 200,
  };
};

const obtenerUnUsuarioPorIdServicios = async (idUsuario) => {
  const usuario = await UsuariosModelo.findOne({ _id: idUsuario });
  return {
    usuario,
    statusCode: 200,
  };
};

const crearNuevoUsuarioServicios = async (body) => {
  try {
    const nuevoUsuario = new UsuariosModelo(body);
    const carritoUsuario = new ModeloCarrito({ idUsuario: nuevoUsuario._id });

    nuevoUsuario.contrasenia = await argon.hash(nuevoUsuario.contrasenia);
    nuevoUsuario.idCarrito = carritoUsuario._id;

    const { statusCode, error } = await registroExitoso(
      body.emailUsuario,
      body.nombreUsuario
    );

    if (statusCode === 200) {
      await nuevoUsuario.save();
      await carritoUsuario.save();
      console.log(body);

      return {
        msg: "Usuario Creado",
        statusCode: 201,
      };
    } else {
      return {
        error,
        statusCode,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      msg: "Error al crear usuario",
      statusCode: 500,
    };
  }
};

const iniciarSesionServicios = async (body) => {
  const usuarioExiste = await UsuariosModelo.findOne({
    nombreUsuario: body.nombreUsuario,
  });

  if (!usuarioExiste) {
    return {
      msg: "usuario y/o contraseña incorrecto",
      statusCode: 400,
    };
  }

  const verificarContrasenia = await argon.verify(
    usuarioExiste.contrasenia,
    body.contrasenia
  );

  if (!verificarContrasenia) {
    return {
      msg: "usuario y/o contraseña incorrecto",
      statusCode: 400,
    };
  }

  const payload = {
    idUsuario: usuarioExiste._id,
    rol: usuarioExiste.rolUsuario,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return {
    msg: "Usuario Logueado",
    token,
    rol: usuarioExiste.rolUsuario,
    idUsuario: usuarioExiste._id,
    statusCode: 200,
  };
};

const actualizarUsuarioPorIdServicios = async (idUsuario, body) => {
  try {
  const usuarioActualizado =  await UsuariosModelo.findByIdAndUpdate(idUsuario, body);
  if (!usuarioActualizado){
    return{
      msg: "Usuario no encontrado",
      statusCode: 404
    }
  }

  return {
    msg: "Usuario editado con exito",
    statusCode: 200,
    data: usuarioActualizado
  };
  } catch (error) {
    console.error("Error al actualizar usuario", error)
    return{
      msg: "Error en el servidor",
      statusCode: 500
    }
  }
};

const eliminarUsuarioPorIdServicios = async (idUsuario) => {
  await UsuariosModelo.findByIdAndDelete({ _id: idUsuario });

  return {
    msg: "Usuario Eliminado",
    statusCode: 200,
  };
};

// const jwt = require("jsonwebtoken");
// const UsuariosModel = require("../models/Usuarios"); // ajusta ruta

const recuperarContraseniaUsuarioServices = async (emailUsuario) => {
  try {
    console.log(emailUsuario);

    const usuarioExiste = await UsuariosModelo.findOne({ emailUsuario });
    console.log(usuarioExiste);

    if (!usuarioExiste) {
      return {
        error: "Usuario no encontrado",
        statusCode: 404,
      };
    }

    const payload = {
      idUsuario: usuarioExiste._id,
    };

    const tokenRecuperarContrasenia = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // expiración del token, ajusta si querés
      }
    );

    await recuperarContrasenia(
      tokenRecuperarContrasenia,
      usuarioExiste.emailUsuario
    );

    return {
      msg: "Correo de recuperación enviado",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error: error.message || "Error inesperado",
      statusCode: 500,
    };
  }
};

const cambioDeContraseniaUsuarioTokenServicios = async (token, nuevaContrasenia) => {
  try {
    const verificarUsuario = jwt.verify(token, process.env.JWT_SECRET_RECOVERY_PASS)
    const usuario = await UsuariosModelo.findOne({ _id: verificarUsuario.idUsuario })

    usuario.contrasenia = await argon.hash(nuevaContrasenia)
    usuario.save()
    return {
      msg: "Se cambio la contraseña exitosamente",
      statusCode: 200
    }
  } catch (error) {
    return {
      error,
      statusCode: 500
    }
  }
}

module.exports = {
  obtenerTodosLosUsuariosServicios,
  obtenerUnUsuarioPorIdServicios,
  crearNuevoUsuarioServicios,
  iniciarSesionServicios,
  actualizarUsuarioPorIdServicios,
  eliminarUsuarioPorIdServicios,
  recuperarContraseniaUsuarioServices,
  cambioDeContraseniaUsuarioTokenServicios
};
