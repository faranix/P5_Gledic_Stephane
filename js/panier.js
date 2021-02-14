// ================ TEST ================= //
// Création d'une boucle qui crée le html selon le panier reçu
const panier = JSON.parse(localStorage.getItem('panier'));
console.log(panier);


// Functions qui crée le html des produits

function createHtml() {
    const produits = document.querySelector('.products');

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
                    <h6 class="product__information__title">${element.name}</h6>
                    <div class="product__information__container">
                        <p class="product__information__container__description">${element.description}</p>
                        <p class="product__information__container__lense">${element.lenses}</p>
                        <p class="product__information__container__prix">${element.price}</p>
                </div>
            `;
            console.log(produit);
            produits.appendChild(produit);
        });
    }

}

createHtml();
// =============================================== //