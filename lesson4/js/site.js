//document.getElementById("updated").innerHTML = "Last Updated " + document.lastModified;
const date = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
const dayName = days[date.getDay()];
const monthName = monthNames[date.getMonth()];
const year = date.getFullYear();
document.getElementById("today").innerHTML = dayName + ', ' + monthName + ' ' + date.getDate() + ', ' + year;
document.getElementById("year").innerHTML = year;

function toggle_nav() {
   document.getElementById("main_nav").classList.toggle("nav_hidden");
}