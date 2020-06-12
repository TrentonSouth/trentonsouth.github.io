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

function buildForecast() {
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

      for (let i = 0; i < towns.length; i++ ) {
         if (towns[i].name == "Preston" || towns[i].name == "Soda Springs" || towns[i].name == "Fish Haven") {
               let town = towns[i].name;
               let prefix = town == "Preston" ? "p" : town == "Soda Springs" ? "ss" : town == "Fish Haven" ? "fh" : "";
               let section = document.createElement('section');
               let divDetail = document.createElement('div')
               divDetail.setAttribute('class', 'city_home city_detail')
               divDetail.setAttribute('id', prefix + '_text');
               let image = document.createElement('img');
               image.setAttribute('src', './images/' + towns[i].photo);
               image.setAttribute('class', 'city_home city_image');
               image.setAttribute('alt', towns[i].name)
               image.setAttribute('id', prefix + '_image');
               let name = document.createElement('h2');
               name.textContent = towns[i].name;
               let motto = document.createElement('h4');
               motto.textContent = towns[i].motto;
               let yearFounded = document.createElement('p');
               yearFounded.textContent = 'Year Founded: ' + towns[i].yearFounded;
               let currentPopulation = document.createElement('p');
               currentPopulation.textContent = 'Population: ' + towns[i].currentPopulation;
               let averageRainfall = document.createElement('p');
               averageRainfall.textContent = 'Annual Rain Fall: ' + towns[i].averageRainfall;

               //Add elements into section
               
               divDetail.appendChild(name);
               divDetail.appendChild(motto);
               divDetail.appendChild(yearFounded);
               divDetail.appendChild(currentPopulation);
               divDetail.appendChild(averageRainfall);
               section.appendChild(divDetail);
               section.appendChild(image);
               document.querySelector('main').appendChild(section);
         }
      }
   });
}