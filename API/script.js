function do_something(lat, long){
    
    console.log(lat, ' ', long);
    geoloc.innerHTML = lat.toFixed(2) + '   ' + long.toFixed(2)
    
}

function outputWeather(){
    
    console.log(weather.responseText);
    var weatJson = JSON.parse(weather.responseText);
    weatmsg.innerHTML = 'Weather: ' + weatJson['weather'][0]['main'] + ' <br> ' + 'Details: ' + weatJson['weather'][0]['description'];
    
}

var geoloc = document.getElementById('geoloc');
var weatmsg = document.getElementById('weamsg');

var watch = navigator.geolocation.watchPosition(function(position){do_something(position.coords.latitude, position.coords.longitude)});


var apikey = '55a9f47088835f96c9b04161d0b83146';

var weather = new XMLHttpRequest();
weather.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid='+apikey);
console.log(weather.responseText);
weather.addEventListener('load', outputWeather);
weather.send();