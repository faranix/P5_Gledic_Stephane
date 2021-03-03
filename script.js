// =============== API ============== //

/**
 * Permet d'appeler les produits de API
 */
async function getProductsFromApi() {
  await fetch('http://localhost:3000/api/cameras/')
    .then(res => {
      res.json().then(products => {
        createHtml(products);
      })
    })
}

getProductsFromApi();

/**
 * Permet de crée HTML avec les données reçu 
 * @param {*} data 
 */
function createHtml(data) {
  console.log(data);
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

  // Html du populaire
  let populaire = document.createElement('div');
  populaire.className = 'populaire__box';
  populaire.innerHTML = `
    <h3 class="populaire__box__title">Populaire</h3>
    <div class="populaire__box__article">
      <img src="" class="populaire__box__article__img">
      <p class="populaire__box__article__name">${data[3].name}</p>
      <p class="populaire__box__article__description">${data[3].description}</p>
      <p class="populaire__box__article__prix">${data[3].price} euros</p>       
    </div>
  `
  document.querySelector('#populaire').appendChild(populaire);

}






