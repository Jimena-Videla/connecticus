class ProductoModelMem {

    productos = []
    contId = 0

    /* CRUD -> C (Create) */
    async createProducto(producto) {
        producto.id = ++this.contId
        this.productos.push(producto)
        return producto
    }

    /* CRUD -> R (Read ONE) */
    async readProducto(id) {
        let producto = this.productos.find( producto => producto.id == id ) || {}
        return producto
    }

    /* CRUD -> R (Read ALL) */
    async readProductos() {
        return this.productos
    }

    /* CRUD -> U (Update) */
    async updateProducto(id,producto) {
        producto.id = id
        let index = this.productos.findIndex(producto => producto.id == id)
        this.productos.splice(index,1,producto)

        return producto
    }

    /* CRUD -> D (Delete) */
    async deleteProducto(id) {
        let index = this.productos.findIndex(producto => producto.id == id)
        let producto = this.productos.splice(index,1)[0]

        return producto
    }
}

//exports
export default ProductoModelMem