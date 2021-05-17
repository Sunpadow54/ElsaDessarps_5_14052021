//Product Solo

// convert number into euro format
const euro = new Intl.NumberFormat('fr-FR', {
	style: 'currency',
	currency: 'EUR',
	minimumFractionDigits: 2
});



// FUNCTION : to show product from id parameter
const showOneProduct = async (urlApi) => {
    // fetch the api data
    const products = await fetchProduct(urlApi);

    //search the product from id parameter, inside dataApi
	const product = products.find(product => product._id === idProduct);

    // insert data of the product inside html variable
    let htmlProductDetail = 
        `
            <div class="row g-0 h-100">
                <div class="col-lg-6">
                    <img class="w-100 h-100" src="${product.imageUrl}" alt="..." height="274" width="415" />
                </div>
                <div class="col-lg-6 d-flex flex-column">
                    <div class="card-body">
                        <h2 class="card-title h3 font-brand">${product.name}</h2>
                        <p class="card-text">${product.description}</p>
                        <span class="card-text">${euro.format(product.price)}</span>
                    </div>
                    <div class="card-footer">
                        <button id="add-cart" class="btn btn-outline-dark">Ajouter au panier</button>
                    </div>
                </div>
            </div>
        `;

    // insert html into bloc
    document.getElementById('product').innerHTML = htmlProductDetail;

}


// Get id product from url
let urlParameters = (new URL(document.location)).searchParams;
let idProduct = urlParameters.get('id');

// Show the product
showOneProduct(urlApiFurniture)
    .catch(error => {document.getElementById('product').innerHTML = error.message});
