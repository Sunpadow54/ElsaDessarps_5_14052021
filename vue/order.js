// form order

// ------------------------------------ FUNCTIONS ------------------------------------


// Function
let productsSelected = () => {

    for (productInCart of cartStorage) {
        let productRequest = {
            id: productInCart._id,
            quantity: productInCart.quantity,
            choice: productInCart.choice
        };
        productsOrder.push(productRequest);
    }
}


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


//Function : check if the form is valid (and leave msg for each bad input)

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



// =======================================================================================
// ------------------------------------ VARIABLES ----------------------------------------

const productsOrder = [];


// Regexs for validate inputs

const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexPostCodeFr = /\b\d{5}\b/;
const regexNoNum = /^[A-z\u00C0-\u00FF -]+$/;
const regexNoSpecial = /^[\w\u00C0-\u00FF -]+$/;



// ------------------------------------ EVENTS ------------------------------------

// On submit order

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    checkInputValidity();
});