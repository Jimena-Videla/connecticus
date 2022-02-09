class CarritoController extends CarritoModel {

    constructor() {
        super()
        try {
            this.carrito = JSON.parse(localStorage.getItem('carrito')) || []
        }
        catch {
            this.carrito = []
            localStorage.setItem('carrito',this.carrito)
        }
    }

    elProductoEstaEnElCarrito(producto) {
        console.dir(producto)
        return this.carrito.filter(prod => prod.id == producto.id).length
    }
    
    obtenerProductoDeCarrito(producto) {
        return this.carrito.find(prod => prod.id == producto.id)
    }    
    
    agregarAlCarrito(producto) {
        //console.log(producto)
        if(!this.elProductoEstaEnElCarrito(producto)) {
            producto.cantidad = 1
            this.carrito.push(producto)        
        }
        else {
            let productoDeCarrito = this.obtenerProductoDeCarrito(producto)
            productoDeCarrito.cantidad++
        }   
        localStorage.setItem('carrito', JSON.stringify(this.carrito))
    }   

    async calcularTotal() {        
        await renderTablaCarrito(this.carrito)

        var elemTotal = document.getElementById('total')

        var precio = 0
        var cantidad = 0
        var descuento = 10
        var total = 0

        for( var i = 0; i < this.carrito.length; i++) {
            precio = this.carrito[i].precio
            cantidad = this.carrito[i].cantidad
            total += precio * cantidad            
        }
        
        if(hayDescuento) {
            total = total - (total/100 * descuento)
            // console.log(total)
            elemTotal.innerHTML += `El total, con el 10% de descuento, es ${total} 🥳`
        }
        else elemTotal.innerHTML += `El total es ${total}`           
        
    }

    
    async borrarProductoCarrito(id) {
        let index = this.carrito.findIndex(producto => producto.id == id)
        this.carrito.splice(index,1)
        localStorage.setItem('carrito', JSON.stringify(this.carrito))
    
        await renderTablaCarrito(this.carrito)
    }
    
    async enviarCarrito() {
        var elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]

        elemSectionCarrito.innerHTML = '<h2>Enviando carrito...</h2>'
        await carritoService.guardarCarritoService(this.carrito)
        this.carrito = []
        localStorage.setItem('carrito',this.carrito)
    
        elemSectionCarrito.innerHTML = '<h2>Enviando carrito... <b>OK!</b></h2>'
    
        setTimeout(() => {
            elemSectionCarrito.classList.remove('section-carrito--visible')
            mostrarCarrito = false
        },1500)
    }
}

const carritoController = new CarritoController()