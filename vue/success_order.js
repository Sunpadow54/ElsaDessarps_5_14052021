// Commande page

// ------------------------------------ FUNCTIONS ------------------------------------

// Function : populate commande page (nbr commande + list of products)

const showSuccessOrder = () => {

    // Show order nbr
    document.querySelector('#commande > p').textContent = 'N° de commande : ' + successOrder.orderId;

    // show list of products bought
    for (let productBought of successOrder.products) {
        document.querySelector('#commande > ul').innerHTML +=
            `
            <li class="list-group-item">
                <div class="row">
                    <div class="col-4">
                        <img class="w-100" src="${productBought.imageUrl}" alt="Orinoco_${productBought.name}" height="62" width="83">
                    </div>
                    <div class="col-8 d-flex align-items-center">
                            <h3 class="card-title h6 fw-light m-0 flex-grow-1">${productBought.name}</h5>
                            <a href="/public/page/produit.html?id=${productBought._id}" class="btn btn-sm btn-outline-dark fw-light text-nowrap">voir le produit</a>
                    </div>
                </div>
            </li>
        `;
    };
};


// =======================================================================================

// ------------------------------------ VARIABLES ----------------------------------------

const successOrder = JSON.parse(localStorage.getItem('successOrder'));


// ---------------------------------------------------------------------------------------
// ------------------------------------ POPULATE HTML ------------------------------------

// If there is no order, user is redirected to index.html 
//(can't access to commande.html page if there is no successfull order)

if (!successOrder) {
    document.location.href = '/index.html';
}

// If there is an order 

if (successOrder) {
    showSuccessOrder();
}

