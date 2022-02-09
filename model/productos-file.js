import fs from 'fs'


class ProductoModelFile {
    /* ----------------------- E/S Filesystem ------------------------ */
    nombreArchivo = 'productos.dat'

    getId(productos) {
        return productos.length? (productos[ productos.length - 1 ].id + 1) : 1
    }

    async leerArchivoProductos() {
        try {
            let productos = JSON.parse(await fs.promises.readFile(this.nombreArchivo,'utf-8'))
            return productos
        }
        catch(error) {
            console.log(error.message)
            let productos = []
            return productos
        }
    }

    async guardarArchivoProductos(productos) {
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos,null,'\t'))
    }

    /* ------------------------ CRUD ----------------------------- */

    /* CRUD -> C (Create) */
    async createProducto(producto) {
        let productos = await this.leerArchivoProductos()

        producto.id = this.getId(productos)
        productos.push(producto)

        await this.guardarArchivoProductos(productos)
        
        return producto
    }

    /* CRUD -> R (Read ONE) */
    async readProducto(id) {
        let productos = await this.leerArchivoProductos()

        let producto = productos.find( producto => producto.id == id ) || {}
        return producto    
    }

    /* CRUD -> R (Read ALL) */
    async readProductos() {
        let productos = await this.leerArchivoProductos()
        return productos
    }

    /* CRUD -> U (Update) */
    async updateProducto (id,producto) {
        let productos = await this.leerArchivoProductos()

        producto.id = id
        let index = productos.findIndex(producto => producto.id == id)
        productos.splice(index,1,producto)

        await this.guardarArchivoProductos(productos)

        return producto
    }

    /* CRUD -> D (Delete) */
    async deleteProducto(id) {
        let productos = await this.leerArchivoProductos()

        let index = productos.findIndex(producto => producto.id == id)
        let producto = productos.splice(index,1)[0]

        await this.guardarArchivoProductos(productos)    

        return producto
    }
}

//exports
export default ProductoModelFile