let productLoad = document.getElementById("produkt-indhold")
let productImgLoad = document.getElementById("imageShowcase")
let productName = document.getElementById("product-navn")
let productSpecs = document.getElementById("product-specification")
let productPrice = document.getElementById("pris-product")
let productImage = document.getElementById("product-image")
let productBeskrivelse = document.getElementById("beskrivelse")
let productKategorier = document.getElementById("kategorier")


document.addEventListener("DOMContentLoaded", (event) => {
	let params = new URLSearchParams(document.location.search);
	if (params) {
		getItems(params);
	}
  });

async function getItems(params) {
	const url = "/json/items.json";
	loading = true;
	load = 0
	try {
	  const response = await fetch(url);
	  if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	  }
	  const json = await response.json();
	  let id = Number(params.get("show")) -1;
	  console.log(id)

	  productName.innerHTML = json[id].title
	  productSpecs.innerHTML = json[id].specs
	  productImage.innerHTML += `<img src="${json[id].billdekilder[0]}">`
	  productPrice.innerHTML = `${json[id].pris},- dkk`
	  productBeskrivelse.innerHTML = json[id].beskrivelse

	  json[id].kategorier.forEach(function (elm, idx) {
		productKategorier.innerHTML += `<li><a href="search.html?search=${elm}">${elm}</a></li>`
	  })

	//   productLoad.innerHTML += `<p>${json[id].stock} på lager</p>`

	//   productLoad.innerHTML += `<p>${json[id].beskrivelse}</p>`

	//   productImgLoad.innerHTML += `<img src="${json[id].billdekilder}">`

      productLoad.innerHTML += `<button onclick="tilføjItem(${id+1})">Læg i indkøbsvogn</button>`
	  
	} catch (error) {
	  console.error(error.message);
	}
  }
  