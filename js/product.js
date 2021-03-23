
const id = getIdFromParam();    // stocker id dans une variable
let product = null;

/**
 * Permet de recuperer les data de api et afficher la page du produit cibler grace a un ID.
 */
function getProductFromApi() {
    fetch('http://localhost:3000/api/cameras/' + id)  // Ajout de id pour selectionner que le produit cibler 
        .then(res => {
            res.json().then(produit => {
                createHTML(produit);
                product = produit;
            })
            .catch(() => {
                showError(res.status);
            })
        })
}

getProductFromApi();

/**
 * Permet de recuperer id du produit actuel
 * @param {*} id 
 */
function getIdFromParam(id) {
    // Stocker le parametre trouver dans une variable
    const url = window.location.search;

    // Creation d'une condition qui vérifie si id existe bien 
    if(url == false) {
        console.error('Id non trouver');
        return false;
    } else {
        // Split url pour garder que la valeur 
        id = url.split('=');
        return id[1];
    }
}

/**
 * Permet de crée HTML selon les data retourner 
 * @param {*} data 
 */
function createHTML(data) {
    if(id == data._id) {
        const box = document.querySelector('#box');
        let product = document.createElement('div');
        product.className = 'product';      // Ajout d'une class a product

        // Ecris le code html in JS
        product.innerHTML = `
            <img src="${data.imageUrl}" class="product__img">
            <div class="product__article">
            <div class="product__article__title">
                <h2>${data.name}</h2>
            </div>
            <div class="product__article__description">
                <p class="product__article__description__text">${data.description}</p>
                <p class="product__article__description__prix">Prix: ${data.price} euros</p>
                
                <div class="product__article__description__btn">
                    <form id="form-1">
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
                    <a id="button-lien" href="../pages/panier.html">
                    <button id="button-panier" type="submit" value="submit" onclick="addToPanier()">Mettre au Panier</button>
                    </a>
                </div>

            </div>
            </div>
        `
        box.appendChild(product);
    } else {
        // Si Jamais ID existe pas affiche une erreur !
        let messageErreur = document.createElement('h2');
        messageErreur.innerHTML = "Produit introuvable !"
        box.appendChild(messageErreur);
        console.error(`ID introuvable`);
    }
}


/**
 * Permet d'ajouter le produit au localstorage.
 */
function addToPanier() {
    // Recuperation des informations manquante.
    let number = document.querySelector('#nombre');
    let color = document.querySelector('#color');


    // Condition qui vérifie si les informations que user entre sont pas null
    if(number == null || color == null) {
        console.error('Oups, Veulliez renseignez toute les informations !');
    } else {
        panier = JSON.parse(localStorage.getItem('panier')) || [];
        // Creation du produit
        panier.push({
            uniqueid : new Date().getTime(),
            number : number.value,
            color : color.value,
            image : product.imageUrl,
            name : product.name,
            id : product._id,
            description : product.description,
            price : product.price,
            lenses : product.lenses
        });

        localStorage.setItem('panier', JSON.stringify(panier));
    }
}
