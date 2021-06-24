// SOLO PRODUCT

// ------------------------------------ FUNCTIONS ------------------------------------

// Function : show product in Html

const showOneProduct = (productToShow) => {

    let productImage = document.querySelector('#product-info img');
    // insert data of the product inside html
    productImage.src = productToShow.imageUrl;
    productImage.alt = "Orinoco_" + productToShow.name;
    document.querySelector('#product_name').textContent = productToShow.name;
    document.querySelector('#product_text').textContent = productToShow.description;
    document.querySelector('#product_price').textContent = euro.format(productToShow.price);

    // show varnish possible selection as radio inputs
    let productChoice = productToShow.varnish;
    for (let i in productChoice) {
        document.querySelector('#product_choice').innerHTML +=
            `
                <li class="col-6 col-sm-2">
                    <div class="border mb-1 varnish-color">
                        <input type="radio" id="vernis_${i}" class="position-relative w-100 h-100 d-block" name="varnish" value="${productChoice[i]}">
                    </div>
                    <label for="vernis_${i}" class="fw-light">${productChoice[i]}</label>
                </li>
            `;
    }

    // give first choice checked attribute (default)
    document.querySelector('input[name="varnish"]').checked = true;
    // outline color the checked choice
    checkedVarnishStyle();
    // color the div
    showColorVarnish();
}


// Function : add data to "product"

let populateProductObj = (productInfo) => {
    thisProduct = {
        _id: productInfo._id,
        name: productInfo.name,
        imageUrl: productInfo.imageUrl,
        price: productInfo.price,
        choice: choiceSelected(),
        quantity: 1,
    }
}


// Function : find the choice that the user has choosen.

let choiceSelected = () => {
    let allVarnish = document.querySelectorAll('input[name="varnish"]');
    for (let i in allVarnish) {
        if (allVarnish[i].checked) {
            return allVarnish[i].value;
        }
    }
}


// Function : show which choice (varnish) is selected (=> outline)

let checkedVarnishStyle = () => {
    document.querySelectorAll('input[name="varnish"]').forEach(input => {
        if (input.checked) {
            input.parentNode.style.outline = '3px solid var(--color-brand-second)';
        } else {
            input.parentNode.style.outline = 'none';
        }
    })
}


// Function : send to 'myCart' in LocalStorage 

const addToCart = () => {
    // if cartStorage key is null initialise 'cartStorage as array 
    if (!localStorage.myCart) {
        cartStorage = [];
    }

    // if the product is not already in the localStorage 'cartStorage' add the product in localStorage
    if (!findProductById(cartStorage, idProduct)) {
        // Add product to array cartStorage
        cartStorage.push(thisProduct);
        // push the array to LocalStorage on 'cartStorage' key
        sendToLocalStorage('myCart', cartStorage);
        // Show new number of products in cart
        showCountCart();
    }
}


// =======================================================================================

// ------------------------------------ VARIABLES ------------------------------------

// Get id_product from url
const urlParameters = (new URL(document.location)).searchParams;
// id of the product
const idProduct = urlParameters.get('id');

// product to insert in LocalStorage
let thisProduct;


// ---------------------------------------------------------------------------------------
// ------------------------------------ POPULATE HTML ------------------------------------

/* 
// After sucessfully Fetch from Api :
    // Find the product 
    // Show the product / Add data of the product in variable thisProduct / Event on selected choice
*/

getApiData(urlApiFurniture + '/' + [idProduct])
    .then(product => {
        showOneProduct(product);
        populateProductObj(product);
        document.querySelectorAll('input[name="varnish"]').forEach(function (varnishBtn) {
            varnishBtn.addEventListener('change', checkedVarnishStyle)
        });
    })


// ---------------------------------------------------------------------------------------
// ------------------------------------ EVENTS -------------------------------------------

document.getElementById('add-cart').addEventListener('click', function () {
    // if localStorage contain the product
    if (cartStorage !== null && findProductById(cartStorage, idProduct)) {
        createPopup(this, 'alreadyIn');
    }
    else {
        thisProduct.choice = choiceSelected();
        addToCart();
        createPopup(this, 'successAddCart');
    }
})
