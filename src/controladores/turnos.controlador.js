const {
  obtenerTurnoPorIdService,
  eliminarTurnoService,
  actualizarTurnoService,
  crearTurnoService,
  obtenerTurnoDelUsuarioService,
  obtenerTodosLosTurnosService,
} = require("../servicios/turnos.servicios");

const obtenerTodosLosTurnos = async (req, res) => {
  try {
    const { turnos, statusCode } = await obtenerTodosLosTurnosService();
    res.status(statusCode).json({ turnos });
  } catch (error) {}
};
const obtenerTurnoPorId = async (req, res) => {
  try {
    const { statusCode, msg } = await obtenerTurnoPorIdService(req.params.id);
    res.status(statusCode).json({ msg });
  } catch {
    const { statusCodeError } = await obtenerTurnoPorIdService(req.params.id);
    res.status(statusCodeError).json({ msg: "Turno no existe" });
  }
};

const obtenerTurnoDelUsuario = async (req, res) => {
  try {
    const { turnos, statusCode } = await obtenerTurnoDelUsuarioService(
      req.params.id
    );
    res.status(statusCode).json({ turnos });
  } catch (error) {
    const { statusCodeError } = await obtenerTurnoDelUsuarioService(
      req.params.id
    );
    res
      .status(statusCodeError)
      .json({ msg: "No se pudo obtener el turno del usuario" });
  }
};

const eliminarTurno = async (req, res) => {
  try {
    const { statusCode, msg } = await eliminarTurnoService(req.params.id);
    res.status(statusCode).json({ msg });
  } catch {
    const { statusCodeError } = await eliminarTurnoService(req.params.id);
    res
      .status(statusCodeError)
      .json({ msg: "No se puede eliminar un turno inexistente" });
  }
};

const actualizarTurno = async (req, res) => {
  try {
    const result = await actualizarTurnoService(req.params.id, req.body);
    if (result.statusCode && result.turno) {
      return res
        .status(result.statusCode)
        .json({ msg: result.msg, turno: result.turno });
    } else if (result.statusCode) {
      return res.status(result.statusCode).json({ msg: result.msg });
    } else {
      return res
        .status(result.statusCodeError || 500)
        .json({ msg: result.msg });
    }
  } catch (err) {
    res.status(500).json({ msg: "Error del servidor al actualizar turno" });
  }
};

const crearTurno = async (req, res) => {
  const { statusCode, msg, statusCodeError } = await crearTurnoService(
    req.body
  );

  if (statusCode) {
    return res.status(statusCode).json({ msg });
  } else {
    return res.status(statusCodeError).json({ msg });
  }
};

module.exports = crearTurno;
module.exports = {
  obtenerTurnoPorId,
  eliminarTurno,
  actualizarTurno,
  crearTurno,
  obtenerTurnoDelUsuario,
  obtenerTodosLosTurnos,
};
