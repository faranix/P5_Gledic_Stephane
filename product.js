// =============== Parameter in url ============== //

function getParameterByName() {
    let url_string = "http://127.0.0.1:5500/pages/product.html?id=5be1ed3f1c9d44000030b061&id=5be1ef211c9d44000030b062";
    let url = new URL(url_string);
    let id_1 = url.searchParams.get('id');
    console.log(id_1);
    let id = '/' + id_1;
    return id
  }
  
  

                  // =============== TEST ============== //

  // Appel de l'api par rapport aux parametre 
  
  let url = new URL('http://localhost:3000/api/cameras');
  
  fetch(url + getParameterByName())
    .then(res => {
        if(res.ok) {
            res.json().then(data => {

                console.log(data);
            })
        }
    })



