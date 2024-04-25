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

// INIZIO FETCH 
fetch("./articoli.JSON").then( (response)=> response.json() ).then( (data)=> {

    // CONTENITORE CARDS -> LEZIONE DOM
    let articlesWrapper = document.querySelector("#articlesWrapper")

    function createCards(array){
        articlesWrapper.innerHTML = ""
        array.forEach( (articolo, i)=> {
            let col = document.createElement("div");
            col.classList.add("col-11", "col-lg-3", "my-3", "mx-1")
            col.innerHTML = `
                                <div class="card position-relative h-100">
                                    <div class=" overflow-hidden ">
                                    <img src="https://picsum.photos/20${i}" class="img-card card-img-top" alt="...">
                                    </div>
                                    <div class="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h3 class="card-title text-center fw-bold mb-3  text-truncate">${articolo.nome}</h3>
                                        <p class="card-text m-0">Categoria: <span class="fs-4">${articolo.categoria}</span></p>
                                        <p class="card-text">Prezzo: <span class="fs-5">${articolo.prezzo}</span>$</p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <i class="bi bi-heart fs-3"></i>
                                        <a href="#" class="btn btn-danger">Aggiungi al Carrello</a>
                                    </div>
                                    </div>
                                </div>
                            `
            articlesWrapper.appendChild(col)

        });
    }
    createCards(data)


    // CATEGORIE

    //CREAZIONE CATEGORIE
    let radioWrapper = document.querySelector("#radioWrapper")

    function setCategories(){
        let categories = data.map( (el)=> el.categoria)
        let uniqueCategories = [];
        categories.forEach( (category)=> {
            if(uniqueCategories.includes(category) == false){
                uniqueCategories.push(category)
            } 
        })
        
        uniqueCategories.sort().forEach( (categoria)=> {
            let div = document.createElement("div")
            div.classList.add("form-check")
            div.innerHTML = `
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="${categoria}">
                                <label class="form-check-label" for="flexRadioDefault1">
                                ${categoria}
                                </label>
                            `
            radioWrapper.appendChild(div)
        })
    }
    setCategories()


    // FILTRO PER CATEGORIA

    let checksInput = document.querySelectorAll(".form-check-input")


    function filterByCategory(array){
        let radiosBtn = Array.from(checksInput)
        let checked = radiosBtn.find( (el)=>  el.checked)
        if(checked.id == "All"){
            return array
        } else {
            let filtered = array.filter( (el)=> el.categoria == checked.id )
            return filtered
        }
    }
    
    //EVENTO CLICK RADIO BUTTON
    checksInput.forEach((input)=>{
        input.addEventListener("click", ()=>{
            globalFilter()
        })
    })


    // RANGE MIN AND MAX PRICES
    let inputPrice = document.querySelector("#inputPrice")
    let currentValue = document.querySelector("#currentValue")


    function findMaxAndMinPrice(){
        let prices = data.map( (articolo)=> articolo.prezzo )
        let max = Math.max(...prices)
        let min = Math.min(...prices)
        inputPrice.max = max
        inputPrice.min = min
        inputPrice.value = max
        currentValue.innerHTML = max
    }
    findMaxAndMinPrice()



    //FILTRO PER PREZZO

    function filterByPrice(array){
        let filtered = array.filter( (el)=> el.prezzo <= inputPrice.value )
        return filtered
    }

    inputPrice.addEventListener("input", ()=>{
        currentValue.innerHTML = inputPrice.value
        globalFilter()
    })


    //FILTER PER PAROLA
                
    let inputWord = document.querySelector("#inputWord")

    function filterByWord(array){
        let filtered = array.filter( (el)=> el.nome.toLowerCase().includes(inputWord.value.toLowerCase()) )
        return filtered

    }

    inputWord.addEventListener("input", ()=>{
        globalFilter()
    })

    

    //GLOBAL FILTER

    function globalFilter(){
        let filteredByCategory = filterByCategory(data)
        let filteredByPrice = filterByPrice(filteredByCategory)
        let filteredByWord = filterByWord(filteredByPrice)
        createCards(filteredByWord)
    }

    // FINE FETCH 
})