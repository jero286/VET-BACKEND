const { obtenerTodasLasMascotasServicios,
        obtenerMascotaPorIdServicios,
        actualizarMascotaPorIdServicios,
        eliminarMascotaPorIdServicios,
        crearNuevaMascotaServicios, } = require("../servicios/mascotas.servicios")

const obtenerTodasLasMascotas = async (req, res) => {
    const {mascotas, statusCode} = await obtenerTodasLasMascotasServicios(req.user.id)
    res.status(statusCode).json({mascotas})
}

const obtenerMascotaPorId = async (req, res) => {
    const {mascota, statusCode} = await obtenerMascotaPorIdServicios(req.params.id, req.user.id)
    res.status(statusCode).json({mascota})
}

const crearNuevaMascota = async (req, res) => {
    const {msg, statusCode} = await crearNuevaMascotaServicios(
        req.body,
        req.usuario._id
    )
    res.status(statusCode).json({msg})
}

const actualizarMascotaPorId = async (req, res) => {
    const {msg, statusCode} = await actualizarMascotaPorIdServicios(
        req.params.id,
        req.body,
        req.user.id
    )
    res.status(statusCode).json({msg})
}

const eliminarMascotaPorId = async (req, res) => {
    const {msg, statusCode} = await eliminarMascotaPorIdServicios(req.params.id, req.user.id)
    res.status(statusCode).json({msg})
}

module.exports = {
    obtenerTodasLasMascotas,
    obtenerMascotaPorId,
    crearNuevaMascota,
    actualizarMascotaPorId,
    eliminarMascotaPorId
}