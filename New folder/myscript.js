function checkguess() {
    var guess = parseInt(userinput.value);
    userinput.value = '';
    console.log(guess);
    guesslist.textContent = guesslist.textContent + guess + ', ';
    if (guess == randnum && lives > 0){
        guesslist.textContent = guesslist.textContent + 'YOU WIN';
        userinput.style.display ="none"
        gameButton.style.display ="none"
    }else if (guess != randnum && lives <= 1){
        guesslist.textContent = guesslist.textContent + 'YOU LOSE';
        userinput.style.display ="none"
        gameButton.style.display ="none"
    }
    lives--
}
function scanGuess(){
    
    
    
}
var win = false;
var lives = 5;
var randnum = Math.floor(Math.random() * 100) + 1;

var gameButton = document.querySelector("#buttonOne");
var userinput = document.querySelector("#input");
var guesslist = document.querySelector("#guesses");
console.log(randnum);

gameButton.addEventListener('click',checkguess);
