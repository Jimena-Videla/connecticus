import ProductoModelFile from "./productos-file.js";
import ProductoModelMem from "./productos-mem.js";
import ProductoModelMongoDB from "./productos-mongodb.js";

class ProductoModel {
    static get(tipo) {
        switch(tipo) {
            case 'MEM':
                console.log('**** PERSISTENCIA MEMORY (producto) ****')
                return new ProductoModelMem()

            case 'FILE':
                console.log('**** PERSISTENCIA FILE SYSTEM (producto) ****')
                return new ProductoModelFile()

            case 'MONGODB':
                console.log('**** PERSISTENCIA MONGODB (producto) ****')
                return new ProductoModelMongoDB()

            default:
                console.log('**** PERSISTENCIA DEFAULT (producto) ****')
                return new ProductoModelMem()
        }
    }
}

export default ProductoModel