class FavoritosController extends FavoritosModel {

    constructor() {
        super()
        try {
            this.favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
        }
        catch {
            this.favoritos = []
            localStorage.setItem('favoritos',this.favoritos)
        }
    }

    elProductoEstaEnFavoritos(producto) {
        return this.favoritos.filter(prod => prod.id == producto.id).length
    }
    
    obtenerProductoDeFavoritos(producto) {
        return this.favoritos.find(prod => prod.id == producto.id)
    }
    
    agregarAFavoritos(producto) {
        //console.log(producto)
        if(!this.elProductoEstaEnFavoritos(producto)) {
            producto.cantidad = 1
            this.favoritos.push(producto)
        }         
    
        localStorage.setItem('favoritos', JSON.stringify(this.favoritos))
    }
    
    async borrarProductoFavoritos(id) {
        let index = this.favoritos.findIndex(producto => producto.id == id)
        this.favoritos.splice(index,1)
        localStorage.setItem('favoritos', JSON.stringify(this.favoritos))
    
        await renderTablaFavoritos(this.favoritos)
    }

    async enviarAlCarrito(id) {
        let producto = productoController.productos.find( producto => producto.id == id )
        carritoController.agregarAlCarrito(producto)  

        let index = this.favoritos.findIndex(producto => producto.id == id)
        this.favoritos.splice(index,1)
        localStorage.setItem('favoritos', JSON.stringify(this.favoritos))
    
        await renderTablaFavoritos(this.favoritos)
    }

}

const favoritosController = new FavoritosController()