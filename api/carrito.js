import CarritoModel from "../model/carrito.js"
import config from '../config.js'

const model = CarritoModel.get(config.TIPO_DE_PERSISTENCIA)

/* Api Guardar */
const guardarCarrito = async carrito => {
    let carritoCreado = await model.createCarrito(carrito)
    return carritoCreado
}


//exports
export default {    
    guardarCarrito,    
}