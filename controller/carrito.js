import api from "../api/carrito.js"

/* Controller POST */
const postCarrito = async (req,res) => {
    let carrito = req.body
    //agregar
    let carritoAgregado = await api.guardarCarrito(carrito)

    res.json(carritoAgregado)
}



//exports
export default {
    postCarrito,
    
}