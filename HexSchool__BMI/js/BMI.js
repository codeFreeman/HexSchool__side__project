// set dom
var initBtn = document.querySelector(".BMI__logo");
var list = document.querySelector(".result__list");
var resultBtn = document.querySelector(".showResult");
var showResult = document.querySelector(".showResult");
var showResultTitle = document.querySelector(".showResult__title");
var showResultRestart = document.querySelector(".showResult__restart");
var showResultInfoStatus = document.querySelector(".showResult--info");
var data = JSON.parse(localStorage.getItem("BMIData")) || [];
// console.log(list);
// console.log(resultBtn);

// addEventListener on result
initBtn.addEventListener("click", init);
resultBtn.addEventListener("click", addData);
list.addEventListener("click", delData,true);
showResultRestart.addEventListener("click", restart);
updateData(data);

function init(){
  list.innerHTML = "";
  data = [];
  localStorage.setItem("BMIData", JSON.stringify(data));
  updateData(data);
  showResult.classList.remove("restart");
  showResult.classList.remove(status);
  showResultTitle.innerHTML = "看結果";
  showResultRestart.classList.remove(status);
  showResultRestart.innerHTML = '<img src="image/icons_loop.png" alt="">';
  showResultInfoStatus.classList.remove(status);
  showResultInfoStatus.textContent = "";
}

function updateData(items){
  str = '';
  var len = items.length;
  for (var i = 0; len > i; i++) {
    var itemsBMI = items[i].infoBMI;
    var itemsStatus='';
    var itemsStatusTxt='';
    if (0 < itemsBMI && itemsBMI < 18.5) {
      itemsStatus = "tooLight";
      itemsStatusTxt = "過輕";
    } else if (18.5 < itemsBMI && itemsBMI < 25) {
      itemsStatus = "ideal";
      itemsStatusTxt = "理想";
    } else if (25 < itemsBMI && itemsBMI < 30) {
      itemsStatus = "tooHeavy";
      itemsStatusTxt = "過重";
    } else if (30 < itemsBMI && itemsBMI < 35) {
      itemsStatus = "mildObesity";
      itemsStatusTxt = "輕度肥胖";
    } else if (35 < itemsBMI && itemsBMI < 40) {
      itemsStatus = "moderateObesity";
      itemsStatusTxt = "中度肥胖";
    } else if (40 < itemsBMI) {
      itemsStatus = "severeObesity";
      itemsStatusTxt = "重度肥胖";
    }
    // console.log(itemsBMI);
    // console.log(itemsStatus);
    var itemsWeight = items[i].infoWeight;
    var itemsHeight = items[i].infoHeight;
    var itemsTime = items[i].infoTime;
    str += '<li class="result__items ' + itemsStatus + '">' + '<span class="result__status">' + itemsStatusTxt + "</span>" + '<span class="result__BMI">' + '<span class="result__BMI--title">BMI</span>' + '<span class="result__BMI--content">' + itemsBMI + "</span>" + "</span>" + '<span class="result__weight">' + '<span class="result__weight--title">weight</span>' + '<span class="result__weight--content">' + itemsWeight + "</span>" + "</span>" + '<span class="result__height">' + '<span class="result__height--title">height</span>' + '<span class="result__height--content">' + itemsHeight + "</span>" + "</span>" + '<span class="result__time">' + itemsTime + "</span>" + "<span data-index=" + i + ' class="result__delete">刪除</span>' + "</li>";
  }
  list.innerHTML = str;
}

function addData(e){
  // get height
  var height =  document.getElementById('inputHight').value;
  if (height==''){return alert("身高要填寫")}; // console.log(height);
    // get weight
  var weight = document.getElementById("inputWeight").value;
  if (weight == "") {
    return alert("體重要填寫");
  };
  // console.log(weight);
  // get BMI
  var BMI = (weight / ((height / 100) * (height / 100))).toFixed(2);
  // console.log(BMI);
  // get time
  var d = new Date();
  var year = d.getFullYear();
  var monthList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  var month = monthList[d.getMonth()];
  var day = d.getDate();
  var time = day + "-" + month + "-" + year;
  // console.log(time);
  var info = {
    infoBMI: BMI,
    infoHeight: height,
    infoWeight: weight,
    infoTime: time
  };
  if (0 < BMI && BMI < 18.5) {
    status = "tooLight";
    statusTxt = "過輕";
  } else if (18.5 < BMI && BMI < 25) {
    status = "ideal";
    statusTxt = "理想";
  } else if (25 < BMI && BMI < 30) {
    status = "tooHeavy";
    statusTxt = "過重";
  } else if (30 < BMI && BMI < 35) {
    status = "mildObesity";
    statusTxt = "輕度肥胖";
  } else if (35 < BMI && BMI < 40) {
    status = "moderateObesity";
    statusTxt = "中度肥胖";
  } else if (40 < BMI) {
    status = "severeObesity";
    statusTxt = "重度肥胖";
  }
  if (showResult.classList.contains("showResult"))
  {
    showResult.classList.add("restart");
    showResult.classList.add(status);
    showResultTitle.innerHTML = '<span class="showResult__BMI">' + BMI + "</span>";
    showResultRestart.classList.add(status);
    showResultInfoStatus.classList.add(status);
    showResultInfoStatus.textContent = statusTxt;
  }else if (showResult.classList.contains("restart")) {
    showResult.classList.remove("restart");
    showResult.classList.remove(status);
    showResultTitle.innerHTML = "看結果";
    showResultRestart.classList.remove(status);
    showResultRestart.innerHTML = '<img src="image/icons_loop.png" alt="">';
    showResultInfoStatus.classList.remove(status);
    showResultInfoStatus.textContent = "";
  }
  data.push(info);
  updateData(data);
  localStorage.setItem("BMIData", JSON.stringify(data));
  document.getElementById('inputHight').value = "";
  document.getElementById("inputWeight").value = "";
}

function delData(e){
  // console.log(e);
  if (e.target.className !== "result__delete") {
    return;
  };
  var index = e.target.dataset.index;
  // console.log(index)
  data.splice(index, 1);
  localStorage.setItem('BMIData', JSON.stringify(data));
  updateData(data);
  restart(e);
}

function restart(e){
  e.stopPropagation();
  showResult.classList.remove("restart");
  showResult.classList.remove(status);
  showResultTitle.innerHTML = "看結果";
  showResultRestart.classList.remove(status);
  showResultRestart.innerHTML = '<img src="image/icons_loop.png" alt="">';
  showResultInfoStatus.classList.remove(status);
  showResultInfoStatus.textContent = "";
}
