fetch("/import/nav.html")
.then(res => res.text())
.then(data => {
	document.getElementById('header').innerHTML += data;
});

fetch("/import/footer.html")
.then(res => res.text())
.then(data => {
	document.getElementById('footer').innerHTML += data;
});