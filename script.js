// =============== API ============== //

/**
 * Permet d'appeler les produits de API
 */
function getProductsFromApi() {
  fetch('http://localhost:3000/api/cameras/')
    .then(res => {
      res.json().then(products => {
        createHtml(products);
      })
      .catch(() => {
        // Afficher l'erreur reçu.
        showError(res.status);
      })
    })
}

getProductsFromApi();

/**
 * Permet de crée HTML avec les données reçu 
 * @param {*} data 
 */
function createHtml(data) {

  // Creation des articles dans une boucle forEach
  data.forEach(element => {
    let box = document.createElement('div');
    box.className = 'article__box';
    box.innerHTML = `
        <img src="${element.imageUrl}" class="article__box__img">
        <div class="article__box__info">
          <p class="article__box__info__name">${element.name}</p>
          <p class="article__box__info__description">${element.description}</p>
        </div>
    `;
    article.appendChild(box);
  });

  // Creation des articles de la section populaire 
  let allArticle = document.querySelector('.populaire__box__allarticle');

  for (let i = 2; i < 4; i++) {
    let articlePopulaire = document.createElement('div');
    articlePopulaire.className = "populaire__box__allarticle__article";
    articlePopulaire.innerHTML = `
      <img src="${data[i].imageUrl}" class="populaire__box__allarticle__article__img">
      <div>
        <p class="populaire__box__allarticle__article__name">${data[i].name}</p>
        <hr>
        <p class="populaire__box__allarticle__article__description">${data[i].description}</p>
        <p class="populaire__box__allarticle__article__prix">${data[i].price} euros</p>
        <div class="article__box__info__achat__panier">
              <a href="pages/product.html?id=${data[i]._id}">
                <button class="populaire__box__allarticle__article__btn">Plus D'information</button>
              </a>
          </div>
      </div>
    `
    allArticle.appendChild(articlePopulaire);
  }
}
    

/**
 * fonction qui permet de trouvais l'erreur attribuer et envoyer un message en retour
 * @param {*} errorCode 
 */
 function showError(errorCode) {
   // Utilisation d'un switch pour lister les different cas d'erreur.
  switch (errorCode) {
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



