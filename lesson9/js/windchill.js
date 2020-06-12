(function () {
   const hightemp = document.getElementById('hightemp').innerHTML;
   const windspeed = document.getElementById('windspeed').innerHTML;
   let windchill = 35.74 + (0.6215 * hightemp) - (35.75 * (windspeed ** .16)) + (0.4275 * hightemp * (windspeed ** .16));
   
    
   if (hightemp <= 50 && windspeed > 3) {
      windchill = Math.round(windchill);
   } else {
      windchill = "NA";
   }
   document.getElementById('windchill').innerHTML = windchill;
 }());