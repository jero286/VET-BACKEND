const obtenerTurnoPorId = async (req, res) => {
  try {
  } catch (error) {
    res.status(404).json({ msg: "Turno no encontrado", error });
  }
};

const eliminarTurno = async (req, res) => {
  try {
  } catch (error) {
    res.status(404).json({ msg: "No se puede borrar un turno inexistente" });
  }
};
