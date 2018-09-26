url =
  "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97";
// set dom
let dsitrict = document.getElementById("hero__dsitrict");
let inputBtn = document.getElementById("hero__input");
let controlList = document.querySelector(".control__list");
// let controlItems = document.querySelectorAll(".control__items");
let infoList = document.querySelector(".info__list");

// info__page;
// set event

// set basic
setDefault();
inputBtn.addEventListener("change", callAjax);
controlList.addEventListener("click", callHotAjax);

function setDefault(){
  let xhr = new XMLHttpRequest();
  xhr.open("post", url, true);
  xhr.send(null);
  xhr.onload = function() {
    var rawData = JSON.parse(xhr.responseText);
    var travelData = rawData.result.records;
    // console.log(travelData);
    createHeroDsitrict(travelData);
  };
}

function callAjax(){
  let travelDsitrict = inputBtn.value;
  // console.log(travelDsitrict);
  document.querySelector(".info__title").textContent = travelDsitrict;
  var xhr = new XMLHttpRequest();
  xhr.open("post", url, true);
  xhr.send(null);
  xhr.onload = function() {
    var rawData = JSON.parse(xhr.responseText);
    var travelData = rawData.result.records;
    // console.log(travelData);
    updateList(travelData, travelDsitrict);
  };
}

function callHotAjax(e) {
  let hotDsitrict = e.target.dataset.dsitrict;
  // let hotInnerText = e.target.innerText;
  // // console.log(hotDsitrict);

  // console.log(e);
  // if (hotInnerText == hotDsitrict) {
  //   e.target.classList.add("click");
  // }

  var controlItems = document.querySelector(".control__items");
  console.log(controlItems);


  let infoTitle = document.querySelector(".info__title");
  infoTitle.textContent = hotDsitrict;

  var xhr = new XMLHttpRequest();
  xhr.open("post", url, true);
  xhr.send(null);
  xhr.onload = function() {
    var rawData = JSON.parse(xhr.responseText);
    var travelData = rawData.result.records;
    // console.log(travelData);
    updateList(travelData, hotDsitrict);
  };
}

function createHeroDsitrict(data){
  var kDistrict=[];
  // console.log(data);
  data.forEach(function(info,index){
    var zone = info["Zone"];
    if (kDistrict.includes(zone) == 0) {
      kDistrict.push(zone);
    }
  })
  hotDsitrict(kDistrict);
  // console.log(kDistrict);
  var kDistrictList = "";
  for (var d = 0; d < kDistrict.length; d++) {
    kDistrictList += "<option value=" + kDistrict[d] + ">";
  }
  dsitrict.innerHTML = kDistrictList;
}

function hotDsitrict(data) {
  // console.log(data);
  var hotLength = data.length;
  // console.log(hotLength);
  var hotDsitrict = [];
  for (let i = 0; i < 5; i++) {
    let hotRandom = Math.floor(Math.random() * hotLength);
    // console.log(hotRandom);
    if (hotDsitrict.includes(data[hotRandom]) == 0) {
      hotDsitrict.push(data[hotRandom]);
    }
    // console.log(hotDsitrict);
  }
  var hotDsitrictLen = hotDsitrict.length;
  var hotDsitrictList = [];
  for (let h = 0; h < hotDsitrictLen; h++) {
    hotDsitrictText = '<li class="control__items" data-index="'+ h +'" data-dsitrict="' + hotDsitrict[h] + '">' + hotDsitrict[h] + "</li>";
    // console.log(hotDsitrictList);
    hotDsitrictList.push(hotDsitrictText);
    // let hotDsitrictListLength = hotDsitrictList.length;
    // console.log(hotDsitrictListLength);
  }
  controlList.innerHTML = hotDsitrictList;
}

function updateList(data, myHeroDsitrict) {
  let infoData = [];
  data.forEach(function(info,index) {
    let img = info["Picture1"];
    let name = info["Name"];
    let dsitrict = info["Zone"];
    let opentime = info["Opentime"];
    let address = info["Add"];
    let phone = info["Tel"];
    let free = info["Ticketinfo"];
    if (dsitrict == myHeroDsitrict) {
      infoData.push('<li class="info__items">' + '<div class="items__hero">' + '<img class="items__img" src="' + img + '" alt="' + name + '">' + '<div class="items__text items__name">' + name + "</div>" + '<div class="items__text items__dsitrict">' + dsitrict + "</div>" + "</div>" + '<div class="items__detial">' + '<div class="items__time">' + opentime + "</div>" + '<div class="items__address">' + address + "</div>" + '<div class="items__phone">' + phone + "</div>" + '<div class="items__free">' + free + "</div>" + "</div>" + "</li>");
    }
  });
  // console.log(infoData);
  infoList.innerHTML = infoData;
}

// scroll event
// scroll to top
let goTopBtn = document.querySelector(".footer__goTop");
let targetTop = document.querySelector(".header");
function goTop(e) {
        e.preventDefault()
        window.scrollTo({
          behavior: "smooth",
          top: targetTop.offsetTop
        });
}
goTopBtn.addEventListener("click", goTop, false);

// scroll to info
let goInfoBtn = document.querySelector(".dropdown__img");
let targetInfo = document.querySelector(".info__list");
function goInfo(e) {
        e.preventDefault()
        window.scrollTo({
          behavior: "smooth",
          top: targetInfo.offsetTop
        });
}
goInfoBtn.addEventListener("click", goInfo, false);

// goTopBtn display shoe/off
window.addEventListener("scroll", function(e) {
  // console.log(e);
  let targetScroll = e.target.scrollingElement.scrollTop;
  // console.log(targetScroll);
  if(targetScroll > 300){
    goTopBtn.style.display = "block";
  }else{
    goTopBtn.style.display = "none";
  }
});
