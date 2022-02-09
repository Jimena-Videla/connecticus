class Main {
    async ajax(url, metodo='get') {    
        return await fetch(url, { method: metodo }).then(r => r.text())
    }
    
    getNombreArchivo(id) {
        return 'vistas/' + id + '.html'
    }

    marcarLink(id) {
        let links = document.querySelectorAll('a')
        links.forEach( link => {
            if(link.id == id) link.classList.add('active')
            else link.classList.remove('active')
        })
    }

    initJS(id) {
        if(id == 'inicio') {
            initInicio()
        }
        else if(id == 'alta') {
            initAlta()
        }
        else if(id == 'contacto') {
            initContacto()
        }
        else if(id == 'nosotros') {
            initNosotros()
        }
        else if(id == 'home') {
            initHome()
        }
    }

    async cargarPlantilla(id) {
        let archivo = this.getNombreArchivo(id)

        let plantilla = await this.ajax(archivo)
        // Carga del código de vista (HTML) de la plantilla
        let main = document.querySelector('main')
        main.innerHTML = plantilla

        // Carga del código script (JS) de la plantilla
        this.initJS(id)
    }

    async cargarPlantillas() {
        /* --------------------------------------------------------- */
        /* Carga inicial de la vista determinada por la url visitada */
        /* --------------------------------------------------------- */
        let id = location.hash.slice(1) || 'home'
        this.marcarLink(id)
        await this.cargarPlantilla(id)

        /* ------------------------------------------------------------- */
        /* Carga de cada uno de los contenidos según la navegación local */
        /* ------------------------------------------------------------- */
        let links = document.querySelectorAll('a')
        //console.log(links)

        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault()

                let id = link.id
                //console.log(id)
                location.hash = id
            })
        })

        window.addEventListener('hashchange', async () => {
            //console.log('Cambió la URL')

            let id = location.hash.slice(1) || 'home'
            this.marcarLink(id)
            await this.cargarPlantilla(id)
        })
    }

    async start() {
        await this.cargarPlantillas()
    }    
}

const main = new Main()
main.start()