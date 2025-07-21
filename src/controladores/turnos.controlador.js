const obtenerTurnoPorId = async (req, res) => {
  try {
  } catch (error) {
    res.status(404).json({ msg: "Turno no encontrado", error });
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
