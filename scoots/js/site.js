const date = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
const monthAbbrNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const day = date.getDay();
const dayName = days[day];
const month = date.getMonth();
const monthName = monthNames[month];
const year = date.getFullYear();
//document.getElementById("today").innerHTML = dayName + ', ' + date.getDate() + ' ' + monthName  + ' ' + year;
//document.getElementById("year").innerHTML = year;
var data;
loadData();


function loadData() {
   const requestURL = 'https://raw.githubusercontent.com/trentonsouth/trentonsouth.github.io/master/scoots/data/types.json';

   fetch(requestURL)
   .then(function (response) {
      return response.json();
   })
   .then(function (jsonObject) {
      data = jsonObject;
   });
}

function buildChart() {
   if (data === undefined) {
      setTimeout(buildChart, 200);
   } else {
      let table = '<table id="priceChart">';
      table += '<caption>Max Persons and Price Chart <span class="smaller">(includes Tax)</span></caption>';
      table += '<tr><th colspan="2">&nbsp;</th><th colspan="2">Reservation</th><th colspan="2">Walk-In</th></tr>';
      table += '<tr><th>Rental Type</th><th>Max Persons</th><th>Half Day<br>(3 hrs)</th><th>Full Day</th><th>Half Day<br>(3 hrs)</th><th>Full Day</th></tr>';
      data.types.forEach(type => {
         type.rentals.forEach(rental => {
            table += '<tr><td>' + rental.rental_type + '</td><td>' + rental.max_persons + '</td><td>$' + rental.pricing.reservation.half_day;
            table += '</td><td>$' + rental.pricing.reservation.full_day + '</td><td>$' + rental.pricing.walk_in.half_day;
            table += '</td><td>$' + rental.pricing.walk_in.full_day + '</td></tr>'
         })
      });
      table += '</table>';
      document.getElementById('chart').innerHTML = table;
   }
}

function buildRates() {
   if (data === undefined) {
      setTimeout(buildRates, 200);
   } else {
      let html = "";
      data.types.forEach(type => {
         type.rentals.forEach(rental => {
            html += '<h3>' + rental.rental_type + '</h3>';
            html += '<div><img class="rental_image" src="' + rental.image + '"></div>';
            html += '<div class="rental_detail">' + rental.description  + '</div>';
            html += '<div class="rental_price">';
            html += 'Max Persons - ' + rental.max_persons + '<br><br>';
            html += '<span class="rental_price_lable">1/2 Day Reserved</span> $' + rental.pricing.reservation.half_day + '<br>';
            html += '<span class="rental_price_lable">Full Day Reserved</span> $' + rental.pricing.reservation.full_day + '<br>';
            html += '<span class="rental_price_lable">1/2 Day Walk-in</span> $' + rental.pricing.walk_in.half_day + '<br>';
            html += '<span class="rental_price_lable">Full Day Walk-in</span> $' + rental.pricing.walk_in.full_day + '<br>';
            html += '</div>';
            html += '<div><button class="rent_button">Rent a ' + rental.rental_type + '</button></div>';
            html += '<hr class="rental_hr">';
         })
      });
      document.getElementById('rentals').innerHTML = html;
   }
}

buildRentals();
function buildRentals() {
   if (data === undefined) {
      setTimeout(buildRentals, 200);
   } else {
      let main = document.getElementById('home_main');
      data.types.forEach(type => {
         type.rentals.forEach(rental => {
            let parent = document.createElement("div");
            let img_div = document.createElement("div");
            img_div.setAttribute('class', 'rental_image_div');
            let img = document.createElement("img");
            img.setAttribute('src', rental.image);
            img.setAttribute('alt', rental.rental_type);
            img.setAttribute('class', 'rental_image');
            img_div.appendChild(img)
            let txt_div = document.createElement("div");
            txt_div.setAttribute('class', 'txt_div');
            txt_div.textContent = rental.description;
            parent.appendChild(img_div);
            parent.appendChild(txt_div);
            main.appendChild(parent);
         })
      });
   }
}

function toggle_nav() {
   document.getElementById("main_nav").classList.toggle("nav_hidden");
   document.getElementById("ham").classList.toggle("fade_out");
   document.getElementById("ham").classList.toggle("fade_in");
   document.getElementById("close").classList.toggle("fade_out");
   document.getElementById("close").classList.toggle("fade_in");
}

let images = ['jeep','road','beach','scooters'];
rotateImage(0);
function rotateImage(pos) {
   setTimeout(function() {
      document.getElementById('image_source').setAttribute('srcset','./images/rotate/' + images[pos] + '_small.jpg');
      document.getElementById('image_rotate').setAttribute('src','./images/rotate/' + images[pos] + '_large.jpg');
      document.getElementById('image_rotate').setAttribute('alt', images[pos]);
      if (pos == images.length-1) {
         pos = 0;
      } else {
         pos += 1;
      }
      rotateImage(pos);
   },5000);
}

function cozumelWeather() {
   const apiURL = 'https://api.openweathermap.org/data/2.5/weather?id=3530103&units=imperial&APPID=f5a48cab6fa8273b6bd8e489128e73b5';
fetch(apiURL)
 .then((response) => response.json())
 .then((town) => {
   let description = town.weather[0].description;
   document.getElementById('cTemp').innerHTML = Math.round(town.main.temp);
   document.getElementById('cHigh').innerHTML = Math.round(town.main.temp_max);
   document.getElementById('cWindspeed').innerHTML = Math.round(town.wind.speed);
   document.getElementById('cHumidity').innerHTML = town.main.humidity;
   document.getElementById('cCurrent').innerHTML = description.charAt(0).toUpperCase() + description.slice(1);
 });
}
function playaDelCarmenWeather() {
   const apiURL = 'https://api.openweathermap.org/data/2.5/weather?id=3521342&units=imperial&APPID=f5a48cab6fa8273b6bd8e489128e73b5';
fetch(apiURL)
 .then((response) => response.json())
 .then((town) => {
   let description = town.weather[0].description;
   document.getElementById('pTemp').innerHTML = Math.round(town.main.temp);
   document.getElementById('pHigh').innerHTML = Math.round(town.main.temp_max);
   document.getElementById('pWindspeed').innerHTML = Math.round(town.wind.speed);
   document.getElementById('pHumidity').innerHTML = town.main.humidity;
   document.getElementById('pCurrent').innerHTML = description.charAt(0).toUpperCase() + description.slice(1);
 });
}
