    var itemClassName = "carousel__photo";
    var items, totalItems
    items = document.getElementsByClassName(itemClassName),
    totalItems = items.length,
    slide = 0,
    moving = true;

    document.addEventListener("DOMContentLoaded", (event) => {
        carouselItems()
      });

    function setInitialClasses() {

    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
  }

  function setEventListeners() {
    var next = document.getElementsByClassName('carousel__button--next')[0],
        prev = document.getElementsByClassName('carousel__button--prev')[0];
    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);
  }

  function moveNext() {

    console.log("called! moveNext")
    if (!moving) {

      if (slide === (totalItems - 1)) {

        slide = 0;
      } else {

        slide++;

      }

      moveCarouselTo(slide);
    }
  }

  function movePrev() {

    console.log("called! movePrev")
    if (!moving) {

      if (slide === 0) {
        slide = (totalItems - 1);
      } else {
        slide--;
      }
            
      moveCarouselTo(slide);
    }
  }

  function disableInteraction() {
    
    moving = true;

    setTimeout(function(){
      moving = false
    }, 500);
  }

  function moveCarouselTo(slide) {

    if(!moving) {
    //Vi disabler interactions når slideren bevæger sig
      disableInteraction();
      var newPrevious = slide - 1,
          newNext = slide + 1,
          oldPrevious = slide - 2,
          oldNext = slide + 2;
  
      if ((totalItems - 1) >= 3) {
        if (newPrevious <= 0) {
          oldPrevious = (totalItems - 1);
        } else if (newNext >= (totalItems - 1)){
          oldNext = 0;
        }
   
        if (slide === 0) {
          newPrevious = (totalItems - 1);
          oldPrevious = (totalItems - 2);
          oldNext = (slide + 1);
        } else if (slide === (totalItems -1)) {
          newPrevious = (slide - 1);
          newNext = 0;
          oldNext = 1;
        }

        items[oldPrevious].className = itemClassName;
        items[oldNext].className = itemClassName;

        items[newPrevious].className = itemClassName + " prev";
        items[slide].className = itemClassName + " active";
        items[newNext].className = itemClassName + " next";
      }
    }
  }

  function initCarousel() {
    items = document.getElementsByClassName(itemClassName);
    totalItems = items.length;
  
    if (totalItems < 3) {
      console.warn("Not enough items to initialize carousel.");
      return;
    }
  
    setInitialClasses();
    setEventListeners();
    moving = false;
  }

  function carouselItems() {
	fetch('/json/items.json')
  .then(response => response.json())
  .then(data => {
    const featured = data.filter(item => item.featured === true);

    
    featured.forEach((item, index) => {
      console.log(`ID: ${item.id}, featured is true, billeder: ${item.billdekilder}`);
	  if (document.getElementById("carousel").innerHTML.includes('<img') && index < 4)
	  {
		console.log("Not first img")
		document.getElementById("carousel").innerHTML += `<a href="produkt.html?show=${item.id}"><img class="carousel__photo" src="${item.billdekilder}"></a>`
	  } else if (index === 0) {
		console.log("First Img")
		document.getElementById("carousel").innerHTML += `<a href="produkt.html?show=${item.id}"><img class="carousel__photo initial" src="${item.billdekilder}"></a>`
	  }
    });
	document.getElementById("carousel").innerHTML += `<div class="carousel__button--next"></div> <div class="carousel__button--prev"></div>`
	initCarousel();
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });
  }

