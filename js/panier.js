// Création d'une boucle qui crée le html selon le panier reçu
let panier = JSON.parse(localStorage.getItem('panier'));


/**
 * Creation d'un message d'erreur.
 */
function showEmptyMessage() {
    let panierDom = document.querySelector('.panier');
    
    const produits = document.querySelector('.products');
    produits.remove();

    const factureDom = document.querySelector('.factures');
    factureDom.remove();

    // Creation d'un message d'erreur 
    let panierVide = document.createElement('h2');
        panierVide.innerHTML = `Votre panier est actuellement vide.`;
        panierDom.appendChild(panierVide);
};

/**
 * Creation du html pour le produit .
 */
function createHtml() {
    const produits = document.querySelector('.products');
    // Creation des produits
    if(panier == null) {
        showEmptyMessage();
    } else {

        panier.forEach(element => {
            let produit = document.createElement('div');

    
            produit.className = 'product';
            produit.setAttribute('id', `product-${element.uniqueid}`);
            produit.innerHTML = `
                <img class="product__img" src="${element.image}" alt="L'image du Produits">
                <div class="product__information">
                    <div class="product__information__name">
                        <h6 class="product__information__name__title">${element.name}</h6>
                        <i onclick="removeProduit(${element.uniqueid})" class="fas fa-trash product__information__name__icon"></i>
                    </div>
                    <div class="product__information__container">
                        <p class="product__information__container__description">${element.description}</p>
                        <div class="product__information__container__description">
                            <p class="product__information__container__description__lense">Lenses: ${element.lenses}</p>
                            <p class="product__information__container__description__prix">Prix: ${element.price}</p>
                        </div>
                </div>
            `;
            console.log(produit);
            produits.appendChild(produit);
        });

        // Creation d'un boutton suprimer tout le panier
        let deleteAllPanier = document.createElement('div');
        deleteAllPanier.className = 'div-delete-all';
        deleteAllPanier.innerHTML = `
            <button class="delete-all-panier" onclick="removeAllPanier()">Supprimer tout le panier</button> 
        `
        produits.appendChild(deleteAllPanier);

        factureHTML();

    }
};

createHtml();


/**
 * Permet de supprimer tout le panier. 
 */
function removeAllPanier() {
    localStorage.removeItem('panier');
    let produit = document.querySelectorAll('.product');

  
    for(let i = 0; i < produit.length; i++) {
        document.querySelector('.product').remove();
    }
    showEmptyMessage();
};



/**
 * Permet de supprimer un produit cibler.
 * @param {*} id 
 */
function removeProduit(id) {
    // Permet de selectionner ID de l'article
    const article = document.querySelector(`#product-${id}`);

    // Supprime article cibler
    article.remove();

    // Supprimer l'article cibler dans le localstorage 
    panier = panier.filter(produit => produit.uniqueid !== id);// <== peut etre il y a le bug ici ? 


    // Sauvegarde le nouveau localStorage
    localStorage.setItem('panier', JSON.stringify(panier));


    if (panier.length == 0) {
        localStorage.removeItem('panier');
        showEmptyMessage();
    }

    // Rafraichissement de la fature 
    reloadFacture();
};

/**
 * Permet de crée la facture en HTML.
 */
function factureHTML() {
    // ===== Facture ===== //
    let prixHT = 0;
    let prixTTC = 0;
    let taxe = 0;
    const factureDom = document.querySelector('.factures');

    let facture = document.createElement('div');
    facture.className = 'facture';
    facture.innerHTML = `
    <h3>Facture</h3>
    <ul class="facture__liste">
        <li class="facture__liste__element">Nom</li>
        <li class="facture__liste__element">Nombre</li>
        <li class="facture__liste__element">Couleur</li>
        <li class="facture__liste__element">Prix</li>
    </ul>
    `;
    factureDom.appendChild(facture);

    

    // Boucle qui permet d'ajouter les elements a la facture
    panier.forEach(element => {
        let factureArticle = document.createElement('div');
        factureArticle.className = 'textFacture';
        factureArticle.innerHTML = `
        <ul class="textFacture__liste">
            <li class="textFacture__liste__element">${element.name}</li>
            <li class="textFacture__liste__element">${element.number}</li>
            <li class="textFacture__liste__element">${element.color}</li>
            <li class="textFacture__liste__element">${element.price}</li>
        </ul>
        `
        facture.appendChild(factureArticle);

        // Calculer le prix total
        prixHT += element.price;
        prixHT *= element.number;
    });
    // Calcule de la taxe
    taxe += (prixHT * 20) / 100; 

    // Calcule du prix TTC
    prixTTC = prixHT + taxe;

    // Creation affichage du prix en HTML

    let prixDom = document.createElement('div');
    prixDom.className = 'textFacture__prix';
    prixDom.innerHTML = `
    <div>
        <p class="textFacture__prix__element">Prix HT: ${prixHT} Euros</p>
        <p class="textFacture__prix__element">Prix TTC: ${prixTTC} Euros</p>
    </div>
    <button id="button-commander" onclick="overlayCommande()">Commander</button>
    `
    facture.appendChild(prixDom);
};

/**
 * Permet de rafraichir la facture par rapport a objet supprimer.
 */
function reloadFacture() {
    const facture = document.querySelector('.facture');
    facture.remove();

    factureHTML();
};



// === TEST === //

// Creation d'une overbox pour le formulaire 

function overlayCommande() {
    // Fond noir
    let overlay = document.createElement('div');
    overlay.className = "overlay";
    document.body.appendChild(overlay);

    let overlayBox = document.createElement('div');
    overlayBox.className = 'overlay__box';
    overlayBox.innerHTML = `
        <i class="fas fa-times overlay__box__close" onclick="closeOverlay()"></i>
        <h3 class="overlay__box__title">Formulaire de commande</h3>
        <div class="overlay__box__formulaire">
            <div>
                <input type="text" name="firstName" id="firstName" placeholder="Votre Nom"></input>
                <input type="text" name="lastName" id="lastName" placeholder="Votre Prénom"></input>
            </div>
            <form>
                <input type="email" name="email" id="email" placeholder="Votre Email"></input>
                <input type="email" name="email2" id="email2" placeholder="Confirmer Votre Email"></input>
                <input type="text" name="address" id="address" placeholder="Votre Adresse"></input>
                <input type="text" name="city" id="city" placeholder="Votre Ville"></input>
                <input type="submit" onclick="postData(${panier})" name="validation" id="validation" value="Valider"></input>
            </form>
        </div>
    `
    overlay.appendChild(overlayBox);

}

function closeOverlay() {
    let overlay = document.querySelector('.overlay');
    overlay.style.animation = "overlayClose 400ms";

    // Pour attendre que animation ce finis.
    setTimeout(() => {
        overlay.remove()
    }, 400);
}

function postData(panier) {
    console.log(panier);
    const response = fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(panier)
    })

    return response;
}
