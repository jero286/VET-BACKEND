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
    const { statusCode, msg } = await actualizarTurnoService(
      req.params.id,
      req.body
    );

    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor al actualizar turno" });
  }
};

const crearTurno = async (req, res) => {
  try {
    const { statusCode, msg } = await crearTurnoService(req.body);
    res.status(statusCode).json({ msg });
  } catch (err) {
    
    res.status(400).json({
      msg: "No fue posible crear el turno. Por favor, ingrese bien sus datos",
    });
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
