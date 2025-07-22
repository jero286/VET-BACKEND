const turnoModelo = require("../modelos/turnos.js");

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

module.exports = {
  obtenerTurnoPorIdService,
};
