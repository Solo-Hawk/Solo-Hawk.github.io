function startGame() {
    document.getElementById('output').innerHTML = randnum;
    var x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("value", "Enter your guess here");
    document.body.appendChild(x);
    while(lives > 0 && !win){
        userGuess = prompt("Enter your guess")
        lives--
        
    }
   
    
}
var win = false;
var lives = 5;
var randnum = Math.floor(Math.random() * 100) + 1;
var gameButton = document.getElementById('buttonOne');

gameButton.addEventListener('click',startGame)
