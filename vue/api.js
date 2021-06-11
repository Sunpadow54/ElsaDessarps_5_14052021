// API 

// ------------------------------------ VARIABLE ------------------------------------

// All Api Urls

const urlApiFurniture = "http://localhost:3000/api/furniture";
const urlApiCameras = "http://localhost:3000/api/cameras";
const urlApiTeddies = "http://localhost:3000/api/teddies";


// ------------------------------------ FUNCTIONS ------------------------------------

// Function : fetch Api / return data

const getApiData = async apiUrl => {

    const response = await fetch(apiUrl);

    if (!response.ok) {
        let message = `Désolé, il est impossible d'accéder à l'API. ( erreur status: ${response.status} )`;
        throw new Error(message);
    }

    const data = await response.json();

    if (data === 0) {
        let message = `Désolé, il n'existe aucun produit de ce type ( erreur status: ${response.status} )`;
        throw new Error(message);
    }

    return data;
}


// Function : send data to API and get command number ...

const postApiData = async (apiUrl, contactForm, productsBought) => {

    const dataOrder = {
        contact: contactForm,
        products: productsBought,
    };

    const response = await fetch(apiUrl + '/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataOrder)
    });

    if (!response.ok) {
        let message = `Désolé, une erreur s'est produite. ( erreur status: ${response.status} )`;
        throw new Error(message);
    }

    const data = await response.json();

    if (data === 0) {
        let message = `Désolé, notre service de commande n'est pas disponible pour l'instant. ( erreur status: ${response.status} )`;
        throw new Error(message);
    }

    return data;
}
