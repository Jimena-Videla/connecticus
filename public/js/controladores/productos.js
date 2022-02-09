class ProductoController extends ProductoModel {

    constructor() {
        super()
        this.guardarProducto = this.guardarProducto.bind(this)
    }

    async obtenerProductos() {
        this.productos = await productoService.obtenerProductosService()
        return this.productos
    }

    async guardarProducto(producto) {
        let productoGuardado = await productoService.guardarProductoService(producto)
        console.log(productoGuardado)

        this.productos.push(productoGuardado)

        renderTablaAlta(null, this.productos)
    }

    async actualizarProducto(id) {
        console.log('actualizarProducto', id)

        let producto = formularioAlta.leerProductoIngresado()
        formularioAlta.limpiarFormulario()

        let productoActualizado = await productoService.actualizarProductoService(id,producto)
        console.log(productoActualizado)

        let index = this.productos.findIndex(producto => producto.id == productoActualizado.id)
        this.productos.splice(index,1,productoActualizado)

        renderTablaAlta(null, this.productos)
    }

    async borrarProducto(id) {
        console.log('borrarProducto', id)

        let productoBorrado = await productoService.borrarProductoService(id)

        // let index = this.productos.findIndex(producto => producto.id == productoBorrado.id)
        let index = this.productos.findIndex(producto => producto.id == productoBorrado.id)
        this.productos.splice(index,1)

        renderTablaAlta(null, this.productos)
    }
}

const productoController = new ProductoController()