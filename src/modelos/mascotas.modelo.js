const mongoose = require("mongoose")

const MascotaSchema = new mongoose.Schema({
nombre: {
    required: true,
    type: String,
    trim: true
},
edad: {
    required: true,
    type: Number
},
especie: {
    required: true,
    type: String,
    trim: true
},
raza: {
    required: true,
    type: String,
    trim: true
},
sexo: {
    required: true,
    type: String,
    trim: true,
    enum: ['macho', 'hembra']
}
})

const MascotasModel = mongoose.model("mascotas", MascotaSchema)

module.exports = MascotasModel