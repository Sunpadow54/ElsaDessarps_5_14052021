// CART

// ------------------------------------ FUNCTIONS ------------------------------------

// Show the products in cart
let showCartProducts = () => {
    
    if (!cartStorage || cartStorage.length === 0) {
        document.querySelector("#list-products-in-cart tbody").innerHTML = `<tr>Vous n\'avez aucun produit dans votre Panier</tr>`;
    }

    if(cartStorage) {

        for (let productInCart of cartStorage) {
            document.querySelector("#list-products-in-cart tbody").innerHTML +=
                `
                <tr class="align-middle d-flex flex-column  align-items-center d-md-table-row mb-4 gap-2 container-sm">
                    <td class="align-self-end">
                        <button type="button" id="delete_${productInCart._id}" class="btn-close" aria-label="Supprimer"></button>
                    </td>
                    <td class="">
                        <a href="/public/page/produit.html?id=${productInCart._id}" class="btn">
                            <img src="${productInCart.imageUrl}" alt="voir-produit-${productInCart.name}" height="80" width="84">
                        </a>
                    </td>
                    <td class="fw-light">${productInCart.name}</td>
                    <td class="fw-light">
                        <span class="rounded py-2 px-3 varnish-color"></span>
                        <span class="py-2 px-3 text-nowrap">${productInCart.choice}</span>
                    </td>
                    <td class="fw-light text-center d-none d-md-table-cell">${euro.format(productInCart.price)}</td>
                    <td class="fw-light text-center">
                        <div id="quantity_${productInCart._id}" class="btn-group me-2" role="group" aria-label="quantité de ${productInCart.name}">
                            <button type="button" class="btn btn-lg btn-light fw-light quantity" aria-label="remove">-</button>
                            <span class="btn btn-lg fw-light">${productInCart.quantity}</span>
                            <button type="button" class="btn btn-lg btn-light fw-light quantity" aria-label="add">+</button>
                        </div>
                    </td>
                    <td id="total-produit_${productInCart._id}" class="fw-light text-center total-product">${euro.format(calcTotalproduct(productInCart))}</td>
                </tr>
            `;
        };
    
        // color the div
        showColorVarnish();
        // Show total price of the cart
        totalDiv.textContent = euro.format(calcTotal());
    }
};



// Function: Delete a Product from Cart

function deleteProduct () {
    // search index of the product in cartStorage
    let idItem = this.getAttribute("id").split("_")[1] /* 'test' */;
    let indexItem = cartStorage.findIndex(item => item._id === idItem);

    // if product exist
    if (indexItem > -1) {
        // Delete product in cartStorage
        cartStorage.splice(indexItem, 1);
        // Send the new array to LocalStorage
        sendToLocalStorage('myCart', cartStorage);
        // Delete html showing the product
        this.parentElement.parentElement.remove();
        // show new total price of cart
        totalDiv.textContent = euro.format(calcTotal());
        // Show new number of products in cart
        showCountCart();
    }
}


// Function : multiply product price with quantity

const calcTotalproduct = (product) => {
	return Number(product.price) * Number(product.quantity);
};


// Function : calcul the summ of products

const calcTotal = () => {
    let summTotal = 0;
    for (let product of cartStorage) {
        summTotal = summTotal + calcTotalproduct(product);
    }
    return summTotal;
}



function changeQty(idItem, addOrRemove) {

    const spanQty = document.querySelector(`#quantity_${idItem} > span`);
    const oldQty = parseInt(spanQty.textContent);

    // Change quantity
    let newQty =
        addOrRemove === "add"
            ? Math.min(oldQty + 1, 10)
            : Math.max(oldQty - 1, 1);

    // Show new quantity ;
    spanQty.textContent = newQty;

    // Change in local Storage
    findProductById(cartStorage, idItem).quantity = newQty;
    sendToLocalStorage('myCart', cartStorage);

    // Calcul the new total price of the product
    let totalProduct = calcTotalproduct(findProductById(cartStorage, idItem));
    document.querySelector(`#total-produit_${idItem}`).textContent = euro.format(totalProduct);

    //Show new Total of the cart
    totalDiv.textContent = euro.format(calcTotal());
}

// =======================================================================================
// ------------------------------------ VARIABLES ----------------------------------------


// total price of the cart
let totalDiv = document.querySelector('#total-cart td');


// =======================================================================================
// ------------------------------------ POPULATE HTML ------------------------------------
    showCartProducts();

// ------------------------------------ EVENTS ------------------------------------

// Button : Select a Quantity of a product
document.querySelectorAll("button.quantity").forEach((btnAddOrRemove) =>
    btnAddOrRemove.addEventListener('click', function () {

        const idItem = this.parentElement.getAttribute("id").split("_")[1];
        changeQty(idItem, this.getAttribute("aria-label"));
        
	})
);


// Button : Delete a Product
document.querySelectorAll('.btn-close').forEach((btnClose) => {
    btnClose.addEventListener('click', deleteProduct)
});


// Button : order messages (if cart is empty)
document.getElementById('order-btn').addEventListener('click', function() {
    // if cart is empty
    if (cartStorage === null || cartStorage.length ===0) {
        createPopup(this, 'emptyCart');
    }
})