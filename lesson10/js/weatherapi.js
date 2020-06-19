const apiURL = 'https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&APPID=f5a48cab6fa8273b6bd8e489128e73b5';
fetch(apiURL)
.then((response) => response.json())
.then((preston) => {
  
document.getElementById('current-temp').textContent = preston.main.temp;

const imagesrc = 'https://openweathermap.org/img/w/' + preston.weather[0].icon + '.png'; 
const desc = preston.weather[0].description;  
document.getElementById('imagesrc').textContent = imagesrc;  
document.getElementById('icon').setAttribute('src', imagesrc);  
document.getElementById('icon').setAttribute('alt', desc);

});