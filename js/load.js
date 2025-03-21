fetch("/import/top.html")
.then(res => res.text())
.then(data => {
	document.getElementById('header').innerHTML += data;
});

fetch("/import/bottom.html")
.then(res => res.text())
.then(data => {
	document.getElementById('footer').innerHTML += data;
});