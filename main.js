// EVENTO SCROLL

// console.log(window)

let navbar = document.querySelector(".navbar")


window.addEventListener("scroll", ()=>{
    // console.log(window.scrollY)
    if(window.scrollY > 0){
        navbar.classList.add("nav-scrolled")
    } else {
        navbar.classList.remove("nav-scrolled")
    }
})


// EVENTO NUMERI

let numUsers = document.querySelector("#numUsers")
let numArticles = document.querySelector("#numArticles")
let numComments = document.querySelector("#numComments")

function createInterval(elementId, finalNumber, frequency){
    let counter = 0

    let intervallo = setInterval(() => {
        if(counter < finalNumber){
            counter++
            elementId.innerHTML = counter;
        } else {
            clearInterval(intervallo)
        }
    }, frequency);
}


let isIntersected = false;

//INTERSECTION OBSERVER NUMERI DINAMICI
const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach( (entry)=>{
        if(entry.isIntersecting && isIntersected == false){
            
            createInterval(numArticles, 500, 20)
            createInterval(numUsers, 1000, 10)
            createInterval(numComments, 200, 50)
            
            isIntersected = true;

            setTimeout(() => {
                isIntersected = false;
            }, 10000);
        }
    } )
})

intersectionObserver.observe(numArticles)



// ULTIMI ANNUNCI


let announcements = [
    {name: "Katana di Hattori Hanzo", categoria: "Accessori", prezzo: 500, img: "https://picsum.photos/200"},
    {name: "Vaso Ming", categoria: "Arredamento", prezzo: 700, img: "https://picsum.photos/201"},
    {name: "Statua di terracotta", categoria: "Arredamento", prezzo: 650, img: "https://picsum.photos/202"},
    {name: "Quadro di Buddha", categoria: "Arredamento", prezzo: 350, img: "https://picsum.photos/203"},
    {name: "Guqin", categoria: "Musica", prezzo: 1000, img: "https://picsum.photos/204"},
];


let cardsWrapper = document.querySelector("#cardsWrapper")

announcements.forEach( (annuncio, i)=>{
    if(i >=  announcements.length - 3 ){
        let col = document.createElement("div");
        col.classList.add("col-11", "col-lg-3","my-3")
        col.innerHTML = `
                            <div class="card position-relative h-100">
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger z-2">
                                NEW
                                </span>
                                <div class=" overflow-hidden ">
                                <img src=${annuncio.img} class="img-card card-img-top" alt="...">
                                </div>
                                <div class="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h3 class="card-title text-center fw-bold mb-3  text-truncate">${annuncio.name}</h3>
                                    <p class="card-text m-0">Categoria: <span class="fs-4">${annuncio.categoria}</span></p>
                                    <p class="card-text">Prezzo: <span class="fs-5">${annuncio.prezzo}</span>$</p>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <i class="bi bi-heart fs-3"></i>
                                    <a href="#" class="btn btn-danger">Aggiungi al Carrello</a>
                                </div>
                                </div>
                            </div>
                        `
        cardsWrapper.appendChild(col)

    }
} )


// SWIPER JS 
const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
  });