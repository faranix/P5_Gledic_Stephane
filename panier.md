const id = getIdFromParam();    // stocker id dans une variable

// Fonction qui permet de recuperer les data de api.
async function getProductFromApi() {
    await fetch('http://localhost:3000/api/cameras/' + id)  // Ajout de id pour selectionner que le produit cibler 
        .then(res => {
            res.json().then(produit => {
                createHTML(produit);

                // Ajouter d'un evenement sur le btn pour que cela s'active quand user click dessus.
                document.querySelector('#button-panier').addEventListener('click', () => {
                    addToPanier(produit);
                })
            })
        }) 
}

getProductFromApi();

// Fonction qui permet de recuperer id du produit actuel
function getIdFromParam(id) {
    // Stocker le parametre trouver dans une variable
    const url = window.location.search;

    // Creation d'un condition qui vérifie si id existe bien 
    if(url == false) {
        console.error('Id non trouver');
        return false;
    } else {
        // Split la valeur pour garder que la valeur 
        id = url.split('=');
        return id[1];
    }
}

// Fonction qui permet de crée HTML selon les data retourner 
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
                <p class="product__article__description__prix">${data.price} euros</p>
                
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
                    <button type="submit" value="submit" id="button-panier"><a href="../pages/panier.html">Mettre au Panier</a></button>
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

// Fonction qui permet d'ajouter le produit au local storage.
function addToPanier(produit) {
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
            number : number.value,
            color : color.value,
            image : produit.imageUrl,
            name : produit.name,
            id : produit._id,
            description : produit.description,
            price : produit.price
        });

        localStorage.setItem('panier', JSON.stringify(panier));
    }
}
