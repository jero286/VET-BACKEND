const Consulta = require("../modelos/consulta");

const crearConsultaController = async (req, res) => {
  const { nombre, email, mensaje, plan } = req.body;

  if (!nombre || !email || !mensaje || !plan) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    const nuevaConsulta = new Consulta({ nombre, email, mensaje, plan });
    await nuevaConsulta.save();

    console.log("Consulta guardada en la base de datos:", nuevaConsulta);
    res.status(201).json({ mensaje: "Consulta enviada correctamente" });
  } catch (error) {
    console.error("Error al guardar la consulta:", error);
    res.status(500).json({ error: "Error al guardar la consulta" });
  }
};

const obtenerConsultasController = async (req, res) => {
  try {
    const consultas = await Consulta.find();
    console.log("Consultas obtenidas correctamente. Cantidad:", consultas.length);
    res.status(200).json(consultas);
  } catch (error) {
    console.error("Error al obtener las consultas:", error);
    res.status(500).json({ error: "Error al obtener las consultas" });
  }
};

module.exports = {
  crearConsultaController,
  obtenerConsultasController,
};


