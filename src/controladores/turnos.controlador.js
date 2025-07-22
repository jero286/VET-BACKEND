const { obtenerTurnoPorIdService } = require("../servicios/turnos.servicios");

const obtenerTurnoPorId = async (req, res) => {
  try {
    const { statusCode, msg } = await obtenerTurnoPorIdService(req.params.id);
    res.status(statusCode).json({ msg });
  } catch {
    const { statusCodeError } = await obtenerTurnoPorIdService(req.params.id);
    res.status(statusCodeError).json({msg:"Turno no existe"});
  }
};

const eliminarTurno = async (req, res) => {
  try {
  } catch (error) {
    res.status(404).json({ msg: "No existe el turno", error });
  }
};

const actualizarTurno = async (req, res) => {
  try {
  } catch (error) {
    res.status(404).json({ msg: "No existe el turno", error });
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
