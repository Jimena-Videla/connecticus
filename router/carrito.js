import express from 'express'
import controller from '../controller/carrito.js'


const router = express.Router()


/* Router POST */
router.post('/', controller.postCarrito)

/*
router.post('/', (req,res) => {
    console.log(req.body)

    res.json({ status: 'ok'})
})
*/


//exports
export default router