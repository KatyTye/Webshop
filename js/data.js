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