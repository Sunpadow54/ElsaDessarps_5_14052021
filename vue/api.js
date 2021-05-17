// Api Url
const urlApiFurniture = "http://localhost:3000/api/furniture";
const urlApiCameras = "http://localhost:3000/api/cameras";
const urlApiTeddies = "http://localhost:3000/api/teddies";


// FUNCTION : fetch Api / return data
const fetchProduct = async apiUrl => {

	const response = await fetch(apiUrl);

	if (!response.ok) {
		let message = `Désolé, il est impossible d'accéder à l'API. ( erreur status: ${response.status} )`;
		throw new Error(message);
	}

	const data = await response.json();
console.log(data);
	if(data === 0) {
		message = `Désolé, il n'existe aucun produit de ce type ( erreur status: ${response.status} )`;
		throw new Error(message);
	}

  	return data;
}