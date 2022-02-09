class FormularioAlta {
    inputs = null    
    form = null
    button = null
    camposValidos = [false, false, false, false, false, false, false]
    regExpValidar = [
        /^.+$/,       // regExp nombre
        /^.+$/,       // regExp descripcion
        /^[0-9]+$/,   // regExp precio
        /^[0-9-]+$/,  // regExp stock
        /^.+$/,       // regExp marca
        /^.+$/,       // regExp categoria    
        /^.+$/,       // regExp detalles        
    ]

    /* ----------- Drag and drop -------------- */
    
    dropArea = null
    progressBar = null
    imagenSubida = ''

    /* ---------------------------------------- */

    constructor(renderTablaAlta, guardarProducto) {
        this.inputs = document.querySelectorAll('main form .input-alta')
        this.form = document.querySelector('main form')    
        this.button = document.getElementById('boton-alta-enviar')    
    
        this.button.disabled = true
    
        //console.log(inputs)
        this.inputs.forEach((input,index) => {
            if(input.type != 'checkbox') {
                input.addEventListener('input', () => {
                    this.validar(input.value, this.regExpValidar[index], index )
                    if(renderTablaAlta) renderTablaAlta( !this.algunCampoNoValido(), productoController.productos )
                })
            }
        })
    
        this.form.addEventListener('submit', e => {
            e.preventDefault()               
    
            let producto = this.leerProductoIngresado()
            this.limpiarFormulario()

            if(guardarProducto) guardarProducto(producto)
        })


        /* ------------- Drag and drop -------------- */
    
        this.dropArea = document.getElementById('drop-area')
        this.progressBar = document.getElementById('progress-bar')

        ;['dragenter','dragover','dragleave','drop'].forEach(eventName => {
            this.dropArea.addEventListener(eventName, e => e.preventDefault())
            document.body.addEventListener(eventName, e => e.preventDefault())
        })

        ;['dragenter','dragover'].forEach(eventName => {
            this.dropArea.addEventListener(eventName, () => this.dropArea.classList.add('highlight'))
        })

        ;['dragleave','drop'].forEach(eventName => {
            this.dropArea.addEventListener(eventName, () => this.dropArea.classList.remove('highlight'))
        })

        this.dropArea.addEventListener('drop', e => {
            var dt = e.dataTransfer
            var files = dt.files
            this.handleFiles(files)
        })


        /* ---------------------------------------- */

    }

    setCustomValidityJS = function(mensaje, index) {
        let divs = document.getElementsByClassName('mensaje-alta')
        divs[index].innerText = mensaje
        divs[index].style.display = mensaje? 'block' : 'none'     
    }
    
    algunCampoNoValido() {    
        let valido = 
            this.camposValidos[0] &&
            this.camposValidos[1] &&
            this.camposValidos[2] &&
            this.camposValidos[3] &&
            this.camposValidos[4] &&
            this.camposValidos[5] &&
            this.camposValidos[6]          
    
        return !valido
    }

    validar(valor, validador, index) {

        if(!validador.test(valor)) {
            this.setCustomValidityJS('⚠️ Campo no valido', index)
            this.camposValidos[index] = false
            this.button.disabled = true
            return null
        }
    
        this.camposValidos[index] = true
        this.button.disabled = this.algunCampoNoValido()
    
        this.setCustomValidityJS('', index)
        return valor
    }

    leerProductoIngresado() {
        return {
            nombre: this.inputs[0].value,
            descripcion: this.inputs[1].value,
            precio: this.inputs[2].value,
            stock: this.inputs[3].value,
            marca: this.inputs[4].value,
            categoria: this.inputs[5].value,
            detalles: this.inputs[6].value,
            foto: this.imagenSubida? `/uploads/${this.imagenSubida}`:'',    
            oferta: this.inputs[7].checked,
            envio: this.inputs[8].checked,
        }    
    }

    limpiarFormulario() {
        this.inputs.forEach(input => {
            if(input.type !='checkbox') input.value = ''
            else if(input.type == 'checkbox') input.checked = false     
        })
    
        this.button.disabled = true 
        this.camposValidos = [false, false, false, false, false, false, false]  
        
        let img = document.querySelector('#gallery img')
        img.src = ''

        this.initializaProgress()

        this.imagenSubida = ''
    }

    /* ------------- Drag and drop -------------- */
    initializaProgress() {
        this.progressBar.value = 0
    }

    updateProgress(porcentaje) {
        this.progressBar.value = porcentaje
    }
    
    previewFile(file) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function() {
            let img = document.querySelector('#gallery img')
            img.src = reader.result
        }
    }

    handleFiles = files => {
        let file = files[0]

        this.initializaProgress()
        this.uploadFile(file)
        this.previewFile(file)
    }

    uploadFile = file => {
        var url = '/upload'
        var xhr = new XMLHttpRequest
        xhr.open('POST', url)

        xhr.upload.addEventListener('progress', e => {
            this.updateProgress((e.loaded * 100 / e.total) || 100)
        })

        xhr.addEventListener('load', () => {
            if(xhr.status == 200 ){
                this.imagenSubida = JSON.parse(xhr.response).nombre
            }
        })
        
        var formdata = new FormData()
        formdata.append('foto',file)
        xhr.send(formdata)
    }

    /* ------------------------------------------ */
    
}

function renderTablaAlta(validos, productos) {

    const xhr = new XMLHttpRequest
    xhr.open('get','plantillas/alta.hbs')
    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            let plantillaHbs = xhr.response

            var template = Handlebars.compile(plantillaHbs);
            let html = template({ productos, validos })
            document.getElementById('listado-productos').innerHTML = html            
        }
    })
    xhr.send()
}


/* ------------------------------------------------------------ */
/*      Inicializaciones para el funcionamiento del módulo      */
/* ------------------------------------------------------------ */
let formularioAlta = null

async function initAlta() {
    console.warn('initAlta()')

    formularioAlta = new FormularioAlta(renderTablaAlta, productoController.guardarProducto)

    let productos = await productoController.obtenerProductos()
    renderTablaAlta(null, productos)
}
