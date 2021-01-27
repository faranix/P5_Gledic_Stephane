// =============== Parameter in url ============== //

function getParameterByName(name) {
    let url_string = "http://127.0.0.1:5500/pages/product.html?id1=5be1ed3f1c9d44000030b061&id2=5be1ef211c9d44000030b062";
    let url = new URL(url_string);
    let id_1 = url.searchParams.get(name);
    console.log(id_1);
    let id = '/' + id_1;
    return id
  }
  
  
  // Appel de l'api par rapport aux parametre 
  
  let url = new URL('http://localhost:3000/api/cameras');
  
  fetch(url + getParameterByName("id1"))
    .then(res => {
        if(res.ok) {
            res.json().then(data => {

                console.log(data);
                // =============== JS pour creation de la page ============== //

                let articleImg = document.querySelector('.article__box__img');
                let articleName = document.querySelectorAll('.article__box__info__name');
                let articleDescription = document.querySelectorAll('.article__box__info__description');
                let articlePrix = document.querySelectorAll('.article__box__info__achat__prix');

                articleImg.src = data.imageUrl;
                articleName.innerHTML = data.name;
                articleDescription.innerHTML = data.description;
                articlePrix.innerHTML = data.price + ' Euros';
            })
        }
    })



