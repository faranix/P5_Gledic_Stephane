// =============== API ============== //

// Fonction qui permet d'appeler les produits de API
async function getProductsFromApi() {
  await fetch('http://localhost:3000/api/cameras/')
    .then(res => {
      res.json().then(products => {
        console.log(products);
        createHtml(products);
      })
    })
}

getProductsFromApi();

// Fonction qui permet de crée HTML avec les données reçu 
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
    console.log('box', box);
  });
  console.log(document.body);
}





