//32.085300,34.781769";

const wTempeture = document.getElementById("weather_temp");
const wDescription = document.getElementById("weather_description"); 
const wIcon = document.getElementById("weather_icon");
const info = document.getElementById("weather_infobox");
const urlProxy = "https://cors-anywhere.herokuapp.com/";
const errTxt = document.getElementById("error_text");
  
// var evLoc = document.querySelectorAll("");

// $('.tab').click(function (ev) {
//   $('#tabs_wrapper .tab').removeClass('selected');
// });

var tempUnit = "ca";

function getCurrentLocation(){
  navigator.geolocation.getCurrentPosition(success,error);
}

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  const lat = crd.latitude;
  const lon = crd.longitude;
  const id = "loc1"; 
  getWeatherDtl(lat,lon,id);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function getWeatherDtl(lat,lon,id){
    var urlAPI = urlProxy + "https://api.darksky.net/forecast/557ecd4b8c8bbba02f4a50afe884934b/"+lat+","+lon;
    urlAPI = urlAPI.concat("?units="+tempUnit);
    window.idTab = id;
    var xhttp = new XMLHttpRequest();  
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4){
      if(this.status == 200){
        //PARSE JSON FILE
        var dtl = JSON.parse(this.responseText);
        //FETCH DETAILS FROM API
        fetchWeatherDtl(dtl);
      }
      else{
        //SHOW ERROR
        setErrorTxt(xhttp);
      }
    
    }
    else{
      //SHOW LOADER
      info.style.display = "none";
      errTxt.style.display = "none";
      showLoader();
    }
  };
  xhttp.open("GET", urlAPI, true);
  xhttp.send();
}


function fetchWeatherDtl(dtljson) {
  //SHOW DETAILS
  info.style.display = "block";
  console.log(dtljson.currently.temperature);
  wTempeture.innerHTML = Math.round(parseInt(dtljson.currently.temperature));
  // wTempeture.innerHTML = dtljson.currently.temperature;
  wDescription.innerHTML = dtljson.currently.summary;
  //SET ICON
  setIcon(dtljson.currently.icon);
  //SET LOCATION
  console.log(dtljson.timezone);
  setLocation(dtljson.timezone,idTab);
  //HIDE LOADER
  hideLoader();
}

function setIcon(wicon){
  var skycons = new Skycons({"color": "pink"});
  skycons.add(wIcon, wicon);
  // START ANIMATION
  skycons.play();
}

function setLocation(loc,idL){
  //FETCH LOCATION
  var location = loc.split("/");
  console.log(location);
  document.getElementById("weather_location").innerHTML = location[1];
  //REMOVE SELECTED CLASS
  var quryL = document.querySelectorAll(".tab");
  for(var i=0;i<quryL.length;i++){
    quryL[i].classList.remove("selected");  
  }
  // quryL.addEventLisetner("click",function(){
  //   this.
  // })

  //ADD CLASS SELECTED TO RELEVANT TAB
  var l = document.getElementById(idL);  
  l.classList.add("selected");
}

function hideLoader(){
  var hideload = document.getElementById("loader");
  hideload.style.display="none";
}

function showLoader(){
  var showload = document.getElementById("loader");
  showload.style.display="block";
}

function setErrorTxt(xhr){
  info.style.display = "none";
  hideLoader();
  errTxt.innerHTML = xhr.status +" "+xhr.statusText;
  errTxt.style.display = "block";
}