const MascotasModelo = require("../modelos/mascotas.modelo")

const obtenerTodasLasMascotasServicios = async () => {
    const mascotas = await MascotasModelo.find({usuario: idUsuario})
    return{
        mascotas,
        statuCode: 200
    }
}

const obtenerMascotaPorIdServicios = async (idMascota, idUsuario) => {
    const mascota = await MascotasModelo.findOne({_id: idMascota, usuario: idUsuario})
    return{
        mascota,
        statusCode: 200
    }
}

const crearNuevaMascotaServicios = async (body, idUsuario) => {
    const bodyConIdUsuario = {...body,
        usuario: idUsuario
    }
    const nuevaMascota = new MascotasModelo(bodyConIdUsuario)
    await nuevaMascota.save()
    return{
        msg:"Mascota creada",
        statusCode: 201
    }
}

const actualizarMascotaPorIdServicios = async (idMascota, body) => {
    await MascotasModelo.findByIdAndUpdate({_id:idMascota, usuario: idUsuario}, body)
    return{
        msg: "Mascota actualizada",
        statusCode: 200
    }
}

const eliminarMascotaPorIdServicios = async (idMascota, idUsuario) => {
    await MascotasModelo.findByIdAndDelete({_id: idMascota, usuario: idUsuario})
    return{
        msg: "Mascota eliminada",
        statusCode: 200
    }
}

module.exports = {
    obtenerTodasLasMascotasServicios,
    obtenerMascotaPorIdServicios,
    crearNuevaMascotaServicios,
    actualizarMascotaPorIdServicios,
    eliminarMascotaPorIdServicios
}