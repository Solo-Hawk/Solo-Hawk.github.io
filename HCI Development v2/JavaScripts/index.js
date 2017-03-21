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
var options = document.getElementById('menubuttons');
handleResponse();


function search_room() {}

function search_teacher() {}

function search_subject() {}
