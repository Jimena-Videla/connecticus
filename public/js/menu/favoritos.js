let mostrarFavoritos = false

async function renderTablaFavoritos(favoritos) {
    var elemSectionFavoritos = document.getElementsByClassName('section-favoritos')[0]
    
    let plantillaHbs = await fetch('plantillas/favoritos.hbs').then(r => r.text())
    var template = Handlebars.compile(plantillaHbs);
    // execute the compiled template and print the output to the console
    //let html = template({ productos: productos, validos: !algunCampoNoValido() })
    let html = template({ favoritos })
    elemSectionFavoritos.innerHTML = html
    elemSectionFavoritos.classList.add('section-favoritos--visible')

}

function initFavoritos() {
    var btnFavoritos = document.getElementsByClassName('header-favoritos')[0]
    var elemSectionFavoritos = document.getElementsByClassName('section-favoritos')[0]

    btnFavoritos.addEventListener('click', async function () {
        mostrarFavoritos = !mostrarFavoritos
        if(mostrarFavoritos) {
            await renderTablaFavoritos(favoritosController.favoritos)
        }
        else {
            elemSectionFavoritos.classList.remove('section-favoritos--visible')
        }
    })
}

initFavoritos()