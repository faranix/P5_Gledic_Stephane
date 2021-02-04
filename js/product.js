// =============== Parameter in url ============== //


// Function qui permet de recuperer id par rapport au parametre 
function getIdFromParam() {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url)
    let id = urlParams.get('id');
    return id;
}


// Faire un appel a API pour recuperer les data
async function fetchData() {
    const response = await fetch('http://localhost:3000/api/cameras/' + getIdFromParam())
    
    let data = await response.json();
    return data;
}

const res = fetchData();    // Stocker les data dans une variable (c'est une promise)

// Function qui crée tout le code html avec les data 
res.then(function htmlCreated(data) {

    
    // Creation des variables
    const box = document.querySelector('#box');
    let product = document.createElement('div');
    product.className = 'product';      // Ajout d'une class a product

    // Ecris le code html
    product.innerHTML = `
        <img src="${data.imageUrl}" class="product__img">
        <div class="product__article">
        <div class="product__article__title">
            <h2>${data.name}</h2>
        </div>
        <div class="product__article__description">
            <p class="product__article__description__text">${data.description}</p>
            <p class="product__article__description__prix">${data.price} euros</p>
            
            <div class="product__article__description__btn">
                <form id="form-1" action="panier.html">
                    <select name="nombre" id="nombre">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </form>

                <form id="form-2">
                    <select name="color" id="color">
                        <option value="blanc">Blanc</option>
                        <option value="gris">Gris</option>
                        <option value="noir">Noir</option>
                        <option value="rouge">Rouge</option>
                    </select>
                </form>
                <button type="submit" value="submit" id="button-panier" onclick="addToCard()"><a href="../pages/panier.html">Mettre au Panier</a></button>
            </div>

        </div>
        </div>
    `
    box.appendChild(product);
}) 



// =============== LocalStorage ============== //

 function addToCard() {
    let numberOfArticle = document.querySelector('#nombre');
    let colorOfArticle = document.querySelector('#color');

    localStorage.setItem("color-article", colorOfArticle.value);
    localStorage.setItem("nombre-article", numberOfArticle.value);
    
}


