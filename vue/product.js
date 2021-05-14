// convert number into euro format
const euro = new Intl.NumberFormat('fr-FR', {
	style: 'currency',
	currency: 'EUR',
	minimumFractionDigits: 2
});

// API url
const urlApiFurniture = "http://localhost:3000/api/furniture";
const urlApiCameras = "http://localhost:3000/api/cameras";
const urlApiTeddies = "http://localhost:3000/api/teddies";

// Get parameter
let urlParameters = (new URL(document.location)).searchParams;
let idProduct = urlParameters.get('id');

// Variables for Product page
const productImage = document.querySelector('#product img');
const productTitle = document.querySelector('#product .card-title');
const productDescription = document.querySelector('#product p.card-text');
const productPrice = document.querySelector('#product span.card-text');

//Product Solo
// SEARCH DATA of the API
fetch(urlApiFurniture)

	// first promise (get json to convert)
	.then(apiResponse => {
		// test if request is ok 
		if (apiResponse.ok) {
			// convert json
			return apiResponse.json();

		} else {
			// if error
            throw "impossible d'accéder à l'API. erreur status:" + apiResponse.status;
		}
	})

	.then(dataApiProducts => {
		const product = dataApiProducts.find( product => product._id === idProduct);
		
		productImage.src = product.imageUrl;
		productTitle.textContent = product.name;
		productDescription.textContent = product.description;
		productPrice.textContent = euro.format(product.price);

	})

	//catch error (! need to be modified)
	.catch(error => {
		console.log(error);
	});