let productLoad = document.getElementById("produkt-indhold")
let productImgLoad = document.getElementById("imageShowcase")
let productName = document.getElementById("product-navn")
let productSpecs = document.getElementById("product-specification")
let productSpecsREAL = document.getElementById("specs-produkt")
let productPrice = document.getElementById("pris-product")
let productImage = document.getElementById("product-image")
let productKategorier = document.getElementById("kategorier")
let farveKategorier = document.getElementById("farver-produkt")
let productStock = document.getElementById("lager-produkt");
let productBeskrivelse;
let currentBeskrivelseHTML = "";

document.addEventListener("DOMContentLoaded", (event) => {
	updateBeskrivelseElement()
	setTimeout(() => {
		params = new URLSearchParams(document.location.search);
		if (params) {
			getItems(params);
		}
	}, 1);
});

let previousBeskrivelseElement = null;

function updateBeskrivelseElement() {
	const oldElement = productBeskrivelse;

	if (window.innerWidth < 1200) {
		productBeskrivelse = document.getElementById("beskrivelseMini");
	} else {
		productBeskrivelse = document.getElementById("beskrivelse");
	}

	
	if (oldElement && oldElement !== productBeskrivelse) {
		oldElement.innerHTML = "";
	}

	
	if (productBeskrivelse && currentBeskrivelseHTML) {
		productBeskrivelse.innerHTML = currentBeskrivelseHTML;
	}

}

window.addEventListener("resize", updateBeskrivelseElement);

async function getItems(params) {
	const url = "/json/items.json";
	loading = true;
	load = 0;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		let id = Number(params.get("show")) - 1;

		productName.innerHTML = json[id].title;
		productImage.innerHTML += `<img src="${json[id].billdekilder[0]}">`;
		currentBeskrivelseHTML = `<h4>Beskrivelse</h4>${json[id].beskrivelse}`;
		productBeskrivelse.innerHTML = currentBeskrivelseHTML;

		if (json[id].rabat > 0) {
			productPrice.style.display = "flex";
			productPrice.style.justifyContent = "space-between";
			productPrice.innerHTML = `<span>${Math.round(json[id].pris - ((json[id].pris/100)*json[id].rabat))},- DKK</span><span><span>${json[id].pris},-</span> ${json[id].rabat}% rabat</span>`;
		} else {
			productPrice.innerHTML = `${json[id].pris},- dkk`;
		}

		json[id].farver.forEach(function (elm) {
			farveKategorier.innerHTML += `<li><a href="search.html?search=${elm}">${elm}</a></li>`;
		});

		json[id].kategorier.forEach(function (elm) {
			productKategorier.innerHTML += `<li><a href="search.html?search=${elm}">${elm}</a></li>`;
		});

		json[id].specs.forEach(function (elm) {
			productSpecsREAL.innerHTML += `<li><a href="search.html?search=${elm}">${elm}</a></li>`;
		});

		if (json[id].stock > 0) {
			productStock.innerHTML = `<span></span> ${json[id].stock} på lager`
			productLoad.innerHTML += `<button onclick="tilføjItem(${id + 1}); updateCart();">Læg i indkøbsvogn</button>`;
		} else {
			productStock.innerHTML = `<span style="background-color: red;"></span> ${json[id].stock} på lager`
			productLoad.innerHTML += `<button onclick="tilføjItem(${id + 1}); updateCart();" class="noStockButton" disabled>Læg i indkøbsvogn</button>`;
		}

	} catch (error) {
		console.error(error.message);
	}
}


function carouselItems() {
	fetch('/json/items.json')
  .then(response => response.json())
  .then(data => {
    const featured = data.filter(item => item.featured === true);

    
    featured.forEach((item, index) => {
      (`ID: ${item.id}, featured is true, billeder: ${item.billdekilder}`);
		if (item.beskrivelse.includes) {
			
		}
    });

  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });
  }

  function getItemPictures() {
	let params = new URLSearchParams(document.location.search);
	let show = parseInt(params.get("show"));
	(show);
  
	fetch('/json/items.json')
	  .then(response => response.json())
	  .then(data => {
		const itemPicture = data.find(item => item.id === show);
  
		if (!itemPicture) {
		  console.error("Item not found");
		  return;
		}
  
		const imageContainer = document.getElementById("product-image");
		imageContainer.innerHTML = ""; 
  
		itemPicture.billdekilder.forEach((imageUrl, index) => {
		  const imgClass = index === 0 ? "carousel__photo initial" : "carousel__photo";
		  imageContainer.innerHTML += `
			<a href="produkt.html?show=${itemPicture.id}">
			  <img class="${imgClass}" src="${imageUrl}">
			</a>`;
		});
  
		imageContainer.innerHTML += `
		  <div class="carousel__button--next"></div>
		  <div class="carousel__button--prev"></div>`;
  
		initCarousel();
	  });
  }
  