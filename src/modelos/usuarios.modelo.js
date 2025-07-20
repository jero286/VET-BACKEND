const mongoose = require("mongoose")

const UsuarioSchema = new mongoose.Schema({
    nombreUsuario: {
        required: true,
        type: String,
        trim: true
    },
    apellidoUsuario: {
        required: true,
        type: String,
        trim: true
    },
    emailUsuario: {
        required: true,
        type: String,
        trim: true,
        unique: true
    },
    rolUsuario: {
        type: String,
        enum: ["usuario", "admin"],
        default: "usuario"
    },
    contraseña: {
        required: true,
        type: String,
        trim: true
    },
    telefono: {
        required: true,
        type: String,
        trim: true,
        unique: true
    }
})

const UsuarioModel = mongoose.model("usuarios", UsuarioSchema)

module.exports = UsuarioModel