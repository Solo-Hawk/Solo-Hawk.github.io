function runUpdate(){
    console.log(parseInt(this.id.split("|")[0]));
    console.log(parseInt(this.id.split("|")[1]));
    indexFloor =parseInt(this.id.split("|")[0]);
    indexRoom = parseInt(this.id.split("|")[1]);
    
    
}
function handleResponse(){
    
jsontext = JSON.parse(xhr.responseText);
console.log(jsontext);
    
console.log("Lmao");
console.log(jsontext);
console.log("Hullo");
console.log(jsontext.length);
var buttons = new Array(jsontext.lenght);

for (i = 0; i < jsontext.length; i++)
  {
    buttons[i] = new Array(collegeRooms[i].length);
    
    for (ii = 0; ii< jsontext[i].length; ii++)
    {
      buttons[i][ii] = document.createElement("button");
      buttons[i][ii].addEventListener("click",runUpdate);
      buttons[i][ii].innerHTML = collegeRooms[i][ii];
      buttons[i][ii].id = i + "|" + ii;
      menu.appendChild(buttons[i][ii]);
    }
      
    menu.appendChild(document.createElement("br"));
  }
}
function outputWeather(){
    console.log(weather.responseText);
    var weatJson = JSON.parse(weather.responseText);
    output.innerHTML = 'Weather: ' + weatJson['weather'][0]['main'] + ' <br> ' + 'Details ' + weatJson['weather'][0]['description'];
    
}

console.log("Start JS");
var output = document.getElementById("Output");
var menu = document.getElementById("Menu");
var jsontext;
var data;
var apikey = '55a9f47088835f96c9b04161d0b83146';

var weather = new XMLHttpRequest();
weather.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid='+apikey);
console.log(weather.responseText);
weather.addEventListener('load', outputWeather);
weather.send();


var xhr = new XMLHttpRequest();
xhr.open('GET', 'Room.json');
xhr.addEventListener('load', handleResponse);
xhr.send();







