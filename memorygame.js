function rungame() {
    this.src = 'images/' +images[parseInt(this.id)];
    console.log(count);
    if(count == 2)
        {
            first_image = this.src;
            first_image_id = parseInt(this.id);
            console.log(first_image_id);
        }
    else if(count == 1)
        {
            second_image = this.src;
            second_image_id = parseInt(this.id);
            console.log(second_image_id);
        }
    
    
    count--;
    
    console.log(count);
    
    if(count == 0 && (first_image != second_image))
        {  
            
                tile[(first_image_id)].src = defaultImage;
                tile[(second_image_id)].src = defaultImage;

                console.log(first_image_id);
                console.log(second_image_id);
            
        }
    else if(count == 0 && (first_image == second_image))
        {
            tile[(first_image_id)].removeEventListener('click', rungame);
            tile[(second_image_id)].removeEventListener('click', rungame);
                 
        }
    if(count == 0)
        {
            count = 2
            console.log(first_image);
            console.log(second_image);
            first_image_id = null;
            second_image_id = null;
        }
    
    
}

function createBoard()
{
    
}
function setCards()
{
    
}
function consoleLog(){
    
}
function shuffleCards(aList) {    
    var j, x, i;
    for (i = aList.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = aList[i -1];
        aList[i - 1] = aList[j];
        aList[j] = x;
    }
    return aList;
}
var defaultImage = 'images/White%20Squad.png';
var images = ['Doritos.jpg', 'MLG.png', 'Mountain%20Dew.jpg', 'Monster%20Energy.jpg','Doritos.jpg', 'MLG.png', 'Mountain%20Dew.jpg', 'Monster%20Energy.jpg'];
var count = 2;
var first_image;
var second_image;
var first_image_id;
var second_image_id;
var x;
var tile = document.querySelectorAll('img');

images = shuffleCards(images);
console.log(images);
console.log(tile.length);

for(x = 0; x < tile.length; x++)
{
    tile[x].id = x;
    tile[x].addEventListener('click', rungame)
}