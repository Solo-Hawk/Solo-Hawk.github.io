var weatherReq = new XMLHttpRequest();

weatherReq.open ('GET', 'http://api,.openweathermap.org/data/2.5/weather?qTottenham,uk&APPID=44b59768588b0b27da73b5a3ed683e6');

weatherReq.addEventListener('load', handleResponse);

weatherReq.send();
var msg = document.querySelector('#weather');

function handleResponse(){
   console.log(weatherReq);
   weatherObj =
       JSON.parse(weatherReq.responseText);
           var weather = weatherObj.weather;
           weatherMsg.textContent = 'the weather in ' + weatherObj.name + 'is :' + weather[0].description + ' and ' + weather[1].description;
}