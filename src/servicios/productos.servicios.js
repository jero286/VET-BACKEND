const ModeloProducto = require("../modelos/productos")

const obtenerTodosLosProductosServicios = async () => {
    const productos = await ModeloProducto.find()
    return{
        productos,
        statusCode: 200
    }
}

const obtenerProductoPorIdServicios = async (idProducto) => {
    const producto = await ModeloProducto.findOne({_id: idProducto})
    return{
        producto,
        statusCode: 200
    }
}

const crearNuevoProductoServicios = async (body) => {
    const nuevoProducto = new ModeloProducto(body)
    await nuevoProducto.save()
    return{
        msg: "Producto Creado",
        statusCode: 201
    }
}

const actualizarProductoPorIdServicios = async (idProducto, body) => {
    await ModeloProducto.findByIdAndUpdate({_id: idProducto}, body)
    return{
        msg:"Producto Actualizado",
        statusCode: 200
    }
}

const eliminarProductoPorIdServicios = async (idProducto) => {
    await ModeloProducto.findByIdAndDelete({_id:idProducto})
    return{
        msg: "Producto Eliminado",
        statusCode: 200
    }
}

module.exports = {
    obtenerTodosLosProductosServicios,
    obtenerProductoPorIdServicios,
    crearNuevoProductoServicios,
    actualizarProductoPorIdServicios,
    eliminarProductoPorIdServicios
}