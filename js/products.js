// =============== API ============== //
const article = document.querySelector('#article');


fetch('http://localhost:3000/api/cameras')
  .then(res => {
    if(res.ok) {
      res.json().then(data => {
        console.log({data});
          // Creation des articles dans une boucle forEach

        data.forEach(element => {
          let box = document.createElement('div');
          box.className = 'article__box';
          box.innerHTML = `
            <a href="product.html" class="article__box__lien"><img src="${element.imageUrl}" class="article__box__img"></a>
            <div class="article__box__info">
                <p class="article__box__info__name">${element.name}</p>
                <p class="article__box__info__description">${element.description}</p>
                <div class="article__box__info__achat">
                <p class="article__box__info__achat__prix">${element.price} euros</p>

                <div class="article__box__info__achat__panier">
                    <a href="product.html?id=${element._id}"><button class="article__box__info__achat__panier__btn">Plus D'information</button></a>
                </div>
                </div>
            </div>
          `;
          article.appendChild(box);
          console.log('box', box);
        });
        console.log(document.body);
      })
    } else {
      console.error('Error 404: Probleme call Api');
      let errorText = document.createElement('h2');
      errorText.innerHTML = 'Error 404: Probleme call Api';
      article.appendChild(errorText);
    }
  })
