function handleResponse() {
    var buttons = new Array(3);
    for (var i = 0; i < 3; i++) {
        buttons[i] = document.createElement("a");
        buttons[i].className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent menu-button";
        buttons[i].style.color = "Black";
        options.appendChild(buttons[i]);
        options.appendChild(document.createElement("br"));
    }
    buttons[0].innerHTML = "Search by Room";
    buttons[0].href = "search_room.html"
    buttons[1].innerHTML = "Search by Teacher";
    buttons[1].href = ""
    buttons[2].innerHTML = "Search by Subject";
    buttons[2].href = ""
}

var options = document.getElementById('menubuttons');
var rooms = new XMLHttpRequest();
rooms.open('GET', 'Menu.json');
console.log(rooms.responseText);
rooms.addEventListener('load', handleResponse);
rooms.send();


function search_room() {}

function search_teacher() {}

function search_subject() {}
