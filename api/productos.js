//import model from "../model/productos-mem.js"
//import model from "../model/productos-file.js"
/*
import ProductoModelFile from "../model/productos-file.js"
import ProductoModelMem from "../model/productos-mem.js"
import ProductoModelMongoDB from "../model/productos-mongodb.js"
*/
import ProductoModel from "../model/productos.js"
import config from '../config.js'

//const model = new ProductoModelMongoDB()
//const model = new ProductoModelMem()
//const model = new ProductoModelFile()

const model = ProductoModel.get(config.TIPO_DE_PERSISTENCIA)

/* Api Obtener ALL */
const obtenerProductos = async () => {
    let productos = await model.readProductos()
    return productos
}

/* Api Obtener ONE */
const obtenerProducto = async id => {
    let producto = await model.readProducto(id)
    return producto
}

/* Api Guardar */
const guardarProducto = async producto => {
    let productoCreado = await model.createProducto(producto)
    return productoCreado
}

/* Api Actualizar */
const actualizarProducto = async (id,producto) => {
    let productoUpdate = await model.updateProducto(id,producto)
    return productoUpdate
}

/* Api Borrar */
const borrarProducto = async id => {
    let productoDelete = await model.deleteProducto(id)
    return productoDelete 
}


//exports
export default {
    obtenerProductos,
    obtenerProducto,
    guardarProducto,
    actualizarProducto,
    borrarProducto
}