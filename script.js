// =============== API ============== //

// Faire un appel a API pour recuperer les data
async function fetchData() {
  const response = await fetch('http://localhost:3000/api/cameras/')
  
  let data = await response.json();
  return data;
}

const dataApi = fetchData();    // Stocker les data dans une variable (c'est une promise)


// Function qui crée tout le code html avec les data 
dataApi.then(function htmlCreated(data) {
  console.log({data});

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
})





