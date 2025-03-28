const params = new URLSearchParams(document.location.search)
const itemsDOM = document.getElementById("items-holder")
const forumDOM = document.getElementById("search-form")
const searchInput = params.get("search")

let udgiverSelected = []
let kategorierSelected = []
let farverSelected = []
let maxPris = 0

document.getElementById("pris").value = 50000

let udgiver = [
	"Samsung",
	"iPhone",
	"Philips",
	"ASUS",
	"Acer"
]

let kategorier = [
	"Tilbud",
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
					(letter.toLowerCase())
					document.getElementById(elm.toLowerCase()).checked = true
					udgiverSelected.push(elm.toLowerCase())
				}
			})
		} else {
			if (elm.toLowerCase() == searchInput.toLowerCase()) {
				document.getElementById(elm.toLowerCase()).checked = true
				udgiverSelected.push(elm.toLowerCase())
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
					(letter.toLowerCase())
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
					(letter.toLowerCase())
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

async function checkFilter(item) {
	const url = "/json/items.json";
	const response = await fetch(url);
	const json = await response.json();
	let returnValue = true

	udgiver.forEach(function (elm) {
		if (document.getElementById(elm.toLowerCase()).checked == true) {
			if (returnValue == true) {
				if (!item.title.toLowerCase().includes(elm.toLowerCase()) && !item.beskrivelse.toLowerCase().includes(elm.toLowerCase())) {
					returnValue = false
				}
			}
		}
	})

	kategorier.forEach(function (elm) {
		if (document.getElementById(elm.toLowerCase()).checked == true) {
			if (returnValue == true) {
				let kate = ""

				item.kategorier.forEach(function (element) {
					kate += `${element} `
				})

				if (!kate.toLowerCase().includes(elm.toLowerCase())) {
					returnValue = false
				}
			}
		}
	})

	farver.forEach(function (elm) {
		if (document.getElementById(elm.toLowerCase()).checked == true) {
			if (returnValue == true) {
				let kate = ""

				item.farver.forEach(function (element) {
					kate += `${element} `
				})

				if (!kate.toLowerCase().includes(elm.toLowerCase())) {
					returnValue = false
				}
			}
		}
	})

	return returnValue
}

function updateForumPrice(newPrice) {
	document.getElementById("price-output").innerHTML = `Pris (max ${newPrice},- dkk)`
}

//Works.. ?
async function search(input) {
	const url = "/json/items.json";
	const response = await fetch(url);
	const json = await response.json();

	document.getElementById("search-fail").style.display = "block"

	fetch('/json/items.json')
		.then(response => response.json())
		.then(data => {
			const featured = data;

			featured.forEach((item, index) => {
				if (location.href.includes("?search=") && searchInput != "") {
					if (item.title.toLowerCase().includes(input.toLowerCase()) || item.kategorier.toString().toLowerCase().includes(input.toLowerCase()) || item.farver.toString().toLowerCase().includes(input.toLowerCase()) || item.specs.toString().toLowerCase().includes(input.toLowerCase()) || input.toLowerCase() == "all") {
						fetch("/import/searchitem.html")
							.then(res => res.text())
							.then(data => {
								checkFilter(json[index]).then(function(result) {
									if (result == true) {
										let maxPrice = document.getElementById("pris").value

										if ((json[index].pris - ((json[index].pris / 100) * json[index].rabat)) <= Number(maxPrice)) {
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
												let rabatPrisElement = document.querySelector(".template .rabat-pris")
												rabatPrisElement.style.display = "block"
												rabatElement.style.display = "block"
												rabatElement.innerHTML = `${json[index].rabat}% rabat`
												rabatPrisElement.innerHTML = `${Math.round(json[index].pris - ((json[index].pris / 100) * json[index].rabat))},- DKK`
												prisElement.style.fontWeight = "normal"
												prisElement.style.fontStyle = "italic"
												prisElement.style.textDecoration = "line-through"
											}
		
											document.getElementById("search-fail").style.display = "none"
											document.querySelector(".template").classList.remove("template")
										}
									}
								})
							})
					}
				} else {
					fetch("/import/searchitem.html")
						.then(res => res.text())
						.then(data => {
							checkFilter(json[index]).then(function(result) {
								if (result == true) {
									let maxPrice = document.getElementById("pris").value

									if ((json[index].pris - ((json[index].pris / 100) * json[index].rabat)) <= Number(maxPrice)) {
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
											let rabatPrisElement = document.querySelector(".template .rabat-pris")
											rabatPrisElement.style.display = "block"
											rabatElement.style.display = "block"
											rabatElement.innerHTML = `${json[index].rabat}% rabat`
											rabatPrisElement.innerHTML = `${Math.round(json[index].pris - ((json[index].pris / 100) * json[index].rabat))},- DKK`
											prisElement.style.fontWeight = "normal"
											prisElement.style.fontStyle = "italic"
											prisElement.style.textDecoration = "line-through"
										}
			
										document.getElementById("search-fail").style.display = "none"
										document.querySelector(".template").classList.remove("template")
									}
								}
							})
					})
				}
			});

		})
}

forumDOM.addEventListener("submit", function (event) {
	event.preventDefault()
	document.querySelectorAll("#items-holder article").forEach(function (elm) {
		elm.remove()
	})

	setTimeout(function () {
		search("all")
	}, 1000)
})

document.querySelectorAll("main .search-form section label input").forEach(function (elm) {
	if (elm) {
		elm.addEventListener("change", function () {
			document.querySelectorAll("#items-holder article").forEach(function (elm) {
				elm.remove()
			})
		
			setTimeout(function () {
				search("all")
			}, 1000)
		})
	}
})

function itemClicked(element) {
	location.href = `produkt.html?show=${Number(element.id) + 1}`
}

search(searchInput)