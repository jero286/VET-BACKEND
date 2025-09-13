const {
  obtenerMascotasDelUsuarioServicios,
  obtenerMascotaPorIdServicios,
  eliminarMascotaPorIdServicios,
  actualizarMascotaPorIdServicios,
  crearNuevaMascotaServicios,
} = require("../servicios/mascotas.servicios");

const obtenerMascotasDelUsuario = async (req, res) => {
  const idUsuario = req.usuario._id;
  const { mascotas, msg, statusCode } =
    await obtenerMascotasDelUsuarioServicios(idUsuario);
  if (statusCode === 200) {
    res.status(statusCode).json({ mascotas });
  } else {
    res.status(statusCode).json({ msg });
  }
};

const obtenerMascotaPorId = async (req, res) => {
  const idMascota = req.params.id;

  try {
    const { mascota, msg, statusCode } = await obtenerMascotaPorIdServicios(
      idMascota
    );
    if (statusCode === 200) {
      res.status(statusCode).json({ mascota });
    } else {
      res.status(statusCode).json({ msg });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const crearNuevaMascota = async (req, res) => {
  try {
    const { msg, statusCode } = await crearNuevaMascotaServicios(
      req.body,
      req.usuario._id
    );
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor" });
  }
};

const actualizarMascotaPorId = async (req, res) => {
  const idMascota = req.params.id;
  const body = req.body;

  try {
    const { msg, statusCode, mascota } = await actualizarMascotaPorIdServicios(
      idMascota,
      body
    );

    if (statusCode === 200) {
      res.status(statusCode).json({ msg, mascota });
    } else {
      res.status(statusCode).json({ msg });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const eliminarMascotaPorId = async (req, res) => {
  const idMascota = req.params.id;
  try {
    const { msg, statusCode } = await eliminarMascotaPorIdServicios(idMascota);
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

module.exports = {
  obtenerMascotasDelUsuario,
  obtenerMascotaPorId,
  crearNuevaMascota,
  actualizarMascotaPorId,
  eliminarMascotaPorId,
};
