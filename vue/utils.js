// UTILITIES

// convert number into euro format
const euro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: /* 2 */0
});

// --- LocalStorage

// content of localStorage (key: cartStorage)
let cartStorage = JSON.parse(localStorage.getItem('cartStorage'));

// product to insert in LocalStorage
let product = {};


// ------------------------------------ FUNCTIONS ------------------------------------

// Function : to search a product (object) inside an array from _id parameter

const findProductById = (arrayToCheck, thingToFind) => {
    const product = arrayToCheck.find(productInArray => productInArray._id == thingToFind);
    return product;

}


// Function : Add to Cart

const addToCartStorage = (productToAdd) => {

    // Add product to array cartStorage
    cartStorage.push(productToAdd);
    // push the array to LocalStorage on 'cartStorage' key
    addToLocalStorage();
}


// Function : Add to Local Storage

const addToLocalStorage = () => localStorage.setItem('cartStorage', JSON.stringify(cartStorage));
