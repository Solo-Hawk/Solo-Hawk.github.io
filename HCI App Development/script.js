function handleResponse() {
    var buttons = new Array(3);
    for (var i = 0; i < 3; i++) buttons[i] = document.createElement("button"), buttons[i].className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent", buttons[i].style.color = "blue", buttons[i].innerHTML = "Test", options.appendChild(buttons[i]), options.appendChild(document.createElement("br"));
}
var options = document.getElementById('menubuttons');
var rooms = new XMLHttpRequest();
rooms.open('GET', 'Menu.json');
console.log(rooms.responseText);
rooms.addEventListener('load', handleResponse);
rooms.send();