const turnoModelo = require("../modelos/turnos.js");
const usuarioModelo = require("../modelos/usuarios.modelo.js");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const tz = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(tz);
const ZONE = "America/Argentina/Buenos_Aires";

const obtenerTodosLosTurnosService = async () => {
  try {
    const turnos = await turnoModelo.find();
    return {
      turnos,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCodeError: 500,
    };
  }
};
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

const obtenerTurnoDelUsuarioService = async (idUsuario) => {
  try {
    const turnos = await turnoModelo.find({ idUsuario: idUsuario });
    return {
      statusCode: 200,
      turnos,
    };
  } catch (error) {
    return {
      statusCodeError: 404,
    };
  }
};

const eliminarTurnoService = async (idTurno) => {
  try {
    await turnoModelo.findByIdAndDelete({ _id: idTurno });
    return {
      statusCode: 204,
      msg: "Turno eliminado",
    };
  } catch {
    return {
      statusCodeError: 404,
    };
  }
};

const actualizarTurnoService = async (idTurno, body) => {
  try {
    const { fecha, hora, ...otrosCampos } = body;

    let fechaObj = null;
    let horaObj = null;

    const isIsoLike = (s) =>
      typeof s === "string" && (s.includes("T") || s.endsWith("Z"));

    if (
      fecha &&
      typeof fecha === "string" &&
      hora &&
      typeof hora === "string" &&
      hora.includes(":") &&
      !isIsoLike(hora)
    ) {
      fechaObj = dayjs.tz(fecha, "YYYY-MM-DD", ZONE).startOf("day").toDate();

      horaObj = dayjs.tz(`${fecha} ${hora}`, "YYYY-MM-DD HH:mm", ZONE).toDate();
    } else if (hora && typeof hora === "string" && isIsoLike(hora)) {
      horaObj = dayjs(hora).toDate();

      if (!fecha) {
        fechaObj = dayjs(horaObj).tz(ZONE).startOf("day").toDate();
      } else {
        fechaObj = dayjs.tz(fecha, "YYYY-MM-DD", ZONE).startOf("day").toDate();
      }
    } else if (fecha && typeof fecha === "string") {
      fechaObj = dayjs.tz(fecha, "YYYY-MM-DD", ZONE).startOf("day").toDate();
    }

    if (!horaObj && hora && typeof hora === "object" && hora instanceof Date) {
      if (!isNaN(hora.getTime())) {
        horaObj = hora;
        if (!fechaObj)
          fechaObj = dayjs(horaObj).tz(ZONE).startOf("day").toDate();
      } else {
        throw new Error("Hora inválida (Date inválido)");
      }
    }

    if (horaObj) {
      const ahora = dayjs().toDate();
      if (horaObj.getTime() <= ahora.getTime()) {
        return {
          statusCode: 400,
          msg: "No podés elegir una fecha/hora pasada",
        };
      }
    }

    const updateData = { ...otrosCampos };
    if (fechaObj) updateData.fecha = fechaObj;
    if (horaObj) updateData.hora = horaObj;

    if (Object.keys(updateData).length === 0) {
      return { statusCode: 400, msg: "No hay datos válidos para actualizar" };
    }

    const turnoActualizado = await turnoModelo.findByIdAndUpdate(
      idTurno,
      updateData,
      { new: true }
    );

    if (!turnoActualizado) {
      return { statusCode: 404, msg: "Turno no encontrado" };
    }

    return {
      statusCode: 200,
      msg: "Turno actualizado con éxito",
      turno: turnoActualizado,
    };
  } catch (error) {
    return {
      statusCode: 500,
      msg: error.message || "Error al actualizar el turno",
    };
  }
};

const crearTurnoService = async (body) => {
  try {
    const usuario = await usuarioModelo.findById(body.idUsuario);
    if (!usuario) throw new Error("Usuario no encontrado");

    const fechaHoraStr = `${body.fecha}T${body.hora}:00`;

    const fechaHoraArgentina = dayjs.tz(
      fechaHoraStr,
      "America/Argentina/Buenos_Aires"
    );

    const nuevoTurno = new turnoModelo({
      detalle: body.detalle,
      veterinario: body.veterinario,
      mascota: body.mascota,
      fecha: fechaHoraArgentina.startOf("day").toDate(),
      hora: fechaHoraArgentina.toDate(),
      idUsuario: usuario._id,
    });

    await nuevoTurno.save();

    return { statusCode: 201, msg: "Turno creado" };
  } catch (err) {
    return {
      statusCodeError: 400,
      msg: "No fue posible crear el turno. Por favor, ingrese bien sus datos",
    };
  }
};

module.exports = {
  obtenerTurnoPorIdService,
  eliminarTurnoService,
  actualizarTurnoService,
  crearTurnoService,
  obtenerTurnoDelUsuarioService,
  obtenerTodosLosTurnosService,
};
