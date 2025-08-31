const MascotasModelo = require("../modelos/mascotas.modelo")
const UsuariosModelo = require("../modelos/usuarios.modelo")
const mongoose = require('mongoose')

const obtenerMascotasDelUsuarioServicios = async (idUsuario) => {
    try {
        const usuario = await UsuariosModelo.findOne({usuario_id: idUsuario})
        if(!usuario){
            return{
                msg: "usuario no encontrado",
                statusCode: 404,
                mascotas: []
            }
        }

        const mascotas = await MascotasModelo.find({dueño: usuario._id})
        return{
        mascotas,
        statusCode: 200}
    } catch (error) {
        console.error("Error al obtener las mascotas")
        return{
            msg: "Error al obtener las mascotas",
            statusCode: 500,
            mascotas: []
        }
    }
}

const obtenerMascotaPorIdServicios = async (idMascota) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(idMascota)) {
            return {
                msg: "ID de mascota inválido",
                statusCode: 400,
                mascota: null
            }
        }

        const mascota = await MascotasModelo.findById(idMascota)

        if (!mascota) {
            return {
                msg: "Mascota no encontrada",
                statusCode: 404,
                mascota: null
            }
        }

        return {
            mascota,
            statusCode: 200
        }
    } catch (error) {
        console.error("Error al obtener la mascota:", error)
        return {
            msg: "Error al obtener la mascota",
            statusCode: 500,
            mascota: null
        }
    }
}

const crearNuevaMascotaServicios = async (body, idUsuario) => {
    try {
        const usuario = await UsuariosModelo.findOne({ usuario_id: idUsuario })

        if (!usuario) {
            return {
                msg: "Usuario no encontrado",
                statusCode: 404
            }
        }

        const nuevaMascota = new MascotasModelo({
            nombre: body.nombre,
            edad: body.edad,
            especie: body.especie,
            raza: body.raza,
            sexo: body.sexo,
            dueño: usuario._id
        })
        await nuevaMascota.save()
        return {
            msg: "Mascota creada",
            statusCode: 201
        }
    } catch (error) {
        console.error("Error al crear la mascota:", error);

        return {
            msg: "Error interno del servidor",
            statusCode: 500
        }
    }
}

const actualizarMascotaPorIdServicios = async (idMascota, body) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(idMascota)) {
            return {
                msg: "ID de mascota inválido",
                statusCode: 400,
                mascota: null
            }
        }
        const mascotaActualizada = await MascotasModelo.findByIdAndUpdate(
            idMascota,
            body
        )

        if (!mascotaActualizada) {
            return {
                msg: "Mascota no encontrada",
                statusCode: 404,
                mascota: null
            }
        }

        return {
            msg: "Mascota actualizada correctamente",
            statusCode: 200,
            mascota: body
        }
    } catch (error) {
        console.error("Error al actualizar la mascota:", error)
        return {
            msg: "Error al actualizar la mascota",
            statusCode: 500,
            mascota: null
        }
    }
}

const eliminarMascotaPorIdServicios = async (idMascota) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(idMascota)) {
            return {
                msg: "ID de mascota inválido",
                statusCode: 400
            }
        }
        const eliminarMascota = await MascotasModelo.findByIdAndDelete(idMascota)
        if (!eliminarMascota) {
            return {
                msg: "Mascota no encontrada",
                statusCode: 404
            }
        }
        return {
            msg: "Mascota eliminada",
            statusCode: 200
        }
    } catch (error) {
        console.error("Error al eliminar la mascota:", error)
        return {
            msg: "Error al eliminar la mascota",
            statusCode: 500
        }
    }
}

module.exports = {
    obtenerMascotasDelUsuarioServicios,
    obtenerMascotaPorIdServicios,
    crearNuevaMascotaServicios,
    actualizarMascotaPorIdServicios,
    eliminarMascotaPorIdServicios
}