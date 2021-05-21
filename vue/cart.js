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
                    <div id="quantity_${productInCart._id}" class="btn-group me-2" role="group" aria-label="quantité de ${productInCart.name}">
                        <button type="button" class="btn btn-lg btn-light fw-light quantity" aria-label="enlever">-</button>
                        <span class="btn btn-lg fw-light">${productInCart.quantity}</span>
                        <button type="button" class="btn btn-lg btn-light fw-light quantity" aria-label="ajouter">+</button>
                    </div>
                </td>
                <td id="total-produit_${productInCart._id}" class="fw-light text-center total-product">${euro.format(calcTotalproduct(productInCart))}</td>
            </tr>
        `;
    };

	document.querySelector("#list-products-in-cart tbody").innerHTML = htmlProductsTable;

};


const calcTotalproduct = (product) => {
	return product.price * product.quantity;
};

// ------------------------------------ VARIABLES ------------------------------------

// html content of the table cart
let htmlProductsTable = "";


// ---------------------------------------------------------------------------------------
// ------------------------------------ POPULATE HTML ------------------------------------

showCartProducts();

// Events

document.querySelectorAll("button.quantity").forEach((buttonAdd) =>
	buttonAdd.addEventListener("click", function () {
        
        // Find the product
		const idItem = this.parentElement.getAttribute("id").split("_")[1];
        let productChanged = findProductById(cartStorage, idItem);

        // Change quantity
		let newQty =
			this.getAttribute("aria-label") === "ajouter"
				? parseInt(productChanged.quantity) + 1
				: parseInt(productChanged.quantity) - 1;

		//Change in local Storage
		productChanged.quantity = Math.max(newQty, 1);
		addToLocalStorage();

		// Show new quantity
        const spanQty = document.querySelector(`#quantity_${idItem} span`);
		spanQty.textContent = productChanged.quantity;

		// Calcul the new total price
		let totalProduct = calcTotalproduct(productChanged);

		// Show new total of price
		const divTotalProd = document.querySelector(`#total-produit_${idItem}`);
		divTotalProd.textContent = euro.format(totalProduct);
	})
);
