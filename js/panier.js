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

/**
 * Permet d'ouvir l'overlay
 */
function overlayCommande() {
    document.querySelector('.overlay').style.display = "flex";
}

/**
 * Permet de fermer l'overlay
 */
function closeOverlay() {
    document.querySelector('.overlay').style.display = "none";
}

/**
 * Permet d'envoyer les données de utilisateur pour avoir un orderId
 */
async function postData() {

    let dataOrder = {
        contact: {
            firstName: document.querySelector('#firstName').value,
            lastName: document.querySelector('#lastName').value,
            address: document.querySelector('#address').value,
            city: document.querySelector('#city').value,
            email: document.querySelector('#email').value,
        },
        products: []
    };
    panier.forEach(element => {
        dataOrder.products.push(element.id);
    })

    await fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataOrder)

    })
    .then(res => {
        if (res.ok) {
            res.json().then(data => {
                localStorage.setItem("Order", JSON.stringify(data));

                window.location.href = 'commande.html';
            })
        }
    })
    .catch(err => {
        console.error("Une erreur c'est produit !");
    });
}

// ======= EN COURS DE CREATION ======= // 
/**
 * Permet de lister les erreurs
 */
function showError() {
    switch (errorMessage) {
        case 401:
            console.log("utilisateur non authentifié");
            break;
        case 403:
            console.log("accès refusé");
            break;
        case 404:
            console.log("page non trouvée");
            break;
        case 500:
            console.log("erreur serveur");
            break;
        case 503:
            console.log("erreur serveur");
            break;
        case 504:
            console.log("le serveur n'a pas répondu");
            break;
    
        default:
            console.log("Une erreur vient d'arriver");
            break;
    }
}

// Event Listener
let formulaire = document.querySelector('.overlay__box__formulaire');

formulaire.addEventListener('submit', (e) => { 
    e.preventDefault();    
});