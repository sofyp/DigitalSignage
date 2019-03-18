let appID = '6b97082c133ed12dc672b2781348a0d0';
let units = 'metric';
let myrtsi = '830153';

document.addEventListener('DOMContentLoaded', () => {
  searchWeather();
});


function searchWeather() {
  //getSearchMethod(searchTerm);/
  fetch(`http://api.openweathermap.org/data/2.5/weather?id=${myrtsi}&lang=fi&APPID=${appID}&units=${units}`).then(result => {
    return result.json();
  }).then(result => {
    init(result);
  })
}

function init(resultFromServer) {

  let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
  let temperatureElement = document.getElementById('temperature');
  //let minTempElement = document.getElementById('humidity');
  let windSpeedElement = document.getElementById('windSpeed');
  let cityHeader = document.getElementById('cityHeader');
  let weatherIcon = document.createElement('img');
  let div = document.getElementById('weatherImg');

  weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

  div.appendChild(weatherIcon);

  let resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
  windSpeedElement.innerHTML ='Tuulen nopeus ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
  cityHeader.innerHTML = resultFromServer.name;
  //minTempElement.innerHTML = Math.floor(resultFromServer.main.temp_min) + '&#176';

  setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
  let weatherContainer = document.getElementById('weatherContainer');
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;
  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2})`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3};`;
  weatherContainer.style.visibility = 'visible';

}

///// BUTTON //////

/*document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
}) */


/*let appID = '6b97082c133ed12dc672b2781348a0d0';
let units = 'metric';
//let searchMethod;
let myrtsi = '830153';


///////  HAKUKENTTÄ   ////////
/*function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}*/

/*document.addEventListener('DOMContentLoaded', () => {
  searchWeather();
});


function searchWeather() {
  //getSearchMethod(searchTerm);/
  fetch(`http://api.openweathermap.org/data/2.5/weather?id=${myrtsi}&lang=fi&APPID=${appID}&units=${units}`).then(result => {
    return result.json();
  }).then(result => {
    init(result);
  })
}

function init(resultFromServer) {


  let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
  let temperatureElement = document.getElementById('temperature');
  //let minTempElement = document.getElementById('humidity');
  let windSpeedElement = document.getElementById('windSpeed');
  let cityHeader = document.getElementById('cityHeader');
  let weatherIcon = document.createElement('img');
  let div = document.getElementById('weatherImg');

  weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

  div.appendChild(weatherIcon);

  let resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
  windSpeedElement.innerHTML ='Tuulen nopeus ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
  cityHeader.innerHTML = resultFromServer.name;
  //minTempElement.innerHTML = Math.floor(resultFromServer.main.temp_min) + '&#176';

  setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
  let weatherContainer = document.getElementById('weatherContainer');
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2})`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3};`
  weatherContainer.style.visibility = 'visible';

}
*/