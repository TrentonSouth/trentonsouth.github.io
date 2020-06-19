const date = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
const monthAbbrNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const day = date.getDay();
const dayName = days[day];
const month = date.getMonth();
const monthName = monthNames[month];
const year = date.getFullYear();
document.getElementById("today").innerHTML = dayName + ', ' + date.getDate() + ' ' + monthName  + ' ' + year;
document.getElementById("year").innerHTML = year;

function prestonAlert() {
   if(dayName == 'Friday') {
      document.getElementById("alert").innerHTML = "Saturday = Preston Pancakes in the Park!  9:00 a.m. Saturday at the city park pavilion.";
      document.getElementById("alert").classList.add("show");
   }
}

let imagesToLoad = document.querySelectorAll('img[data-src]');
const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};

let options = {
   rootMargin: '0px 0px 50px 0px',
   threshold: 0
 }

if('IntersectionObserver' in window) {
   const observer = new IntersectionObserver((items, observer) => {
     items.forEach((item) => {
       if(item.isIntersecting) {
         loadImages(item.target);
         observer.unobserve(item.target);
       }
     });
   }, options);
   imagesToLoad.forEach((img) => {
     observer.observe(img);
   });
 } else {
   imagesToLoad.forEach((img) => {
     loadImages(img);
   });
 }

function toggle_nav() {
   document.getElementById("main_nav").classList.toggle("nav_hidden");
   document.getElementById("ham").classList.toggle("fade_out");
   document.getElementById("ham").classList.toggle("fade_in");
   document.getElementById("close").classList.toggle("fade_out");
   document.getElementById("close").classList.toggle("fade_in");
}

function initMap() {
   let preston = {lat: 42.0974857, lng: -111.8788433};
   let map = new google.maps.Map(document.getElementById('map'), {zoom: 13, center: preston});
}

/*function buildForecast() {
   let daysInMonth = new Date(year, month + 1, 0).getDate();
   let dom = date.getDate();
   let day1, day2, day3, day4, day5, abbrMonth1, abbrMonth2, abbrMonth3, abbrMonth4, abbrMonth5;
   if (dom + 1 <= daysInMonth) {
      day1 = dom + 1;
      abbrMonth1 =  monthAbbrNames[month]
   } else {
      day1 = dom + 1 - daysInMonth;
      abbrMonth1 = month < 11 ? monthAbbrNames[month+1] : monthAbbrNames[0];
   }
   if (dom + 2 <= daysInMonth) {
      day2 = dom + 2;
      abbrMonth2 =  monthAbbrNames[month]
   } else {
      day2 = dom + 2 - daysInMonth;
      abbrMonth2 = month < 11 ? monthAbbrNames[month+1] : monthAbbrNames[0];
   }
   if (dom + 3 <= daysInMonth) {
      day3 = dom + 3;
      abbrMonth3 =  monthAbbrNames[month]
   } else {
      day3 = dom + 3 - daysInMonth;
      abbrMonth3 = month < 11 ? monthAbbrNames[month+1] : monthAbbrNames[0];
   }
   if (dom + 4 <= daysInMonth) {
      day4 = dom + 4;
      abbrMonth4 =  monthAbbrNames[month]
   } else {
      day4= dom + 4 - daysInMonth;
      abbrMonth4 = month < 11 ? monthAbbrNames[month+1] : monthAbbrNames[0];
   }
   if (dom + 5 <= daysInMonth) {
      day5 = dom + 5;
      abbrMonth5 =  monthAbbrNames[month]
   } else {
      day5 = dom + 5 - daysInMonth;
      abbrMonth5 = month < 11 ? monthAbbrNames[month+1] : monthAbbrNames[0];
   }

   document.getElementById('forecast1').innerHTML = buildForecastDay(day1, abbrMonth1, 'cloudy.jpg', 'Cloudy', 27);
   document.getElementById('forecast2').innerHTML = buildForecastDay(day2, abbrMonth2, 'rain.jpg', 'Rainy', 34);
   document.getElementById('forecast3').innerHTML = buildForecastDay(day3, abbrMonth3, 'sunshine.jpg', 'Sunny', 30);
   document.getElementById('forecast4').innerHTML = buildForecastDay(day4, abbrMonth4, 'storm.jpg', 'Stormy', 31);
   document.getElementById('forecast5').innerHTML = buildForecastDay(day5, abbrMonth5, 'snow.jpg', 'Snowy', 26);

}
*/

function buildForecastDay(dayOfMonth, abbrMonth, image, desc, temp) {
   html = '<h3>' + abbrMonth + ' ' + dayOfMonth + '</h3>';
   html += '<div class="weather_icon_div"><img class="weather_icon" alt="' + desc + '" src="' + './images/' + image + '"></div>';
   html += '<div>' + desc + '</div>';
   html += '<div>' + temp + '&#8457; </div>';
   return html;
}

function getParameterByName(name, url) {
   if (!url) url = window.location.href;
   name = name.replace(/[\[\]]/g, '\\$&');
   var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
       results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function updateSeverity(val) {
   document.getElementById('severitydisplay').innerHTML = "Severity: " + val; 
}

function loadTowns() {
   const requestURL = 'https://raw.githubusercontent.com/trentonsouth/trentonsouth.github.io/master/lesson9/data/towndata.json';

   fetch(requestURL)
   .then(function (response) {
      return response.json();
   })
   .then(function (jsonObject) {
      const towns = jsonObject['towns'];
      let preston;
      let sodasprings;
      let fishhaven;
      for (let i = 0; i < towns.length; i++ ) {
         switch (towns[i].name) {
            case "Preston":
               preston = buildTownCard(towns[i], 'p');
            break;
            case "Soda Springs":
               sodasprings = buildTownCard(towns[i], 'sp');
            break;
            case "Fish Haven":
               fishhaven = buildTownCard(towns[i], 'fh');
            break;
         }
      }
      document.querySelector('main').appendChild(preston);
      document.querySelector('main').appendChild(sodasprings);
      document.querySelector('main').appendChild(fishhaven);
   });
}

function buildTownCard(town, prefix) {
   let section = document.createElement('section');
   let divDetail = document.createElement('div')
   divDetail.setAttribute('class', 'city_home city_detail')
   divDetail.setAttribute('id', prefix + '_text');
   let image = document.createElement('img');
   image.setAttribute('src', './images/' + town.photo);
   image.setAttribute('class', 'city_home city_image');
   image.setAttribute('alt', town.name)
   image.setAttribute('id', prefix + '_image');
   let name = document.createElement('h2');
   name.textContent = town.name;
   let motto = document.createElement('h5');
   motto.textContent = town.motto;
   let yearFounded = document.createElement('h4');
   yearFounded.textContent = 'Year Founded: ' + town.yearFounded;
   let currentPopulation = document.createElement('h4');
   currentPopulation.textContent = 'Population: ' + town.currentPopulation;
   let averageRainfall = document.createElement('h4');
   averageRainfall.textContent = 'Annual Rain Fall: ' + town.averageRainfall;

   //Add elements into section
   divDetail.appendChild(name);
   divDetail.appendChild(motto);
   divDetail.appendChild(yearFounded);
   divDetail.appendChild(currentPopulation);
   divDetail.appendChild(averageRainfall);
   section.appendChild(divDetail);
   section.appendChild(image);
   return section;
}

/* Current Weather */
function currentWeather(id) {
   const apiURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + id + "&units=imperial&APPID=f5a48cab6fa8273b6bd8e489128e73b5";
fetch(apiURL)
 .then((response) => response.json())
 .then((town) => {
    console.log(town);
   let description = town.weather[0].description;
   document.getElementById('hightemp').innerHTML = Math.round(town.main.temp_max);
   document.getElementById('windspeed').innerHTML = Math.round(town.wind.speed);
   document.getElementById('humidity').innerHTML = town.main.humidity;
   document.getElementById('current').innerHTML = description.charAt(0).toUpperCase() + description.slice(1);

   // Calculate windchill
   const hightemp = document.getElementById('hightemp').innerHTML;
   const windspeed = document.getElementById('windspeed').innerHTML;
   let windchill = 35.74 + (0.6215 * hightemp) - (35.75 * (windspeed ** .16)) + (0.4275 * hightemp * (windspeed ** .16));
   
   if (hightemp <= 50 && windspeed > 3) {
      windchill = Math.round(windchill) + '&#8457;';
   } else {
      windchill = "NA";
   }
   document.getElementById('windchill').innerHTML = windchill;
 });
}

/* 5 day forecast */
function buildForecast(id) {
   url ="https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&units=imperial&APPID=f5a48cab6fa8273b6bd8e489128e73b5";
   fetch(url)
   .then((response) => response.json())
   .then((town) => {
      console.log(town);
      const townList = town.list;
      console.log(townList.length);
      let daycount = 0;
      for (let i = 0; i < town.list.length; i++ ) {
         let day = townList[i].dt_txt;
         if (day.substr(11, 19) == '12:00:00') {
            daycount += 1;
            let dateParts = day.substr(0,10).split('-');
            let month = monthAbbrNames[+dateParts[1]];
            let date = month + " " + +dateParts[2];
            let dateElement = 'day' + daycount;
            document.getElementById(dateElement).innerHTML = date;

            // Get description
            let descriptionLower = townList[i].weather[0].description;
            let description = descriptionLower.charAt(0).toUpperCase() + descriptionLower.slice(1);
            let descriptionElement = 'condition' + daycount;
            document.getElementById(descriptionElement).innerHTML = description;

            // Get high
            let temp = Math.round(townList[i].main.temp_max) + " &#176;F";
            let tempElement = 'temp' + daycount;
            document.getElementById(tempElement).innerHTML = temp;

            // Get icon
            const imagesrc = 'https://openweathermap.org/img/w/' + townList[i].weather[0].icon + '.png';
            let imageElement = 'icon' + daycount;
            document.getElementById(imageElement).setAttribute('src', imagesrc);
            document.getElementById(imageElement).setAttribute('alt', description);
         }
      }
   });
}