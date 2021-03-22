// =============== API ============== //
const article = document.querySelector('#article');

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
          <div class="article__box__info__achat">
          <p class="article__box__info__achat__prix">Prix: ${element.price} euros</p>

          <div class="article__box__info__achat__panier">
              <a href="product.html?id=${element._id}"><button class="article__box__info__achat__panier__btn">Plus D'information</button></a>
          </div>
          </div>
      </div>
    `;
    article.appendChild(box);
    console.log('box', box);
  });
}

/**
 * fonction qui permet de trouvais l'erreur attribuer et envoyer un message en retour
 * @param {*} errorCode 
 */
function showError(errorCode) {
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