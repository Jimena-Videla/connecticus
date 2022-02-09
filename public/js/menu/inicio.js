async function renderPlantillaListado(listado) {

    let plantillaHbs = await fetch('plantillas/inicio.hbs').then(r => r.text())
    var template = Handlebars.compile(plantillaHbs);
    // execute the compiled template and print the output to the console
    //let html = template({ productos: productos, validos: !algunCampoNoValido() })
    //let html = template({ listado : listado.filter(prod => prod.nombre.includes('f')) })
    let html = template({ listado })
    document.getElementsByClassName('cards-container')[0].innerHTML = html  
}

function agregarCarrito(e,id,ref) {
    e.preventDefault()
    //console.log(id)
    //console.dir(ref)

    //ref.classList.toggle('card--seleccionada')
    let producto = productoController.productos.find( producto => producto.id == id )
    carritoController.agregarAlCarrito(producto)    
}

function agregarFavoritos(e,id,ref) {
    e.preventDefault()
    
    let producto = productoController.productos.find( producto => producto.id == id )
    favoritosController.agregarAFavoritos(producto)    
}

function girarCard(id) {    
    
    let index = productoController.productos.findIndex(producto => producto.id == id)
    console.log(index)
    
    document.getElementsByClassName('card')[index].classList.toggle('rotar')
}

function mostrarDetalles(id) {

    let index = productoController.productos.findIndex(producto => producto.id == id)
    console.log(index)

    document.getElementsByClassName('card-detalles')[index].classList.add('card-detalles--open')
}

function cerrarDetalles(id) {

    let index = productoController.productos.findIndex(producto => producto.id == id)
    console.log(index)
    document.getElementsByClassName('card-detalles')[index].classList.remove('card-detalles--open')
}

async function initInicio() {
    console.warn('initInicio()')

    var productos = await productoController.obtenerProductos()
    await renderPlantillaListado(productos)

    document.querySelector('.section-cards__header h2').innerHTML = `Se encontraron ${productos.length} productos`
}
