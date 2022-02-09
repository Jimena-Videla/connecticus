import express from 'express'
import controller from '../controller/productos.js'

const router = express.Router()


/* Router GET */
router.get('/:id?', controller.getProductos)

/* Router POST */
router.post('/', controller.postProducto)

/* Router PUT */
router.put('/:id', controller.putProducto)

/* Router DELETE */
router.delete('/:id', controller.deleteProducto)


//exports
export default router