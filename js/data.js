const momsElement = document.getElementById("moms")
const finalElement = document.getElementById("finaloutput")
let kurv = localStorage.getItem("kurv")
let cooldown = false

if (kurv == null) {
	localStorage.setItem("kurv", "")
	kurv = localStorage.getItem("kurv")
}

async function tilføjItem(itemId) {
	const url = "/json/items.json";
	const response = await fetch(url);
	const json = await response.json();

	if (json[itemId - 1].stock > 0) {
		if (kurv == "") {
			localStorage.setItem("kurv", itemId)
			kurv = localStorage.getItem("kurv")
		} else {
			let beforeKurv = localStorage.getItem("kurv")
			localStorage.setItem("kurv", `${beforeKurv}-${itemId}`)
			kurv = localStorage.getItem("kurv")
		}
		location.href = "#header"
	}
}

function fjernFraKurv(input, amount) {
	cooldown = true
	let split = kurv.split("-")
	let totalpris = 0
	let nyKurv = ""
	if (kurv.includes("-")) {
		split.forEach(function (elm, idx) {
			if (idx != input) {
				if (nyKurv == "") {
					nyKurv = elm
				} else {
					nyKurv += `-${elm}`
				}
			}
		})
	}

	localStorage.setItem("kurv", nyKurv)

	kurv = localStorage.getItem("kurv")

	localStorage.setItem("pris", (Number(localStorage.getItem("pris")) - amount))

	momsElement.innerHTML = `${Math.round(((Number(localStorage.getItem("pris")) / 100) * 20))}.- DKK moms`

	totalpris += Math.round(Number(localStorage.getItem("pris")) + Math.round(((Number(localStorage.getItem("pris")) / 100) * 20)))

	finalElement.innerHTML = `Total inkl. moms ${totalpris}.- DKK`

	let deleteElement = document.querySelectorAll(`#items article`)
	
	deleteElement.forEach(function (elm) {
		elm.remove()
	})

	updateCart()
	loadKurv()
}

function updatePrice() {
	let totalpris = 0
	if (localStorage.getItem("kurv").includes("-")) {
		setTimeout(function () {
			momsElement.innerHTML = `${Math.round(((Number(localStorage.getItem("pris")) / 100) * 20))}.- DKK moms`

			totalpris += Math.round(Number(localStorage.getItem("pris")) + Math.round(((Number(localStorage.getItem("pris")) / 100) * 20)))
			finalElement.innerHTML = `Total inkl. moms ${totalpris}.- DKK`
		}, 100 * Number(localStorage.getItem("kurv").split("-").length))
	} else {
		setTimeout(function () {
			momsElement.innerHTML = `${Math.round(((Number(localStorage.getItem("pris")) / 100) * 20))}.- DKK moms`

			totalpris += Math.round(Number(localStorage.getItem("pris")) + Math.round(((Number(localStorage.getItem("pris")) / 100) * 20)))
			finalElement.innerHTML = `Total inkl. moms ${totalpris}.- DKK`
		}, 100)
	}
}

async function loadKurv() {
	let indholdElement = document.getElementById("items")
	localStorage.setItem("pris", 0)

	if (localStorage.getItem("kurv") != "") {
		let kurv = localStorage.getItem("kurv")

		if (localStorage.getItem("kurv").includes("-")) {
			const url = "/json/items.json";
			const response = await fetch(url);
			localStorage.setItem("pris", 0)
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			const json = await response.json();

			let splittedKurv = kurv.split("-")

			splittedKurv.forEach(function (elm, idx) {
				let id = Number(elm) - 1;

				updatePrice()

				fetch("/import/kurvitem.html")
					.then(res => res.text())
					.then(data => {
						indholdElement.innerHTML += data

						let imageElement = document.querySelector(".template .produkt-image")
						let titleElement = document.querySelector(".template .title")
						let prisElement = document.querySelector(".template .pris")
						let stockElement = document.querySelector(".template .stock")
						let beskrivelseElement = document.querySelector(".template .beskrivelse")
						let templateElement = document.querySelector(".template")

						imageElement.src = json[id].billdekilder[0]
						titleElement.innerHTML = `<a href="produkt.html?show=${id + 1}" target="_blank">${json[id].title}</a>`
						stockElement.innerHTML = `<span class="stock-icon"></span>${json[id].stock} på lager`
						beskrivelseElement.innerHTML = json[id].beskrivelse

						let productPrice = 0

						if (json[id].rabat == 0) {
							prisElement.innerHTML = `<span class="span-rabat-one">${json[id].pris}.- DKK</span>`
							productPrice = json[id].pris
						} else {
							let rabatPris = (Number(json[id].pris) / 100) * json[id].rabat
							let pris = Math.round(Number(json[id].pris) - rabatPris)
							productPrice = pris
							prisElement.innerHTML = `<span class="span-rabat-one">${pris}.- DKK</span> <span class="span-rabat-two">${json[id].pris}.-</span> <span class="span-rabat-three">${json[id].rabat}% rabat</span>`
						}
						if (json[id].stock == 0) {
							let stockIconElement = document.querySelector(".template .stock .stock-icon")
							stockIconElement.style.backgroundColor = "red"
							kanKøbe = false
						}

						localStorage.setItem("pris", (Number(localStorage.getItem("pris")) + productPrice))

						templateElement.innerHTML += `<button onclick="fjernFraKurv(${idx}, ${productPrice})"></button>`

						document.querySelector(".template").id = `item-${idx}`
						document.querySelector(".template").classList.remove("template")
						updatePrice()
					});

					updatePrice()
			})
		} else {
			const url = "/json/items.json";
			const response = await fetch(url);
			let totalpris = 0
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			const json = await response.json();
			let id = Number(kurv) - 1;

			fetch("/import/kurvitem.html")
				.then(res => res.text())
				.then(data => {
					indholdElement.innerHTML += data

					let imageElement = document.querySelector(".template .produkt-image")
					let titleElement = document.querySelector(".template .title")
					let prisElement = document.querySelector(".template .pris")
					let stockElement = document.querySelector(".template .stock")
					let beskrivelseElement = document.querySelector(".template .beskrivelse")
					let templateElement = document.querySelector(".template")

					imageElement.src = json[id].billdekilder[0]
					titleElement.innerHTML = `<a href="produkt.html?show=${id + 1}" target="_blank">${json[id].title}</a>`
					stockElement.innerHTML = `<span class="stock-icon"></span>${json[id].stock} på lager`
					beskrivelseElement.innerHTML = json[id].beskrivelse

					let productPrice = 0

					if (json[id].rabat == 0) {
						prisElement.innerHTML = `<span class="span-rabat-one">${json[id].pris}.- DKK</span>`
						productPrice = json[id].pris
					} else {
						let rabatPris = (Number(json[id].pris) / 100) * json[id].rabat
						let pris = Math.round(Number(json[id].pris) - rabatPris)
						productPrice = pris
						prisElement.innerHTML = `<span class="span-rabat-one">${pris}.- DKK</span> <span class="span-rabat-two">${json[id].pris}.-</span> <span class="span-rabat-three">${json[id].rabat}% rabat</span>`
					}
					if (json[id].stock == 0) {
						let stockIconElement = document.querySelector(".template .stock .stock-icon")
						stockIconElement.style.backgroundColor = "red"
						kanKøbe = false
					}

					localStorage.setItem("pris", (Number(localStorage.getItem("pris")) + productPrice))

					templateElement.innerHTML += `<button onclick="fjernFraKurv(1, ${productPrice})"></button>`

					document.querySelector(".template").id = `item-1`
					document.querySelector(".template").classList.remove("template")
					updatePrice()
				});
		}

		updatePrice()
	}
}

if (location.pathname == "/betal.html") {
	loadKurv()
}

