// LIST OF PRODUCTS

// ------------------------------------ FUNCTIONS ------------------------------------

// FUNCTION : show a list of all products from Api

const showAllProducts = async (urlApi) => {

    // fetch the api data
    let products = await getApiData(urlApi);

    // loop inside the data of the API
    for (let product of products) {
        // insert all data of the product inside html
        document.getElementById('list-products').innerHTML +=
            `
                <li class="col">
                    <article>
                        <a href="/public/page/produit.html?id=${product._id}" class="card h-100 text-center text-decoration-none text-reset">
                            <img src="${product.imageUrl}" class="card-img-top position-relative" alt="${product.name} Orinoco" height="400" width="415" />
                            <div class="card-body">
                                <h2 class="card-title h5">${product.name}</h2>
                                <p class="card-text">${euro.format(product.price)}</p>
                            </div>
                        </a>
                    </article>
                </li>
            `;
    }
}


// =======================================================================================

// ------------------------------------ POPULATE HTML ------------------------------------

// Show all Products
showAllProducts(urlApiFurniture);
    /* .catch(error => { document.getElementById('list-products').innerHTML = error.message }); */
