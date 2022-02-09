let hayDescuento = false

function initHome() {

    console.warn('initHome()')

    /* ------------  Carrousel productos  --------------- */
    
    let atras = document.getElementsByClassName('atras')[0]       
    let left = document.getElementsByClassName('icon-left-open')[0]        
    let adelante = document.getElementsByClassName('adelante')[0]
    
    let imagenes = ['../../img/carrousel-productos/not-ad.png',
                    '../../img/carrousel-productos/aur-at.png',
                    '../../img/carrousel-productos/aur-ad.png',
                    '../../img/carrousel-productos/cel-at.png',
                    '../../img/carrousel-productos/cel-ad.png', 
                    '../../img/carrousel-productos/cam-at.png',
                    '../../img/carrousel-productos/cam-ad.png',
                    '../../img/carrousel-productos/dron-at.png',
                    '../../img/carrousel-productos/dron-ad.png',
                    '../../img/carrousel-productos/joy-at.png',
                    '../../img/carrousel-productos/joy-ad.png',
                    '../../img/carrousel-productos/not-at.png'
    ]

    i = 999999

    left.addEventListener('click', () => {
    
        i++           
        adelante.style.backgroundImage = `url(${imagenes[i%imagenes.length]})`
        console.log(i%imagenes.length)
                
        i++
        atras.style.backgroundImage = `url(${imagenes[i%imagenes.length]})`
        console.log(i%imagenes.length)     

    })
    
    /* ------------  Memorama  --------------- */
    
    class Memorama {

        constructor() {
            this.canPlay = false;

            this.card1 = null;
            this.card2 = null;

            this.availableImages = [1, 4, 12, 15];
            this.orderForThisRound = [];
            this.cards = Array.from( document.querySelectorAll(".board-game figure") );

            this.maxPairNumber = this.availableImages.length;

            this.startGame();
        }

        startGame() {
            this.foundPairs = 0;
            this.setNewOrder();
            this.setImagesInCards();
            this.openCards();
        }

        setNewOrder() {
            this.orderForThisRound = this.availableImages.concat(this.availableImages);
            this.orderForThisRound.sort( () => Math.random() - 0.5 );
        }

        setImagesInCards() {

            for (const key in this.cards) {
                const card = this.cards[key];
                const image = this.orderForThisRound[key];
                const imgLabel = card.children[1].children[0];

                card.dataset.image = image;
                imgLabel.src = `../img/memorama/${image}.jpg`;
            }
        }

        openCards() {
            this.cards.forEach(card => card.classList.add("opened"));

            setTimeout(() => {
                this.closeCards();
            }, 3000);
        }

        closeCards() {
            this.cards.forEach(card => card.classList.remove("opened"));
            this.addClickEvents();
            this.canPlay = true;
        }

        addClickEvents() {
            this.cards.forEach(_this => _this.addEventListener("click", this.flipCard.bind(this)));
        }

        flipCard(e) {
            const clickedCard = e.target;

            if (this.canPlay && !clickedCard.classList.contains("opened")) {
                clickedCard.classList.add("opened");
                this.checkPair( clickedCard.dataset.image );
            }

        }

        checkPair(image) {
            if (!this.card1) this.card1 = image;
            else this.card2 = image;

            if (this.card1 && this.card2) {

                if (this.card1 == this.card2) {
                    this.canPlay = false;
                    setTimeout(this.checkIfWon.bind(this), 300)
                }

                else { 
                    this.canPlay = false;
                    setTimeout(this.resetOpenedCards.bind(this), 800)
                }
            }

        }

        resetOpenedCards() {
            const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
            const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`);

            firstOpened.classList.remove("opened");
            secondOpened.classList.remove("opened");

            this.card1 = null;
            this.card2 = null;

            this.canPlay = true;
        }

        checkIfWon() {
            this.foundPairs++;

            this.card1 = null;
            this.card2 = null;
            this.canPlay = true;

            if (this.maxPairNumber == this.foundPairs) {
                alert("¡Ganaste 🥳!");
                hayDescuento = true
                // console.log('agregar al carrito un 10% de descuento')              
            } 
        }

    }

    let jugar = document.getElementById('jugar')
    // console.log(jugar)

    jugar.addEventListener('click', () => {

        new Memorama();   

        jugar.disabled = true
        
    })

    /* ------------  Carrousel marcas --------------- */

    const carrousel = document.querySelector(".carrousel-items");

    let maxScrollLeft = carrousel.scrollWidth - carrousel.clientWidth;
    let intervalo = null;
    let step = 1;

    const startCarrousel = () => {
        intervalo = setInterval(function () {
            carrousel.scrollLeft = carrousel.scrollLeft + step;
            if (carrousel.scrollLeft === maxScrollLeft) {
                step = step * -1;
            } else if (carrousel.scrollLeft === 0) {
                step = step * -1;
            }
        }, 10);
    };

    const stop = () => {
        clearInterval(intervalo);
    };

    carrousel.addEventListener("mouseover", () => {
        stop();
    });

    carrousel.addEventListener("mouseout", () => {
        startCarrousel();
    });

    startCarrousel();
    
}








