function handleResponse() {
    var buttons = new Array(3);
    for (var i = 0; i < 3; i++) {
        buttons[i] = document.createElement("a");
        buttons[i].className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent menu-button";
        buttons[i].style.color = "Black";
        options.appendChild(buttons[i]);
        options.appendChild(document.createElement("br"));
    }
    buttons[0].innerHTML = "First Floor";
    buttons[0].href = "search_room.html"
    buttons[1].innerHTML = "Ground Floor";
    buttons[1].addEventListener('click', search_teacher)
}

    var options = document.getElementById('menubuttons');
    var rooms = new XMLHttpRequest();
    rooms.open('GET', 'search_room.json');
console.log("Yo")
    console.log(rooms.responseText);
    rooms.addEventListener('load', handleResponse);
    rooms.send();


function search_room() {}

function search_teacher() {}

function search_subject() {}
