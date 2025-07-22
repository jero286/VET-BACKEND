const {
  obtenerTurnoPorIdService,
  eliminarTurnoService,
  actualizarTurnoService,
} = require("../servicios/turnos.servicios");

const obtenerTurnoPorId = async (req, res) => {
  try {
    const { statusCode, msg } = await obtenerTurnoPorIdService(req.params.id);
    res.status(statusCode).json({ msg });
  } catch {
    const { statusCodeError } = await obtenerTurnoPorIdService(req.params.id);
    res.status(statusCodeError).json({ msg: "Turno no existe" });
  }
};

const eliminarTurno = async (req, res) => {
  try {
    const { statusCode, msg } = await eliminarTurnoService(req.params.id);
    res.status(statusCode).json({ msg });
  } catch (error) {
    const { statusCodeError } = await eliminarTurnoService(req.params.id);
    res
      .status(statusCodeError)
      .json({ msg: "No se puede eliminar un turno inexistente" });
  }
};

const actualizarTurno = async (req, res) => {
  try {
    const { statusCode, msg } = await actualizarTurnoService(
      req.params.id,
      req.body
    );
    res.status(statusCode).json({ msg });
  } catch (error) {
    const { statusCodeError } = await actualizarTurnoService(
      req.params.id,
      req.body
    );
    res
      .status(statusCodeError)
      .json({ msg: "Turno no existe para actualizar" });
  }
};

const crearTurno = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      msg: "No se puede crear el turno. Por favor, llene bien los campos",
      error,
    });
  }
};

module.exports = {
  obtenerTurnoPorId,
  eliminarTurno,
  actualizarTurno,
  crearTurno,
};
