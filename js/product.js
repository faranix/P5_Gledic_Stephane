// =============== Parameter in url ============== //

// Function qui permet de selectioner le parametre URL
function getParams() {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url)
    let id = urlParams.get('id');
    return id;
}

// Appel de Api lier au produit
const box = document.querySelector('#box');


fetch('http://localhost:3000/api/cameras/' + getParams())
    .then(res => {
        if(res.ok) {
            res.json().then(data => {
                console.log({data});
                let product = document.createElement('div');
                product.className = 'product';
                product.innerHTML = `
                    <img src="${data.imageUrl}" class="product__img">
                    <div class="product__article">
                    <div class="product__article__title">
                        <h2>${data.name}</h2>
                    </div>
                    <div class="product__article__description">
                        <p class="product__article__description__text">${data.description}</p>
                        <p class="product__article__description__prix">${data.price} euros</p>
                        
                        <div class="product__article__description__btn">

                            <select name="nombre" id="nombre">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>

                            <select name="color" id="color">
                                <option value="blanc">Blanc</option>
                                <option value="gris">Gris</option>
                                <option value="noir">Noir</option>
                                <option value="rouge">Rouge</option>
                            </select>
                
                            <button type="button" id="button-panier">Mettre au Panier</button>
                        </div>
    
                    </div>
                    </div>
                `
                box.appendChild(product);
            })
        } else {
            console.error('Error 404: Probleme call Api');
            let errorText = document.createElement('h2');
            errorText.innerHTML = 'Error 404: Probleme call Api';
            box.appendChild(errorText);
        }
    })






