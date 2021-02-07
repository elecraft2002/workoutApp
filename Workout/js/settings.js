//Login zobrazování okna, práce s cookies a nastavení aplikace
//Při načtení stránky
window.onload = function () {
    usporadani();
    zapnuti();
}

//Ukládaná data
var jmeno;
var prijmeni;
var pauza = Number;
var done = false;
var cookiesFormat = document.cookie;
function asign() {
    jmeno = document.getElementById("jmeno").value;
    prijmeni = document.getElementById("prijmeni").value;
    pauza = document.getElementById("pauza").value;
    if (isNaN(pauza) || pauza == "") {
        document.getElementById("sekundy").style.color = "var(--červená)";
    }
    else {
        document.getElementById("login").style.display = "none";
        document.getElementById("contentBlur").style.filter = null;
        document.getElementById("backgroundBlur").style.filter = null;
        save()
    }
}

//Uspořádá cookies pro lepší práci
function usporadani() {
    cookiesFormat = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
    console.log(cookiesFormat);
}

function save() {
    console.log("uloženo")
    document.cookie = "name=" + jmeno;
    document.cookie = "surname=" + prijmeni;
    document.cookie = "pauza=" + pauza;
    document.cookie = "done=" + true;
}

//První start
function zapnuti() {
    if(cookiesFormat.done == "true") {
        console.log("Už to není první zapnutí");
    }
    else{
        document.getElementById("login").style.display = "unset";
        document.getElementById("contentBlur").style.filter = "blur(3px)";
        document.getElementById("backgroundBlur").style.filter = "blur(3px)";
    }
}