const turnoModelo = require("../modelos/turnos.js");
const usuarioModelo = require("../modelos/usuarios.modelo.js");

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
    const nuevoTurno = new turnoModelo(body);
    const usuario = new usuarioModelo({ idTurnos: nuevoTurno._id });
    nuevoTurno.idUsuario = usuario._id;
    await nuevoTurno.save();
    await usuario.save();
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
};
