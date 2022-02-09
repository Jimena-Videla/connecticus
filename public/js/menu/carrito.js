let mostrarCarrito = false

async function renderTablaCarrito(carrito) { 
    var elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]
    
    let plantillaHbs = await fetch('plantillas/carrito.hbs').then(r => r.text())
    var template = Handlebars.compile(plantillaHbs);
    // execute the compiled template and print the output to the console
    //let html = template({ productos: productos, validos: !algunCampoNoValido() })
    let html = template({ carrito })
    elemSectionCarrito.innerHTML = html
    elemSectionCarrito.classList.add('section-carrito--visible')
    // console.log(hayDescuento)
}

function initCarrito() {
    var btnCarrito = document.getElementsByClassName('header-carrito')[0]
    var elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]

    btnCarrito.addEventListener('click', async function () {
        mostrarCarrito = !mostrarCarrito
        if(mostrarCarrito) {
            await renderTablaCarrito(carritoController.carrito)
        }
        else {
            elemSectionCarrito.classList.remove('section-carrito--visible')
        }
    })
}

initCarrito()