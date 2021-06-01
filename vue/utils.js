// UTILITIES



// ------------------ LocalStorage

// content of localStorage (key: cartStorage)

let cartStorage = JSON.parse(localStorage.getItem('cartStorage'));


// Function : Add to Local Storage

const sendToLocalStorage = () => localStorage.setItem('cartStorage', JSON.stringify(cartStorage));



// ------------------ Format currency

// convert number into euro format

const euro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: /* 2 */0
});


// ------------------ Search by id

// Function : to search a product (object) inside an array from _id parameter

const findProductById = (arrayToCheck, thingToFind) => {
    const product = arrayToCheck.find(productInArray => productInArray._id == thingToFind);
    return product;
}


// ------------------ Number of products in cart

// Function : Show count of products in cart

function showCountCart() {
    let spanNbrInCart = document.querySelector('.cart-count');
    if (cartStorage) {
        spanNbrInCart.textContent = cartStorage.length;
    } else {
        spanNbrInCart.textContent = 0;
    }
}

showCountCart();


// ------------------ Varnish colors

const allVarnishs = {
    '#D2B48C': 'Tan',
    '#7B3F00': 'Chocolate',
    '#55342B': 'Dark Oak',
    '#cebb9e': 'Light Oak',
    '#A38B5F': 'Teak',
    '#591C08': 'Mahogany',
    '#000000': 'Black',
    '#FFFFFF': 'White',
}

// Function : search a color hex from allVarnish Array

const findColorFromAllVarnish = (thingToFind) => {
    return Object.keys(allVarnishs).find(key => allVarnishs[key] === thingToFind);
}


// Function : Add background-color hex on div from the textContent of the next Dom element.

let showColorVarnish = () => {

    document.querySelectorAll('.varnish-color').forEach(coloredDiv => {
        const color = coloredDiv.nextElementSibling.textContent;
        coloredDiv.style.backgroundColor = findColorFromAllVarnish(color);
    })
}