const UsuariosModelo = require("../modelos/usuarios.modelo")
const argon = require("argon2")
const jwt = require("jsonwebtoken")
const ModeloCarrito = require("../modelos/carrito")
const MascotasModelo = require("../modelos/mascotas.modelo")
const TurnosModelo = require("../modelos/turnos")

const obtenerTodosLosUsuariosServicios = async () => {
    const usuarios = await UsuariosModelo.find()
    return{
        usuarios,
        statusCode: 200
    }
}

const obtenerUnUsuarioPorIdServicios = async (idUsuario) => {
    const usuario = await UsuariosModelo.findOne({_id: idUsuario})
    return{
        usuario,
        statusCode: 200
    }
}

const crearNuevoUsuarioServicios = async (body) => {
    try {
    const nuevoUsuario = new UsuariosModelo(body)
    const carritoUsuario = new ModeloCarrito({idUsuario: nuevoUsuario._id})
    const mascotasUsuario = new MascotasModelo({idUsuario: nuevoUsuario._id})
    const turnosUsuario = new TurnosModelo({idUsuario: nuevoUsuario._id})

    nuevoUsuario.contrasenia = await argon.hash(nuevoUsuario.contrasenia)
    nuevoUsuario.idCarrito = carritoUsuario._id
    nuevoUsuario.idMascotas = mascotasUsuario._id
    nuevoUsuario.idTurnos = turnosUsuario._id

        await nuevoUsuario.save();
        await carritoUsuario.save();
        await mascotasUsuario.save();
        await turnosUsuario.save();

        return{
        msg: "Usuario Creado",
        statusCode: 201
        
    }
    } catch (error) {
        console.log(error)
        return{
            error,
            statusCode: 500
        }
    }
}

const iniciarSesionServicios = async (body) => {
    const usuarioExiste = await UsuariosModelo.findOne({nombreUsuario: body.nombreUsuario})

    if(!usuarioExiste){
        return{
            msg: "usuario y/o contraseña incorrecto",
            statusCode: 400
        }
    }

    const verificarContrasenia = await argon.verify(usuarioExiste.contrasenia, body.contrasenia)

    if(!verificarContrasenia){
        return{
            msg: "usuario y/o contraseña incorrecto",
            statusCode: 400
        }
    }

    const payload = {
        idUsuario: usuarioExiste._id,
        rol: usuarioExiste.rolUsuario
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "2h"})

    return{
        msg: "Usuario Logueado",
        token,
        statusCode: 200
    }
}

const actualizarUsuarioPorIdServices = async (idUsuario, body) => {
    await UsuariosModelo.findByIdAndUpdate({_id: idUsuario}, body)

    return{
        msg: "Usuario editado con exito",
        statusCode: 200
    }
}

const eliminarUsuarioPorIdServices = async (idUsuario) => {
    await UsuariosModelo.findByIdAndUpdate({_id: idUsuario})

    return{
        msg: "Usuario Eliminado",
        statusCode: 200
    }
} 

module.exports = {
    obtenerTodosLosUsuariosServicios,
    obtenerUnUsuarioPorIdServicios,
    crearNuevoUsuarioServicios,
    iniciarSesionServicios,
    actualizarUsuarioPorIdServices,
    eliminarUsuarioPorIdServices
}