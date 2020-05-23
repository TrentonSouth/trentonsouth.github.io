//document.getElementById("updated").innerHTML = "Last Updated " + document.lastModified;
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

if(dayName == 'Friday') {
   document.getElementById("alert").innerHTML = "Saturday = Preston Pancakes in the Park!  9:00 a.m. Saturday at the city park pavilion.";
   document.getElementById("alert").classList.add("show");
}

buildForecast(days, monthNames);

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
      abbrMonth1 = month < 11 ? monthAbbrNames[month] : monthAbbrNames[0];
   }
   if (dom + 2 <= daysInMonth) {
      day2 = dom + 2;
      abbrMonth2 =  monthAbbrNames[month]
   } else {
      day2 = dom + 2 - daysInMonth;
      abbrMonth2 = month < 11 ? monthAbbrNames[month] : monthAbbrNames[0];
   }
   if (dom + 3 <= daysInMonth) {
      day3 = dom + 3;
      abbrMonth3 =  monthAbbrNames[month]
   } else {
      day3 = dom + 3 - daysInMonth;
      abbrMonth3 = month < 11 ? monthAbbrNames[month] : monthAbbrNames[0];
   }
   if (dom + 4 <= daysInMonth) {
      day4 = dom + 4;
      abbrMonth4 =  monthAbbrNames[month]
   } else {
      day4= dom + 4 - daysInMonth;
      abbrMonth4 = month < 11 ? monthAbbrNames[month] : monthAbbrNames[0];
   }
   if (dom + 5 <= daysInMonth) {
      day5 = dom + 1;
      abbrMonth5 =  monthAbbrNames[month]
   } else {
      day5 = dom + 5 - daysInMonth;
      abbrMonth5 = month < 11 ? monthAbbrNames[month] : monthAbbrNames[0];
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

