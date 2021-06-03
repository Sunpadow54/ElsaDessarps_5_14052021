// form order

// ------------------------------------ FUNCTIONS ------------------------------------


// Function : test regexs

const regexTesting = (thingToTest, regex) => {
    return regex.test(thingToTest);
}


// Function : show errors for inputs

function showErrorInput(input, message) {
    // insert error msg
    input.nextElementSibling.textContent = message;
    // add border warning + icon (bootstrapp)
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
}


// Function : show success for inputs

function showSuccesInput(input) {
    // remove error msg
    input.nextElementSibling.textContent = '';
    // add border valid + icon (bootstrapp)
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}


// Function : check if the form is valid (and leave msg for each bad input)

function checkInputValidity() {
    let formIsValid = true;

    // For all inputs of the contact form
    document.querySelectorAll('#form input').forEach(input => {


        // Input is filled
        if (input.value) {
            showSuccesInput(input);

            // test 'nom'
            if (input.id === 'last-name' && !regexTesting(input.value, regexNoNum)) {
                showErrorInput(input, "Cet pas bon");
                formIsValid = false;
            }

            // test 'prénom'
            if (input.id === 'first-name' && !regexTesting(input.value, regexNoNum)) {
                showErrorInput(input, "Cet pas bon");
                formIsValid = false;
        }

            // test 'email'
            if (input.id === 'email-adress' && !regexTesting(input.value, regexEmail)) {
                showErrorInput(input, "Cet email n'est pas valide");
                formIsValid = false;
            }

            // test 'adress'
            if (input.id === 'adress' && !regexTesting(input.value, regexNoSpecial)) {
                showErrorInput(input, "Cette adresse pas valide");
                formIsValid = false;
            }

            // test 'code postal'
            if (input.id === 'post-code' && !regexTesting(input.value, regexPostCodeFr)) {
                showErrorInput(input, "ce code postal n'est pas valide . exemple : 75001");
                formIsValid = false;
            }

        }

        // Input is empty
        if (!input.value) {
            showErrorInput(input, 'Veuillez remplir ce champ');
            formIsValid = false;
        }
    })

    return formIsValid;
}


// Function : to create an object of all contact infos

const getContactInfo = () => {
    const contact = {
        lastName: document.getElementById('last-name').value,
        firstName: document.getElementById('first-name').value,
        email: document.getElementById('email-adress').value,
        address: document.getElementById('adress').value,
        city: document.getElementById('post-code').value + ' ' + document.getElementById('city').value,
    }
    return contact
}

// Function : to create an array of all products id of the cart

let getProductsBought = () => {

    let productsWanted = [];
    for (productInCart of cartStorage) {
        productsWanted.push(productInCart._id);
    }
    return productsWanted;
}




// =======================================================================================
// ------------------------------------ VARIABLES ----------------------------------------

const productsOrder = [];


// Regexs for validate inputs

const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexPostCodeFr = /\b\d{5}\b/;
const regexNoNum = /^[A-z\u00C0-\u00FF -]+$/;
const regexNoSpecial = /^[\w\u00C0-\u00FF -]+$/;



// ------------------------------------ EVENTS ------------------------------------

// On submit 

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    checkInputValidity();

    // if form contact is ok and there is products in the cart => send to api
    if (checkInputValidity() && cartStorage.length !== 0) {
        postApiData(urlApiFurniture, getContactInfo(), getProductsBought())
            .then(res => {
                deleteLocalStorageItem('myCart');
                // add the response to localStorage
                sendToLocalStorage('successOrder', res);
                // redirection
                document.location.href='/public/page/commande.html?orderId=' + res.orderId;
            })
            .catch(error => console.log(error));
    } 
});
