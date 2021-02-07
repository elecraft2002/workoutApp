var seznamTrigger = true;

var x = window.matchMedia("(max-width: 920px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").classList.add("opened");
  document.getElementById("content").style.display = "block";
}
/* Set the width of the side navigation to 0 */
function closeNav() {
  if (x.matches) {
    document.getElementById("mySidenav").classList.remove("opened");
    document.getElementById("content").style.display = "none";
  }
}

let test = true;

window.onscroll = function () {
  posun()
};
var navigace = document.getElementById("menu");
var distance = document.getElementById("header").offsetHeight;
var seznam = document.getElementById("seznam");
function posun() {
  if (window.pageYOffset > distance) {
    navigace.classList.add("scrolled");
    document.getElementById("nadpis").style.color = "var(--cerna)";
    document.getElementById("icon-menu").style.color = "var(--cerna)";
    if(seznamTrigger){
      seznam.classList.add("color")
    }
  }
  else {
    navigace.classList.remove("scrolled")
    document.getElementById("nadpis").style.color = "var(--bila)";
    document.getElementById("icon-menu").style.color = "var(--bila)";
    if(seznamTrigger) {
      seznam.classList.remove("color")
    }
  }
}

function myFunction(x) {
  if (x.matches) { // If media query matches
    console.log("920-");
    seznamTrigger = false;
  } else {
    console.log("920+");
    seznamTrigger = true;
    document.getElementById("mySidenav").classList.remove("opened");
  }
}