const params = new URLSearchParams(document.location.search)
const itemsDOM = document.getElementById("items-holder")
const forumDOM = document.getElementById("search-form")
const searchInput = params.get("search")

let udgiver = [
	"Samsung",
	"iPhone",
	"Philips",
	"ASUS",
	"Acer"
]

let kategorier = [
	"Gaming",
	"Grafikkort",
	"Telefon",
	"PC",
	"Bærbar",
	"Office",
	"Pleje",
	"Trimmer",
	"TV",
	"Oplader",
	"Ledning"
]

let farver = [
	"Sort",
	"Hvid",
	"Grøn"
]

udgiver.forEach(function (elm) {
	if (!Number(searchInput) && searchInput) {
		if (searchInput.includes(" ")) {
			let newSearchInput = searchInput.split(" ")
	
			newSearchInput.forEach(function (letter) {
				if (letter.toLowerCase() == elm.toLowerCase()) {
					console.log(letter.toLowerCase())
					document.getElementById(elm.toLowerCase()).checked = true
				}
			})
		} else {
			if (elm.toLowerCase() == searchInput.toLowerCase()) {
				document.getElementById(elm.toLowerCase()).checked = true
			}
		}
	}
})

kategorier.forEach(function (elm) {
	if (!Number(searchInput) && searchInput) {
		if (searchInput.includes(" ")) {
			let newSearchInput = searchInput.split(" ")
	
			newSearchInput.forEach(function (letter) {
				if (letter.toLowerCase() == elm.toLowerCase()) {
					console.log(letter.toLowerCase())
					document.getElementById(elm.toLowerCase()).checked = true
				}
			})
		} else {
			if (elm.toLowerCase() == searchInput.toLowerCase()) {
				document.getElementById(elm.toLowerCase()).checked = true
			}
		}
	}
})

farver.forEach(function (elm) {
	if (!Number(searchInput) && searchInput) {
		if (searchInput.includes(" ")) {
			let newSearchInput = searchInput.split(" ")
	
			newSearchInput.forEach(function (letter) {
				if (letter.toLowerCase() == elm.toLowerCase()) {
					console.log(letter.toLowerCase())
					document.getElementById(elm.toLowerCase()).checked = true
				}
			})
		} else {
			if (elm.toLowerCase() == searchInput.toLowerCase()) {
				document.getElementById(elm.toLowerCase()).checked = true
			}
		}
	}
})

//Works.. ?
async function search(input) {
	const url = "/json/items.json";
	const response = await fetch(url);
	const json = await response.json();

	fetch('/json/items.json')
	.then(response => response.json())
	.then(data => {
	  const featured = data;

	  featured.forEach((item, index) => {
		if (item.title.toLowerCase().includes(input.toLowerCase()) || item.kategorier.toString().toLowerCase().includes(input.toLowerCase()) || item.farver.toString().toLowerCase().includes(input.toLowerCase()) || item.specs.toString().toLowerCase().includes(input.toLowerCase()) || input.toLowerCase() == "all") {
			
			fetch("/import/searchitem.html")
			.then(res => res.text())
			.then(data => {
				itemsDOM.innerHTML += data

				let templateElement = document.querySelector(".template")
				let imageElement = document.querySelector(".template .img figure img")
				let titleElement = document.querySelector(".template .indhold h3")
				let desElement = document.querySelector(".template .indhold p")
				let prisElement = document.querySelector(".template .section-pris .pris")
				let rabatElement = document.querySelector(".template .rabat")

				templateElement.id = index

				imageElement.src = json[index].billdekilder[0]
				titleElement.innerHTML = json[index].title
				desElement.innerHTML = json[index].beskrivelse
				prisElement.innerHTML = json[index].pris + ",- DKK"

				if (json[index].rabat > 0) {
					rabatElement.style.display = "block"
					rabatElement.innerHTML = `${json[index].rabat}% rabat`
				}
				
				document.querySelector(".template").classList.remove("template")
			})
		}
	  });
  
	})
}

function itemClicked(element) {
	location.href = `produkt.html?show=${Number(element.id) + 1}`
}

search(searchInput)