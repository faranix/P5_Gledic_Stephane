// ================ TEST ================= //
// Création d'une boucle qui crée le html selon le panier reçu
const panier = JSON.parse(localStorage.getItem('panier'));
console.log(panier);
let test = document.querySelector('.test');

panier.forEach(element => {
    let p = document.createElement('p');
    p.innerHTML = element.name;
    test.appendChild(p);
});
// =============================================== //