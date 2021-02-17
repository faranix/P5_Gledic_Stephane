// ================ TEST ================= //
// Création d'une boucle qui crée le html selon le panier reçu
let panier = JSON.parse(localStorage.getItem('panier'));

function createHtml() {
    const panierDom = document.querySelector('.panier');
    const produits = document.querySelector('.products');

    // Creation des produits
    if(panier == null) {
        let panierVide = document.createElement('h2');
        panierVide.innerHTML = `Votre panier est actuellement vide.`;
        produits.appendChild(panierVide);

    } else {

        panier.forEach(element => {
            let produit = document.createElement('div');
    
            produit.className = 'product'
            produit.innerHTML = `
                <img class="product__img" src="${element.image}" alt="L'image du Produits">
                <div class="product__information">
                    <div class="product__information__name">
                        <h6 class="product__information__name__title">${element.name}</h6>
                        <i class="fas fa-trash product__information__name__icon"></i>
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

        // ===== EN COURS ===== //
        // Creation d'un boutton suprimer tout le panier
        let deleteAllPanier = document.createElement('div');
        deleteAllPanier.className = 'div-delete-all';
        deleteAllPanier.innerHTML = `
            <button class="delete-all-panier" onclick="removeAllPanier()">Supprimer tout le panier</button> 
        `
        produits.appendChild(deleteAllPanier);

        // ===== EN COURS ===== //
        // Creation de html pour la facture
        
        let facture = document.createElement('aside');
        facture.className = 'facture';
        
        facture.innerHTML = panier.forEach(element => {
            `<p>${element.name}</p>`
        });
        panierDom.appendChild(facture);

        removeProduit();
    }
}

createHtml();

// Fonction qui permet de supprimer tout le panier
function removeAllPanier() {
    localStorage.removeItem('panier');
    window.location.reload();
}

// Fonction qui permet de supprimer un produit cibler
function removeProduit() {
    let iconRemove = document.querySelectorAll('.product__information__name__icon');

    for (let i = 0; i < panier.length; i++) {
        iconRemove[i].addEventListener('click', () => {
                panier.splice([i], 1);
                localStorage.setItem('panier', JSON.stringify(panier));
                if (panier.length == 0) {
                    localStorage.clear();
                }
                window.location.reload();

        });
    }
    
}



// =============================================== //