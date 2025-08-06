const turnoModelo = require("../modelos/turnos.js");
const usuarioModelo = require("../modelos/usuarios.modelo.js");

const obtenerTodosLosTurnosService = async () => {
  try {
    const turnos = await turnoModelo.find()
    return{
      turnos,
      statusCode: 200
    }
  } catch (error) {
    return{
      error, statusCodeError: 500
    }
  }
}
const obtenerTurnoPorIdService = async (idTurno) => {
  try {
    const turno = await turnoModelo.findOne({ _id: idTurno });
    return {
      statusCode: 200,
      msg: turno,
    };
  } catch {
    return {
      statusCodeError: 404,
    };
  }
};

const obtenerTurnoDelUsuarioService = async (idUsuario) => {
  try {
    const turnos = await turnoModelo.find({ idUsuario: idUsuario });
    return {
      statusCode: 200,
      turnos,
    };
  } catch (error) {
    return {
      statusCodeError: 404,
    };
  }
};

const eliminarTurnoService = async (idTurno) => {
  try {
    await turnoModelo.findByIdAndDelete({ _id: idTurno });
    return {
      statusCode: 204,
      msg: "Turno eliminado",
    };
  } catch {
    return {
      statusCodeError: 404,
    };
  }
};

const actualizarTurnoService = async (idTurno, body) => {
  try {
    await turnoModelo.findByIdAndUpdate({ _id: idTurno }, body);
    return {
      statusCode: 200,
      msg: "Turno actualizado",
    };
  } catch {
    return {
      statusCodeError: 404,
    };
  }
};

const crearTurnoService = async (body) => {
  try {
    const usuario = await usuarioModelo.findOne({ _id: body.idUsuario });
    console.log("Usuario encontrado:", usuario);
    const nuevoTurno = new turnoModelo({
      detalle: body.detalle,
      veterinario: body.veterinario,
      mascota: body.mascota,
      fecha: new Date(body.fecha),
      hora: new Date(`${body.fecha}T${body.hora}`),
      idUsuario: usuario._id,
    });
    await nuevoTurno.save();

    return {
      statusCode: 201,
      msg: "Turno creado",
    };
  } catch {
    return {
      statusCodeError: 400,
    };
  }
};

module.exports = {
  obtenerTurnoPorIdService,
  eliminarTurnoService,
  actualizarTurnoService,
  crearTurnoService,
  obtenerTurnoDelUsuarioService,
  obtenerTodosLosTurnosService
};
