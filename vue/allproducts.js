// convert number into euro format
const euro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
});

const urlApiFurniture = "http://localhost:3000/api/furniture";
const urlApiCameras = "http://localhost:3000/api/cameras";
const urlApiTeddies = "http://localhost:3000/api/teddies";

// LIST OF PRODUCTS
// SEARCH DATA of the API
fetch(urlApiFurniture)

    // first promise (get json to convert)
    .then(apiResponse => {
        // test if request is ok 
        if (apiResponse.ok) {
            // convert json
            return apiResponse.json();
        } else {
            // if error
            throw "impossible d'accéder à l'API. erreur status:" + apiResponse.status;
        }
    })

    // second promise (if first is resolved)
    .then(dataApiProducts => {

        // loop inside the data of the API
        for (let product of dataApiProducts) {

            // variable for selecting the bloc where the products will be shown.
            const blocOfProducts = document.getElementById('list-products');
            // create a new <li>
            const newLi = document.createElement('li');
            // add a class to the new <li>
            newLi.classList.add('col');
            // add the new <li> into the products bloc.
            blocOfProducts.appendChild(newLi);
            // insert all data of the product
            newLi.innerHTML =
                `<article>
                    <a href="produit.html?id=${product._id}" class="card h-100 text-center text-decoration-none text-reset">
                        <img src="${product.imageUrl}" class="card-img-top position-relative" alt="${product.name} Orinoco" height="400" width="415" />
                        <div class="card-body">
                            <h2 class="card-title h5">${product.name}</h2>
                            <p class="card-text">${euro.format(product.price)}</p>
                        </div>
                    </a>
                </article>
                `;
        }
    })

    //catch error (! need to be modified)
    .catch(error => {
        console.log(error);
    });
