//Nastaveni
let obtiznost = 5;
const pauza = 5;
//Aktuální cviky v pořadí jak jsou za sebou
let cislo = 0;

let vyber = kombinace[cislo];

// Knihovna cviků
const cviky = [
  { name: 'Klik', pocet: 20, cas: 0, url: "./img/abs.jpg" },
  { name: 'Sedleh', pocet: 32, cas: 0, url: "./img/sedleh.gif" },
  { name: 'Angličák', pocet: 0, cas: 30, url: "./img/abs.jpg" },
  { name: 'Russian Twist', pocet: 0, cas: 25, url: "./img/abs.jpg" }
];
//Vyhledávání v cvikách
let rozrazeni = cviky.find(({ name }) => name === vyber);
function vysledek() {
  vyber = kombinace[cislo];
  rozrazeni = cviky.find(({ name }) => name === vyber);
}

//Uschovani aktualnich dat
let nadpis = rozrazeni.name;
let pocet = rozrazeni.pocet;
let cas = rozrazeni.cas;
let url = rozrazeni.url;

function pricitani() {
  cislo += 1;
  vysledek();
  umisteni();
  //prvky.name === vyber;
  //hledani(prvky);
  //rozrazeni = cviky.find(hledani);
  nadpis = rozrazeni.name;
  pocet = rozrazeni.pocet;
  cas = rozrazeni.cas;
  url = rozrazeni.url;
  console.log(kombinace[cislo]);
  console.log(rozrazeni);
}

let cvikNadpis = "uvodCvik";

function run() {
  document.getElementById(cvikNadpis).innerHTML = nadpis;
  document.getElementById("predcviceni").src = url;
  if (pocet > 0) {
    document.getElementById("pocet").innerHTML = pocet;
    document.getElementById("dalsiOpakovani").innerHTML = pocet;
    document.getElementById("cas").innerHTML = null;
    document.getElementById("dalsiCas").innerHTML = null;
    document.getElementById("casCviceni").innerHTML = null;
    document.getElementById("buttonStart1").innerHTML = "HOTOVO";
    document.getElementById("buttonStart2").style.display = "block";
  }
  else {
    document.getElementById("casCviceni").innerHTML = cas;
    document.getElementById("dalsiCas").innerHTML = cas + "s";
    document.getElementById("pocet").innerHTML = null;
    document.getElementById("dalsiOpakovani").innerHTML = null;
    document.getElementById("buttonStart1").innerHTML = null;
    document.getElementById("buttonStart2").style.display = "none";
    timeObj = cas;
    cekani = cas;
    console.log(cas);
    //casP = "casCviceni";
    if (cviceniFaze) {
      prepsaniCasu();
      timer.start();
    }
  }
}

//Start stopek
var odpocet = false;
var cekani = pauza;
var idSelector = "cas";
//Začít trénink
function zacatek() {
  cekani = pauza;
  prepsaniCasu();
  startTimer();
  run();
  document.getElementById("uvodUrl").src = url;
  console.log("Cvičení začíná");
  odpocetFaze = true;
  document.getElementById("uvod").style.display = "none";
  document.getElementById("pripravit").style.display = "unset";
}
//Přeskočení odpočtu a nebo samovolné přeskočení
function skip() {
  nadpis = rozrazeni.name;
  document.getElementById("dalsiCvik").innerHTML = nadpis;
  document.getElementById("pripravit").style.display = "none";
  document.getElementById("pauza").style.display = "none";
  document.getElementById("cviceni").style.display = "unset";
  if (odpocetFaze) {
    odpocetFaze = false;
    cviceniFaze = true;
  }
}

//Přechod do čekacího odpočinku
function odpocinek() {
  nadpis = rozrazeni.name;
  document.getElementById("dalsiCvik").innerHTML = nadpis;
  document.getElementById("pripravit").style.display = "none";
  document.getElementById("pauza").style.display = "unset";
  document.getElementById("cviceni").style.display = "none";
  console.log("funguje to")
  if (cviceniFaze) {
    odpocetFaze = true;
    cviceniFaze = false;
  }
}

//Rozlišení kde se nacházíme, různé fáze...
var uvodFaze = true;
var odpocetFaze = true;
var cviceniFaze = false;
//Konec cviceni, když je hotové opakování

function konec() {
  pricitani();
  casP = "casOdpocinek";
  prepsaniCasu();
  console.log("konec");
  if (pocet > 0) {
    document.getElementById("dalsiOpakovani").innerHTML = pocet;
    document.getElementById("dalsiCas").innerHTML = null;
  }
  else {
    document.getElementById("dalsiOpakovani").innerHTML = cas + "s";
    document.getElementById("dalsiCas").innerHTML = null;
  }
  document.getElementById("pripravit").style.display = "none";
  document.getElementById("pauza").style.display = "unset";
  document.getElementById("cviceni").style.display = "none";
  timer.start();
  odpocetFaze = true;
  cviceniFaze = false;
  document.getElementById("dalsiCvik").innerHTML = nadpis;
  document.getElementById("pauzaUrl").src = url;
}

//Ovládání stopek
var timer;
var casP = "cas";

window.onload = function prepsani() {
  //prepsaniCasu();
  run();
  //loadingBar();
}
function prepsaniCasu() {
  var display = document.getElementById(casP);
  timer = new CountDownTimer(cekani);
  var timeObj = CountDownTimer.parse(cekani);

  format(timeObj.minutes, timeObj.seconds);

  timer.onTick(format);

  function format(minutes, seconds) {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ':' + seconds;
  };
};

//Stop
function next() {
  diff = 0;
  that.running = false;
  console.log("negr")
}
var that = true;
//Stopky funkce
function CountDownTimer(duration, granularity) {
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
}

CountDownTimer.prototype.start = function () {
  if (this.running) {
    return;
  }
  this.running = true;
  var start = Date.now(),
    that = this,
    diff, obj;

  (function timer() {
    diff = that.duration - (((Date.now() - start) / 1000) | 0);

    if (diff > 0) {
      setTimeout(timer, that.granularity);
      if (uvodFaze) {
        loadingBar();
        console.log(diff);
      }
    } else {
      if (odpocetFaze) {//Pozná o jakou fázi se jedná
        document.getElementById(cvikNadpis).innerHTML = nadpis;
        casP = "casCviceni";
        cvikNadpis = "cvik";
        skip();
        run();
      }
      else {
        pricitani();
        cvikNadpis = "dalsiCvik";
        timeObj = pauza;
        cekani = pauza;
        console.log(pauza);
        casP = "casOdpocinek";
        prepsaniCasu();
        odpocinek();
        startTimer();
        run();
      }
      diff = 0;
      that.running = false;
    }

    obj = CountDownTimer.parse(diff);
    that.tickFtns.forEach(function (ftn) {
      ftn.call(this, obj.minutes, obj.seconds);
    }, that);
  }());
};

CountDownTimer.prototype.onTick = function (ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function () {
  return !this.running;
};

CountDownTimer.parse = function (seconds) {
  return {
    'minutes': (seconds / 60) | 0,
    'seconds': (seconds % 60) | 0
  };
};

function startTimer() {
  timer.start();
}

//Loading bar %
let usek = pauza;
let loading = 0;
function loadingBar() {
  if (loading < 100) {
    usek -= 1;
    loading = ((pauza - usek) / pauza) * 100;
    document.getElementById("loading").style.width = loading + "%";
  }
}

//Kolik je cviků a kolik jich schází
function umisteni() {
  var celkem = kombinace.length;
  document.getElementById("count").innerHTML ="Další " + (cislo + 1) + "/" + celkem; 
}
//Zvuky aplikace
var beep1;