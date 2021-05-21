// UTILITIES

// convert number into euro format
const euro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
});


const findObjFromId = (arrayToCheck, thingToFind) => {
    const product = arrayToCheck.find( productInArray => productInArray._id == thingToFind);
    return product;

}


// --- LocalStorage

// content of localStorage (key: cartStorage)
let cartStorage = JSON.parse(localStorage.getItem('cartStorage'));

// product to insert in LocalStorage
let product = {};


// Function : Add to Cart

const addToCartStorage = (productToAdd) => {

    cartStorage.push(productToAdd);
    // convert to json and set item for localstorage 'cartStorage'
    addToLocalStorage();
}

// Function : Add to Local Storage

const addToLocalStorage = () => localStorage.setItem('cartStorage', JSON.stringify(cartStorage));
