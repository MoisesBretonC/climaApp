const APIKEY = '6554c7f1d9d7efa731c6fe35693a198c';

const URLBASE = "https://api.openweathermap.org/data/2.5/weather?";

async function request(url){
    return fetch(url).then(data => data.json());
}

async function getWeather(lat, lon){
    url = `${ URLBASE }lat=${ lat }&lon=${ lon }&appid=${APIKEY}`;
    const weather = await request(url);
    console.log (weather);
    updateDOM(weather.name, weather.main.temp);
}

async function getWeatherByCity(city){
    const url = URLBASE + 'q=${city}$appid=${APIKEY}';
    const weather = await request(url);
    updateDOM(weather.name, weather.main.temp);
}

function updateDOM(city, temp) {
    // actualizar h2 de ciudad
    // actualizar h2 de temp
    // actualizar fondo dependiendo de la temp
    const ajusTemp = temp - 273.15;

    document.querySelector('.container h2:nth-child(2)').textContent = `Ciudad: ${city}`;
    document.querySelector('.container h2 span').textContent = `${ajusTemp} °C`;

if(ajusTemp < 14){
    document.body.style.backgroundColor = 'rgb(17, 153, 171)';
}else if(ajusTemp >= 15 &  ajusTemp< 25){
    document.body.style.backgroundColor = 'rgb(91, 184, 61)'
} else{
    document.body.style.backgroundColor = 'purple'
}
}
function searchWeatherByCity() {
    const cityInput = document.getElementById('cityInput').value;
    getWeatherByCity(cityInput);
  }
  
  // Asigna la función al evento click del botón
  document.getElementById('searchButton').addEventListener('click', searchWeatherByCity);
  


navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon)
});