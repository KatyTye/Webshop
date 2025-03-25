let kurv = localStorage.getItem("kurv")

if (kurv == null) {
	localStorage.setItem("kurv", "")
	kurv = localStorage.getItem("kurv")
}

function tilføjItem(itemId) {
	if (kurv=="") {
		localStorage.setItem("kurv", itemId)
        kurv = localStorage.getItem("kurv")
	} else {
        let beforeKurv = localStorage.getItem("kurv")
		localStorage.setItem("kurv", `${beforeKurv}-${itemId}`)
		kurv = localStorage.getItem("kurv")
	}
}

function fjernFraKurv(input) {
	let split = kurv.split("-")
	let nyKurv = ""

	if (kurv.includes("-")) {
		split.forEach(function (elm, idx) {
			if (idx!=input) {
				if (nyKurv=="") {
					nyKurv = elm
				} else {
					nyKurv += `-${elm}`
				}
			}
		})
	}

	localStorage.setItem("kurv", nyKurv)

	kurv = localStorage.getItem("kurv")

	location.href = "betal.html"
}

async function loadKurv() {
	let indholdElement = document.getElementById("items")
	let kanKøbe = true
	let totalpris = 0

	if (localStorage.getItem("kurv") != "") {
		let kurv = localStorage.getItem("kurv")
		if (localStorage.getItem("kurv").includes("-")) {
			const url = "/json/items.json";
			const response = await fetch(url);
			if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
			}
			const json = await response.json();
			
			let splittedKurv = kurv.split("-")

			splittedKurv.forEach(function (elm, idx) {
				let id = Number(elm) -1;
			
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
	
					imageElement.src = json[id].billdekilder
					titleElement.innerHTML = json[id].title
					stockElement.innerHTML = `<span class="stock-icon"></span>${json[id].stock} på lager`
					beskrivelseElement.innerHTML = json[id].beskrivelse
	
					if (json[id].rabat == 0) {
						prisElement.innerHTML = `<span class="span-rabat-one">${json[id].pris}.- DKK</span>`
						totalpris += json[id].pris
					} else {
						let rabatPris = (Number(json[id].pris) / 100)*json[id].rabat
						let pris = Math.round(Number(json[id].pris) - rabatPris)
						totalpris += pris
						prisElement.innerHTML = `<span class="span-rabat-one">${pris}.- DKK</span> <span class="span-rabat-two">${json[id].pris}.-</span> <span class="span-rabat-three">${json[id].rabat}% rabat</span>`
					}
					if (json[id].stock == 0) {
						let stockIconElement = document.querySelector(".template .stock .stock-icon")
						stockIconElement.style.backgroundColor = "red"
						kanKøbe = false
					}
	
					let momsElement = document.getElementById("moms")
					let finalElement = document.getElementById("finaloutput")
					totalpris = Math.round(totalpris + ((totalpris/100)*20))
	
					momsElement.innerHTML = `${Math.round(((totalpris/100)*20))}.- DKK moms`
					finalElement.innerHTML = `Total inkl. moms ${totalpris}.- DKK`

					templateElement.innerHTML += `<button onclick="fjernFraKurv(${idx})"></button>`
					
					document.querySelector(".template").classList.remove("template")
				});
			})
		} else {
			const url = "/json/items.json";
			const response = await fetch(url);
			if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
			}
			const json = await response.json();
			let id = Number(kurv) -1;
			
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

				imageElement.src = json[id].billdekilder
				titleElement.innerHTML = json[id].title
				stockElement.innerHTML = `<span class="stock-icon"></span>${json[id].stock} på lager`
				beskrivelseElement.innerHTML = json[id].beskrivelse

				if (json[id].rabat == 0) {
					prisElement.innerHTML = `<span class="span-rabat-one">${json[id].pris}.- DKK</span>`
					totalpris += json[id].pris
				} else {
					let rabatPris = (Number(json[id].pris) / 100)*json[id].rabat
					let pris = Math.round(Number(json[id].pris) - rabatPris)
					totalpris += pris
					prisElement.innerHTML = `<span class="span-rabat-one">${pris}.- DKK</span> <span class="span-rabat-two">${json[id].pris}.-</span> <span class="span-rabat-three">${json[id].rabat}% rabat</span>`
				}
				if (json[id].stock == 0) {
					let stockIconElement = document.querySelector(".template .stock .stock-icon")
					stockIconElement.style.backgroundColor = "red"
					kanKøbe = false
				}

				let momsElement = document.getElementById("moms")
				let finalElement = document.getElementById("finaloutput")
				totalpris = Math.round(totalpris + ((totalpris/100)*20))

				momsElement.innerHTML = `${Math.round(((totalpris/100)*20))}.- DKK moms`
				finalElement.innerHTML = `Total inkl. moms ${totalpris}.- DKK`

				templateElement.innerHTML += `<button onclick="fjernFraKurv(1)"></button>`
				
				document.querySelector(".template").classList.remove("template")
			});
		}
	}
}

if (location.pathname == "/betal.html") {
	loadKurv()
}