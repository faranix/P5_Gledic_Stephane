// =============== API ============== //

async function getApi() {
  const article = document.querySelector('#article');

  await fetch('http://localhost:3000/api/cameras')
    .then(res => {
      if(res.ok) {
        res.json().then(data => {
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
      } else {
        // Afficher un message d'erreur 
        console.error('Error 404: Probleme call Api');
        let errorText = document.createElement('h2');
        errorText.innerHTML = 'Error 404: Probleme call Api';
        article.appendChild(errorText);
      }
    })
}

getApi();



