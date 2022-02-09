class ProductoService {    
    URL_PRODUCTOS = '/api/productos/' 
    
    async obtenerProductosService() {
        let  productos = await http.get(this.URL_PRODUCTOS)
        // console.log(productos)
        return productos
    }
    
    async guardarProductoService(producto) {
        let productoGuardado = await http.post(this.URL_PRODUCTOS, producto)
        // console.log(productoGuardado)
        return productoGuardado
    }
    
    async actualizarProductoService(id,producto) {
        let productoActualizado = await http.put(this.URL_PRODUCTOS, id, producto)
        // console.log(productoActualizado)
        return productoActualizado
    }
    
    async borrarProductoService(id) {
        let productoBorrado = await http.del(this.URL_PRODUCTOS, id)
        // console.log(productoBorrado)
        return productoBorrado
    }
    
}
    const productoService = new ProductoService()