function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var latitude, longitude, accuracy = "user's data";
var blockInfo, weatherUrl, metric, degree;
var dataLocation, dataForecast;
var dateForecast, strZeroDay, strZeroNight, currentDay = 0;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation);
  } else {
    alert("Your browser does not support Geolocation!");
    latitude = parseFloat(prompt("Your latitude in DD format (nn.nnnnnn):", "00.000000")).toFixed(6);
    longitude = parseFloat(prompt("Your longitude in DD format (nn.nnnnnn):", "00.000000")).toFixed(6);
  }
}

function errorLocation(error) {
  switch (error.code) {
    case error.TIMEOUT:
      alert("A timeout occured! Please try again!");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("We can't detect your location. Sorry!");
      break;
    case error.PERMISSION_DENIED:
      alert("Please allow geolocation access for this to work.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occured!");
      break;
  }
}

function successLocation(position) {
  latitude = position.coords.latitude.toFixed(6);
  longitude = position.coords.longitude.toFixed(6);
  accuracy = position.coords.accuracy;

  if (!isNaN(accuracy)) {
    accuracy = accuracy.toFixed(0);
  }

  weatherUrl = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search.json?q='
                + latitude + ',' + longitude + '&apikey=5cletl4C6fQDKChSaKpROyC55HCzLvFh';

  document.body.style.background = "#ffffff url(img/compass.jpg) no-repeat center top";
  document.body.style.color = "black";
  document.body.style.transition = "2s";
  blockInfo = document.getElementById('blockLocation');
  blockInfo.style.backgroundColor = "rgba(255, 239, 213, 1)";
  blockInfo.style.borderRadius = '5%';
  blockInfo.style.border = "2px solid grey";
  blockInfo.style.width = "350px";
  blockInfo.style.height = "300px";
  blockInfo.style.padding = "5px";
  blockInfo.style.textAlign = "center";
  blockInfo.style.transition = "2s";

  blockInfo.innerHTML = '<br><h2>Your current position</h2>' +
    '<h4>(more or less ' + accuracy + ' meters)' + '</h4><br>' +
    '<p>Latitude : ' + latitude + '</p>' +
    '<p>Longitude: ' + longitude + '</p>' +
    '<p id="locationName"></p>' +
    "<br><p>Choose forecast's metric values</p>" +
    '<button id="btnF">Imperial (&#8457;)</button>' +
    '<button id="btnC">Metric (&#8451;)</button>';

  ajaxRequest(weatherUrl, getKeyLocation);

  var bntImperial = document.getElementById('btnF');
  bntImperial.onclick = function () {
    metric = false;
    weatherUrl = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/'
            + dataLocation.Key + '?apikey=5cletl4C6fQDKChSaKpROyC55HCzLvFh' + '&metric=false';

    ajaxRequest(weatherUrl, get5daysForecast);
  };
  
  var bntMetric = document.getElementById('btnC');
  bntMetric.onclick = function () {
    metric = true;
    weatherUrl = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/'
            + dataLocation.Key + '?apikey=5cletl4C6fQDKChSaKpROyC55HCzLvFh' + '&metric=true';

    ajaxRequest(weatherUrl, get5daysForecast);
  };
}

function ajaxRequest(urlWeather, weatherFunction) {
  var httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }

  httpRequest.open('GET', urlWeather, true);

  httpRequest.onreadystatechange = function () {
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          weatherFunction(httpRequest.responseText);
        } else {
          alert(httpRequest.status + ': ' + httpRequest.statusText);
        }
      }
    } catch (e) {
      alert('Caught Exception: ' + e.description);
    }
  };

  httpRequest.send();
}

function getKeyLocation(weatherData) {
  dataLocation = JSON.parse(weatherData);

  document.getElementById('locationName').innerHTML = dataLocation.EnglishName;
}

function get5daysForecast(weatherData) {
  dataForecast = JSON.parse(weatherData);

  document.body.style.background = "#ffffff url(img/forecast.jpg) no-repeat center top";
  document.body.style.transition = "2s";
  blockInfo = document.getElementById('blockLocation');
  blockInfo.style.height = "350px";
  blockInfo.style.transition = "2s";
  document.getElementById('forecastNavigation').removeAttribute('hidden');

  strZeroDay = '';
  if (dataForecast.DailyForecasts[currentDay].Day.Icon < 10) {
    strZeroDay = '0';
  }

  strZeroNight = '';
  if (dataForecast.DailyForecasts[currentDay].Night.Icon < 10) {
    strZeroNight = '0';
  }

  dateForecast = new Date(dataForecast.DailyForecasts[currentDay].Date);

  if (metric) {
    degree = "&#8451;";
  } else {
    degree = "&#8457;";
  }

  var btnNavLeft = document.getElementById('btnNavLeft');
  var bthNavRight = document.getElementById('bthNavRight');

  btnNavLeft.setAttribute('hidden', 'hidden');
  changeBlockInfo(currentDay);

  btnNavLeft.onclick = goLeft;
  bthNavRight.onclick = goRight;
}

function changeBlockInfo(i) {
  dateForecast = new Date(dataForecast.DailyForecasts[i].Date);

  strZeroDay = '';
  if (dataForecast.DailyForecasts[i].Day.Icon < 10) {
    strZeroDay = '0';
  }

  strZeroNight = '';
  if (dataForecast.DailyForecasts[i].Night.Icon < 10) {
    strZeroNight = '0';
  }

  blockInfo.innerHTML = '<h2 id="locationTitle">' + dataLocation.EnglishName + '</h2>' +
    '<h4 id="locationTitle">' + dataLocation.Region.EnglishName + ' / ' +
    dataLocation.Country.EnglishName + '</h4><br>' +
    '<p>date: ' + dateForecast.toDateString() + '</p><br>' +

    '<div class="leftIcon"><p>min: ' + dataForecast.DailyForecasts[i].Temperature.Minimum.Value +
    ' ' + degree + '</p><br><p class="sm0"><u>Night</u></p><p class="sm">' +
    dataForecast.DailyForecasts[i].Night.IconPhrase +
    '</p><br><img src="https://developer.accuweather.com/sites/default/files/' +
    strZeroNight + dataForecast.DailyForecasts[i].Night.Icon + '-s.png" alt=""></div>' +

    '<div class="rightIcon"><p>max: ' + dataForecast.DailyForecasts[i].Temperature.Maximum.Value +
    ' ' + degree + '</p><br><p class="sm0"><u>Day</u></p><p class="sm">' +
    dataForecast.DailyForecasts[i].Day.IconPhrase +
    '</p><br><img src="https://developer.accuweather.com/sites/default/files/' +
    strZeroDay + dataForecast.DailyForecasts[i].Day.Icon + '-s.png" alt=""></div>' +

    '<div class="clearfix"></div><a href="' + dataForecast.DailyForecasts[i].Link +
    '" target="_blank" rel="noopener noreferrer">accuweather.com</a>';
}

function goLeft() {
  if (currentDay == 4) {
    document.getElementById('bthNavRight').removeAttribute('hidden');
  }

  currentDay--;
  changeBlockInfo(currentDay);

  if (currentDay == 0) {
    document.getElementById('btnNavLeft').setAttribute('hidden', 'hidden');
  }
}

function goRight() {
  if (currentDay == 0) {
    document.getElementById('btnNavLeft').removeAttribute('hidden');
  }

  currentDay++;
  changeBlockInfo(currentDay);

  if (currentDay == 4) {
    document.getElementById('bthNavRight').setAttribute('hidden', 'hidden');
  }
}

ready(function () {
  var bntMyLocation = document.getElementById('myLocation');
  bntMyLocation.onclick = getLocation;
});
