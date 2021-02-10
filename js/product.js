
// =============== Parameter in url ============== //

// Function qui permet de recuperer id par rapport au parametre 

function getIdFromParam(id) {
    const url = window.location.search;   
    if (url == false) {
        console.log("erreur");
        return false;
    } else {
        const urlParams = new URLSearchParams(url)
        id = urlParams.get('id');
        return id;
    }
}

const id = getIdFromParam();

// Faire un appel a API pour recuperer les data

async function getApi() {
    const response = await fetch('http://localhost:3000/api/cameras/' + id);

    data = await response.json();
    // Condition de vérification si les data sont bien charger ou non !
    if(data != null) {
        return data;
    } else {
        console.log("Pas de data");
    }
}




 const dataApi = getApi();    // Stocker les data dans une variable (c'est une promise)


// =============== Reponse de la promesse ============== //

// Utiliser .split pour suprimer (?id=) et garder les nombres dans un tableau
const idVerification = id.split('='); 

dataApi.then(function htmlCreated(data) {
    // Ajout d'une condition qui verifie si id existe !
    if (idVerification[0] == data._id) {
        // Creation des variables
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
                    <button type="submit" value="submit" id="button-panier" onclick="addToPanier()"><a href="../pages/panier.html">Mettre au Panier</a></button>
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
});

// =============== LocalStorage ============== //

// Creation d'une fonction addToPanier qui permet d'ajouter des objets dans le localstorage

function addToPanier() {

    var panier = {};    // Declaration de la variable en 'var' pour le scope de la variable

    // Recuperation des data saisie par utilisateur 
    let number = document.querySelector('#nombre');
    let color = document.querySelector('#color');

    // Appel de la promesse 
    dataApi.then(() => {
        if(color == '' || number == '') {
            console.error('Oups! Vous devez renseigner tout les champs saisie');
        } else {
            panier = JSON.parse(localStorage.getItem('panier')) || [];
            // push du panier avec les data
            panier.push({
                image : data.imageUrl,
                name : data.name,
                id : data._id,
                description : data.description,
                price : data.price,
                number : number.value,
                color : color.value
            })

            // Ajout du panier dans le local storage 
            window.localStorage.setItem('panier', JSON.stringify(panier));
            console.log(panier);  
        }
    })

};










