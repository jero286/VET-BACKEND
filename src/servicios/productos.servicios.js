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

const crearNuevoProductoServicios = async (body,file) => {
    const nuevoProducto = new ModeloProducto(body)
    await nuevoProducto.save()
    return{
        msg: "Producto Creado",
        idProducto: nuevoProducto._id,
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

const cambiarEstadoDeLProductoServicios = async (idProducto) => {
    try {
        const producto = await ModeloProducto.findById(idProducto)
        console.log(producto)

        if(producto.habilitado){
            producto.habilitado = false
        } else {
            producto.habilitado = true
        }

        console.log(producto)
        await producto.save()

        return{
            msg: `Producto ${producto.habilitado ? "habilitado" : "desabilitado"}`,
            statusCode: 200
        }
    } catch (error) {
        return{
            error,
            statusCode: 500
        }
    }
}

module.exports = {
    obtenerTodosLosProductosServicios,
    obtenerProductoPorIdServicios,
    crearNuevoProductoServicios,
    actualizarProductoPorIdServicios,
    eliminarProductoPorIdServicios,
    cambiarEstadoDeLProductoServicios
}