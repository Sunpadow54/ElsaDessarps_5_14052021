// UTILITIES


// ------------------ LocalStorage

// content of localStorage (key: cartStorage)

let cartStorage = JSON.parse(localStorage.getItem('myCart'));

// Function : Add/Delete to Local Storage

const sendToLocalStorage = (item, itemToSend) => localStorage.setItem(item, JSON.stringify(itemToSend));

const deleteLocalStorageItem = item => localStorage.removeItem(item);



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
    let nbrProducts = cartStorage ? cartStorage.length : 0;
    document.querySelector('.cart-count').textContent = nbrProducts;
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


// ------------------ Msg Popup

// Class for creating popup messages

class MsgPopup {
    constructor(msgFor) {
        switch (msgFor) {
            case 'alreadyIn':
                this.txt = 'Ce produit est déjà dans votre panier';
                this.txtLink = 'Continuez vos achats';
                this.href = '/index.html';
                break;

            case 'emptyCart':
                this.txt = 'Vous n\'avez aucun produit dans votre panier';
                this.txtLink = 'Allez voir nos offres !';
                this.href = '/index.html';
                break;

            case 'successAddCart':
                this.txt = 'Vous avez bien ajouté ce produit à votre panier !';
                this.txtLink = 'Voir votre panier';
                this.href = '/public/page/panier.html';
                break;
        }
    }
}


// Function to create popup message div (& disable the btn)

function createPopup(btn, msgFor) {

    // use Class MsgPopup to get the correct msgs
    let msg = new MsgPopup(msgFor);

    // create popup div
    let popup = document.createElement('div');
    popup.classList.add('toast', 'show', 'position-absolute', 'bottom-0', 'start-50', 'translate-middle-x');
    popup.innerHTML =
        `
                <div class="toast-header justify-content-center">
                    ${msg.txt}
                </div>
                <div class="toast-body text-center">
                    <a href="${msg.href}" class="c-brand-second">${msg.txtLink}</a>
                </div>
            `;

    document.querySelector('main').appendChild(popup);

    // disable the btn 
    btn.disabled = true;
}