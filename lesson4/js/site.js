document.getElementById("updated").innerHTML = "Last Updated " + document.lastModified;
var date = new Date();
document.getElementById("year").innerHTML = date.getFullYear();

function toggle_nav() {
   document.getElementById("main_nav").classList.toggle("nav_hidden");
}