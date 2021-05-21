// CART

// ------------------------------------ FUNCTIONS ------------------------------------

// Show the products in cart
let showCartProducts = () => {
    for (let productInCart of cartStorage) {
        htmlProductsTable += 
        `
            <tr class="align-middle">
                <td scope="row">
                    <button type="button" class="btn-close" aria-label="Supprimer"></button>
                </td>
                <td class="">
                    <a href="produit.html?id=${productInCart._id}" class="btn">
                        <img src="${productInCart.imageUrl}" alt="voir-produit-${productInCart.name}" height="80" width="84">
                    </a>
                </td>
                <td class="fw-light">${productInCart.name}</td>
                <td class="fw-light text-center">${euro.format(productInCart.price)}</td>
                <td class="fw-light text-center">
                    <div class="btn-group me-2" role="group" aria-label="quantité de ${productInCart.name}">
                        <button type="button" class="btn btn-lg btn-light fw-light quantity" aria-label="enlever">-</button>
                        <span id="quantity_${productInCart._id}" class="btn btn-lg fw-light">${productInCart.quantity}</span>
                        <button type="button" class="btn btn-lg btn-light fw-light quantity" aria-label="ajouter">+</button>
                    </div>
                </td>
                <td class="fw-light text-center">totalprice</td>
            </tr>
        `;
    };

    document.querySelector('#list-products-in-cart tbody').innerHTML = htmlProductsTable;
}


// Function : add remove product quantity

function quantity () {

    // search the span showing the quantity
    let divToShowQuantity = this.parentElement.children[1];
    let quantity = parseInt(divToShowQuantity.textContent);

    if (this.getAttribute('aria-label') === 'ajouter') {
        quantity += 1;
    }

    if (this.getAttribute('aria-label') === 'enlever') {
        quantity -= 1;
    }

    divToShowQuantity.textContent = Math.max(quantity, 1);
    changeQtyInStorage(divToShowQuantity);
}



const changeQtyInStorage = (div) => {
    
    // change localStorage
    let id = div.getAttribute('id').split('_');

    let productChanged = findObjFromId(cartStorage, id[1]);

    if (productChanged) {
        productChanged.quantity = div.textContent;
    }
 
    addToLocalStorage();
}


// ------------------------------------ VARIABLES ------------------------------------

// html content of the table cart
let htmlProductsTable = '';


// ---------------------------------------------------------------------------------------
// ------------------------------------ POPULATE HTML ------------------------------------

showCartProducts();

const buttonsAdd = document.querySelectorAll('button.quantity');

buttonsAdd.forEach( buttonAdd => 
    buttonAdd.addEventListener('click', quantity)
);

