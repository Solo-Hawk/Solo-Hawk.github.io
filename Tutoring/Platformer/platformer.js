var game;  
var player;
var enemies = [];
var score;
var map;
var groundLayer;


window.onload = function () {
    game = new Phaser.Game("99%", "99%", Phaser.AUTO, "");
    game.state.add("Platformer", platformer);
    game.state.start("Platformer");
}
var platformer = function (game) {};
platformer.prototype = {
    preload: preload,
    create: create,
    update: update
}

function preload(){
    game.load.tilemap('tilemap', 'level%201.json', null, Phaser.Tilemap.TILED_JSON);
    
    
    
}



function create(){
    game.stage.backgroundColor = '#b9eeff';
    
    // Start the arcade physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    map = this.game.add.tilemap('tilemap');
    
    map.addTilesetImage('tiles')
    
    groundLayer = map.createLayer('Tile Layer 1');
    
    map.setCollsionBetween(1, 1000, true, 'Tile Layer 1')
    
    groundLayer.resizeWorld();
}



function update(){
    
    
    
    
}