const UsuariosModelo = require("../modelos/usuarios.modelo");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const ModeloCarrito = require("../modelos/carrito");
const {
  registroExitoso,
  recuperarContrasenia,
} = require("../helpers/mensajes.nodemailer.helpers");

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
    const usuarioExiste = await UsuariosModelo.findOne({
      nombreUsuario: body.nombreUsuario,
    });

    if (usuarioExiste) {
      return {
        msg: "El nombre de usuario ya está en uso",
        statusCode: 400,
      };
    }

    const emailExiste = await UsuariosModelo.findOne({
      emailUsuario: body.emailUsuario,
    });

    if (emailExiste) {
      return {
        msg: "El email ya está registrado",
        statusCode: 400,
      };
    }

    const telefonoExiste = await UsuariosModelo.findOne({
      telefono: body.telefono,
    });

    if (telefonoExiste) {
      return {
        msg: "El teléfono ya está registrado",
        statusCode: 400,
      };
    }

    const nuevoUsuario = new UsuariosModelo(body);
    const carritoUsuario = new ModeloCarrito({ idUsuario: nuevoUsuario._id });

    nuevoUsuario.contrasenia = await argon.hash(nuevoUsuario.contrasenia);
    nuevoUsuario.idCarrito = carritoUsuario._id;

    try {
      await nuevoUsuario.save();
      await carritoUsuario.save();

      try {
        const { statusCode: emailStatusCode, error: emailError } =
          await Promise.race([
            registroExitoso(body.emailUsuario, body.nombreUsuario),
            new Promise((resolve) =>
              setTimeout(
                () =>
                  resolve({
                    statusCode: 408,
                    error: "Timeout al enviar email",
                  }),
                5000
              )
            ),
          ]);
      } catch (emailTimeoutError) {}

      return {
        msg: "Usuario creado exitosamente",
        statusCode: 201,
      };
    } catch (saveError) {
      if (saveError.code === 11000) {
        const field = Object.keys(saveError.keyPattern)[0];
        let mensaje = "";

        switch (field) {
          case "nombreUsuario":
            mensaje = "El nombre de usuario ya está en uso";
            break;
          case "emailUsuario":
            mensaje = "El email ya está registrado";
            break;
          case "telefono":
            mensaje = "El teléfono ya está registrado";
            break;
          default:
            mensaje = "Ya existe un usuario con esos datos";
        }

        return {
          msg: mensaje,
          statusCode: 400,
        };
      }

      if (saveError.name === "ValidationError") {
        const errores = Object.values(saveError.errors).map(
          (err) => err.message
        );
        return {
          msg: `Error de validación: ${errores.join(", ")}`,
          statusCode: 400,
        };
      }

      throw saveError;
    }
  } catch (error) {
    return {
      msg: "Error interno del servidor",
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
    const usuarioActualizado = await UsuariosModelo.findByIdAndUpdate(
      idUsuario,
      body
    );
    if (!usuarioActualizado) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404,
      };
    }

    return {
      msg: "Usuario editado con exito",
      statusCode: 200,
      data: usuarioActualizado,
    };
  } catch (error) {
    return {
      msg: "Error en el servidor",
      statusCode: 500,
    };
  }
};

const eliminarUsuarioPorIdServicios = async (idUsuario) => {
  await UsuariosModelo.findByIdAndDelete({ _id: idUsuario });

  return {
    msg: "Usuario Eliminado",
    statusCode: 200,
  };
};

const recuperarContraseniaUsuarioServices = async (emailUsuario) => {
  try {
    const usuarioExiste = await UsuariosModelo.findOne({ emailUsuario });

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
      process.env.JWT_SECRET_RECOVERY_PASS,
      {
        expiresIn: "1h",
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
    return {
      error: error.message || "Error inesperado",
      statusCode: 500,
    };
  }
};

const cambioDeContraseniaUsuarioTokenServicios = async (
  token,
  nuevaContrasenia
) => {
  try {
    const verificarUsuario = jwt.verify(
      token,
      process.env.JWT_SECRET_RECOVERY_PASS
    );
    const usuario = await UsuariosModelo.findById(verificarUsuario.idUsuario);

    if (!usuario) {
      return { statusCode: 404, error: "Usuario no encontrado" };
    }

    usuario.contrasenia = await argon.hash(nuevaContrasenia);
    await usuario.save();

    return { msg: "Se cambió la contraseña exitosamente", statusCode: 200 };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return { statusCode: 401, error: "Token expirado" };
    }
    if (err.name === "JsonWebTokenError") {
      return { statusCode: 400, error: "Token inválido" };
    }

    return { statusCode: 500, error: "Error interno del servidor" };
  }
};

module.exports = {
  obtenerTodosLosUsuariosServicios,
  obtenerUnUsuarioPorIdServicios,
  crearNuevoUsuarioServicios,
  iniciarSesionServicios,
  actualizarUsuarioPorIdServicios,
  eliminarUsuarioPorIdServicios,
  recuperarContraseniaUsuarioServices,
  cambioDeContraseniaUsuarioTokenServicios,
};
