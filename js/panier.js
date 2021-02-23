// ================ TEST ================= //
// Création d'une boucle qui crée le html selon le panier reçu
let panier = JSON.parse(localStorage.getItem('panier'));

function createHtml() {
    const produits = document.querySelector('.products');
    // Creation des produits
    if(panier == null) {
        let panierVide = document.createElement('h2');
        panierVide.innerHTML = `Votre panier est actuellement vide.`;
        produits.appendChild(panierVide);

    } else {

        panier.forEach(element => {
            let produit = document.createElement('div');
            let id = new Date().getTime();

    
            produit.className = 'product';
            produit.setAttribute('id', `product-${id}`);
            produit.innerHTML = `
                <img class="product__img" src="${element.image}" alt="L'image du Produits">
                <div class="product__information">
                    <div class="product__information__name">
                        <h6 class="product__information__name__title">${element.name}</h6>
                        <i onclick="removeProduit(${id})" class="fas fa-trash product__information__name__icon"></i>
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

// Fonction qui permet de supprimer tout le panier
function removeAllPanier() {
    localStorage.removeItem('panier');
    let produit = document.querySelectorAll('.product');

  
    for(let i = 0; i < produit.length; i++) {
        document.querySelector('.product').remove();
    }
    location.reload();
};

// ======= EN COURS ===== //
// Probleme quand on supprime un produit le produit supprime pas le bon ou quand on revient dans le panier il change.

// Fonction qui permet de supprimer un produit cibler
function removeProduit(id) {
    // Permet de selectionner ID de l'article
    let article = document.querySelector(`#product-${id}`);

    localStorage.getItem('panier');

    // Supprime article cibler
    article.remove();

    // Condiction qui supprime l'element cibler du localstorage 
    for (let i = 0; i < 1; i++) {
        const index = panier.indexOf(panier[i]);
        console.log(index);
        if (index > - 1) {
            console.log(index);
            panier.splice(index, 1);
        }
        
    }

    // Sauvegarde le nouveau localStorage
    localStorage.setItem('panier', JSON.stringify(panier));


    if (panier.length == 0) {
        localStorage.removeItem('panier');
        location.reload();
    }
};

// Fonction qui permet de crée la facture en HTML
function factureHTML() {
    // ===== Facture ===== //

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
    });
}

// =============================================== //