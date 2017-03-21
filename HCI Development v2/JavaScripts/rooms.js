function handleResponse() {
    json = rooms.responseText
    console.log(json);
    json = JSON.parse(json)
    options.innerHTML = ""
    for (var i = 0; i < 2; i++) {

        floors[i] = document.createElement("a");
        floors[i].className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent menu-button";
        floors[i].style.color = "Black";
        options.appendChild(floors[i]);
        options.appendChild(document.createElement("br"));
    }
    floors[0].innerHTML = "Ground Floor";
    floors[0].addEventListener('click', show_ground_floor)
    floors[1].innerHTML = "First Floor";
    floors[1].addEventListener('click', show_first_floor)
}

var options = document.getElementById('menubuttons');

var floors = new Array(2);

var rooms = new XMLHttpRequest();
//handleResponse();



rooms.open('GET', 'JavaScripts/search_room.json', false);
console.log("Yo")
var json;

rooms.addEventListener('load', handleResponse);
rooms.send();



function show_ground_floor() {
    console.log(json)

    var groundFloor = new Array(json['College_Rooms_Floors'][0].length);
    options.innerHTML = ""
    console.log(json['College_Rooms_Floors'][0].length)
    for (var i = 0; i < groundFloor.length; i++) {
        console.log(i)
        floors[i] = document.createElement("a");
        floors[i].className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent menu-button";
        floors[i].style.color = "Black";
        floors[i].innerHTML = json['College_Rooms_Floors'][0][i]['Room_Name']
        options.appendChild(floors[i]);
        options.appendChild(document.createElement("br"));
    }

}

function show_first_floor() {
console.log(json)

    var firstFloor = new Array(json['College_Rooms_Floors'][1].length);
    options.innerHTML = ""
    console.log(json['College_Rooms_Floors'][1].length)
    for (var i = 0; i < firstFloor.length; i++) {
        console.log(i)
        floors[i] = document.createElement("a");
        floors[i].className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent menu-button";
        floors[i].style.color = "Black";
        floors[i].innerHTML = json['College_Rooms_Floors'][1][i]['Room_Name']
        options.appendChild(floors[i]);
        options.appendChild(document.createElement("br"));
    }
}
function runDialog(){
var dialog = document.querySelector('dialog');
var showDialogButton = document.querySelector('#accessibility');
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
showDialogButton.addEventListener('click', function () {
    dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function () {
    dialog.close();
});
}
