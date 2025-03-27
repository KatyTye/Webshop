fetch("/import/nav.html")
.then(res => res.text())
.then(data => {
	document.getElementById('header').innerHTML += data;
	updateCart();
});

fetch("/import/footer.html")
.then(res => res.text())
.then(data => {
	document.getElementById('footer').innerHTML += data;
});

function updateCart() {
	let cart = document.getElementById("cart-amount");
	let cartStore
if (localStorage.getItem("kurv").includes("-")) {
	cartStore = localStorage.getItem("kurv").split("-");
} else {
	cartStore = localStorage.getItem("kurv");
}
if (cartStore.length!=0) {
	cart.style.display = "block"
	cart.innerHTML = cartStore.length;
} else {
	cart.style.display = "none"
}
}