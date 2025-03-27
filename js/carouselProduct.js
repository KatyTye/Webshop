var itemClassName = "carousel__photo";
var items, totalItems
items = document.getElementsByClassName(itemClassName),
totalItems = items.length,
slide = 0,
moving = true;

document.addEventListener("DOMContentLoaded", (event) => {
    getItemPictures()
    
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

function moveNext(ImgKey) {

console.log("called! moveNext")
if (!moving) {

  if (slide === (totalItems - 1)) {

    slide = 0;
  } else {

    slide = ImgKey;

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