// =============== API ============== //
let urlImg = [];


fetch('http://localhost:3000/api/cameras')
  .then(res => {
    if(res.ok) {
      res.json().then(data => {
        for(let i = 0; i < data.length; i++) {
          urlImg.push(data[i]);
        }

        // =============== ARTICLE ============== //

        // Permet obtenir la position des articles et d'afficher les images.
        function getPositionArticle() {
  
          let articleImg = document.getElementsByClassName('article__box__img');
          let articleName = document.querySelectorAll('.article__box__info__name');
          let articleDescription = document.querySelectorAll('.article__box__info__description');
                
          for(let i = 0; i < articleImg.length; i++){
            articleImg[i].src = urlImg[i].imageUrl;
            articleName[i].innerHTML = urlImg[i].name;
            articleDescription[i].innerHTML = urlImg[i].description;
          }
        }

        getPositionArticle();
        console.log(urlImg);
      })
    } else {
      console.log('Erreur 404');
    }
  })




