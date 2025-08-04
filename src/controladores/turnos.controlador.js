const {
  obtenerTurnoPorIdService,
  eliminarTurnoService,
  actualizarTurnoService,
  crearTurnoService,
  obtenerTurnoDelUsuarioService,
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
    const { statusCode, msg } = await actualizarTurnoService(
      req.params.id,
      req.body
    );
    res.status(statusCode).json({ msg });
  } catch {
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
    const { statusCode, msg } = await crearTurnoService(req.body);
    res.status(statusCode).json({ msg });
  } catch {
    const { statusCodeError } = await crearTurnoService(req.body);
    res.status(statusCodeError).json({
      msg: "No fue posible crear el turno. Por favor, ingrese bien sus datos",
    });
  }
};

module.exports = {
  obtenerTurnoPorId,
  eliminarTurno,
  actualizarTurno,
  crearTurno,
  obtenerTurnoDelUsuario,
};
