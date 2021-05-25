// SOLO PRODUCT

// ------------------------------------ FUNCTIONS ------------------------------------


// Function : show product in Html

const showOneProduct = (productToShow) => {

    // insert data of the product inside html
    productImage.src = productToShow.imageUrl;
    productImage.alt = "Orinoco" + productToShow.name;
    productName.textContent = productToShow.name;
    productDescription.textContent = productToShow.description;
    productPrice.textContent = euro.format(productToShow.price);
    document.querySelector('#product_choice').innerHTML= showChoice(productToShow.varnish);

}

function showChoice(productChoice) {
    let htmlChoice = "";
    for (let i in productChoice) {

        htmlChoice +=
            `
                <input type="radio" id="vernis_${i}" name="varnish" value="${productChoice[i]}">
                <label for="${productChoice[i]}">${productChoice[i]}</label>
            `
    }
    return htmlChoice;
}



// Function : add data to "product"

let populateProductObj = (productInfo) => {
    product = {
        _id: productInfo._id,
        name: productInfo.name,
        imageUrl: productInfo.imageUrl,
        price: productInfo.price,
        choice: choiceSelected(),
        quantity: 1,
    }
}


// Function selected choice 

let choiceSelected = () => {
    let allVarnish = document.querySelectorAll('input[name="varnish"]');
    for (let i in allVarnish) {
        if (allVarnish[i].checked) {
            return allVarnish[i].value;
        }
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
        // Show new number of products in cart
        showCountCart();
    }
}


// ------------------------------------ VARIABLES ------------------------------------


// Get id_product from url
const urlParameters = (new URL(document.location)).searchParams;
// id of the product
let idProduct = urlParameters.get('id');

// DOM product
let productImage = document.querySelector('#product img');
let productName = document.querySelector('#product_name');
let productDescription = document.querySelector('#product_text');
let productPrice = document.querySelector('#product_price');


// button for adding the product in the cart
let btnOrder = document.getElementById('add-cart');

// allchoice = 
let allVarnish = document.querySelectorAll('input[name="varnish"]');

// product to insert in LocalStorage
let product = {};

// ---------------------------------------------------------------------------------------
// ------------------------------------ POPULATE HTML ------------------------------------

/* 
// After sucessfully Fetch from Api :
    // Find the product 
    // Show the product / & / Add data of the product in variable
*/

fetchAPI(urlApiFurniture)
    .then(dataApi => findProductById(dataApi, idProduct))
    .then(product => {
        showOneProduct(product)
        document.querySelector('input[name="varnish"]').checked = true;
        populateProductObj(product);
    })
    .catch(error => { document.getElementById('product').innerHTML = error.message });

document.getElementById('add-cart').addEventListener('click', function() {
    product.choice = choiceSelected();
    order();
})

