//https://mongoosejs.com/
import mongoose from 'mongoose'
import Mongo_DB from './DB_mongo.js'

/* ---------------------------------------------------------------- */
/* Esquema del documento producto */
const productoSchema = mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    stock: Number,
    marca: String,
    categoria: String,
    detalles: String,
    foto: String,
    oferta: Boolean,
    envio: Boolean    
})

/* Modelo del documento almacenado en una colección */
const ProductoModel = mongoose.model('productos', productoSchema)
/* ---------------------------------------------------------------- */

class ProductoModelMongoDB {
    
    /* CRUD -> C (Create) */
    async createProducto(producto) {
        if(!Mongo_DB.conexionOk) return {}
        try {
            const productoSave = new ProductoModel(producto)
            await productoSave.save()

            let productos = await ProductoModel.find({}).lean()
            let productoGuardado = productos[productos.length-1]
            
            return Mongo_DB.genIdKey(productoGuardado)
        }
        catch(error) {
            console.log(`Error en createProducto: ${error.message}`)
            return {}
        }
    }

    /* CRUD -> R (Read ONE) */
    async readProducto(id) {
        if(!Mongo_DB.conexionOk) return {}
        try {
            let producto = await ProductoModel.findOne({_id:id}).lean()
            //console.log(producto)
            return Mongo_DB.genIdKey(producto)
        }
        catch(error) {
            console.log(`Error en readProducto: ${error.message}`)
            return {}
        }
    }

    /* CRUD -> R (Read ALL) */
    async readProductos(async) {
        if(!Mongo_DB.conexionOk) return []
        try {
            let productos = await ProductoModel.find({}).lean()
            //console.log(productos)
            return Mongo_DB.genIdKey(productos)
        }
        catch(error) {
            console.log(`Error en readProductos: ${error.message}`)
            return []
        }
    }

    /* CRUD -> U (Update) */
    async updateProducto(id,producto) {
        if(!Mongo_DB.conexionOk) return {}
        try {
            await ProductoModel.updateOne({_id:id},{$set: producto})
            //console.log(producto)            
            let productoActualizado =  await ProductoModel.findOne({_id:id}).lean()
            //console.log(productoActualizado)
            return Mongo_DB.genIdKey(productoActualizado)
        }
        catch(error) {
            console.log(`Error en updateProducto: ${error.message}`)
            return {}
        }
    }

    /* CRUD -> D (Delete) */
    async deleteProducto(id) {
        if(!Mongo_DB.conexionOk) return {}
        try {
            let productoBorrado =  await ProductoModel.findOne({_id:id}).lean()
            await ProductoModel.deleteOne({_id:id})
            //console.log(productoBorrado)
            return Mongo_DB.genIdKey(productoBorrado)
        }
        catch(error) {
            console.log(`Error en deleteProducto: ${error.message}`)
            return {}
        }
    }
}

//exports
export default ProductoModelMongoDB