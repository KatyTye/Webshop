function changePage(page) {
	location.href = page
}

// Burger menu
function burger() {
	let burgerMenuDom = document.getElementById("burger");
	burgerMenuDom.classList.toggle("show-on-mobile")
	burgerMenuDom.classList.toggle("hidden");
}