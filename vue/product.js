// SOLO PRODUCT

// ------------------------------------ FUNCTIONS ------------------------------------


// Function : show product in Html

const showOneProduct = (productToShow) => {

    // insert data of the product inside html variable
    let htmlProductDetail =
        `
            <div class="row g-0 h-100">
                <div class="col-lg-6">
                    <img class="w-100 h-100" src="${productToShow.imageUrl}" alt="..." height="274" width="415" />
                </div>
                <div class="col-lg-6 d-flex flex-column">
                    <div class="card-body">
                        <h2 class="card-title h3 font-brand">${productToShow.name}</h2>
                        <p class="card-text">${productToShow.description}</p>
                        <span class="card-text">${euro.format(productToShow.price)}</span>
                    </div>
                    <div class="card-footer">

                        <button id="add-cart" class="btn btn-outline-dark">Ajouter au panier</button>
                    </div>
                </div>
            </div>
        `;

    // insert html inside div product
    document.getElementById('product').innerHTML = htmlProductDetail;

}


// Function : add data to "product"

let populateProductObj = (productApi) => {
    product = {
        _id: productApi._id,
        name: productApi.name,
        imageUrl: productApi.imageUrl,
        price: productApi.price,
        quantity: 1,
    }
}


// Function : populate LocalStorage

const order = () => {
    // if cartStorage key is null
    if (!localStorage.cartStorage) {
        // initialise 'cartStorage' as array and push 'product' object inside 
        cartStorage = [];
        // add product to 'cartStorage' key
        addToCartStorage(product);
    }

    // else if the product is not already in the localStorage 'cartStorage'
    else if (!findProductById(cartStorage, idProduct)) {
        // add product to 'cartStorage' key
        addToCartStorage(product);
    }
}


// ------------------------------------ VARIABLES ------------------------------------


// Get id_product from url
const urlParameters = (new URL(document.location)).searchParams;
// id of the product
let idProduct = urlParameters.get('id');

// button for adding the product in the cart
let btnOrder = document.getElementById('product');



// ---------------------------------------------------------------------------------------
// ------------------------------------ POPULATE HTML ------------------------------------

/* 
// After sucessfully Fetch from Api :
    // Find the product 
    // Show the product / & / Add data of the product in variable
    // Can add to cart
*/

fetchAPI(urlApiFurniture)
    .then(dataApi => findProductById(dataApi, idProduct))
    .then(product => {
        showOneProduct(product)
        populateProductObj(product)
    })
    .then(btnOrder.addEventListener('click', order))
    .catch(error => { document.getElementById('product').innerHTML = error.message });