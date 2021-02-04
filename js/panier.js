// Recuperer les infos et afficher
    // Creation des test
let test1 = document.querySelector('.test');
let test2 = document.querySelector('.test2');

    // Recuperation des donnees
test1.innerHTML = localStorage.getItem('nombre-article');
test2.innerHTML = localStorage.getItem('color-article');




localStorage.setItem('product', Product);