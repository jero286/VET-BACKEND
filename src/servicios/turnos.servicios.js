const turnoModelo = require("../modelos/turnos.js");
const usuarioModelo = require("../modelos/usuarios.modelo.js");

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

    const isNum = (v) => typeof v === "number" && !isNaN(v);

    if (
      hora &&
      typeof hora === "string" &&
      (hora.includes("T") || hora.includes("Z"))
    ) {
      horaObj = new Date(hora);
      if (isNaN(horaObj.getTime())) {
        throw new Error("Hora inválida (ISO)");
      }

      if (!fecha) {
        fechaObj = new Date(
          horaObj.getFullYear(),
          horaObj.getMonth(),
          horaObj.getDate()
        );
      }
    }

    if (fecha && typeof fecha === "string") {
      const partesFecha = fecha.split("-");
      if (partesFecha.length === 3) {
        const [yyyy, mm, dd] = partesFecha.map(Number);
        if ([yyyy, mm, dd].some((v) => isNaN(v))) {
          throw new Error("Fecha inválida (componentes no numéricos)");
        }
        fechaObj = new Date(yyyy, mm - 1, dd);
        if (isNaN(fechaObj.getTime())) throw new Error("Fecha inválida");
      } else {
        throw new Error("Formato de fecha inválido (esperado YYYY-MM-DD)");
      }
    }

    if (!horaObj && hora && typeof hora === "string" && hora.includes(":")) {
      if (!fechaObj) {
        throw new Error(
          "Para usar formato 'HH:mm' es necesario enviar también 'fecha' (YYYY-MM-DD)"
        );
      }
      const [hh, min] = hora.split(":").map(Number);
      if (isNaN(hh) || isNaN(min))
        throw new Error("Formato de hora inválido (esperado HH:mm)");
      horaObj = new Date(
        fechaObj.getFullYear(),
        fechaObj.getMonth(),
        fechaObj.getDate(),
        hh,
        min,
        0,
        0
      );
      if (isNaN(horaObj.getTime()))
        throw new Error("Hora inválida (no se pudo construir Date)");
    }

    if (!horaObj && hora && typeof hora === "object" && hora instanceof Date) {
      if (!isNaN(hora.getTime())) horaObj = hora;
      else throw new Error("Hora inválida (Date inválido)");
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
    console.error("Error en actualizarTurnoService:", error.message || error);
    return {
      statusCode: 500,
      msg: error.message || "Error al actualizar el turno",
    };
  }
};

const crearTurnoService = async (body) => {
  try {
    const usuario = await usuarioModelo.findOne({ _id: body.idUsuario });
    console.log("Usuario encontrado:", usuario);

    const fechaParts = body.fecha.split("-");
    const fechaLocal = new Date(
      fechaParts[0],
      fechaParts[1] - 1,
      fechaParts[2]
    );

    const nuevoTurno = new turnoModelo({
      detalle: body.detalle,
      veterinario: body.veterinario,
      mascota: body.mascota,
      fecha: fechaLocal,
      hora: new Date(`${body.fecha}T${body.hora}`),
      idUsuario: usuario._id,
    });

    await nuevoTurno.save();

    return {
      statusCode: 201,
      msg: "Turno creado",
    };
  } catch (err) {
    console.error(err);
    return {
      statusCodeError: 400,
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
