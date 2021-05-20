// SOLO PRODUCT

// ------------------------------------ FUNCTIONS ------------------------------------


// Function : Find one product 

const findOneProductById = async (urlApi) => {

    // fetch api
    const allProductsApi = await fetchAPI(urlApi);

    // search the product from id parameter
    const productApi = allProductsApi.find(productInApi => productInApi._id === idProduct);

    // return product object
    return productApi;
}


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
        price: productApi.price,
    }
}


// Function : test if a value exist

const isValueInObj = (objToCheck, thingToFind) => {
    // Loop the array
    for (let array of objToCheck) {
        // If the array contain and object id similar to what we search
        if (array._id === thingToFind) {
            console.log("This product is already in the cart");
            return true;
        }
    }
}


// Function : Add to Local Storage

const addToLocalStorage = (productToAdd) => {

    allProductsInLocalStorage.push(productToAdd);
    // convert to json and set item for localstorage 'cartStorage'
    localStorage.setItem('cartStorage', JSON.stringify(allProductsInLocalStorage));
}


// Function : populate LocalStorage

const order = () => {
    // if cartStorage key is null
    if (!localStorage.cartStorage) {
        // initialise 'allProductsInLocalStorage' as array and push 'product' object inside 
        allProductsInLocalStorage = [];
        // add product to 'cartStorage' key
        addToLocalStorage(product);
    }

    // else if the product is not already in the localStorage 'cartStorage'
    else if (!isValueInObj(allProductsInLocalStorage, idProduct)) {
        // add product to 'cartStorage' key
        addToLocalStorage(product);
    }
}


// ------------------------------------ VARIABLES ------------------------------------

// --- URL
// Get id_product from url
const urlParameters = (new URL(document.location)).searchParams;
// id of the product
let idProduct = urlParameters.get('id');

// --- LocalStorage
// content of localStorage (key: cartStorage)
let allProductsInLocalStorage = JSON.parse(localStorage.getItem('cartStorage'));
// product to insert in LocalStorage
let product = {};

// --- LocalStorage
// button for adding the product in the cart
let btnOrder = document.getElementById('product');




// ---------------------------------------------------------------------------------------
// ------------------------------------ POPULATE HTML ------------------------------------

// Find the product / Show the product / Add data of the product in variable // Can add to cart

findOneProductById(urlApiFurniture)
    .then(product => {
        showOneProduct(product)
        populateProductObj(product)
    })
    .then(btnOrder.addEventListener('click', order))
    .catch(error => { document.getElementById('product').innerHTML = error.message });
