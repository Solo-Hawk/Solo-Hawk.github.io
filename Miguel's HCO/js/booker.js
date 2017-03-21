// Grab our elements out of the page
var msg = document.querySelector('#message');
var select = document.querySelector('#dropdown');
var dataList;

// Fetch the JSON from the server
var req = new XMLHttpRequest();
req.open('GET', 'js/data1.json');
req.addEventListener('load', handleResponse);
req.send();

// ... when the JSON loads ...
function handleResponse() {
	// Turn the JSON into an object we can get useful info from 
	var response = req.responseText;
	var dataObj = JSON.parse(response);

	dataList = dataObj.adainfo;

	//This is the HTML code that will be put in the select TAG
	selectHTML = '<option>Select a teacher</option>';
	for (var i = 0; i < dataList.length; i++) {
		selectHTML += "<option value='" + dataList[i].teacher + "'>" + dataList[i].teacher + "</option>"
	} // End of for loop

	// Put our options HTML code in the select
	select.innerHTML = selectHTML;

	select.addEventListener('change', handleChoice);
}

function handleChoice() {
	var index = select.selectedIndex;
	var room = dataList[index - 1];

	select.options[0].disabled = true;

	msg.textContent = room.teacher + ' teaches ' + room.subject + ' in ' + room.classroom;

}
