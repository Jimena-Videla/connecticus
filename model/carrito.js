import CarritoModelMongoDB from "./carrito-mongodb.js";

class carritoModel {
    static get(tipo) {
        switch(tipo) {
                case 'MONGODB':
                console.log('**** PERSISTENCIA MONGODB (carrito) ****')
                return new CarritoModelMongoDB()
                
                default:
                console.log('**** PERSISTENCIA DEFAULT (carrito) ****')
                return new CarritoModelMongoDB()
                
        }
    }
}

export default carritoModel