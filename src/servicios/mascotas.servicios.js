const MascotasModelo = require("../modelos/mascotas.modelo")

const obtenerTodasLasMascotasServicios = async () => {
    const mascotas = await MascotasModelo.find()
    return{
        mascotas,
        statuCode: 200
    }
}

const obtenerMascotaPorIdServicios = async (idMascota) => {
    const mascota = await MascotasModelo.findOne({_id: idMascota})
    return{
        mascota,
        statusCode: 200
    }
}

const crearNuevaMascotaServicios = async (body) => {
    const nuevaMascota = new MascotasModelo(body)
    await nuevaMascota.save()
    return{
        msg:"Mascota creada",
        statuCode: 201
    }
}

const actualizarMascotaPorIdServicios = async (idMascota, body) => {
    await MascotasModelo.findByIdAndUpdate({_id:idMascota}, body)
    return{
        msg: "Mascota actualizada",
        statusCode: 200
    }
}

const eliminarMascotaPorIdServicios = async (idMascota) => {
    await MascotasModelo.findByIdAndDelete({_id: idMascota})
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